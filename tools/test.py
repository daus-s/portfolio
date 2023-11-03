from email_client import EmailClient

e = EmailClient()
client = MongoClient(uri, server_api=ServerApi('1'))

pending = client['pending']['pending']
