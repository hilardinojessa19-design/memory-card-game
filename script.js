* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  text-align: center;
}

h1 {
  color: white;
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  color: white;
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 15px;
  justify-content: center;
  margin: 20px auto;
}

.card {
  width: 100px;
  height: 100px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
  transition: transform 0.3s, background 0.3s;
  color: transparent;
}

.card:hover {
  transform: scale(1.05);
}

.card.flipped {
  background: linear-gradient(145deg, #ff9a9e, #fecfef);
  color: #333;
  transform: rotateY(180deg);
}

.card.matched {
  background: linear-gradient(145deg, #a8edea, #fed6e3);
  cursor: default;
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

button {
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50px;
  border: none;
  background: white;
  color: #764ba2;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

@media (max-width: 500px) {
 .game-board {
    grid-template-columns: repeat(4, 70px);
    gap: 10px;
  }
 .card {
    width: 70px;
    height: 70px;
    font-size: 1.8em;
  }
}
