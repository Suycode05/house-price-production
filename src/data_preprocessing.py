import pandas as pd
from sklearn.model_selection import train_test_split
def load_data(path='data/train.csv'):
    df=pd.read_csv(path)
    return df
def preprocess(df):
    df=df.drop(columns=['MiscFeature','PoolQC','Alley','Fence'])
    num_cols=df.select_dtypes(include=['int64','float64']).columns
    df[num_cols]=df[num_cols].fillna(df[num_cols].median())
    cat_cols=df.select_dtypes(include=['object']).columns
    df[cat_cols]=df[cat_cols].fillna(df[cat_cols].mode().iloc[0])
    df=pd.get_dummies(df,drop_first=True)
    return df
def split(df):
    X=df.drop(columns=['SalePrice'],axis=1)
    y=df['SalePrice']
    return train_test_split(X,y,test_size=0.2,random_state=42)
def prepare_features(df):
    # Categorical features
    cat_features = [
        "Neighborhood", "HouseStyle", "Exterior1st",
        "KitchenQual", "GarageType"
    ]

    # Numerical features
    num_features = [
        "LotArea", "OverallQual", "OverallCond", "YearBuilt",
        "GrLivArea", "BedroomAbvGr", "FullBath", "HalfBath",
        "GarageCars", "GarageArea", "TotalBsmtSF", "1stFlrSF",
        "2ndFlrSF", "WoodDeckSF", "MasVnrArea"
    ]

    features = num_features + cat_features + ["SalePrice"]
    df = df[features]

    return df, num_features, cat_features