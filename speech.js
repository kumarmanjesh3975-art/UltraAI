// ===============================
// UltraAI - speech.js
// Voice Recognition
// ===============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

// ===============================
// Start Voice
// ===============================

function startVoice() {

    if (!SpeechRecognition) {
        alert(
            "⚠️ इस browser में Voice Recognition उपलब्ध नहीं है। " +
            "Chrome में UltraAI खोलकर फिर कोशिश करें।"
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
        languageSelect
            ? languageSelect.value
            : "hi-IN";

    recognition.onstart = function () {

        isListening = true;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent =
                "🔴 सुन रहा हूँ...";
        }
    };

    recognition.onresult = function (event) {

        const transcript =
            event.results[0][0].transcript;

        const input =
            document.getElementById("userInput");

        if (input) {
            input.value = transcript;
            input.focus();
        }

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent =
                "🟢 UltraAI Ready";
        }

        isListening = false;
    };

    recognition.onerror = function (event) {

        console.error(
            "Voice Recognition Error:",
            event.error
        );

        isListening = false;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent =
                "🟢 UltraAI Ready";
        }

        if (event.error === "not-allowed") {

            alert(
                "🎤 Microphone permission बंद है। " +
                "Browser में Microphone permission Allow करें।"
            );

        } else if (event.error === "no-speech") {

            alert(
                "🎤 आवाज़ नहीं मिली। फिर से Mic दबाएँ।"
            );

        } else {

            console.log(
                "Voice error:",
                event.error
            );
        }
    };

    recognition.onend = function () {

        isListening = false;

        const status =
            document.getElementById("status");

        if (status) {
            status.textContent =
                "🟢 UltraAI Ready";
        }
    };

    try {

        recognition.start();

    } catch (error) {

        console.error(
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
        status.textContent =
            "🟢 UltraAI Ready";
    }
}


// ===============================
// Voice Mode
// ===============================

function startVoiceMode() {
    startVoice();
}


// ===============================
// Text To Speech
// ===============================

function speakText(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    if (!text) {
        return;
    }

    window.speechSynthesis.cancel();

    const languageSelect =
        document.getElementById("languageSelect");

    const lang =
        languageSelect
            ? languageSelect.value
            : "hi-IN";

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = lang;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
