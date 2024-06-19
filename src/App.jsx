import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { useState } from 'react';

function getActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].symbol === 'X') {
		currentPlayer = 'O';
	}

	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	let currentPlayer = getActivePlayer(gameTurns);

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

	return (
		<main>
			<div id="game-container">
				<ol id="players" className='highlight-player'>
					<Player initialName="Player 1" symbol="X" isActive={currentPlayer === 'X'} />
					<Player initialName="Player 2" symbol="O" isActive={currentPlayer === 'O'} />
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns}></Log>
		</main>
	)
}

export default App
