// ==========================================
// MEMORY CARD GAME
// ==========================================

// The 8 symbols will create 16 cards
const symbols = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍒",
    "🥝",
    "🍍"
];

// Game variables
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;

// Get HTML elements
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const bestScoreDisplay = document.getElementById("bestScore");
const newGameBtn = document.getElementById("newGameBtn");
const message = document.getElementById("message");


// ==========================================
// DATABASE / LOCAL STORAGE
// ==========================================

// Get saved best score
function getBestScore() {

    const savedScore = localStorage.getItem("memoryGameBestScore");

    if (savedScore === null) {
        return null;
    }

    return Number(savedScore);
}


// Save best score
function saveBestScore(score) {

    localStorage.setItem(
        "memoryGameBestScore",
        score
    );
}


// Display best score
function displayBestScore() {

    const bestScore = getBestScore();

    if (bestScore === null) {
        bestScoreDisplay.textContent = "-";
    } else {
        bestScoreDisplay.textContent = bestScore;
    }
}


// ==========================================
// SHUFFLE CARDS
// ==========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];
    }

    return array;
}


// ==========================================
// CREATE GAME
// ==========================================

function createGame() {

    // Clear old cards
    gameBoard.innerHTML = "";

    // Reset variables
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    moves = 0;
    matches = 0;

    movesDisplay.textContent = moves;
    matchesDisplay.textContent = "0/8";
    message.textContent = "";

    // Duplicate symbols to create pairs
    cards = [...symbols, ...symbols];

    // Shuffle cards
    shuffle(cards);

    // Create each card
    cards.forEach((symbol, index) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-back">
                ❓
            </div>

            <div class="card-front">
                ${symbol}
            </div>
        `;

        // Add touch/click event
        card.addEventListener("click", () => {

            flipCard(card);

        });

        gameBoard.appendChild(card);

    });
}


// ==========================================
// FLIP CARD
// ==========================================

function flipCard(card) {

    // Don't allow invalid clicks
    if (lockBoard) {
        return;
    }

    if (card === firstCard) {
        return;
    }

    if (card.classList.contains("matched")) {
        return;
    }

    // Flip card
    card.classList.add("flipped");

    // First card
    if (firstCard === null) {

        firstCard = card;

        return;
    }

    // Second card
    secondCard = card;

    // One move
    moves++;

    movesDisplay.textContent = moves;

    checkMatch();
}


// ==========================================
// CHECK MATCH
// ==========================================

function checkMatch() {

    const isMatch =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;

    if (isMatch) {

        handleMatch();

    } else {

        handleMismatch();

    }
}


// ==========================================
// MATCH
// ==========================================

function handleMatch() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matches++;

    matchesDisplay.textContent =
        `${matches}/8`;

    resetTurn();

    // Check if game is complete
    if (matches === 8) {

        finishGame();

    }
}


// ==========================================
// NOT A MATCH
// ==========================================

function handleMismatch() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetTurn();

    }, 900);
}


// ==========================================
// RESET TURN
// ==========================================

function resetTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


// ==========================================
// GAME FINISHED
// ==========================================

function finishGame() {

    const bestScore = getBestScore();

    if (
        bestScore === null ||
        moves < bestScore
    ) {

        saveBestScore(moves);

        displayBestScore();

        message.textContent =
            `🎉 Congratulations! New Best Score: ${moves} moves!`;

    } else {

        message.textContent =
            `🎉 You won! Finished in ${moves} moves!`;

    }
}


// ==========================================
// NEW GAME BUTTON
// ==========================================

newGameBtn.addEventListener("click", () => {

    createGame();

});


// ==========================================
// START GAME
// ==========================================

displayBestScore();

createGame();
