// ===============================
// UltraAI - script.js
// ===============================

// ===============================
// Elements
// ===============================

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

const imageUpload = document.getElementById("imageUpload");
const videoUpload = document.getElementById("videoUpload");
const pdfUpload = document.getElementById("pdfUpload");

const languageSelect =
    document.getElementById("languageSelect");


// ===============================
// Vercel Backend
// ===============================

const API_BASE =
    "https://ultra-ai-ai88.vercel.app";


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

    hideThinking();

    const div = document.createElement("div");

    div.className = "message ai";

    div.id = "thinking";

    div.textContent = "🤖 Thinking...";

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}


function hideThinking() {

    const thinking =
        document.getElementById("thinking");

    if (thinking) {

        thinking.remove();

    }

}


// ===============================
// Ask AI
// ===============================

async function askAI(message) {

    try {

        const response = await fetch(
            API_BASE + "/api/chat",
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


        // पहले text पढ़ेंगे
        const raw =
            await response.text();


        console.log(
            "UltraAI API Status:",
            response.status
        );

        console.log(
            "UltraAI API Response:",
            raw
        );


        // JSON में बदलने की कोशिश
        let data;

        try {

            data = JSON.parse(raw);

        } catch (error) {

            return (
                "❌ Server ने valid JSON नहीं भेजा।\n\n" +
                "API Status: " +
                response.status
            );

        }


        // API Error
        if (!response.ok) {

            return (
                "❌ " +
                (
                    data.error ||
                    data.message ||
                    "AI request failed"
                )
            );

        }


        // Normal OpenRouter/OpenAI response
        if (
            data.choices &&
            data.choices[0] &&
            data.choices[0].message
        ) {

            return (
                data.choices[0].message.content
            );

        }


        // Simple reply response
        if (data.reply) {

            return data.reply;

        }


        // Error returned by server
        if (data.error) {

            return "❌ " + data.error;

        }


        return "❌ AI response नहीं मिली।";


    } catch (error) {

        console.error(
            "UltraAI Connection Error:",
            error
        );

        return (
            "❌ Connection Error: " +
            error.message
        );

    }

}


// ===============================
// Send Message
// ===============================

async function sendMessage() {

    if (!input) {

        console.error(
            "userInput element नहीं मिला।"
        );

        return;

    }


    const message =
        input.value.trim();


    if (!message) return;


    // User message
    addMessage(
        message,
        "user"
    );


    // Clear input
    input.value = "";


    // Thinking
    showThinking();


    // AI request
    const reply =
        await askAI(message);


    // Remove thinking
    hideThinking();


    // AI reply
    addMessage(
        reply,
        "ai"
    );


    // Voice reply
    if (
        typeof speakText ===
        "function"
    ) {

        speakText(reply);

    }

}


// ===============================
// Make Send Function Global
// ===============================

window.sendMessage =
    sendMessage;

window.askAI =
    askAI;

window.addMessage =
    addMessage;


// ===============================
// Enter = Send
// ===============================

if (input) {

    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// ===============================
// Upload Menu
// ===============================

function toggleMenu() {

    const menu =
        document.getElementById(
            "uploadMenu"
        );

    if (!menu) return;


    if (
        menu.style.display ===
        "flex"
    ) {

        menu.style.display =
            "none";

    } else {

        menu.style.display =
            "flex";

    }

}

window.toggleMenu =
    toggleMenu;


// ===============================
// Voice Mode
// ===============================

function startVoiceMode() {

    if (
        typeof startVoice ===
        "function"
    ) {

        startVoice();

    } else {

        alert(
            "🎤 Voice system अभी उपलब्ध नहीं है।"
        );

    }

}

window.startVoiceMode =
    startVoiceMode;


// ===============================
// Photo Upload
// ===============================

if (imageUpload) {

    imageUpload.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) return;


            addMessage(
                "🖼️ Photo Selected: " +
                file.name,
                "user"
            );


            // Preview
            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const img =
                        document.createElement(
                            "img"
                        );

                    img.src =
                        event.target.result;

                    img.style.maxWidth =
                        "85%";

                    img.style.borderRadius =
                        "15px";

                    img.style.margin =
                        "10px 0";

                    chat.appendChild(
                        img
                    );

                    chat.scrollTop =
                        chat.scrollHeight;

                };


            reader.readAsDataURL(file);

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

            const file =
                this.files[0];

            if (!file) return;


            addMessage(
                "🎥 Video Selected: " +
                file.name,
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

            const file =
                this.files[0];

            if (!file) return;


            addMessage(
                "📄 PDF Selected: " +
                file.name,
                "user"
            );

        }
    );

}


