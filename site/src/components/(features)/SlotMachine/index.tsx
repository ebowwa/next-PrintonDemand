'use client'

import React, { useState, useEffect } from 'react';

const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

export default function SlotMachine() {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const spin = () => {
    setIsSpinning(true);
    
    let spinsCompleted = 0;

    reels.forEach((_, index) => {
      const spinInterval = setInterval(() => {
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[index] = getRandomSymbol();
          return newReels;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(spinInterval);
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[index] = getRandomSymbol();
          return newReels;
        });
        spinsCompleted++;

        if (spinsCompleted === reels.length) {
          setIsSpinning(false);
          checkWin();
        }
      }, (index + 1) * 1000);
    });
  };

  const checkWin = () => {
    if (reels.every(symbol => symbol === reels[0])) {
      alert('Congratulations! You won!');
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {reels.map((symbol, index) => (
            <div key={index} style={{
              width: '80px',
              height: '80px',
              border: '2px solid #333',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2em'
            }}>
              {symbol}
            </div>
          ))}
        </div>
        <button 
          onClick={spin} 
          disabled={isSpinning}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1.2em',
            backgroundColor: isSpinning ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSpinning ? 'not-allowed' : 'pointer'
          }}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    </div>
  );
}