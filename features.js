// ===============================
// UltraAI - features.js
// ===============================

console.log("UltraAI Features Loaded");

// ===== Status =====
function setStatus(text) {
    const status = document.getElementById("status");
    if (status) {
        status.innerText = text;
    }
}

// ===== Voice Mode =====
function startVoiceMode() {

    setStatus("🎤 Listening...");

    if (typeof startListening === "function") {
        startListening();
    }

}

// ===== Premium =====
function buyPremium() {

    alert("🚀 UltraAI Premium जल्द उपलब्ध होगा!");

}

// ===== Photo Editor =====
function editPhoto() {

    const file = document.getElementById("imageUpload");

    if (!file) {
        alert("Photo upload option नहीं मिला।");
        return;
    }

    if (file.files.length === 0) {
        alert("पहले कोई फोटो चुनें।");
        return;
    }

    alert("🖼️ Photo चुनी गई। AI Editing फीचर जल्द जोड़ा जाएगा।");

}

// ===== Clear Chat =====
function clearChat() {

    const chat = document.getElementById("chat");

    if (chat) {
        chat.innerHTML = "";
    }

    localStorage.removeItem("ultraai_chat");

    setStatus("🗑️ Chat Cleared");

}

// ===== Welcome =====
window.addEventListener("load", function () {

    setStatus("🟢 UltraAI Ready");

});
