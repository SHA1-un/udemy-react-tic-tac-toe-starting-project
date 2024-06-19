import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
]

function getActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].symbol === 'X') {
		currentPlayer = 'O';
	}

	return currentPlayer;
}

function populateGameBoard(gameTurns) {
	// Make a deep copy of the game board
	let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
	for (const turn of gameTurns) {
		const square = turn.square;
		gameBoard[square.rowIndex][square.colIndex] = turn.symbol;
	}

	return gameBoard;
}

function getWinner(gameBoard, gameTurns) {
	let winner = null;
	for (const combination of WINNING_COMBINATIONS) {
		const square1 = gameBoard[combination[0].row][combination[0].column];
		const square2 = gameBoard[combination[1].row][combination[1].column];
		const square3 = gameBoard[combination[2].row][combination[2].column];
		const xWon = [square1, square2, square3].every(square => square === 'X');
		const oWon = [square1, square2, square3].every(square => square === 'O');

		if (xWon || oWon) winner = xWon ? 'X' : 'O';
	}

	if (!winner && gameTurns.length === 9) winner = 'draw';

	return winner;
}

function App() {
	const [players, setPlayers] = useState({
		'X': 'Player 1',
		'O': 'Player 2'
	})
	const [gameTurns, setGameTurns] = useState([]);
	let currentPlayer = getActivePlayer(gameTurns);
	let gameBoard = populateGameBoard(gameTurns);
	let winner = getWinner(gameBoard, gameTurns);

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns(prevGameTurns => {
			currentPlayer = getActivePlayer(prevGameTurns);

			const currentTurnInfo = {
				square: {
					rowIndex: rowIndex,
					colIndex: colIndex
				},
				symbol: currentPlayer
			}
			const updatedGameTurns = [currentTurnInfo, ...prevGameTurns];

			return updatedGameTurns;
		})

	}

	const handleRematch = () => {
		setGameTurns([]);
	}

	const updatePlayers = (symbol, name) => {
		setPlayers(prevPlayers => {
			const updatedPlayers = {...prevPlayers};
			updatedPlayers[symbol] = name;

			return updatedPlayers;
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className='highlight-player'>
					<Player initialName={players['X']} symbol={'X'} isActive={currentPlayer === 'X'} onNameUpdate={updatePlayers}/>
					<Player initialName={players['O']} symbol={'O'} isActive={currentPlayer === 'O'} onNameUpdate={updatePlayers}/>
				</ol>
				{winner && <GameOver winner={players[winner]} onRestart={handleRematch}></GameOver>}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns}></Log>
		</main>
	)
}

export default App
