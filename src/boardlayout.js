let turn = 0;
const playerColors = ['red', 'blue'];
let countColumns = [];
let squares; 
let gameOver = false;

export function initializeBoard(columns, rows) 
{
    const board = document.getElementById('board');
    countColumns = new Array(columns).fill(0); 
    for (let i = 0; i < columns; i++) 
    {
        for (let j = 0; j < rows; j++) 
        {
            const div = document.createElement('div');
            div.className = 'cell';
            div.addEventListener('click', () => handleClick(div, i * rows + j, columns, rows));
            board.appendChild(div);
        }
    }
    squares = board.querySelectorAll('.cell'); 
}

function handleClick(cell, index, columns, rows) 
{
    if (gameOver)
    { 
        return;
    }
    const playerSpan = document.getElementById('player');
    const resultSpan = document.getElementById('result');
    const column = getColumnTopIndex(index, columns);

    if (countColumns[column] < rows) 
    {
        countColumns[column] = countColumns[column] + 1;
        const location = column + (rows - countColumns[column]) * columns; 
        squares[location].style.backgroundColor = playerColors[turn];
        squares[location].classList.add(playerColors[turn])
        if (isWin(column, location, columns, rows)) 
        {
            resultSpan.innerText = `Player ${turn + 1} wins!`;
            gameOver = true; 
            return; 
        }
        if (isTie(columns, rows)) 
        {
            resultSpan.innerText = "It's a tie!";
            gameOver = true; 
            return;
        }
        turn = 1 - turn;
        playerSpan.innerText = turn + 1;
    } 
    else 
    {
        resultSpan.innerText = "This column is full";
        setTimeout(() => (resultSpan.innerText = ''), 700);
    }
}

function getColumnTopIndex(divIndex, columns) 
{
    return divIndex % columns;
}

function isWin(column, index, columns, rows) 
{
    return (isWinVertical(column, index, columns) || isWinHorizontal(index, columns) || isWinDiagonal1(index, columns, rows) || isWinDiagonal2(index, columns, rows) );
}

function isWinVertical(column, index, columns) 
{
    if (countColumns[column] < 4) 
    {
        return false; 
    }
    for (let i = index; i < index + 4 * columns; i += columns) 
    {
        if (!squares[i] || !squares[i].classList.contains(playerColors[turn])) 
        {
            return false; 
        }
    }
    return true; 
}

function isWinHorizontal(index, columns) 
{
    let stepsRight = 0;
    while ( (index + stepsRight + 1) % columns !== 0 && stepsRight < 4 && squares[index + stepsRight + 1] && squares[index + stepsRight + 1].classList.contains(playerColors[turn])) 
    {
        stepsRight += 1;
    }

    if (stepsRight === 3) 
    {
        return true;
    }
    let stepsLeft = 0;
    while(index - stepsLeft - 1 >= 0 && (index - stepsLeft - 1) % columns !== columns - 1 && stepsLeft < 3 - stepsRight && squares[index - stepsLeft - 1] && squares[index - stepsLeft - 1].classList.contains(playerColors[turn])) 
    {
        stepsLeft += 1;
    }
    return stepsLeft + stepsRight + 1 >= 4;
}

function isWinDiagonal1(index, columns, rows) {
    let stepsRight = 0;
    while ( index - (stepsRight + 1) * (columns - 1) >= 0 && stepsRight < 4 && squares[index - (stepsRight + 1) * (columns - 1)] && squares[index - (stepsRight + 1) * (columns - 1)].classList.contains(playerColors[turn])) 
    {
        stepsRight += 1;
    }

    if (stepsRight === 3) 
    {
        return true;
    }

    let stepsLeft = 0;
    while (index + (stepsLeft + 1) * (columns - 1) < columns * rows && stepsLeft + stepsRight < 3 && squares[index + (stepsLeft + 1) * (columns - 1)] && squares[index + (stepsLeft + 1) * (columns - 1)].classList.contains(playerColors[turn]))
    {
        stepsLeft += 1;
    }
    return stepsLeft + stepsRight + 1 >= 4;
}

function isWinDiagonal2(index, columns, rows) 
{
    let stepsLeft = 0;
    while ( index - (stepsLeft + 1) * (columns + 1) >= 0 && stepsLeft < 4 && squares[index - (stepsLeft + 1) * (columns + 1)] && squares[index - (stepsLeft + 1) * (columns + 1)].classList.contains(playerColors[turn])) 
    {
        stepsLeft += 1;
    }

    if (stepsLeft === 3)
    { 
        return true;
    }

    let stepsRight = 0;
    while (index + (stepsRight + 1) * (columns + 1) < columns * rows && stepsLeft + stepsRight < 3 && squares[index + (stepsRight + 1) * (columns + 1)] && squares[index + (stepsRight + 1) * (columns + 1)].classList.contains(playerColors[turn])) 
    {
        stepsRight += 1;
    }
    return stepsLeft + stepsRight + 1 >= 4;
}

function isTie(columns, rows) 
{
    return countColumns.reduce((acc, val) => acc + val) === columns * rows;
}
