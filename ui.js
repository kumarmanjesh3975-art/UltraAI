// ===============================
// UltraAI UI System
// ===============================

const voiceBtn = document.getElementById("voiceCircle");

// Voice Button Animation
function startVoiceAnimation() {
    if (voiceBtn) {
        voiceBtn.classList.add("listening");
    }
}

function stopVoiceAnimation() {
    if (voiceBtn) {
        voiceBtn.classList.remove("listening");
    }
}

// Status Message
function showStatus(text) {

    let status = document.getElementById("status");

    if (!status) {
        status = document.createElement("div");
        status.id = "status";
        status.style.textAlign = "center";
        status.style.color = "#ffffff";
        status.style.padding = "10px";
        document.body.insertBefore(status, document.getElementById("chat"));
    }

    status.textContent = text;
}

function clearStatus() {
    const status = document.getElementById("status");
    if (status) {
        status.textContent = "";
    }
}

// Voice Mode
function startVoiceMode() {

    showStatus("🎤 Listening...");
    startVoiceAnimation();

    if (typeof startListening === "function") {
        startListening();
    }

}

function stopVoiceMode() {

    stopVoiceAnimation();
    clearStatus();

}

// Loading
function showThinking() {
    showStatus("🤖 Thinking...");
}

function hideThinking() {
    clearStatus();
}
