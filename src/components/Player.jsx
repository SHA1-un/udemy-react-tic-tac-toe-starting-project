import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameUpdate}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing(editing => {
            const updatedEditState = !editing;

            if (!updatedEditState) {
                onNameUpdate(symbol, playerName);
            }

            return updatedEditState});
    }

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    }

    let playerNameComponent = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        playerNameComponent = <input type="text" required defaultValue={playerName} onChange={handlePlayerNameChange}/>
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerNameComponent}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}   