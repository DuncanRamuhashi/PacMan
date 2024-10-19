import React, { useEffect, useState } from 'react';
import blueghost from './assets/Res/blueghost.gif';
import ghost1 from './assets/Res/ghost1.gif';
import ghost2 from './assets/Res/ghost2.gif';
import ghost3 from './assets/Res/ghost3.gif';
import pacmanDown from './assets/Res/pacmanDown.gif';
import pacmanLeft from './assets/Res/pacmanLeft.gif';
import pacmanRight from './assets/Res/pacmanRight.gif';
import pacmanUp from './assets/Res/pacmanUp.gif';
import redghost from './assets/Res/redghost.gif';
import smalldot from './assets/Res/smalldot.png';
import wall from './assets/Res/wall.png';
import bigdot from './assets/Res/whitedot.png';

const themes = [
  'bg-slate-800',
  'bg-black',
  'bg-red-900',
  'bg-orange-950',
  'bg-lime-950',
  'bg-emerald-950',
  'bg-sky-950',
  'bg-rose-950',
];

const App = () => {
  const [score, setScore] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('bg-black');
  const [pacmanPosition, setPacmanPosition] = useState({ x: 9, y: 15 });
  const [ghosts, setGhosts] = useState([
    { id: '1', position: { x: 5, y: 5 }, scared: false },
    { id: '2', position: { x: 10, y: 10 }, scared: false },
  ]);
  const [direction, setDirection] = useState('right');
  const [grid, setGrid] = useState([
    'WWWWWWWWWWWWWWWWWWW',
    'WSSSSSSSSWSSSSSSSSW',
    'WBWWSWWWWWWWWWSWWBW',
    'WSSSSSSSSSSSSSSSSSW',
    'WSWWSWSWWWWWSWSWWSW',
    'WSSSSWSSSWSSSWSSSSW',
    'WWWWSWWWEWEWWWSWWWW',
    'WWWWSWEEEEEEEWSWWWW',
    'WWWWSWEWEWEWEWSWWWW',
    'WSSSSEEW1E2WEESSSSW',
    'WWWWSWEWWWWWEWSWWWW',
    'WWWWSWEEEEEEEWSWWWW',
    'WWWWSWEWWWWWEWSWWWW',
    'WSSSSSSSSWSSSSSSSSW',
    'WBWWSWWWWWWWWWSWWBW',
    'WSSWSSSSSPSSSSSWSSW',
    'WWSWSWSWWWWWSWSWSWW',
    'WSSSSWSSSWSSSWSSSSW',
    'WSWWWWWWSWSWWWWWWSW',
    'WSWWWWWWSWSWWWWWWSW',
    'WWWWWWWWWWWWWWWWWWW',
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [powerPelletActive, setPowerPelletActive] = useState(false);
  const [winner, setWinner] = useState(false); // New state for winner

  const isValidMove = (x, y) => {
    const cell = grid[y]?.[x];
    return cell === 'S' || cell === 'B' || cell === 'E'; // Empty or has dots
  };

  const moveGhosts = () => {
    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) => {
        const { x, y } = ghost.position;
        const directions = [
          { dx: 1, dy: 0 }, // right
          { dx: -1, dy: 0 }, // left
          { dx: 0, dy: 1 }, // down
          { dx: 0, dy: -1 }, // up
        ];

        // Find the best direction towards Pac-Man
        const validMoves = directions
          .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
          .filter(({ x: newX, y: newY }) => isValidMove(newX, newY));

        let targetMove = validMoves[0];

        // Simple chase logic: prioritize moves that get closer to Pac-Man
        for (const move of validMoves) {
          if (
            Math.abs(move.x - pacmanPosition.x) + Math.abs(move.y - pacmanPosition.y) <
            Math.abs(targetMove.x - pacmanPosition.x) + Math.abs(targetMove.y - pacmanPosition.y)
          ) {
            targetMove = move;
          }
        }

        // Move to the best target move
        return targetMove ? { ...ghost, position: targetMove } : ghost;
      })
    );
  };

  const checkCollision = () => {
    for (const ghost of ghosts) {
      if (ghost.position.x === pacmanPosition.x && ghost.position.y === pacmanPosition.y) {
        if (powerPelletActive) {
          setGhosts((prevGhosts) =>
            prevGhosts.map((g) => (g.position.x === ghost.position.x && g.position.y === ghost.position.y ? { ...g, scared: true } : g))
          );
          setScore((prevScore) => prevScore + 10); // Score for eating ghost
        } else {
          setGameOver(true);
        }
      }
    }
  };

  const checkVictory = () => {
    const hasDotsLeft = grid.some(row => row.includes('S') || row.includes('B'));
    if (!hasDotsLeft) {
      setWinner(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setPacmanPosition({ x: 9, y: 15 });
    setGhosts([
      { id: '1', position: { x: 5, y: 5 }, scared: false },
      { id: '2', position: { x: 10, y: 10 }, scared: false },
    ]);
    setGrid([
      'WWWWWWWWWWWWWWWWWWW',
      'WSSSSSSSSWSSSSSSSSW',
      'WBWWSWWWWWWWWWSWWBW',
      'WSSSSSSSSSSSSSSSSSW',
      'WSWWSWSWWWWWSWSWWSW',
      'WSSSSWSSSWSSSWSSSSW',
      'WWWWSWWWEWEWWWSWWWW',
      'WWWWSWEEEEEEEWSWWWW',
      'WWWWSWEWEWEWEWSWWWW',
      'WSSSSEEW1E2WEESSSSW',
      'WWWWSWEWWWWWEWSWWWW',
      'WWWWSWEEEEEEEWSWWWW',
      'WWWWSWEWWWWWEWSWWWW',
      'WSSSSSSSSWSSSSSSSSW',
      'WBWWSWWWWWWWWWSWWBW',
      'WSSWSSSSSPSSSSSWSSW',
      'WWSWSWSWWWWWSWSWSWW',
      'WSSSSWSSSWSSSWSSSSW',
      'WSWWWWWWSWSWWWWWWSW',
      'WSWWWWWWSWSWWWWWWSW',
      'WWWWWWWWWWWWWWWWWWW',
    ]);
    setGameOver(false);
    setPowerPelletActive(false);
    setWinner(false); // Reset winner state
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver || winner) return;

      let newX = pacmanPosition.x;
      let newY = pacmanPosition.y;

      switch (event.key) {
        case 'ArrowRight':
          newX += 1;
          setDirection('right');
          break;
        case 'ArrowLeft':
          newX -= 1;
          setDirection('left');
          break;
        case 'ArrowDown':
          newY += 1;
          setDirection('down');
          break;
        case 'ArrowUp':
          newY -= 1;
          setDirection('up');
          break;
        default:
          return; // Exit if it's not an arrow key
      }

      // Check for valid move
      if (
        isValidMove(newX, newY) &&
        newX >= 0 &&
        newX < grid[0].length &&
        newY >= 0 &&
        newY < grid.length
      ) {
        const cell = grid[newY][newX];
        const newGrid = grid.map((row, rowIndex) => {
          if (rowIndex === newY) {
            return row.substr(0, newX) + 'E' + row.substr(newX + 1); // Mark as empty
          }
          return row;
        });
        setGrid(newGrid);
        setPacmanPosition({ x: newX, y: newY });

        if (cell === 'B') {
          setScore((prevScore) => prevScore + 30);
          setPowerPelletActive(true); // Activate power pellet
          setTimeout(() => setPowerPelletActive(false), 5000); // Deactivate after 5 seconds
        } else if (cell === 'S') {
          setScore((prevScore) => prevScore + 3);
        }
      }

      // After Pac-Man moves, check for victory
      checkVictory();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid, pacmanPosition, gameOver, winner]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !winner) {
        moveGhosts();
        checkCollision();
      }
    }, 400); // Ghosts move every 400ms

    return () => clearInterval(interval);
  }, [ghosts, pacmanPosition, gameOver, winner]);

  const printGame = (cell, rowIndex, cellIndex) => {
    if (rowIndex === pacmanPosition.y && cellIndex === pacmanPosition.x) {
      return direction === 'down' ? (
        <img src={pacmanDown} alt="Pac-Man" className="h-5 w-5 block" />
      ) : direction === 'up' ? (
        <img src={pacmanUp} alt="Pac-Man" className="h-5 w-5 block" />
      ) : direction === 'left' ? (
        <img src={pacmanLeft} alt="Pac-Man" className="h-5 w-5 block" />
      ) : (
        <img src={pacmanRight} alt="Pac-Man" className="h-5 w-5 block" />
      );
    }
    switch (cell) {
      case 'W':
        return <img src={wall} alt="Wall" className="h-5 w-5 block" />;
      case 'S':
        return <img src={smalldot} className="h-5 w-5 block" alt="Small Dot" />;
      case 'B':
        return <img src={bigdot} className="h-5 w-5 block" alt="Big Dot" />;
      case 'E':
        return <h1></h1>; // Empty space
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center h-full ${currentTheme} py-16 px-52`}>
      <h1 className="text-yellow-400 text-2xl lg:text-4xl font-extrabold lg:tracking-widest py-10">Pac Man</h1>
      <div id="game-grid" className="flex flex-col gap-0">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-0">
            {row.split('').map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} className="w-5 h-5 m-0 p-0">
                {printGame(cell, rowIndex, cellIndex)}
                {ghosts.map((ghost) =>
                  ghost.position.x === cellIndex && ghost.position.y === rowIndex ? (
                    <img key={ghost.id} src={ghost.scared ? blueghost : (ghost.id === '1' ? redghost : ghost2)} alt={`Ghost ${ghost.id}`} className="h-5 w-5 block" />
                  ) : null
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-white text-xl my-4">Score: {score}</div>
      {gameOver && (
        <div className="text-red-500 text-2xl my-4">Game Over! Press R to Restart</div>
      )}
      {winner && (
        <div className="text-green-500 text-2xl my-4">You Win! Press R to Restart</div>
      )}
      <button
        onClick={() => setCurrentTheme(themes[Math.floor(Math.random() * themes.length)])}
        className="mb-4 p-2 my-4 rounded bg-gray-900 text-white hover:bg-yellow-500 hover:text-black"
      >
        Change Theme
      </button>
      <footer className="gap-2 flex h-full w-full justify-center items-center text-white text-center py-5">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Duncan Ramuhashi. All rights reserved.
        </p>
      </footer>
      {(gameOver || winner) && (
        <div
          onClick={resetGame}
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'r') resetGame();
          }}
          tabIndex={0}
        >
          <div className="text-white text-lg">Click to Restart or Press R</div>
        </div>
      )}
    </div>
  );
};

export default App;
