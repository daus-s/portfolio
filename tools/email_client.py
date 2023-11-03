import os
from dotenv import load_dotenv
from email.mime.text import MIMEText
import smtplib


class EmailClient:
    SENDER = 'DEFAULT'
    PASSWORD = 'DEFAULT'
    APPROVED_HTML_FILE = './emails/approved_email.html'
    DENIED_HTML_FILE = './emails/denied_email.html'

    def __init__(self):
        dotenv_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', '.env')) #travels up a level to find the .env
        load_dotenv(dotenv_path)
        self.SENDER = os.environ.get('GMAIL_USERNAME')
        self.PASSWORD = os.environ.get('GMAIL_APP_PASSWORD')
        pass

    def send_approval(self, recipient, date, time, location):
        body = EmailClient.read_html(self.APPROVED_HTML_FILE) #read file from html as text
        body = body.replace('[APPOINTMENT_DATE]', date)        
        body = body.replace('[APPOINTMENT_TIME]', time)
        body = body.replace('[APPOINTMENT_LOCATION]', location)
        html_message = MIMEText(body, 'html')
        html_message['Subject'] = 'Appointment Confirmation'
        html_message['From'] = self.SENDER
        html_message['To'] = recipient
        self.send(html_message, recipient)

    def send_deny(self, recipient, reason_int, reason=''):
        body = EmailClient.read_html(self.DENIED_HTML_FILE) #read file from html as text
        if reason_int == 5:
            body = body.replace('[REASON]', '<br/>' + reason)
        else:
            body = body.replace('[REASON]', EmailClient.reason(int(reason_int)))

        html_message = MIMEText(body, 'html')
        html_message['Subject'] = 'Appointment Declined'
        html_message['From'] = self.SENDER
        html_message['To'] = recipient
        self.send(html_message, recipient)        
        

    def send(self, html, recipient):
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(self.SENDER, self.PASSWORD)
            server.sendmail(self.SENDER, recipient, html.as_string())
            server.quit()

    def read_html(filename):
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    
    def reason(i):
        if i == 1:
            return '<br/>Unfortunately, I will not be able to make this time slot at the given location. If another location could work or another time works for you please reply to this email.'    
        if i == 2:
            return '<br/>This material or subject is not currently covered by me. I would be happy to help you find resources and will send a follow up email with any I can find. '
        if i == 3:
            return '<br/>I will not be able to make this tutoring session due to a scheduling conflict. '
        if i == 4:
            return '<br/>I\'m sorry, I won\'t be able to make this appointment. ' 
