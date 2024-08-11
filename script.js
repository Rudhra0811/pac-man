const COLS = 28;
const ROWS = 31;
const CELL_SIZE = 20;

const gameBoard = document.getElementById('gameBoard');
const pacman = document.getElementById('pacman');
const scoreElement = document.getElementById('score');

let pacmanX = 14;
let pacmanY = 23;
let score = 0;
let powerMode = false;

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const ghosts = [
    { x: 13, y: 11, color: 'red' },
    { x: 14, y: 11, color: 'pink' },
    { x: 13, y: 13, color: 'cyan' },
    { x: 14, y: 13, color: 'orange' }
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
    const newX = pacmanX + dx;
    const newY = pacmanY + dy;

    if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1) {
        pacmanX = newX;
        pacmanY = newY;
        updatePacmanPosition();
        checkCollision();
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
    setTimeout(() => {
        powerMode = false;
    }, 10000);
}

function createGhosts() {
    ghosts.forEach(ghost => {
        const ghostElement = document.createElement('div');
        ghostElement.classList.add('ghost');
        ghostElement.style.backgroundColor = ghost.color;
        ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
        ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
        gameContainer.appendChild(ghostElement);
    });
}

function moveGhosts() {
    ghosts.forEach((ghost, index) => {
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ];

        const validDirections = directions.filter(dir => {
            const newX = ghost.x + dir.dx;
            const newY = ghost.y + dir.dy;
            return newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && maze[newY][newX] !== 1;
        });

        if (validDirections.length > 0) {
            const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
            ghost.x += randomDirection.dx;
            ghost.y += randomDirection.dy;

            const ghostElement = gameContainer.children[index + 2]; // +2 to skip gameBoard and pacman
            ghostElement.style.left = ghost.x * CELL_SIZE + 'px';
            ghostElement.style.top = ghost.y * CELL_SIZE + 'px';
        }
    });
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
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
});

createMaze();
updatePacmanPosition();
createGhosts();
setInterval(moveGhosts, 500);