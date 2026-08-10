// ===============================
// UltraAI - script.js
// ===============================

// ===== Elements =====

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const imageUpload = document.getElementById("imageUpload");
const videoUpload = document.getElementById("videoUpload");
const pdfUpload = document.getElementById("pdfUpload");
const languageSelect = document.getElementById("languageSelect");


// ===============================
// Add Message
// ===============================

function addMessage(text, sender) {

    if (!chat) return;

    const div = document.createElement("div");

    div.className = "message " + sender;

    div.textContent = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}


// ===============================
// Thinking
// ===============================

function showThinking() {

    if (!chat) return;

    const div = document.createElement("div");

    div.className = "message ai";

    div.id = "thinking";

    div.textContent = "🤖 Thinking...";

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}


function hideThinking() {

    const thinking = document.getElementById("thinking");

    if (thinking) {
        thinking.remove();
    }

}


// ===============================
// Ask AI
// ===============================

async function askAI(message) {

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        if (!response.ok) {

            return "❌ " +
                (data.error || "AI request failed");

        }

        if (data.error) {

            return "❌ " + data.error;

        }

        if (
            !data.choices ||
            !data.choices[0] ||
            !data.choices[0].message
        ) {

            return "❌ AI response नहीं मिली।";

        }

        return data.choices[0].message.content;

    } catch (error) {

        return "❌ " + error.message;

    }

}


// ===============================
// Send Message
// ===============================

async function sendMessage() {

    if (!input) return;

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    showThinking();

    const reply = await askAI(message);

    hideThinking();

    addMessage(reply, "ai");

    if (typeof speakText === "function") {

        speakText(reply);

    }

}


// ===============================
// Enter = Send
// ===============================

if (input) {

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

}


// ===============================
// Upload Menu
// ===============================

function toggleMenu() {

    const menu =
        document.getElementById("uploadMenu");

    if (!menu) return;

    if (menu.style.display === "flex") {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

    }

}


// ===============================
// Voice Mode
// ===============================

function startVoiceMode() {

    if (typeof startVoice === "function") {

        startVoice();

    } else {

        alert("Voice system अभी उपलब्ध नहीं है।");

    }

}


// ===============================
// Image Upload
// ===============================

if (imageUpload) {

    imageUpload.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) return;

            addMessage(
                "🖼️ Photo Selected: " + file.name,
                "user"
            );

        }
    );

}


// ===============================
// Video Upload
// ===============================

if (videoUpload) {

    videoUpload.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) return;

            addMessage(
                "🎥 Video Selected: " + file.name,
                "user"
            );

        }
    );

}


// ===============================
// PDF Upload
// ===============================

if (pdfUpload) {

    pdfUpload.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) return;

            addMessage(
                "📄 PDF Selected: " + file.name,
                "user"
            );

        }
    );

}


// ===============================
// Auto Scroll
// ===============================

if (chat) {

    const observer =
        new MutationObserver(function () {

            chat.scrollTo({

                top: chat.scrollHeight,

                behavior: "smooth"

            });

        });

    observer.observe(chat, {
        childList: true
    });

}


// ===============================
// Close Upload Menu
// ===============================

document.addEventListener("click", function (e) {

    const menu =
        document.getElementById("uploadMenu");

    const plus =
        document.getElementById("plusBtn");

    if (!menu || !plus) return;

    if (
        !menu.contains(e.target) &&
        e.target !== plus
    ) {

        menu.style.display = "none";

    }

});


// ===============================
// Language
// ===============================

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            const lang = this.value;

            if (
                typeof recognition !== "undefined"
            ) {

                recognition.lang = lang;

            }

            addMessage(
                "🌍 Language Changed",
                "ai"
            );

        }
    );

}


// ===============================
// AI PHOTO EDIT
// ===============================

async function editPhoto() {

    if (!imageUpload) {

        alert("Photo upload नहीं मिला।");

        return;

    }

    const file = imageUpload.files[0];

    if (!file) {

        alert("पहले Photo चुनें।");

        return;

    }

    const prompt = window.prompt(
        "Photo में क्या बदलना है?",
        "Background बदल दो"
    );

    if (!prompt) return;

    addMessage(
        "🖼️ AI Photo Editing शुरू...",
        "user"
    );

    try {

        const formData = new FormData();

        formData.append("image", file);

        formData.append("prompt", prompt);

        const response = await fetch(
            "/api/photo",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error ||
                "Photo editing failed"
            );

        }

        if (!data.image) {

            throw new Error(
                "Edited image नहीं मिली।"
            );

        }

        const result =
            document.createElement("img");

        result.src = data.image;

        result.style.maxWidth = "100%";

        result.style.borderRadius = "15px";

        result.style.margin = "10px 0";

        chat.appendChild(result);

        chat.scrollTop =
            chat.scrollHeight;

        addMessage(
            "✅ Photo editing पूरी हो गई।",
            "ai"
        );

    } catch (error) {

        addMessage(
            "❌ Photo Edit Error: " +
            error.message,
            "ai"
        );

    }

}


// ===============================
// PDF
// ===============================

function uploadPDF() {

    if (!pdfUpload) return;

    const file = pdfUpload.files[0];

    if (!file) {

        alert("पहले PDF चुनें।");

        return;

    }

    addMessage(
        "📄 PDF Uploaded: " + file.name,
        "user"
    );

}


// ===============================
// PREMIUM PAYMENT
// ===============================

async function buyPremium() {

    try {

        const response =
            await fetch("/api/payment", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                }

            });

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.error ||
                "Payment order नहीं बना।"
            );

        }

        if (
            typeof Razorpay === "undefined"
        ) {

            throw new Error(
                "Razorpay checkout load नहीं हुआ।"
            );

        }

        const options = {

            key: data.keyId,

            amount: data.amount,

            currency: data.currency,

            name: "UltraAI",

            description:
                "UltraAI Premium",

            order_id: data.orderId,

            handler:
                async function (payment) {

                try {

                    const verifyResponse =
                        await fetch(
                            "/api/verify-payment",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        payment
                                    )

                            }
                        );

                    const result =
                        await verifyResponse.json();

                    if (
                        verifyResponse.ok &&
                        result.success
                    ) {

                        alert(
                            "🎉 Payment सफल!\n\n" +
                            "⭐ Premium Activated"
                        );

                    } else {

                        alert(
                            "❌ Payment verification failed"
                        );

                    }

                } catch (error) {

                    alert(
                        "❌ Verification Error: " +
                        error.message
                    );

                }

            },

            theme: {
                color: "#38BDF8"
            }

        };

        const razorpay =
            new Razorpay(options);

        razorpay.open();

    } catch (error) {

        alert(
            "❌ " + error.message
        );

    }

}


// ===============================
// App Ready
// ===============================

window.addEventListener(
    "load",
    function () {

        addMessage(
            "🤖 Welcome to UltraAI!",
            "ai"
        );

    }
);
