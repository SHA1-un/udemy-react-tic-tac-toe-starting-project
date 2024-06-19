export default function GameOver({winner, onRestart}) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner === 'draw' ? <p>Draw!</p> : <p>{winner} won!</p>}
        <button onClick={onRestart}>Rematch!</button>
    </div>
}