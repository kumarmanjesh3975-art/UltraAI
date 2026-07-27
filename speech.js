// ===== UltraAI Voice Part 2 =====

function speak(text) {

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;

    const voices = speechSynthesis.getVoices();

    // पहले महिला आवाज़ ढूँढने की कोशिश
    let female =
        voices.find(v =>
            v.lang.startsWith("hi") &&
            (v.name.toLowerCase().includes("female") ||
             v.name.toLowerCase().includes("google"))
        );

    // नहीं मिली तो कोई भी हिंदी आवाज़
    if (!female) {
        female = voices.find(v => v.lang.startsWith("hi"));
    }

    // फिर अंग्रेज़ी
    if (!female) {
        female = voices.find(v => v.lang.startsWith("en"));
    }

    if (female) {
        utter.voice = female;
    }

    speechSynthesis.speak(utter);
}

speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};
