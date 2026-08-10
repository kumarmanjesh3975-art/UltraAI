// ===============================
// UltraAI - script.js Part 1
// ===============================

// Elements
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

// Add Message
function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = "message " + sender;

    div.textContent = text;

    chat.appendChild(div);

    // Auto Scroll
    chat.scrollTop = chat.scrollHeight;
}

// Thinking Message
function showThinking(){

    const div = document.createElement("div");

    div.className = "message ai";

    div.id = "thinking";

    div.textContent = "🤖 Thinking...";

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

function hideThinking(){

    const t = document.getElementById("thinking");

    if(t) t.remove();
}

// Ask AI
async function askAI(message){

    try{

        const response = await fetch("/api/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:message
            })

        });

        const data = await response.json();

        if(data.error){

            return "❌ " + data.error;

        }

        return data.choices[0].message.content;

    }catch(err){

        return "❌ " + err.message;

    }

}

// Send Message
async function sendMessage(){

    const message=input.value.trim();

    if(!message) return;

    addMessage(message,"user");

    input.value="";

    showThinking();

    const reply=await askAI(message);

    hideThinking();

    addMessage(reply,"ai");

    if(typeof speakText==="function"){
        speakText(reply);
    }

}

// Enter Key
input.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});

// Upload Menu
function toggleMenu(){

    const menu=document.getElementById("uploadMenu");

    if(menu.style.display==="flex"){

        menu.style.display="none";

    }else{

        menu.style.display="flex";

    }

}// ===============================
// UltraAI - script.js Part 2
// ===============================

// Voice Mode
function startVoiceMode() {

    if (typeof startVoice === "function") {
        startVoice();
    }

}

// Image Upload
document.getElementById("imageUpload").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    addMessage("🖼️ Photo Selected: " + file.name, "user");

});

// Video Upload
document.getElementById("videoUpload").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    addMessage("🎥 Video Selected: " + file.name, "user");

});

// PDF Upload
document.getElementById("pdfUpload").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    addMessage("📄 PDF Selected: " + file.name, "user");

});

// Auto Scroll
const observer = new MutationObserver(() => {

    chat.scrollTo({

        top: chat.scrollHeight,

        behavior: "smooth"

    });

});

observer.observe(chat, {

    childList: true

});

// Close Upload Menu
document.addEventListener("click", function (e) {

    const menu = document.getElementById("uploadMenu");
    const plus = document.getElementById("plusBtn");

    if (!menu.contains(e.target) && e.target !== plus) {
        menu.style.display = "none";
    }

});// ===============================
// UltraAI - script.js Part 3
// ===============================

// Change Language
const languageSelect = document.getElementById("languageSelect");

if (languageSelect) {

    languageSelect.addEventListener("change", () => {

        const lang = languageSelect.value;

        if (typeof recognition !== "undefined") {
            recognition.lang = lang;
        }

        addMessage("🌍 Language Changed", "ai");

    });

}

// Photo Edit
async function editPhoto() {

    const file = document.getElementById("imageUpload").files[0];

    if (!file) {
        alert("पहले Photo चुनें");
        return;
    }

    addMessage("🖼️ Photo Uploading...", "user");

    // यहाँ बाद में api/photo से जोड़ेंगे
    setTimeout(() => {

        addMessage("✅ Photo Ready For AI Edit", "ai");

    }, 1500);

}

// PDF Upload
function uploadPDF() {

    const file = document.getElementById("pdfUpload").files[0];

    if (!file) {

        alert("पहले PDF चुनें");

        return;

    }

    addMessage("📄 PDF Uploaded : " + file.name, "user");

}

// Premium
function buyPremium() {
    alert("⭐ UltraAI Premium...");
}

    alert("⭐ Premium Coming Soon");

}

// App Ready
window.onload = function () {

    addMessage("🤖 Welcome to UltraAI!", "ai");

};
function buyPremium(){

    alert(
        "⭐ UltraAI Premium\n\n" +
        "Premium system जल्द activate होगा."
    );

}
