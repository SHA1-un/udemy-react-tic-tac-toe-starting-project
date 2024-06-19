const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const square = turn.square;
        gameBoard[square.rowIndex][square.colIndex] = turn.symbol;
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol ?? ''}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}