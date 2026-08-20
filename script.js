async function askAI(message) {

    try {

        const response = await fetch(
            "https://ultra-ai-ai88.vercel.app/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        // पहले text लो, सीधे json() मत करो
        const raw = await response.text();

        console.log("API Status:", response.status);
        console.log("API Response:", raw);

        let data;

        try {
            data = JSON.parse(raw);
        } catch (e) {
            return "❌ API ने JSON की जगह HTML/text भेजा। API route check करना होगा।";
        }

        if (!response.ok) {
            return "❌ " + (data.error || "AI request failed");
        }

        if (data.error) {
            return "❌ " + data.error;
        }

        if (
            data.choices &&
            data.choices[0] &&
            data.choices[0].message
        ) {
            return data.choices[0].message.content;
        }

        // अगर तुम्हारी API सीधे {reply:"..."} देती है
        if (data.reply) {
            return data.reply;
        }

        return "❌ AI response नहीं मिली।";

    } catch (error) {

        return "❌ Connection Error: " + error.message;

    }
}
