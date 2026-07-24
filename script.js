const API_KEY = "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";

async function askAI(message) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "तुम UltraAI हो। अगर कोई पूछे 'तुम्हें किसने बनाया?' तो जवाब दो: 'मुझे Manjesh Ji ने बनाया है।'"
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return "Error: " + data.error.message;
    }

    return data.choices[0].message.content;

  } catch (err) {
    return "Error: " + err.message;
  }
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");

  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<div class="message"><b>आप:</b> ${message}</div>`;
  input.value = "";

  const reply = await askAI(message);

  chat.innerHTML += `<div class="message"><b>UltraAI:</b> ${reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
