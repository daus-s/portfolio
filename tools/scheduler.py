from dotenv import load_dotenv
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import database_functions as database_functions
from dateutil.parser import parse

print ("CREATE SCHEDULE...")

print ("connecting to database...")
#connect to database

dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
load_dotenv(dotenv_path)
password = os.environ.get('MONGO_ATLAS_PASSWORD_U_PYTOOLS')
user = os.environ.get('MONGO_ATLAS_USERNAME_PYTHON')
name = os.environ.get('NAME')
email = os.environ.get('EMAIL')

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


db = client['schedule']['events']

user = input("enter new schedule event or enter \'EXIT\' to quit:")

while user != 'EXIT':
    json = {}
    #COURSE
    user = input("enter new event title (field -> course): ")
    json.update({"course" : user})
    #DESC
    user = input("enter new event title (field -> desc): ")
    json.update({"desc" : user})
    #EMAIL
    json.update({"email" : email})
    #NAME
    json.update({"name" : name })
    #START
    good = False
    while not good: 
        start = input("enter start time and date (MM-DD-YYYY HH:MM): ")
        user = start
        try:
            parse(start)
            good=True
        except:
            good=False
            print("An exception occurred")
    #END
    good=False
    while not good: 
        end = input("enter end time and date (MM-DD-YYYY HH:MM): ")
        user = end
        try:
            parse(end)
            good=True
        except:
            good=False
            print("An exception occurred")
    
    #flip if time order is wrong
    if start > end:
        t = start
        start = end
        end = t

    json.update({"start" : parse(start)})
    json.update({"end" : parse(end)})
    
    json.update({"approved" : True})

    print("+++++++++++++++++++++++") 
    print (json)    
    print("+++++++++++++++++++++++") 

    user = input("submit? (Y/N)")

    while user.upper() not in ["Y", "N"]:
        user = input("submit? (Y/N)")

    if user.upper() == "Y":
        db.insert_one(json)

    if user.upper() == "N":
        json = {}




