// Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = true;
recognition.interimResults = false;

// Voice Input
function startListening() {
  recognition.start();
}

recognition.onresult = (event) => {
  const text =
    event.results[event.results.length - 1][0].transcript;

  document.getElementById("userInput").value = text;

  if (typeof sendMessage === "function") {
    sendMessage();
  }
};

// Female Voice Output
function speak(text, lang = "hi-IN") {
  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  msg.rate = 1;
  msg.pitch = 1.2;

  const voices = speechSynthesis.getVoices();

  const female = voices.find(
    v =>
      v.lang.startsWith(lang.split("-")[0]) &&
      /female|zira|google/i.test(v.name)
  );

  if (female) msg.voice = female;

  speechSynthesis.speak(msg);
}
