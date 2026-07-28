// 🎤 UltraAI Voice System

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;


  // Mic Start
  function startListening() {

    let lang = document.getElementById("languageSelect");

    if (lang) {
      recognition.lang = lang.value;
    } else {
      recognition.lang = "hi-IN";
    }

    recognition.start();
  }


  // Voice Result
  recognition.onresult = function(event) {

    let text =
      event.results[0][0].transcript;

    document.getElementById("userInput").value = text;

    sendMessage();

  };


  recognition.onerror = function() {

    alert("Mic permission check करें");

  };


} else {

  console.log("Voice support नहीं है");

}


// 🔊 AI Voice Reply

function speakText(text) {

  let speech =
    new SpeechSynthesisUtterance(text);


  let lang =
    document.getElementById("languageSelect");


  if(lang){
    speech.lang = lang.value;
  }
  else{
    speech.lang = "hi-IN";
  }


  speech.rate = 1;
  speech.pitch = 1.2;


  let voices =
    window.speechSynthesis.getVoices();


  // Female voice खोजने की कोशिश
  let voice =
    voices.find(v =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("zira") ||
      v.name.toLowerCase().includes("google")
    );


  if(voice){
    speech.voice = voice;
  }


  window.speechSynthesis.speak(speech);

}
