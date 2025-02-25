const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let MAP = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];

let winner
let lastMove = ZERO

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (MAP[row][col] !== EMPTY || winner !== undefined){
        return;
    }

    let player;
    if (lastMove === ZERO) {
        player = CROSS;
    } else {
        player = ZERO;
    }

    renderSymbolInCell(player, row, col);
    MAP[row][col] = player;
    lastMove = player;
    console.log(`Clicked on cell: ${row}, ${col}`);
    checkWinner()

    if (winner !== undefined){
        checkTie()
    }
}

function checkTie(){
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {
            if (MAP[i][j] === EMPTY) {
                return;
            }
        }
    }
    alert('Победила дружба')
}

function checkWinner() {
    for (let i = 0; i < MAP.length; i++) {
        let temp = MAP[i][0];
        let isWinner = true;

        for (let j = 1; j < MAP[i].length; j++) {
            if (MAP[i][j] !== temp || temp === EMPTY) {
                isWinner = false;
                break;
            }
        }

        if (isWinner) {
            winner = temp;
            let res = [];
            for (let j = 0; j < MAP[i].length; j++) {
                res.push([i, j]);
            }
            drawCell(res);
            return;
        }
    }

    for (let i = 0; i < MAP.length; i++) {
        let temp = MAP[0][i];
        let isWinner = true;

        for (let j = 1; j < MAP.length; j++) {
            if (MAP[j][i] !== temp || temp === EMPTY) {
                isWinner = false;
                break;
            }
        }

        if (isWinner) {
            winner = temp;
            let res = [];
            for (let j = 0; j < MAP.length; j++) {
                res.push([j, i]);
            }
            drawCell(res);
            return;
        }
    }

    let temp = MAP[0][0];
    let isWinner = true;
    let res = [];

    for (let i = 1; i < MAP.length; i++) {
        if (MAP[i][i] !== temp || temp === EMPTY) {
            isWinner = false;
            break;
        }
        res.push([i, i]);
    }

    if (isWinner) {
        winner = temp;
        drawCell(res);
        return;
    }

    temp = MAP[0][MAP.length - 1];
    isWinner = true;
    res = [];

    for (let i = 1; i < MAP.length; i++) {
        if (MAP[i][MAP.length - i - 1] !== temp || temp === EMPTY) {
            isWinner = false;
            break;
        }
        res.push([i, MAP.length - i - 1]);
    }

    if (isWinner) {
        winner = temp;
        drawCell(res);
    }
}


function drawCell(cells) {
    for (let i = 0; i < cells.length; i++) {
        renderSymbolInCell(winner, cells[i][0], cells[i][1], 'red');
    }
    alert(winner)
}


function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    MAP = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {
            renderSymbolInCell('', i, j, '#333')
        }
    }
    winner = undefined
    lastMove = ZERO
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
