console.log("Content script loaded");

let speechSynthesis = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let isReading = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  if (request.action === "startReading") {
    if (!isReading) {
      readText(request.voice, request.speed);
    }
  } else if (request.action === "stopReading") {
    if (isReading) {
      stopReading();
    }
  } else if (request.action === "changeSpeed") {
    if (isReading) {
      changeSpeed(request.speed);
    }
  }
});

function readText(voice, speed) {
  const selectedText = window.getSelection().toString() || document.body.innerText;

  if (!selectedText) {
    alert('No text selected.');
    return;
  }

  utterance.text = selectedText;
  utterance.voice = speechSynthesis.getVoices().find(v => v.name === voice.name);
  utterance.rate = speed;

  utterance.onend = () => {
    isReading = false;
  };

  speechSynthesis.speak(utterance);
  isReading = true;
}

function stopReading() {
  speechSynthesis.cancel();
  isReading = false;
}

function changeSpeed(speed) {
  if (utterance) {
    utterance.rate = speed;
  }
}
