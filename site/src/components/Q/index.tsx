import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdvancedAITrainingGrid = () => {
  const gridSize = 5;
  const [episode, setEpisode] = useState(32);
  const [totalReward, setTotalReward] = useState(-735);
  const [epsilon, setEpsilon] = useState(0.7250);
  const [isPaused, setIsPaused] = useState(true);
  const [agentPosition, setAgentPosition] = useState({ row: 2, col: 3 });
  const [targetPosition] = useState({ row: 4, col: 4 });
  const [qTable, setQTable] = useState(() => 
    Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => 
        Array(4).fill(0) // 4 actions: up, right, down, left
      )
    )
  );

  const actions = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1]  // left
  ];

  const getReward = (row: number, col: number): number => {
    if (row === targetPosition.row && col === targetPosition.col) return 100;
    return -1; // small penalty for each move
  };

  const chooseAction = useCallback((row: number, col: number): number => {
    if (Math.random() < epsilon) {
      return Math.floor(Math.random() * 4);
    } else {
      return qTable[row][col].indexOf(Math.max(...qTable[row][col]));
    }
  }, [epsilon, qTable]);

  const updateQTable = useCallback((oldRow: number, oldCol: number, action: number, newRow: number, newCol: number, reward: number): void => {
    const learningRate = 0.1;
    const discountFactor = 0.9;
    const oldQ = qTable[oldRow][oldCol][action];
    const maxFutureQ = Math.max(...qTable[newRow][newCol]);
    const newQ = oldQ + learningRate * (reward + discountFactor * maxFutureQ - oldQ);
    
    setQTable(prevQTable => {
      const newQTable = [...prevQTable];
      newQTable[oldRow][oldCol] = [...newQTable[oldRow][oldCol]];
      newQTable[oldRow][oldCol][action] = newQ;
      return newQTable;
    });
  }, [qTable]);

  const runEpisode = useCallback((): (() => void) => {
    let currentPosition = { ...agentPosition };
    let episodeReward = 0;

    const moveAgent = (): boolean => {
      const action = chooseAction(currentPosition.row, currentPosition.col);
      const [dRow, dCol] = actions[action];
      const newRow = Math.max(0, Math.min(gridSize - 1, currentPosition.row + dRow));
      const newCol = Math.max(0, Math.min(gridSize - 1, currentPosition.col + dCol));
      
      const reward = getReward(newRow, newCol);
      episodeReward += reward;

      updateQTable(currentPosition.row, currentPosition.col, action, newRow, newCol, reward);

      currentPosition = { row: newRow, col: newCol };
      setAgentPosition(currentPosition);

      if (newRow === targetPosition.row && newCol === targetPosition.col) {
        return true; // Episode end
      }
      return false;
    };

    const intervalId = setInterval(() => {
      const isFinished = moveAgent();
      if (isFinished) {
        clearInterval(intervalId);
        setEpisode(prev => prev + 1);
        setTotalReward(prev => prev + episodeReward);
        setEpsilon(prev => Math.max(0.1, prev * 0.99)); // Decay epsilon
      }
    }, 100); // Adjust speed as needed

    return () => clearInterval(intervalId);
  }, [agentPosition, chooseAction, updateQTable]);

  useEffect(() => {
    if (!isPaused) {
      return runEpisode();
    }
  }, [isPaused, runEpisode]);

  const resetSimulation = () => {
    setEpisode(32);
    setTotalReward(-735);
    setEpsilon(0.7250);
    setAgentPosition({ row: 2, col: 3 });
    setQTable(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null).map(() => Array(4).fill(0))));
    setIsPaused(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Q-Learning</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Q-Learning Training Grid</DialogTitle>
          <DialogDescription>
          This Q-Learning demo trains a mini AI agent to navigate a 5x5 grid, aiming to find the green target square. It visualizes the agent's progress in real-time, displaying episode count, total reward, and epsilon value. Users can play, pause, and reset the simulation, observing the learning process through the Q-table updates.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <p>Episode: {episode}</p>
            <p>Total Reward: {totalReward.toFixed(2)}</p>
            <p>Epsilon: {epsilon.toFixed(4)}</p>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {[...Array(gridSize)].map((_, rowIndex) => (
              [...Array(gridSize)].map((_, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className={`w-12 h-12 border ${
                    rowIndex === agentPosition.row && colIndex === agentPosition.col
                      ? 'bg-blue-500'
                      : rowIndex === targetPosition.row && colIndex === targetPosition.col
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))
            ))}
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setIsPaused(!isPaused)}
              variant="outline"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </Button>
            <Button 
              onClick={resetSimulation}
              variant="outline"
            >
              <RotateCcw size={20} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedAITrainingGrid;