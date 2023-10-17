from dotenv import load_dotenv
import sys 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import database_functions as database_functions

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
    


for appt in pending_list:
    status = input("approve or deny: ")
    while status.lower() not in ["y", "n"]:
        print("please enter correct input (Y,y,N,n)")
        status = input ("approve or deny: ")


    current = pending_list[0]
    del pending_list[0]

    if status.lower() == "n":
        #decline appointnment
        print("declining appointment")
        print(current)
        _id = current['_id']

        #deleting reservation in calendar database
        
    if status.lower() == "y":
        #decline appointnment
        print("accepting appointment")
        print(current)
        _id = current['_id']


        #toggling approved flag in calendar database
        

    #remove from pending database
    print("removing from pending database")






    
def display(json):
    # Create a string with a set width of 100 characters
    output = '#' * 128 + '\n'
    output += '# KEY' + (27*' ') + '# VALUE' + (88*' ') + '#\n'
    output += '#' * 128 + '\n'

    # Loop through the JSON fields and format them
    for key, value in json.items():
        output += '#' + (31 * ' ') + '#' + (94*' ') + '#\n'
        k = str(key) + 32*' '
        v = str(value) + 96*' '+'#'
        value_str = str(value)
        l = len(value_str)
        count = 0
        lines = []
        line = ''
        i = 0
        while i < l:
            if len(value_str) > 93 + i:
                line = value_str[i:i+93]
                i += 93
                count+=1
            else: 
                line = value_str[i:]
                x =(93-len(line))*' '
                line += x
                lines.append(line)
                count += 1
                break
            lines.append(line)
        for i in range(count):
            if i == 0:
                output += '# ' + k[0:30] + '# ' + v[0:93] + '#\n'
            else:
                output += '# ' + (' '*30) + '# ' + lines[i] + ' #\n'


    # Add the closing outline
    output += '#' * 128 + '\n'

    # Print the formatted JSON
    sys.stdout.write(output)
    sys.stdout.flush()
    return count