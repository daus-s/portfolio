from dotenv import load_dotenv
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import database_functions as database_functions
from display import Display

mode = 'normal'

print ("CONFIRM APPOINTMENTS...")
#now talk to database


# ---------------------#
# Connection variables #
# ---------------------#

#source: https://stackoverflow.com/questions/69299529/how-to-set-environment-variables-in-a-local-env-file-using-dotenv-in-python
dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
load_dotenv(dotenv_path)
password = os.environ.get('MONGO_ATLAS_PASSWORD_U_PYTOOLS')
user = os.environ.get('MONGO_ATLAS_USERNAME_PYTHON')
display = Display()

print ("connecting to database...")
#connect to database

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


print("gathering pending appointments")
#gather database - look at this
pending = client['pending']['pending']
# to modify these
sec = client['schedule']['sec_events']
events = client['schedule']['events']

print("gathered all pending appointments")


pending_list = list(pending.find({}))

if len(pending_list) == 0:
    print ("no pending reservations")

if mode=='del':
    OK = ''
    while not OK =='delete':
        OK = input('this is a dangerous operation. type \'delete\' to confirm operation:\ntype \'cancel\' to stop operation or press ctrl C (^C)\n')
        if OK == 'cancel': 
            sys.exit()
    pending.delete_many({})
    sys.exit()
    
display.clear()

for appt in pending_list:
    display.display(appt)
    status = input("approve or deny: ")
    while status.lower() not in ["y", "n"]:
        print("please enter correct input (Y,y,N,n)")
        status = input ("approve or deny: ")
    

    if status.lower() == "n":
        #decline appointnment
        print("declining appointment")
        print(appt)
        _id = appt['_id']
        events.find_one_and_update({'_id': _id}, {'$set': {'approved': False}})
        sec.find_one_and_delete({'_id': _id})
        #Email

        #deleting reservation in calendar database   
    elif status.lower() == "y":
        #decline appointnment
        print("accepting appointment")
        print(appt)
        _id = appt['_id']
        events.find_one_and_update({'_id': _id}, {'$set': {'approved': True}})
        #Email

        #toggling approved flag in calendar database
        
    
    #remove from pending database
    print("removing from pending database")
    pending.find_one_and_delete({'_id':_id})
    display.clear()



