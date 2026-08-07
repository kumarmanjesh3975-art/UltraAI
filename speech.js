// ===============================
// UltraAI - speech.js
// ===============================

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "hi-IN";

    function startVoice() {

        recognition.start();

        document
        .getElementById("voiceCircle")
        .classList.add("listening");

    }

    recognition.onresult = function(event){

        const text =
        event.results[0][0].transcript;

        document
        .getElementById("userInput")
        .value = text;

        sendMessage();

    };

    recognition.onend = function(){

        document
        .getElementById("voiceCircle")
        .classList.remove("listening");

    };

}else{

    alert("Voice Recognition Supported Nahi Hai");

}

// AI Voice
function speakText(text){

    if(!window.speechSynthesis) return;

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.lang =
    document.getElementById("languageSelect").value;

    speech.rate = 1;

    speech.pitch = 1;

    speechSynthesis.speak(speech);

}
