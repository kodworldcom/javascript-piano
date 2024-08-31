const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => playSound(key.dataset.note));
});

function playSound(note) {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  // square,sine,triangle,sawtooth for different sounds.
  osc.type = "triangle";
  osc.frequency.value = getFrequency(note);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

  osc.start();
  osc.stop(audioCtx.currentTime + 1);
}

function getFrequency(note) {
  const notes = {
    C: 261.63,
    "C#": 277.18,
    D: 293.66,
    "D#": 311.13,
    E: 329.63,
    F: 349.23,
    "F#": 369.99,
    G: 392.0,
    "G#": 415.3,
    A: 440.0,
    "A#": 466.16,
    B: 493.88,
    C2: 523.25,
  };

  return notes[note];
}
