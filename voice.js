// ===== UltraAI Voice Part 1 =====

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "hi-IN";

const micBtn = document.getElementById("micBtn");
const input = document.getElementById("userInput");

const supportedLanguages = {
  hindi: "hi-IN",
  english: "en-US",
  urdu: "ur-PK",
  bengali: "bn-IN",
  tamil: "ta-IN",
  telugu: "te-IN",
  marathi: "mr-IN",
  gujarati: "gu-IN",
  punjabi: "pa-IN",
  malayalam: "ml-IN",
  kannada: "kn-IN"
};

micBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {

  const text =
  event.results[0][0].transcript;

  input.value = text;

  detectLanguage(text);

  sendMessage();

};

function detectLanguage(text){

const t = text.toLowerCase();

if(t.includes("english"))
recognition.lang = supportedLanguages.english;

else if(t.includes("urdu"))
recognition.lang = supportedLanguages.urdu;

else if(t.includes("bangla"))
recognition.lang = supportedLanguages.bengali;

else if(t.includes("tamil"))
recognition.lang = supportedLanguages.tamil;

else if(t.includes("telugu"))
recognition.lang = supportedLanguages.telugu;

else
recognition.lang = supportedLanguages.hindi;

}
