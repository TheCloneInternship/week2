document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const voicesSelect = document.getElementById('voices');
  const speedInput = document.getElementById('speed');
  let voices = [];

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    const filteredVoices = voices.filter(voice => voice.name.includes("David") || voice.name.includes("Zira"));
    voicesSelect.innerHTML = filteredVoices.map(voice => `<option value="${voice.name}">${voice.name}</option>`).join('');
  }

  populateVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }

  startButton.addEventListener('click', () => {
    const selectedVoice = voices.find(voice => voice.name === voicesSelect.value);
    const speed = speedInput.value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "startReading", voice: selectedVoice, speed: parseFloat(speed) }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log('Message sent:', response);
        }
      });
    });
  });

  stopButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopReading" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log('Message sent:', response);
        }
      });
    });
  });

  speedInput.addEventListener('input', () => {
    const speed = speedInput.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "changeSpeed", speed: parseFloat(speed) }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log('Speed change message sent:', response);
        }
      });
    });
  });
});
