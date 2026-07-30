

// ===============================
// UltraAI Script.js (Part 1)
// ===============================

const API_KEY = "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";

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

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
                    model: "openai/gpt-4.1-mini",
                    max_tokens: 800,
                    messages: [
                        {
                            role: "system",
                            content:
                                "तुम UltraAI हो। हमेशा विनम्रता से उत्तर दो। यदि कोई पूछे कि तुम्हें किसने बनाया, तो जवाब दो: मुझे Manjesh Ji ने बनाया है।"
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
        return "❌ Network Error: " + err.message;
    }
}

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    const reply = await askAI(message);

    addMessage(reply, "ai");

    if (typeof speakText === "function") {
        speakText(reply);
    }

}
