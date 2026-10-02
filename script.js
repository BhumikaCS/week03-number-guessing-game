let secretNumber;
let attempts = 0;
let maxNumber = 50;
let maxAttempts = 10;
let guesses = [];
let gameOver = false;

function startGame() {

    attempts = 0;
    guesses = [];
    gameOver = false;

    let difficulty = document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        maxNumber = 50;
        maxAttempts = 10;
    }
    else if (difficulty === "medium") {
        maxNumber = 100;
        maxAttempts = 8;
    }
    else {
        maxNumber = 200;
        maxAttempts = 6;
    }

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("maxAttempts").textContent = maxAttempts;

    document.getElementById("rangeText").textContent =
        "Guess a number between 1 and " + maxNumber;

    document.getElementById("message").textContent = "";

    document.getElementById("guessHistory").textContent =
        "No guesses yet.";

    document.getElementById("guessInput").value = "";

    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessButton").disabled = false;
}

function checkGuess() {

    if (gameOver) {
        return;
    }

    let guess = Number(document.getElementById("guessInput").value);

    if (guess < 1 || guess > maxNumber) {

        document.getElementById("message").textContent =
            "Enter a number between 1 and " + maxNumber;

        return;
    }

    attempts++;

    guesses.push(guess);

    document.getElementById("attempts").textContent = attempts;

    if (guess === secretNumber) {

        document.getElementById("message").textContent =
            "🎉 Correct! You guessed the number!";

        gameOver = true;

    }
    else if (guess < secretNumber) {

        document.getElementById("message").textContent =
            "⬆️ Too low! Try again.";

    }
    else {

        document.getElementById("message").textContent =
            "⬇️ Too high! Try again.";
    }

    if (attempts >= maxAttempts && guess !== secretNumber) {

        document.getElementById("message").textContent =
            "😢 Game Over! The number was " + secretNumber;

        gameOver = true;
    }

    let history = "";

    for (let i = 0; i < guesses.length; i++) {
        history = history + guesses[i] + " ";
    }

    document.getElementById("guessHistory").textContent = history;

    document.getElementById("guessInput").value = "";

    if (gameOver) {

        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }
}

function restartGame() {
    startGame();
}

document.getElementById("guessButton").addEventListener(
    "click",
    checkGuess
);

document.getElementById("restartButton").addEventListener(
    "click",
    restartGame
);

document.getElementById("difficulty").addEventListener(
    "change",
    startGame
);

startGame();