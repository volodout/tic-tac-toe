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
    if (lastMove === ZERO) {
        renderSymbolInCell(CROSS, row, col);
        lastMove = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col);
        lastMove = ZERO;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner() {
    for (let i = 0; i < MAP.length; i++) {
        let temp;
        for (let j = 0; j < MAP[i].length - 1; j++) {
            if (MAP[i][j] === MAP[i][j + 1] && MAP[i][j] !== EMPTY)
                temp = MAP[i][j];
            else {
                temp = undefined
                break;
            }
        }
        if (temp !== undefined) {
            winner = temp;
            let res = []
            for (let j = 0; j < MAP[i].length; j++) {
                res.push([i, j])
            }
            drawCell(res);
            return;
        }
    }

    for (let i = 0; i < MAP.length; i++) {
        let temp;
        for (let j = 0; j < MAP[i].length - 1; j++) {
            if (MAP[j][i] === MAP[j][1 + 1] && MAP[j][i] !== EMPTY)
                temp = MAP[j][i];
            else {
                temp = undefined
                break;
            }
        }
        if (temp !== undefined) {
            winner = temp;
            let res = []
            for (let j = 0; j < MAP[i].length; j++) {
                res.push([j, i])
            }
            drawCell(res);
        }
        return;
    }
    let res = []
    for (let i = 0; i < MAP.length; i++) {
        if (MAP[i][i] === MAP[i][1 + 1] && MAP[i][i] !== EMPTY) {
            winner = MAP[i][i];
            res.push([i, i])
        } else {
            winner = undefined;
            break;
        }
    }
    if (winner !== undefined) {
        drawCell(res);
        return;
    }
    res = []
    for (let j = 0; i < MAP.length; i++) {
        let i = MAP.length - j - 1;
        if (MAP[i][i] === MAP[i][1 + 1] && MAP[i][i] !== EMPTY) {
            res.push([i, i])
            winner = MAP[i][i];
        } else {
            winner = undefined;
            break;
        }
    }
    if (winner !== undefined) {
        drawCell(res);
        return;
    }
    return;
}

function drawCell(cells) {
    for (let i = 0; i < cells.length; i++) {
        renderSymbolInCell(winner, cells[i][0], cells[i][1], 'red');
    }
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
