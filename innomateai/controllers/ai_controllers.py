from .ai_assistant import AiAssistant
import frappe
import json

@frappe.whitelist()
def chat_reponse(question, chat):
    assistant = AiAssistant()
    enabled = frappe.db.get_single_value("ChatBot Settings", "enabled")
    if enabled:
        answer = assistant.generate_response(question, chat)
        try:
            json_answer = json.loads(answer)
            return {"assistant": json_answer.get("message")}
        except:
            return {"assistant": answer}
    else:
        return {"assistant": "Please, Enable ChatBot Settings."}