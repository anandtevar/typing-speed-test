const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast requires practice and patience.",
    "JavaScript makes web pages interactive.",
    "Coding is fun when you learn step by step.",
    "Speed and accuracy improve with daily typing."
];

let currentSentence = "";
let timer;
let timeLeft = 30;
let startTime;
let typedText = "";
let correctChars = 0;
let totalChars = 0;

// Select elements
const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input-text");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");

// Function to start the test
function startTest() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = currentSentence;
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    wpmElement.textContent = "0";
    accuracyElement.textContent = "100";
    correctChars = 0;
    totalChars = 0;
    
    startButton.style.display = "none";
    restartButton.style.display = "none";

    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        inputElement.disabled = true;
        restartButton.style.display = "block";
    }
}

// Function to calculate WPM and accuracy
function calculateResults() {
    const elapsedTime = (30 - timeLeft) / 60; 
    const wordsTyped = totalChars / 5;
    const wpm = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
    
    wpmElement.textContent = wpm;
    accuracyElement.textContent = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
}

// Event listener for typing
inputElement.addEventListener("input", function () {
    if (timeLeft <= 0) return;

    typedText = inputElement.value;
    totalChars = typedText.length;
    
    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentSentence[i]) {
            correctChars++;
        }
    }

    calculateResults();
});

// Restart the test
restartButton.addEventListener("click", startTest);
startButton.addEventListener("click", startTest);
