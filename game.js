const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const ball = document.getElementById('ball');
const startButton = document.getElementById('startButton');

let playerX = 0;
let playerY = 0;
let ballX = Math.random() * (gameArea.clientWidth - ball.clientWidth);
let ballY = Math.random() * (gameArea.clientHeight - ball.clientHeight);
let ballSpeedX = 4; // Increase speed
let ballSpeedY = 4; // Increase speed
let intervalId;

player.style.left = `${playerX}px`;
player.style.top = `${playerY}px`;
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

gameArea.addEventListener('mousemove', (e) => {
    const rect = gameArea.getBoundingClientRect();
    playerX = e.clientX - rect.left - player.clientWidth / 2;
    playerY = e.clientY - rect.top - player.clientHeight / 2;

    if (playerX < 0) playerX = 0;
    if (playerX > gameArea.clientWidth - player.clientWidth) playerX = gameArea.clientWidth - player.clientWidth;
    if (playerY < 0) playerY = 0;
    if (playerY > gameArea.clientHeight - player.clientHeight) playerY = gameArea.clientHeight - player.clientHeight;

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    checkCollision();
});

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    if (!(playerRect.right < ballRect.left || 
          playerRect.left > ballRect.right || 
          playerRect.bottom < ballRect.top || 
          playerRect.top > ballRect.bottom)) {
        alert('You caught the ball!');
        resetBall();
    }
}

function resetBall() {
    ballX = Math.random() * (gameArea.clientWidth - ball.clientWidth);
    ballY = Math.random() * (gameArea.clientHeight - ball.clientHeight);
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    ballSpeedX = 4 + Math.random() * 6; // Increase speed range
    ballSpeedY = 4 + Math.random() * 6; // Increase speed range
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX *= -1;
    }
    if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
        ballSpeedY *= -1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function startGame() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(moveBall, 1);
    startButton.style.display = 'none'; // Hide start button
}

startButton.addEventListener('click', startGame);
