const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const ball1 = document.getElementById('ball1');
const ball2 = document.getElementById('ball2');
const startButton = document.getElementById('startButton');

let playerX = 0;
let playerY = 0;

let ball1X = Math.random() * (gameArea.clientWidth - ball1.clientWidth);
let ball1Y = Math.random() * (gameArea.clientHeight - ball1.clientHeight);
let ball1SpeedX = 4 + Math.random() * 6; 
let ball1SpeedY = 4 + Math.random() * 6; 

let ball2X = Math.random() * (gameArea.clientWidth - ball2.clientWidth);
let ball2Y = Math.random() * (gameArea.clientHeight - ball2.clientHeight);
let ball2SpeedX = 4 + Math.random() * 6; 
let ball2SpeedY = 4 + Math.random() * 6;

let intervalId;

player.style.left = `${playerX}px`;
player.style.top = `${playerY}px`;
ball1.style.left = `${ball1X}px`;
ball1.style.top = `${ball1Y}px`;
ball2.style.left = `${ball2X}px`;
ball2.style.top = `${ball2Y}px`;

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
    const ball1Rect = ball1.getBoundingClientRect();
    const ball2Rect = ball2.getBoundingClientRect();

    if (!(playerRect.right < ball1Rect.left || 
          playerRect.left > ball1Rect.right || 
          playerRect.bottom < ball1Rect.top || 
          playerRect.top > ball1Rect.bottom)) {
        alert('You got caught!');
        resetBall(ball1);
    }

    if (!(playerRect.right < ball2Rect.left || 
          playerRect.left > ball2Rect.right || 
          playerRect.bottom < ball2Rect.top || 
          playerRect.top > ball2Rect.bottom)) {
        alert('You got caught!');
        resetBall(ball2);
    }
}

function resetBall(ball) {
    let ballX = Math.random() * (gameArea.clientWidth - ball.clientWidth);
    let ballY = Math.random() * (gameArea.clientHeight - ball.clientHeight);
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function moveBall(ball, ballX, ballY, ballSpeedX, ballSpeedY) {
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

    return { ballX, ballY, ballSpeedX, ballSpeedY };
}

function startGame() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
        const ball1State = moveBall(ball1, ball1X, ball1Y, ball1SpeedX, ball1SpeedY);
        ball1X = ball1State.ballX;
        ball1Y = ball1State.ballY;
        ball1SpeedX = ball1State.ballSpeedX;
        ball1SpeedY = ball1State.ballSpeedY;

        const ball2State = moveBall(ball2, ball2X, ball2Y, ball2SpeedX, ball2SpeedY);
        ball2X = ball2State.ballX;
        ball2Y = ball2State.ballY;
        ball2SpeedX = ball2State.ballSpeedX;
        ball2SpeedY = ball2State.ballSpeedY;
    }, 1);
    startButton.style.display = 'none'; 
}

startButton.addEventListener('click', startGame);
