# TechnologyTrainingProject
## Smart Energy Consumption Prediction and Optimization

## ⚡ Smart Energy Consumption Prediction Dashboard

An AI-powered web application that predicts next-hour energy consumption using an LSTM deep learning model and provides analytical insights for smarter energy usage.

🚀 Overview

This project combines:

📊 React + Vite Frontend Dashboard

🧠 Flask Backend API

🔮 LSTM Deep Learning Model

📈 Real-time visualizations and energy analytics

The system allows users to input recent hourly energy consumption values and:

Predict next-hour energy usage

Visualize trends

Compare peak vs off-peak usage

Receive AI-based recommendations

## Project Architecture:

TechnologyTrainingProject/
│
├── energy-insights-dashboard/   # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/                     # Flask Backend
│   ├── app.py
│   ├── model files
│
├── artifacts/                   # ML model artifacts (excluded from Git)
├── requirements.txt
└── README.md

## 🧠 How It Works

User enters recent hourly energy consumption values.

Frontend sends data to Flask API via:

POST /predict


### Backend:

Validates input
Scales data
Feeds into pre-trained LSTM model
Generates prediction
Returns structured JSON response

### Frontend:

Displays prediction
Renders trend graphs
Calculates peak vs off-peak usage
Shows AI recommendations


## 📡 API Endpoint
POST /predict
Request Body
{
  "values": [1.2, 2.3, 1.8, 3.0, 2.5, 2.1]
}

Response
{
  "predicted_energy": 2.87,
  "recommendation": "Moderate usage expected. Consider shifting heavy appliances to off-peak hours.",
  "status": "success"
}

## 🛠️ Tech Stack
### Frontend
React
TypeScript
Vite
Tailwind CSS
Recharts

### Backend
Python
Flask
TensorFlow / Keras (LSTM)
NumPy
Scikit-learn (scaling)


⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/srikarikuppa/TechnologyTrainingProject.git
cd TechnologyTrainingProject

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py

Backend runs at:
http://localhost:5000

3️⃣ Frontend Setup
cd energy-insights-dashboard
npm install
npm run dev


Frontend runs at:
http://localhost:5173


## 📌 Key Design Principles

Frontend-first API design
Strict input validation
No retraining of model in production
Clean separation of ML logic from UI
Explainable predictions
Predictable backend responses

## 📈 Future Improvements

Multi-hour forecasting
Model confidence intervals
User authentication
Persistent energy history storage
Deployment on cloud (Render / Vercel)

👩‍💻 Authors
Srikari Kuppa , Sriramoju Vyshnavi, B.Nandini
B.Tech – Information Technology Students
(AI & ML Enthusiasts)

📄 License
This project is for academic and learning purposes.
