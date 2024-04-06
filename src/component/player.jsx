import { useState } from "react";

export default function Player({ initalName, symbol, isActive, onChangeName }) {
  const [playerName, setplayerName] = useState(initalName);
  const [isEditing, setisEditing] = useState(false);

  function handleEditClick() {
    setisEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setplayerName(event.target.value);
  }

  let editplayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editplayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
