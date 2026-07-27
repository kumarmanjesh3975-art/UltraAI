// ===== UltraAI Assistant =====

function ultraSpeak(text) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  msg.pitch = 1.1;
  msg.volume = 1;

  const voices = speechSynthesis.getVoices();

  // उपलब्ध होने पर महिला आवाज़ चुनने की कोशिश
  const femaleVoice =
    voices.find(v => v.lang.startsWith("hi") && /female|google/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith("en") && /female|zira|google/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith("hi")) ||
    voices.find(v => v.lang.startsWith("en"));

  if (femaleVoice) {
    msg.voice = femaleVoice;
    msg.lang = femaleVoice.lang;
  }

  speechSynthesis.speak(msg);
}

function ultraReply(text) {
  const chat = document.getElementById("chat");
  if (chat) {
    chat.innerHTML += `<div class="ai"><b>🤖 UltraAI:</b> ${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }

  ultraSpeak(text);
}
