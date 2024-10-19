import React, { useState } from 'react';
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
  const [currentTheme, setCurrentTheme] = useState('bg-black'); // Default theme

  // Theme change function
  const changeTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setCurrentTheme(randomTheme);
  };

  // Grid setup
  const grid = [
    'WWWWWWWWWWWWWWWWWWW',
    'WSSSSSSSSWSSSSSSSSW',
    'WBWWSWWWWWWWWWSWWBW',
    'WSSSSSSSSSSSSSSSSSW',
    'WSWWSWSWWWWWSWSWWSW',
    'WSSSSWSSSWSSSWSSSSW',
    'WWWWSWWWEWEWWWSWWWW',
    'EEEWSWEEEEEEEWSWEEE',
    'WWWWSWEWEWEWEWSWWWW',
    'EEEESEEW1E2WEESEEEE',
    'WWWWSWEWWWWWEWSWWWW',
    'EEEWSWEEEEEEEWSWEEE',
    'WWWWSWEWWWWWEWSWWWW',
    'WSSSSSSSSWSSSSSSSSW',
    'WBWWSWWWWWWWWWSWWBW',
    'WSSWSSSSSPSSSSSWSSW',
    'WWSWSWSWWWWWSWSWSWW',
    'WSSSSWSSSWSSSWSSSSW',
    'WSWWWWWWSWSWWWWWWSW',
    'WSWWWWWWSWSWWWWWWSW',
    'WWWWWWWWWWWWWWWWWWW',
  ];

  const printGame = (cell) => {
    switch (cell) {
      case 'W':
        return <img src={wall} alt="Wall" className="h-5 w-5 block" />;
      case 'S':
        return <img src={smalldot} className="h-5 w-5 block" alt="Small Dot" />;
      case 'B':
        return <img src={bigdot} className="h-5 w-5 block" alt="Big Dot" />;
      case 'P':
        return <img src={pacmanRight} alt="Pac-Man" className="h-5 w-5 block" />;
      case '1':
        return <img src={redghost} alt="Ghost 1" className="h-5 w-5 block" />;
      case '2':
        return <img src={blueghost} alt="Ghost 2" className="h-5 w-5 block" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center h-screen ${currentTheme} py-16 px-52`}>
      <h1 className="text-yellow-400 text-4xl font-extrabold tracking-widest py-10">Pac Man</h1>
      <div className="flex flex-col gap-0">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-0">
            {row.split('').map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} className="w-5 h-5 m-0 p-0">
                {printGame(cell)}
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
