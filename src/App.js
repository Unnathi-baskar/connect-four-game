import { useEffect } from 'react';
import './App.css';
import { initializeBoard , handleClick } from './boardlayout';

function App() 
{
  const columns = 8;
  const rows = 8;

  useEffect(() => {
    initializeBoard(columns, rows);
  });

  return (
    <div className="game">
      <header>
        <h2 className="h2" >Connect Four</h2>
          <div id="turn">
            Turn : Player <span id="player">1</span>
          </div>
          <div id="outcome"><span id="result"></span></div>
      </header>
      <div id="board"></div>
    </div>
    
  );
}

export default App;
