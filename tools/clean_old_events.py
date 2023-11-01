from dotenv import load_dotenv
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import database_functions as database_functions
import json
import datetime


print("CLEANING OLD EVENTS....")


#source: https://stackoverflow.com/questions/69299529/how-to-set-environment-variables-in-a-local-env-file-using-dotenv-in-python
dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
load_dotenv(dotenv_path)
password = os.environ.get('MONGO_ATLAS_PASSWORD_U_PYTOOLS')
user = os.environ.get('MONGO_ATLAS_USERNAME_PYTHON')


uri = "mongodb+srv://{}:{}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority".format(user, password)
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to database...")
except Exception as e:
    print(e)
    sys.exit(1)


events_table = client['schedule']['events']
secure_table = client['schedule']['sec_events']

today = datetime.datetime.utcnow()
midnight_today = today.replace(hour=0, minute=0, second=0, microsecond=0) # Returns a copy

query = {
    "$or": [
        {"start": {"$lt": midnight_today}},
        {"end": {"$lt": midnight_today}}
    ]
}

initial_events = events_table.count_documents({})
initial_secure = secure_table.count_documents({})

results = events_table.delete_many(query)
results = secure_table.delete_many(query)


final_events = events_table.count_documents({})
final_secure = secure_table.count_documents({})

print(f'deleted {initial_events-final_events} events starting or ending before {midnight_today} from events table')
print(f'deleted {initial_secure-final_secure} events starting or ending before {midnight_today} from sec_events table')
