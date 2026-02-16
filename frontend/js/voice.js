let lastSpeech = "";

function speak(text, lang = "en-IN") {
  if (!text || text === lastSpeech) return;

  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;
  utter.pitch = 1;

  speechSynthesis.speak(utter);
  lastSpeech = text;
}
