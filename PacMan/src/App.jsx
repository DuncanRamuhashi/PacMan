import React, { useState, useEffect } from 'react';
import hero from './assets/hero.png'; // Pac-Man
import villan from './assets/villan.png'; // Ghost 1
import villan2 from './assets/villan2.png'; // Ghost 2
import villan3 from './assets/villan3.png'; // Ghost 3
import villan4 from './assets/villan4.png'; // Ghost 4
import dot from './assets/dot3.png'; // Dots

const gridSize = 10; // Size of the grid
const initialDots = Array.from({ length: gridSize * gridSize }, (_, i) => i);
const initialGhosts = [
  { id: 1, position: 22, image: villan },
  { id: 2, position: 23, image: villan2 },
  { id: 3, position: 24, image: villan3 },
  { id: 4, position: 25, image: villan4 },
];

const App = () => {
  const [pacmanPosition, setPacmanPosition] = useState(0);
  const [dots, setDots] = useState(initialDots);
  const [ghosts, setGhosts] = useState(initialGhosts);
  const [score, setScore] = useState(0);

  const movePacman = (direction) => {
    let newPosition = pacmanPosition;

    switch (direction) {
      case 'ArrowUp':
        if (pacmanPosition >= gridSize) newPosition -= gridSize;
        break;
      case 'ArrowDown':
        if (pacmanPosition < gridSize * (gridSize - 1)) newPosition += gridSize;
        break;
      case 'ArrowLeft':
        if (pacmanPosition % gridSize !== 0) newPosition -= 1;
        break;
      case 'ArrowRight':
        if (pacmanPosition % gridSize !== gridSize - 1) newPosition += 1;
        break;
      default:
        break;
    }

    if (dots.includes(newPosition)) {
      setDots(dots.filter(dot => dot !== newPosition));
      setScore(score + 1);
    }

    setPacmanPosition(newPosition);
  };

  const moveGhosts = () => {
    setGhosts(ghosts.map(ghost => {
      const direction = Math.floor(Math.random() * 4);
      let newPosition = ghost.position;

      switch (direction) {
        case 0:
          if (newPosition >= gridSize) newPosition -= gridSize;
          break;
        case 1:
          if (newPosition < gridSize * (gridSize - 1)) newPosition += gridSize;
          break;
        case 2:
          if (newPosition % gridSize !== 0) newPosition -= 1;
          break;
        case 3:
          if (newPosition % gridSize !== gridSize - 1) newPosition += 1;
          break;
        default:
          break;
      }

      return { ...ghost, position: newPosition };
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      movePacman(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => moveGhosts(), 400);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [pacmanPosition, ghosts]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900 py-16 px-52">
      <h1 className="text-yellow-400 text-4xl font-extrabold tracking-widest py-10">Pac Man</h1>
      
  {dots.map(dotIndex => (
    <img
      key={dotIndex}
      src={dot}
      alt="Dot"
      className="absolute"
      style={{
        left: (dotIndex % gridSize) * 50 + 10,
        top: Math.floor(dotIndex / gridSize) * 50 + 10,
        width: '30px',
        height: '30px',
      }}
    />
  ))}
  <img
    src={hero}
    alt="Pacman"
    className="absolute"
    style={{
      left: (pacmanPosition % gridSize) * 50 + 10,
      top: Math.floor(pacmanPosition / gridSize) * 50 + 10,
      width: '50px',
      height: '50px',
    }}
  />
  {ghosts.map(ghost => (
    <img
      key={ghost.id}
      src={ghost.image} // Use the specific image for each ghost
      alt={`Ghost ${ghost.id}`}
      className="absolute"
      style={{
        left: (ghost.position % gridSize) * 50 + 10,
        top: Math.floor(ghost.position / gridSize) * 50 + 10,
        width: '50px',
        height: '50px',
      }}
    />
  ))}


      <h2 className="text-white">Score: {score}</h2>
    </div>
  );
};

export default App;
