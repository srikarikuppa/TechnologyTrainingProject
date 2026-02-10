import sys
import os

# Ensure project root is in path
sys.path.append(os.getcwd())

try:
    print("Attempting to import backend.ml.predict...")
    from backend.ml import predict
    print("Successfully imported backend.ml.predict")
    
    # Check if we can access the function
    if hasattr(predict, 'predict_energy'):
        print("predict_energy function found.")
    else:
        print("predict_energy function NOT found.")

except ImportError as e:
    print(f"ImportError: {e}")
    sys.exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    sys.exit(1)
