# Innomate AI - Chatbot AI Assistant for Frappe

Innomate AI is (one small step) a **powerful AI-driven chatbot assistant** designed for the [Frappe Framework](https://frappeframework.com). It integrates **Gemini 2.0 Flash** to provide an intelligent chatbot experience, allowing users to interact with their ERPNext system (Future Features) for insights, reports, and general queries.

---

## Features

- 🤖 **AI-Powered Chatbot** integrated within Frappe.
- 💬 **Understands user queries** and provides intelligent responses.
- 📊 **Can generate insights and reports** dynamically (Soon).
- 🔑 **Uses Gemini 2.0 Flash API** for fast and efficient AI responses.
- 🛠 **Easily configurable via ChatBot Settings** in Frappe.
- 🔐 **Secure and private**, with a warning against sharing sensitive data (Soon).

---

## Installation

1. Clone the repository into your Frappe apps directory:

    ```bash
    cd ~/frappe-bench/
    bench get_app https://github.com/kimoamer/innomateai.git
    source env/bin/activate
    pip install -r apps/innomateai/requirements.txt
    deactivate
    ```

2. Install the app into your site:

    ```bash
    cd ~/frappe-bench
    bench --site your-site-name install-app innomateai
    ```


3. Build assets (if required):

    ```bash
    bench build
    ```

4. Restart Frappe:

    ```bash
    bench restart
    ```

---

## Warning ⚠️

- **DO NOT share your Gemini API key** publicly or with untrusted sources.
- AI responses are generated based on available data and may not always be accurate.
- Users should avoid sharing **private or sensitive information** with the AI chatbot.

---

## Usage

Once installed and configured:

- The **chat assistant** will appear as a floating chat icon on your Frappe site.
- Click the chat icon to start a conversation.
- The AI assistant will process queries and generate responses using **Gemini 2.0 Flash**.
- It can provide **data insights, answer questions, and generate reports** based on user input.

---

## Configuration

1. Navigate to **ChatBot Settings** in Frappe.
2. Enable the **Innomate AI Assistant**.
3. Obtain your **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey).
4. Enter your **API key** in the settings.
5. Save the settings and start using the AI assistant.

---

## Screenshots

| AI Chat Window |
|---|
| ![Chat Window](https://i.postimg.cc/2SvGns5x/2.png) |

| Settings Page |
|---|
| ![Settings](https://i.postimg.cc/02hZMk9Q/1.png) |


---

## Compatibility

- ✔️ **Frappe v15+** (Tested on version 15)

---

## Development

To contribute or make modifications:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make the necessary updates.
4. Submit a pull request for review.

---

## License

This project is licensed under the **GNU AFFERO GENERAL PUBLIC LICENSE Version 3**.
See the [LICENSE](license.txt) file for more details.

---

## Author

Developed by **Innomate LLC**  
Website: [https://innomate-tech.com](https://innomate-tech.com)  
For support or inquiries, contact us via GitHub issues.
