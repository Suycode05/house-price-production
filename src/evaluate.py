import joblib
from data_preprocessing import preprocess, load_data

df=load_data()
df=preprocess(df)

model=joblib.load('models/best_model.pkl')
sample=df.drop('SalePrice',axis=1).iloc[0]
# print(f'Sample Input Features:\n{sample}')
prediction=model.predict([sample])
print(f'Predicted Sale Price: {prediction[0]}')