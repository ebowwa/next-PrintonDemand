// src/app/learn-c/quiz.tsx
"use client";

import React, { useState } from 'react';

interface QuizProps {
  question: string;
  inputType: 'text' | 'select';
  options?: string[];
  checkAnswer: (answer: string) => string;
}

const Quiz: React.FC<QuizProps> = ({ question, inputType, options, checkAnswer }) => {
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answer = formData.get('answer') as string;
    const result = checkAnswer(answer);
    setResult(result);
  };

  return (
    <div className="quiz">
      <h3>Quiz</h3>
      <p>{question}</p>
      <form onSubmit={handleSubmit}>
        {inputType === 'text' ? (
          <input type="text" name="answer" />
        ) : (
          <select name="answer">
            <option value="">Select an answer</option>
            {options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
        <button type="submit">Submit</button>
      </form>
      <p style={{ color: result?.includes('Correct') ? 'green' : 'red' }}>{result}</p>
      <style jsx>{`
        .quiz {
          background-color: #e7f3fe;
          border: 1px solid #c2e0ff;
          border-radius: 4px;
          padding: 15px;
          margin-top: 20px;
        }
        button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Quiz;