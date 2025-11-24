🏡 House Price Prediction (ML + FastAPI + React)

This project predicts house prices using an ML Pipeline (XGBoost + ColumnTransformer) and serves predictions through a FastAPI backend, with a fully modern React (Vite) frontend featuring glassmorphism UI, dropdowns, validation, and 20+ input features.

🚀 Features
🧠 Machine Learning

XGBoost Regressor

Categorical encoding using OneHotEncoder

Full preprocessing + model training inside a single sklearn Pipeline

Clean feature engineering

Saved model using joblib

⚙️ Backend (FastAPI)

REST API endpoint: /predict

Accepts raw JSON input

Returns predicted sale price

CORS enabled

Fully compatible with React frontend

🎨 Frontend (React + Vite)

Beautiful gradient + glass UI

20+ input fields (numeric + dropdown)

Live validation + error feedback

Loading state

Clean response display

Modern responsive design

📂 Project Structure
house-price-prediction/
│
├── app/
│   └── app.py                  # FastAPI backend
│
├── src/
│   ├── train_model.py          # Training pipeline
│   ├── data_preprocessing.py   # Load & prepare features
│   ├── evaluate.py             # Quick testing
│
├── models/
│   └── best_model.pkl          # Saved ML pipeline
│
├── data/
│   ├── train.csv
│   ├── test.csv
│
├── frontend/                   # React frontend (Vite)
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles.css
│       └── components/
│           └── HousePriceForm.jsx
│
└── README.md

📦 Installation & Setup
1️⃣ Backend Setup (FastAPI + ML Model)
Create & activate virtual environment
python -m venv venv
venv\Scripts\activate   # Windows

Install backend dependencies
pip install -r app/requirements.txt

Train the ML model
python src/train_model.py


This creates:

models/best_model.pkl

Start FastAPI server
uvicorn app.app:app --reload


API runs at:
👉 http://127.0.0.1:8000/predict

2️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🧪 API Usage
POST /predict

Request:

{
  "LotArea": 8450,
  "OverallQual": 7,
  "OverallCond": 5,
  "YearBuilt": 2003,
  "GrLivArea": 1710,
  "BedroomAbvGr": 3,
  "FullBath": 2,
  "HalfBath": 1,
  "GarageCars": 2,
  "GarageArea": 548,
  "TotalBsmtSF": 856,
  "1stFlrSF": 856,
  "2ndFlrSF": 854,
  "WoodDeckSF": 0,
  "MasVnrArea": 196,
  "Neighborhood": "CollgCr",
  "HouseStyle": "2Story",
  "Exterior1st": "VinylSd",
  "KitchenQual": "Gd",
  "GarageType": "Attchd"
}


Response:

{
  "predicted_price": 361948.78
}

🧰 Tools Used

Python 3

FastAPI

Scikit-learn

XGBoost

Pandas

Joblib

React (Vite)

🎉 Status

✔ Backend working
✔ Frontend working
✔ ML pipeline fully automated
✔ Prediction UI complete

📌 Next Possible Upgrades (Optional)

Model deployment on Render/Verce/Netlify

Feature importance graph

Model versioning with MLflow

CSV upload for batch predictions

Complete full Kaggle submission