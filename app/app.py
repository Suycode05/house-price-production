from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model=joblib.load('models/best_model.pkl')

@app.post('/predict')
def predict(features: dict):
    df=pd.DataFrame([features])
    prediction=model.predict(df)[0]
    return {"predicted_price": float(prediction)}
