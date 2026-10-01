// ========================================
// MEMORY CARD GAME
// ========================================

// 8 symbols = 8 pairs = 16 cards
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


// ========================================
// LOCAL STORAGE DATABASE
// ========================================

function getBestScore() {

    const savedScore =
        localStorage.getItem("memoryGameBestScore");

    if (savedScore === null) {
        return null;
    }

    return Number(savedScore);
}


function saveBestScore(score) {

    localStorage.setItem(
        "memoryGameBestScore",
        score
    );
}


function displayBestScore() {

    const bestScore = getBestScore();

    if (bestScore === null) {
        bestScoreDisplay.textContent = "-";
    } else {
        bestScoreDisplay.textContent = bestScore;
    }
}


// ========================================
// SHUFFLE
// ========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        const temporary = array[i];

        array[i] = array[randomIndex];

        array[randomIndex] = temporary;
    }

    return array;
}


// ========================================
// START NEW GAME
// ========================================

function createGame() {

    // Clear the board
    gameBoard.innerHTML = "";

    // Reset game
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    moves = 0;
    matches = 0;

    // Update display
    movesDisplay.textContent = "0";
    matchesDisplay.textContent = "0/8";
    message.textContent = "";

    // Create pairs
    const cardSymbols = [
        ...symbols,
        ...symbols
    ];

    // Shuffle
    shuffle(cardSymbols);

    // Create 16 cards
    cardSymbols.forEach(function(symbol) {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">

                <div class="card-back">
                    ❓
                </div>

                <div class="card-front">
                    ${symbol}
                </div>

            </div>
        `;

        // Save symbol
        card.dataset.symbol = symbol;

        // Touch / click
        card.addEventListener("click", function() {

            flipCard(card);

        });

        // Add card to board
        gameBoard.appendChild(card);

    });
}


// ========================================
// FLIP CARD
// ========================================

function flipCard(card) {

    // Stop if board is locked
    if (lockBoard) {
        return;
    }

    // Stop if clicking same card
    if (card === firstCard) {
        return;
    }

    // Stop matched cards
    if (card.classList.contains("matched")) {
        return;
    }

    // Flip
    card.classList.add("flipped");

    // First card
    if (firstCard === null) {

        firstCard = card;

        return;
    }

    // Second card
    secondCard = card;

    // Count move
    moves++;

    movesDisplay.textContent = moves;

    // Check pair
    checkMatch();
}


// ========================================
// CHECK MATCH
// ========================================

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


// ========================================
// MATCH
// ========================================

function handleMatch() {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");

    matches++;

    matchesDisplay.textContent =
        matches + "/8";

    resetTurn();

    // All pairs found
    if (matches === 8) {

        finishGame();
    }
}


// ========================================
// WRONG PAIR
// ========================================

function handleMismatch() {

    lockBoard = true;

    setTimeout(function() {

        firstCard.classList.remove("flipped");

        secondCard.classList.remove("flipped");

        resetTurn();

    }, 900);
}


// ========================================
// RESET TURN
// ========================================

function resetTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


// ========================================
// FINISH GAME
// ========================================

function finishGame() {

    const bestScore = getBestScore();

    if (
        bestScore === null ||
        moves < bestScore
    ) {

        saveBestScore(moves);

        displayBestScore();

        message.textContent =
            "🎉 NEW BEST SCORE! " +
            moves +
            " moves!";

    } else {

        message.textContent =
            "🎉 Congratulations! You finished in " +
            moves +
            " moves!";
    }
}


// ========================================
// NEW GAME BUTTON
// ========================================

newGameBtn.addEventListener("click", function() {

    createGame();

});


// ========================================
// START
// ========================================

displayBestScore();

createGame();
