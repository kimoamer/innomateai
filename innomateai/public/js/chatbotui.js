
frappe.after_ajax(function () {
    // This ensures the chatbot gets injected after Frappe loads dynamic content
    createChat();
});

function createChat() {
    let chatFooter = `<footer>
            <button class="chatbot-toggler">
                <span class="material-symbols-rounded">forum</span>
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="chatbot">
                <div class="chat-header">
                    <div class="logo-container">
                        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">
                            <g>
                                <path fill="#388ECC" d="M250.01,422.44L250.01,422.44c-29.05,0-52.61-23.55-52.61-52.61V130.17c0-29.05,23.55-52.61,52.61-52.61h0
                                    c29.05,0,52.61,23.55,52.61,52.61v239.66C302.62,398.88,279.07,422.44,250.01,422.44z"/>
                                <path fill="#67A8DC" d="M139.36,130.19v8.79c0,28.98-23.6,52.58-52.58,52.58c-29.14,0-52.74-23.6-52.74-52.58v-8.79
                                    c0-29.14,23.6-52.58,52.74-52.58c14.49,0,27.67,5.86,37.12,15.3C133.5,102.51,139.36,115.54,139.36,130.19z"/>
                                <path fill="#67A8DC" d="M139.36,269.52v107.41c0,25.2-23.6,45.47-52.58,45.47c-29.14,0-52.74-20.27-52.74-45.47V269.52
                                    c0-25.2,23.6-45.47,52.74-45.47c14.49,0,27.67,5.07,37.12,13.23C133.5,245.59,139.36,256.85,139.36,269.52z"/>
                                <path fill="#388ECC" d="M413.36,422.44L413.36,422.44c-29.05,0-52.61-23.55-52.61-52.61V130.17c0-29.05,23.55-52.61,52.61-52.61h0
                                    c29.05,0,52.61,23.55,52.61,52.61v239.66C465.97,398.88,442.41,422.44,413.36,422.44z"/>
                            </g>
                        </svg>
                        <h2>Innomate AI</h2>
                    </div>
                    <span class="expand-btn material-symbols-outlined">open_in_full</span>
                    <span class="close-btn material-symbols-outlined">close</span>
                </div>
                <ul class="chatbox">
                    <li class="chat incoming">
                        <span class="material-symbols-outlined">smart_toy</span>
                        <p id="user-greeting">Hi there 👋<br>How can I help you today?</p>
                    </li>
                </ul>
                <div class="chat-input">
                    <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
                    <span id="send-btn" class="material-symbols-rounded">send</span>
                </div>
            </div>
        </footer>`;
    $("footer").replaceWith(
        frappe.render_template(chatFooter)
    )

    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const expandBtn = document.querySelector(".expand-btn");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatbot = document.querySelector(".chatbot");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    let chatHistory = [];

    let userMessage = null;
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").innerHTML = message;
        chatLi.querySelector("p").classList.add("dots-loader");
        return chatLi;
    }

    function formatCodeBlocks(input) {
        // Regex to match triple backticks and optional language
        const regex = /```(\w+)?\n([\s\S]*?)```/g;
      
        // Replace matched code blocks with formatted HTML
        const formattedText = input.replace(regex, (match, language, code) => {
          // Default to "text" if no language is specified
          const lang = language || "text";
          return `<pre class="code-block" data-language="${lang}"><code class="language-${lang}">${code.trim()}</code></pre>`;
        });
      
        return formattedText;
      }

    const handleChat = () => {
        chatInput.disabled = true;
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("<i></i><i></i><i></i> ", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        let message = {
            role: "user",
            content: userMessage
        }
        chatHistory.push(message)
        frappe.call({
            method: "innomateai.controllers.ai_controllers.chat_reponse",
            args: {
                question: userMessage,
                chat: chatHistory
            },
            callback: function (r) {
                console.log(r)
                let res = r.message;
                let answer = res.assistant
                const messageElement = incomingChatLi.querySelector("p");
                messageElement.classList.remove("dots-loader")
                messageElement.innerHTML = formatCodeBlocks(answer);

                chatbox.scrollTo(0, chatbox.scrollHeight);
                chatHistory.push({role: "Assistant", content: answer})
                chatInput.disabled = false;
            },
        })
    }

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    expandBtn.addEventListener("click", () => {
        if (expandBtn.textContent.trim() === 'open_in_full') {
            expandBtn.textContent = 'close_fullscreen';
            chatbot.classList.toggle("expand_chat");
        } else {
            expandBtn.textContent = 'open_in_full';
            chatbot.classList.toggle("expand_chat");
        }
    });
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"))
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
        document.getElementById("user-greeting").innerHTML = `Hi ${frappe.session.user_fullname} 👋<br>How can I help you today?`;
    });

}