

// ===============================
// UltraAI - script.js (Part 1)
// ===============================

// ===== API =====
const API_KEY = 
    "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";

const MODEL = "openai/gpt-4.1-mini";

// ===== Elements =====
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

// ===== Add Message =====
function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = "message " + sender;

    div.innerHTML = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

// ===== Thinking =====
function showThinking() {

    const div = document.createElement("div");

    div.className = "message ai";

    div.id = "thinking";

    div.innerHTML = "🤖 Thinking...";

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

function hideThinking() {

    const thinking = document.getElementById("thinking");

    if (thinking) {

        thinking.remove();

    }

}

// ===== Ask AI =====
async function askAI(message) {

    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Authorization": `Bearer ${API_KEY}`,

                    "Content-Type": "application/json",

                    "HTTP-Referer": "https://kumarmanjesh3975-art.github.io/UltraAI/",

                    "X-Title": "UltraAI"

                },

                body: JSON.stringify({

                    model: MODEL,

                    max_tokens: 1000,

                    messages: [

                        {

                            role: "system",

                            content:
                                "तुम UltraAI हो। अगर कोई पूछे तुम्हें किसने बनाया, तो जवाब दो: मुझे Manjesh Ji ने बनाया है।"

                        },

                        {

                            role: "user",

                            content: message

                        }

                    ]

                })

            }

        );

        const data = await response.json();

        if (data.error) {

            return "❌ " + data.error.message;

        }

        return data.choices[0].message.content;

    } catch (err) {

        return "❌ Error: " + err.message;

    }

}
// ===== Send Message =====
async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    showThinking();

    const reply = await askAI(message);

    hideThinking();

    addMessage(reply, "ai");

    // AI बोले
    if (typeof speakText === "function") {
        speakText(reply);
    }
}

// Enter दबाने पर Send
input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});
