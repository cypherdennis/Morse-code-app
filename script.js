const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..",
  E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...",
  8: "---..", 9: "----.",
  " ": "/"
};

const textInput = document.getElementById("textInput");
const convertBtn = document.getElementById("convertBtn");
const output = document.getElementById("output");
const playBtn = document.getElementById("playBtn");

convertBtn.addEventListener("click", () => {
  const input = textInput.value.toUpperCase();
  const morse = input.split("").map(char => morseCodeMap[char] || "").join(" ");
  output.textContent = morse;
});

playBtn.addEventListener("click", () => {
  const morseText = output.textContent;
  let delay = 0;
  const unit = 150;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  morseText.split("").forEach(char => {
    if (char === "." || char === "-") {
      setTimeout(() => playBeep(audioCtx, char === "." ? unit : unit * 3), delay);
      delay += unit + 50;
    } else if (char === " ") {
      delay += unit * 3;
    } else if (char === "/") {
      delay += unit * 7;
    }
  });
});

function playBeep(audioCtx, duration) {
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);
}
