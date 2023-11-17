from dotenv import load_dotenv
import sys 
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from datetime import timedelta


dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
load_dotenv(dotenv_path)
password = os.environ.get('MONGO_ATLAS_PASSWORD_U_PYTOOLS')
user = os.environ.get('MONGO_ATLAS_USERNAME_PYTHON')
name = os.environ.get('NAME')
email = os.environ.get('EMAIL')

uri = f'mongodb+srv://{user}:{password}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

    today = datetime.utcnow()  # Assuming today is in UTC
    lastday = today + timedelta(days=14)
    db = client['schedule']
    collection = db['events']
    result = collection.find()

    inserts = []
    for document in result:
        subset = {
            '_id' : document['_id'],
            'start': document['start'],
            'end': document['end'],
        }
        inserts.append(subset)

    db['sec_events'].insert_many(inserts)


except Exception as e:
    print(e)