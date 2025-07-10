// Text to Speech
const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
let voices = [];

function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

window.speechSynthesis.onvoiceschanged = loadVoices;

function speakText() {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  window.speechSynthesis.speak(utterance);
}

// Speech to Text
function startListening() {
  const output = document.getElementById("outputText");

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = transcript;
  };

  recognition.onerror = function(event) {
    output.textContent = "Error: " + event.error;
  };

  recognition.start();
}

// Download recognized speech as TXT file
function downloadTXT() {
  const text = document.getElementById("outputText").textContent.trim();
  if (!text) {
    alert("No text to download.");
    return;
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'speech-text.txt';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(link.href);
}
