import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard({ onSelectSquare, activePlayer }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map(cols => [...cols])];
            if (updatedGameBoard[rowIndex][colIndex] == null) {
                updatedGameBoard[rowIndex][colIndex] = activePlayer;
                onSelectSquare();
            }

            return updatedGameBoard
        });
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol ?? ''}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}