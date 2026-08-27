// ===============================
// UltraAI - speech.js
// Voice Recognition + Voice Reply
// ===============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

// ===============================
// Browser Support
// ===============================

function isVoiceSupported() {
    return !!SpeechRecognition;
}

// ===============================
// Start Voice
// ===============================

function startVoice() {

    if (!isVoiceSupported()) {
        alert(
            "🎤 Voice Recognition इस browser में supported नहीं है।\n\n" +
            "Chrome browser में UltraAI खोलकर फिर कोशिश करें।"
        );
        return;
    }

    if (isListening) {
        stopVoice();
        return;
    }

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    const languageSelect =
        document.getElementById("languageSelect");

    recognition.lang =
        languageSelect?.value || "hi-IN";

    recognition.onstart = function () {

        isListening = true;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent = "🔴 Listening...";
        }
    };

    recognition.onresult = function (event) {

        const transcript =
            event.results[0][0].transcript;

        const input =
            document.getElementById("userInput");

        if (input) {
            input.value = transcript;
        }

        // Voice से बोलने के बाद automatically send
        if (typeof sendMessage === "function") {
            setTimeout(() => {
                sendMessage();
            }, 300);
        }
    };

    recognition.onerror = function (event) {

        console.log(
            "Voice Recognition Error:",
            event.error
        );

        isListening = false;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent = "🟢 UltraAI Ready";
        }

        if (event.error === "not-allowed") {
            alert(
                "🎤 Microphone permission बंद है।\n\n" +
                "Browser settings में Microphone permission Allow करें।"
            );
        }
    };

    recognition.onend = function () {

        isListening = false;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent = "🟢 UltraAI Ready";
        }
    };

    try {
        recognition.start();
    } catch (error) {

        console.log(
            "Voice Start Error:",
            error
        );

        isListening = false;
    }
}

// ===============================
// Stop Voice
// ===============================

function stopVoice() {

    if (recognition) {
        try {
            recognition.stop();
        } catch (error) {
            console.log(error);
        }
    }

    isListening = false;

    const status =
        document.getElementById("status");

    if (status) {
        status.textContent = "🟢 UltraAI Ready";
    }
}

// ===============================
// Change Language
// ===============================

function changeVoiceLanguage(lang) {

    if (recognition && isListening) {
        recognition.lang = lang;
    }
}

// ===============================
// Text To Speech
// ===============================

function speakText(text) {

    if (!("speechSynthesis" in window)) {
        console.log(
            "Text to Speech supported नहीं है।"
        );
        return;
    }

    if (!text) return;

    // पहले चल रही आवाज बंद करो
    window.speechSynthesis.cancel();

    const languageSelect =
        document.getElementById("languageSelect");

    const lang =
        languageSelect?.value || "hi-IN";

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = lang;
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

// ===============================
// Export
// ===============================

window.startVoice = startVoice;
window.stopVoice = stopVoice;
window.speakText = speakText;
window.changeVoiceLanguage =
    changeVoiceLanguage;
