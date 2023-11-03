from pymongo import MongoClient
from email_client import EmailClient

e = EmailClient()

e.send_approval('carmichael@chapman.edu', '11/9/2023', '11:11pm', 'DAT WAY')