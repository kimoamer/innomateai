from google import genai
import frappe
from frappe.utils import today
from pydantic import BaseModel

class Response(BaseModel):
    message: str

class AiAssistant:
    def __init__(self):
        apiKey = frappe.db.get_single_value("ChatBot Settings","gemini_api_key")
        self.client = genai.Client(api_key=apiKey)

    def generate_response(self, prompt, chat_history):
        try:
            content = f''' You are a chat assistant on erpnext system server, Today is {today()} and User ask : {prompt},
                chat history is: { chat_history}.
                You don't have access to data.
                give the answer in details.
                '''
            response = self.client.models.generate_content(
                model="gemini-2.0-flash", contents=content,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': Response,
                },
            )
            return response.text
        except Exception as e:
            return str(e)