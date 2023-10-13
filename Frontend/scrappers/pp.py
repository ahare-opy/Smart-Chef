import pandas as pd
from pymongo import MongoClient
import traceback

#Step 1: Load Excel Data
excel_file = "Final_Recipe_Dataset.xlsx"
df = pd.read_excel(excel_file)

#Step 2: Connect to MongoDB
client = MongoClient('mongodb+srv://tanviropy:tanviropy@cluster0.lftvw.mongodb.net/?retryWrites=true&w=majority')  # Replace with your MongoDB connection string
db = client['BD-Cuisine']  # Replace with your database name
collection_name = 'Res'  # Replace with your collection name
collection = db[collection_name]

#Step 3: Convert DataFrame to a list of dictionaries (each row becomes a document)
data_dict = df.to_dict(orient='records')

try:
    collection.insert_many(data_dict)
    print("MongoDB Connected")

except:
       print("Connection Error")

client.close()
