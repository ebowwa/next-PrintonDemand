/**
 * Time Interval; is a more complex implementation that includes a spin limit and time window, using localStorage to manage user spin data and providing feedback on remaining spins and the next reset time.
 */
'use client'

import React, { useState, useEffect } from 'react';

const symbols: string[] = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
const SPIN_LIMIT: number = 5; // Number of spins allowed
const TIME_WINDOW: number = 1; // Time window in hours

interface SpinData {
  spins: number[]; 
  lastReset: number | null;
}

export default function SlotMachine(): JSX.Element {
  const [reels, setReels] = useState<string[]>(['?', '?', '?']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinsRemaining, setSpinsRemaining] = useState<number>(SPIN_LIMIT);
  const [nextResetTime, setNextResetTime] = useState<Date | null>(null);

  useEffect(() => {
    loadSpinData();
  }, []);

  const loadSpinData = (): void => {
    const storedData = localStorage.getItem('spinData');
    const spinData: SpinData = storedData ? JSON.parse(storedData) : { spins: [], lastReset: null };
    const currentTime = new Date().getTime();

    if (!spinData.lastReset || currentTime - spinData.lastReset > TIME_WINDOW * 60 * 60 * 1000) {
      // Reset if it's the first spin or if the time window has passed
      spinData.spins = [];
      spinData.lastReset = currentTime;
    }

    const validSpins = spinData.spins.filter(timestamp => currentTime - timestamp < TIME_WINDOW * 60 * 60 * 1000);
    setSpinsRemaining(SPIN_LIMIT - validSpins.length);
    setNextResetTime(spinData.lastReset ? new Date(spinData.lastReset + TIME_WINDOW * 60 * 60 * 1000) : null);

    localStorage.setItem('spinData', JSON.stringify({
      spins: validSpins,
      lastReset: spinData.lastReset
    }));
  };

  const getRandomSymbol = (): string => symbols[Math.floor(Math.random() * symbols.length)];

  const spin = (): void => {
    if (spinsRemaining <= 0) {
      alert(`You've reached the spin limit. Next reset at ${nextResetTime?.toLocaleTimeString() || 'N/A'}`);
      return;
    }

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
          updateSpinCount();
        }
      }, (index + 1) * 1000);
    });
  };

  const updateSpinCount = (): void => {
    const storedData = localStorage.getItem('spinData');
    const spinData: SpinData = storedData ? JSON.parse(storedData) : { spins: [], lastReset: null };
    spinData.spins.push(new Date().getTime());
    localStorage.setItem('spinData', JSON.stringify(spinData));
    setSpinsRemaining(prevSpins => prevSpins - 1);
  };

  const checkWin = (): void => {
    if (reels.every(symbol => symbol === reels[0])) {
      alert('Congratulations! You won!');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0, backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {reels.map((symbol, index) => (
            <div key={index} style={{ width: '80px', height: '80px', border: '2px solid #333', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2em' }}>
              {symbol}
            </div>
          ))}
        </div>
        <button
          onClick={spin}
          disabled={isSpinning || spinsRemaining <= 0}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1.2em',
            backgroundColor: isSpinning || spinsRemaining <= 0 ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSpinning || spinsRemaining <= 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {isSpinning ? 'Spinning...' : `Spin (${spinsRemaining} left)`}
        </button>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Next reset: {nextResetTime ? nextResetTime.toLocaleTimeString() : 'N/A'}</p>
      </div>
    </div>
  );
}