* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
    padding: 20px;
    color: #222;
}

.container {
    max-width: 600px;
    margin: auto;
    text-align: center;
}

h1 {
    color: white;
    font-size: 2.3rem;
    margin-bottom: 8px;
}

.subtitle {
    color: white;
    margin-bottom: 20px;
    font-size: 1rem;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
}

.stats div {
    background: white;
    padding: 12px 18px;
    border-radius: 12px;
    min-width: 90px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.stats span {
    display: block;
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 4px;
}

.stats strong {
    font-size: 1.2rem;
    color: #333;
}

#newGameBtn {
    background: #ffcc00;
    border: none;
    padding: 12px 22px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#newGameBtn:active {
    transform: scale(0.95);
}

.game-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    max-width: 500px;
    margin: auto;
}

.card {
    aspect-ratio: 1 / 1;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
}

.card.flipped {
    transform: rotateY(180deg);
}

.card.matched {
    pointer-events: none;
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25);
}

.card-back {
    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
    color: white;
    font-size: 2rem;
}

.card-front {
    background: white;
    transform: rotateY(180deg);
    font-size: 2.5rem;
}

.card.matched .card-front {
    background: #c8f7c5;
    box-shadow: 0 0 12px #4caf50;
}

.message {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 20px;
    min-height: 30px;
}

@media (max-width: 500px) {

    body {
        padding: 15px;
    }

    h1 {
        font-size: 1.8rem;
    }

    .stats {
        gap: 7px;
    }

    .stats div {
        min-width: 75px;
        padding: 10px 8px;
    }

    .game-board {
        gap: 8px;
    }

    .card-front {
        font-size: 2rem;
    }

    .card-back {
        font-size: 1.5rem;
    }
}