// ===============================
// Upload PDF
// ===============================

function uploadPDF() {

    if (!pdfUpload) return;


    const file =
        pdfUpload.files[0];


    if (!file) {

        alert(
            "पहले PDF चुनें।"
        );

        return;

    }


    addMessage(
        "📄 PDF Uploaded: " +
        file.name,
        "user"
    );

}

window.uploadPDF =
    uploadPDF;


// ===============================
// AI Photo Edit
// ===============================

async function editPhoto() {

    if (!imageUpload) {

        alert(
            "Photo upload नहीं मिला।"
        );

        return;

    }


    const file =
        imageUpload.files[0];


    if (!file) {

        alert(
            "पहले Photo चुनें।"
        );

        return;

    }


    const prompt =
        window.prompt(
            "Photo में क्या बदलना है?",
            "Background बदल दो"
        );


    if (!prompt) return;


    addMessage(
        "🖼️ AI Photo Editing शुरू...",
        "user"
    );


    try {

        const formData =
            new FormData();


        formData.append(
            "image",
            file
        );

        formData.append(
            "prompt",
            prompt
        );


        const response =
            await fetch(
                API_BASE +
                "/api/photo",
                {
                    method: "POST",
                    body: formData
                }
            );


        const raw =
            await response.text();


        let data;


        try {

            data =
                JSON.parse(raw);

        } catch {

            throw new Error(
                "Photo API ने valid JSON नहीं भेजा।"
            );

        }


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
            document.createElement(
                "img"
            );


        result.src =
            data.image;


        result.style.maxWidth =
            "100%";

        result.style.borderRadius =
            "15px";

        result.style.margin =
            "10px 0";


        chat.appendChild(
            result
        );


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

window.editPhoto =
    editPhoto;


// ===============================
// Language
// ===============================

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            const lang =
                this.value;


            if (
                typeof recognition !==
                "undefined"
            ) {

                recognition.lang =
                    lang;

            }


            addMessage(
                "🌍 Language Changed",
                "ai"
            );

        }
    );

}


// ===============================
// Premium Payment
// ===============================

async function buyPremium() {

    try {

        const response =
            await fetch(
                API_BASE +
                "/api/payment",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const raw =
            await response.text();


        let data;


        try {

            data =
                JSON.parse(raw);

        } catch {

            throw new Error(
                "Payment API ने valid JSON नहीं भेजा।"
            );

        }


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Payment order नहीं बना।"
            );

        }


        if (
            typeof Razorpay ===
            "undefined"
        ) {

            throw new Error(
                "Razorpay checkout load नहीं हुआ।"
            );

        }


        const options = {

            key:
                data.keyId,

            amount:
                data.amount,

            currency:
                data.currency,

            name:
                "UltraAI",

            description:
                "UltraAI Premium",

            order_id:
                data.orderId,


            handler:
                async function (
                    payment
                ) {

                    try {

                        const verifyResponse =
                            await fetch(
                                API_BASE +
                                "/api/verify-payment",
                                {

                                    method:
                                        "POST",

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


                        const verifyRaw =
                            await verifyResponse.text();


                        let result;


                        try {

                            result =
                                JSON.parse(
                                    verifyRaw
                                );

                        } catch {

                            throw new Error(
                                "Verification API ने valid JSON नहीं भेजा।"
                            );

                        }


                        if (
                            verifyResponse.ok &&
                            result.success
                        ) {

                            alert(
                                "🎉 Payment सफल!\n\n" +
                                "⭐ UltraAI Premium Activated"
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
                color:
                    "#38BDF8"
            }

        };


        const razorpay =
            new Razorpay(
                options
            );


        razorpay.open();


    } catch (error) {

        alert(
            "❌ " +
            error.message
        );

    }

}

window.buyPremium =
    buyPremium;


// ===============================
// Auto Scroll
// ===============================

if (chat) {

    const observer =
        new MutationObserver(
            function () {

                chat.scrollTo({

                    top:
                        chat.scrollHeight,

                    behavior:
                        "smooth"

                });

            }
        );


    observer.observe(
        chat,
        {
            childList: true
        }
    );

}


// ===============================
// Close Upload Menu
// ===============================

document.addEventListener(
    "click",
    function (event) {

        const menu =
            document.getElementById(
                "uploadMenu"
            );

        const plus =
            document.getElementById(
                "plusBtn"
            );


        if (!menu || !plus)
            return;


        if (
            !menu.contains(
                event.target
            ) &&
            event.target !== plus
        ) {

            menu.style.display =
                "none";

        }

    }
);


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
