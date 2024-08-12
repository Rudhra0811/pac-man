const COLS = 28;
const ROWS = 31;
const CELL_SIZE = 20;

const gameBoard = document.getElementById('gameBoard');
const pacman = document.getElementById('pacman');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

let pacmanX = 14;
let pacmanY = 23;
let score = 0;
let powerMode = false;
let gameRunning = true;

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
            } else if (maze[row][col] === 3) {
                const powerPellet = document.createElement('div');
                powerPellet.classList.add('power-pellet');
                cell.appendChild(powerPellet);
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
        updateScore();
    } else if (powerPellet) {
        cell.removeChild(powerPellet);
        score += 50;
        updateScore();
        activatePowerMode();
    }
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function activatePowerMode() {
    powerMode = true;
    ghosts.forEach(ghost => {
        const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
        ghostElement.style.backgroundColor = 'blue';
    });
    setTimeout(() => {
        powerMode = false;
        ghosts.forEach(ghost => {
            const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
            ghostElement.style.backgroundColor = ghost.color;
        });
    }, 10000);
}

function createGhosts() {
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
            // 20% chance to change direction randomly
            newDirection = directions[Math.floor(Math.random() * directions.length)];
        } else {
            // Continue in the same direction if possible
            newDirection = ghost.direction;
        }

        const newX = ghost.x + newDirection.dx;
        const newY = ghost.y + newDirection.dy;

        // Check if the new position is valid (not a wall)
        if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
            ghost.x = newX;
            ghost.y = newY;
            ghost.direction = newDirection;

            const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
            ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
            ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
        } else {
            // If the new position is invalid, choose a random direction
            ghost.direction = directions[Math.floor(Math.random() * directions.length)];
        }
    });

    checkGhostCollision();
}

function checkGhostCollision() {
    ghosts.forEach(ghost => {
        if (ghost.x === pacmanX && ghost.y === pacmanY) {
            if (powerMode) {
                // Pacman eats the ghost
                score += 200;
                updateScore();
                resetGhost(ghost);
            } else {
                // Game over
                gameOver();
            }
        }
    });
}

function resetGhost(ghost) {
    ghost.x = 13 + Math.floor(Math.random() * 2);
    ghost.y = 11 + Math.floor(Math.random() * 3);
    const ghostElement = document.querySelector(`.ghost[data-color="${ghost.color}"]`);
    ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
    ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
}

function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;
}

function startGame() {
    createMaze();
    createGhosts();
    updatePacmanPosition();
    updateScore();

    document.addEventListener('keydown', handleKeyPress);

    gameLoop();
}

function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowLeft':
            movePacman(-1, 0);
            break;
        case 'ArrowRight':
            movePacman(1, 0);
            break;
        case 'ArrowUp':
            movePacman(0, -1);
            break;
        case 'ArrowDown':
            movePacman(0, 1);
            break;
    }
}

function gameLoop() {
    if (gameRunning) {
        moveGhosts();
        requestAnimationFrame(gameLoop);
    }
}

startGame();