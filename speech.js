// ===============================
// UltraAI Voice System
// ===============================

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;

  function startListening() {

    const lang = document.getElementById("languageSelect");

    recognition.lang = lang ? lang.value : "hi-IN";

    document.getElementById("voiceCircle")?.classList.add("listening");

    recognition.start();
  }

  // Voice Button
  function startVoiceMode() {
    startListening();
  }

  // Voice Result
  recognition.onresult = function (event) {

    const text = event.results[0][0].transcript;

    document.getElementById("userInput").value = text;

    sendMessage();

  };

  // Recognition Stop
  recognition.onend = function () {

    document.getElementById("voiceCircle")?.classList.remove("listening");

  };

  // Error
  recognition.onerror = function (event) {

    console.log(event.error);

    document.getElementById("voiceCircle")?.classList.remove("listening");

    if (event.error === "not-allowed") {
      alert("कृपया Microphone Permission Allow करें।");
    }

  };

} else {

  alert("इस Browser में Voice Recognition उपलब्ध नहीं है।");

}

// ===============================
// AI Voice Reply
// ===============================

function speakText(text) {

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  const lang = document.getElementById("languageSelect");

  speech.lang = lang ? lang.value : "hi-IN";

  speech.rate = 1;

  speech.pitch = 1.1;

  const voices = window.speechSynthesis.getVoices();

  const voice = voices.find(v =>
    v.lang.startsWith(speech.lang.split("-")[0])
  );

  if (voice) {
    speech.voice = voice;
  }

  speech.onstart = function () {

    document.getElementById("voiceCircle")?.classList.add("listening");

  };

  speech.onend = function () {

    document.getElementById("voiceCircle")?.classList.remove("listening");

  };

  window.speechSynthesis.speak(speech);

}

// Voice List Load
window.speechSynthesis.onvoiceschanged = function () {
  window.speechSynthesis.getVoices();
};
