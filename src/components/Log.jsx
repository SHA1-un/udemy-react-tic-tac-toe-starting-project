export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map( turn => {
                return (
                    <li key={`${turn.square.rowIndex}${turn.square.colIndex}`}>{turn.symbol} selected {turn.square.rowIndex}, {turn.square.colIndex}</li>
                )
            })}
        </ol>
    )
}