import joblib
from xgboost import XGBRegressor
from sklearn.metrics import root_mean_squared_error
from data_preprocessing import load_data, preprocess, split,prepare_features
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

def train():
    df = load_data()
    df, num_features, cat_features = prepare_features(df)

    X = df.drop("SalePrice", axis=1)
    y = df["SalePrice"]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", "passthrough", num_features),
            ("cat", OneHotEncoder(handle_unknown="ignore"), cat_features),
        ]
    )

    model = Pipeline(steps=[
        ("preprocess", preprocessor),
        ("regressor", XGBRegressor(
            n_estimators=500,
            max_depth=4,
            learning_rate=0.05
        ))
    ])

    print("Training model...")
    model.fit(X, y)
    print("Training done.")

    joblib.dump(model, "models/best_model.pkl")
    print("Pipeline saved at models/best_model.pkl")

if __name__ == "__main__":
    train()