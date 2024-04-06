import Player from "./component/player.jsx";
import GameBoard from "./component/GameBoard.jsx";
import { useState } from "react";
import Log from "./component/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import Gameover from "./component/Gameover.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentplayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentplayer = "O";
  }

  return currentplayer;
}

function App() {
  const [players, setplayers] = useState({
    X: "Player1",
    O: "Player2",
  });

  const [gameTurns, setGameTurns] = useState([]);

  const activeplayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const ThirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === ThirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentplayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activeplayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function hadlePlayerNameChange(symbol, newName) {
    setplayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initalName="Player 1"
            symbol="X"
            isActive={activeplayer === "X"}
            onChangeName={hadlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activeplayer === "O"}
            onChangeName={hadlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <Gameover winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
