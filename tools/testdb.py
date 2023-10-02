from dotenv import load_dotenv
import sys 
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
load_dotenv(dotenv_path)
password = os.environ.get('MONGO_ATLAS_PASSWORD_U_PYTOOLS')
user = os.environ.get('MONGO_ATLAS_USERNAME_PYTHON')
name = os.environ.get('NAME')
email = os.environ.get('EMAIL')

uri = f'mongodb+srv://{user}:{password}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority'
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)