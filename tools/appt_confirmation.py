from dotenv import load_dotenv
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import database_functions as database_functions


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
#gather database
pending = client['pending']['pending']
print("gathered all pending appointments")


pending = list(pending.find({}))

if len(pending) == 0:
    print ("no pending reservations")

for appt in pending:
    status = input ("approve or deny: ")
    while status.lower() not in ["y", "n"]:
        print("please enter correct input (Y,y,N,n)")
        status = input ("approve or deny: ")


    current = pending[0]
    del pending[0]

    if status.lower() == "n":
        #decline appointnment
        print("declining appointment")
        print(current)
        #deleting reservation in calendar database
        
    if status.lower() == "y":
        #decline appointnment
        print("accepting appointment")
        print(current)
        #toggling approved flag in calendar database
        

    #remove from pending database
    print("removing from pending database")