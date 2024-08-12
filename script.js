const COLS = 28;
const ROWS = 31;
const CELL_SIZE = 20;

const gameBoard = document.getElementById('gameBoard');
const pacman = document.getElementById('pacman');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('gameOver');
const startScreenElement = document.getElementById('startScreen');
const finalScoreElement = document.getElementById('finalScore');

let pacmanX = 14;
let pacmanY = 23;
let score = 0;
let level = 1;
let lives = 3;
let powerMode = false;
let gameRunning = false;
let dotsRemaining = 0;

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const ghosts = [
    { x: 13, y: 11, color: 'red', direction: { dx: 0, dy: 0 } },
    { x: 14, y: 11, color: 'pink', direction: { dx: 0, dy: 0 } },
    { x: 13, y: 13, color: 'cyan', direction: { dx: 0, dy: 0 } },
    { x: 14, y: 13, color: 'orange', direction: { dx: 0, dy: 0 } }
];

function createMaze() {
    gameBoard.innerHTML = '';
    dotsRemaining = 0;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (maze[row][col] === 1) {
                cell.classList.add('wall');
            } else if (maze[row][col] === 0) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                cell.appendChild(dot);
                dotsRemaining++;
            } else if (maze[row][col] === 3) {
                const powerPellet = document.createElement('div');
                powerPellet.classList.add('power-pellet');
                cell.appendChild(powerPellet);
                dotsRemaining++;
            }

            gameBoard.appendChild(cell);
        }
    }
}

function updatePacmanPosition() {
    pacman.style.left = pacmanX * CELL_SIZE + 'px';
    pacman.style.top = pacmanY * CELL_SIZE + 'px';
}

function movePacman(dx, dy) {
    if (!gameRunning) return;

    const newX = pacmanX + dx;
    const newY = pacmanY + dy;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
        pacmanX = newX;
        pacmanY = newY;
        updatePacmanPosition();
        checkCollision();
        checkGhostCollision();
    }
}

function checkCollision() {
    const cell = gameBoard.children[pacmanY * COLS + pacmanX];
    const dot = cell.querySelector('.dot');
    const powerPellet = cell.querySelector('.power-pellet');

    if (dot) {
        cell.removeChild(dot);
        score += 10;
        dotsRemaining--;
        updateScore();
        playSound('eat_dot');
    } else if (powerPellet) {
        cell.removeChild(powerPellet);
        score += 50;
        dotsRemaining--;
        updateScore();
        activatePowerMode();
        playSound('eat_power_pellet');
    }

    if (dotsRemaining === 0) {
        levelUp();
    }
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function activatePowerMode() {
    powerMode = true;
    ghosts.forEach(ghost => {
        const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
        if (ghostElement) {
            ghostElement.style.backgroundColor = 'blue';
        }
    });
    setTimeout(() => {
        powerMode = false;
        ghosts.forEach(ghost => {
            const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
            if (ghostElement) {
                ghostElement.style.backgroundColor = ghost.color;
            }
        });
    }, 10000);
}

function createGhosts() {
    const gameContainer = document.getElementById('gameContainer');
    ghosts.forEach(ghost => {
        const ghostElement = document.createElement('div');
        ghostElement.classList.add('ghost');
        ghostElement.style.backgroundColor = ghost.color;
        ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
        ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
        ghostElement.setAttribute('data-color', ghost.color);
        gameContainer.appendChild(ghostElement);
    });
}

function moveGhosts() {
    if (!gameRunning) return;

    ghosts.forEach((ghost, index) => {
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ];

        let newDirection;
        if (Math.random() < 0.2) {
            newDirection = directions[Math.floor(Math.random() * directions.length)];
        } else {
            const dx = pacmanX - ghost.x;
            const dy = pacmanY - ghost.y;
            if (Math.abs(dx) > Math.abs(dy)) {
                newDirection = { dx: Math.sign(dx), dy: 0 };
            } else {
                newDirection = { dx: 0, dy: Math.sign(dy) };
            }
            if (powerMode) {
                newDirection.dx *= -1;
                newDirection.dy *= -1;
            }
        }

        const newX = ghost.x + newDirection.dx;
        const newY = ghost.y + newDirection.dy;

        if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
            ghost.x = newX;
            ghost.y = newY;
            ghost.direction = newDirection;

            const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
            if (ghostElement) {
                ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
                ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
            }
        }
    });
}

function checkGhostCollision() {
    ghosts.forEach(ghost => {
        if (ghost.x === pacmanX && ghost.y === pacmanY) {
            if (powerMode) {
                score += 200;
                updateScore();
                resetGhost(ghost);
                playSound('eat_ghost');
            } else {
                lives--;
                updateLives();
                if (lives === 0) {
                    gameOver();
                } else {
                    resetPositions();
                    playSound('death');
                }
            }
        }
    });
}

function resetGhost(ghost) {
    ghost.x = 13 + Math.floor(Math.random() * 2);
    ghost.y = 11 + Math.floor(Math.random() * 3);
    const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
    if (ghostElement) {
        ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
        ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
    }
}

function resetPositions() {
    pacmanX = 14;
    pacmanY = 23;
    updatePacmanPosition();
    ghosts.forEach(ghost => resetGhost(ghost));
}

function updateLives() {
    livesElement.textContent = `Lives: ${lives}`;
}

function levelUp() {
    level++;
    levelElement.textContent = `Level: ${level}`;
    resetPositions();
    createMaze();
    playSound('level_up');
}

function gameOver() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
    playSound('game_over');
}

function startGame() {
    score = 0;
    level = 1;
    lives = 3;
    powerMode = false;
    gameRunning = true;
    
    updateScore();
    updateLives();
    levelElement.textContent = `Level: ${level}`;
    
    createMaze();
    resetPositions();
    createGhosts();
    
    gameOverElement.style.display = 'none';
    startScreenElement.style.display = 'none';
    
    gameLoop();
}

function gameLoop() {
    if (gameRunning) {
        moveGhosts();
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (gameRunning) {
        switch (e.key) {
            case 'ArrowUp':
                movePacman(0, -1);
                break;
            case 'ArrowDown':
                movePacman(0, 1);
                break;
            case 'ArrowLeft':
                movePacman(-1, 0);
                break;
            case 'ArrowRight':
                movePacman(1, 0);
                break;
        }
    }
});

function playSound(soundName) {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
}

document.getElementById('playAgainButton').addEventListener('click', startGame);