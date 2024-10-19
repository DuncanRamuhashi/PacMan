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
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const currentYear = currentDate.getFullYear();
  const [score, setScore] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('bg-black');
  const [pacmanPosition, setPacmanPosition] = useState({ x: 9, y: 15 });
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

  // Theme change function
  const changeTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setCurrentTheme(randomTheme);
  };

  const isValidMove = (x, y) => {
    const cell = grid[y]?.[x];
    return cell === 'S' || cell === 'B' || cell === 'E'; // Empty or has dots
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
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
      if (isValidMove(newX, newY) && newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
        // Update grid if Pac-Man eats a dot
        const cell = grid[newY][newX];
        if (cell === 'S' || cell === 'B' ) {

          const newGrid = grid.map((row, rowIndex) => {
            if (rowIndex === newY) {
              return row.substr(0, newX) + 'E' + row.substr(newX + 1); // Mark as empty
            }
            return row;
          });
          setGrid(newGrid);
          if(cell === 'B'){
            setScore(score+7)
          }else {
            setScore(score+3);
          }
          
         
        }
        setPacmanPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid, pacmanPosition]); // Include pacmanPosition in dependencies

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
      case '1':
        return <img src={redghost} alt="Ghost 1" className="h-5 w-5 block" />;
      case '2':
        return <img src={ghost2} alt="Ghost 2" className="h-5 w-5 block" />;
      case 'E':
        return <h1></h1>; // Empty space
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center h-screen ${currentTheme} py-16 px-52`}>
      <h1 className="text-yellow-400 text-4xl font-extrabold tracking-widest py-10">Pac Man</h1>
      <div id="game-grid" className="flex flex-col gap-0">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-0">
            {row.split('').map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} className="w-5 h-5 m-0 p-0">
                {printGame(cell, rowIndex, cellIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={changeTheme}
        className="mb-4 p-2 my-4 rounded bg-gray-900 text-white hover:bg-yellow-500 hover:text-black"
      >
        Change Theme
      </button>
      <footer className="gap-2 flex h-full w-full justify-center items-center text-white text-center py-5">
        <p className="text-sm">
          &copy; {currentYear} Duncan Ramuhashi. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
