import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib

def load_and_preprocess(data_path):
    df = pd.read_csv(
        data_path,
        sep=';',
        na_values='?',
        low_memory=False
    )

    df['datetime'] = pd.to_datetime(
        df['Date'] + ' ' + df['Time'],
        format='%d/%m/%Y %H:%M:%S'
    )

    df.drop(['Date', 'Time'], axis=1, inplace=True)
    df.set_index('datetime', inplace=True)

    df = df.apply(pd.to_numeric, errors='coerce')
    df = df.ffill()

    df_hourly = df.resample('h').mean()
    return df_hourly


def scale_and_create_sequences(series, window_size=24):
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(series.values.reshape(-1, 1))

    X, y = [], []
    for i in range(window_size, len(scaled)):
        X.append(scaled[i-window_size:i])
        y.append(scaled[i])

    X = np.array(X)
    y = np.array(y)

    joblib.dump(scaler, "artifacts/energy_scaler.pkl")
    return X, y
