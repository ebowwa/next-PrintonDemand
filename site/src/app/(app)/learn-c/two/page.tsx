// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/default.min.css';

hljs.registerLanguage('c', c);

const HomePage: React.FC = () => {
  const [quiz4Result, setQuiz4Result] = useState<string | null>(null);
  const [quiz5Result, setQuiz5Result] = useState<string | null>(null);
  const [quiz6Result, setQuiz6Result] = useState<string | null>(null);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, []);

  const checkQuiz4 = (answer: string) => {
    if (answer.toLowerCase() === 'int') {
      setQuiz4Result("Correct! The 'add' function returns an int.");
    } else {
      setQuiz4Result("Incorrect. Try again!");
    }
  };

  const checkQuiz5 = (answer: string) => {
    if (answer === '4') {
      setQuiz5Result("Correct! The index of the last element is 4 (remember, arrays in C are zero-indexed).");
    } else {
      setQuiz5Result("Incorrect. Remember, array indexing starts at 0.");
    }
  };

  const checkQuiz6 = (answer: string) => {
    if (answer === '&') {
      setQuiz6Result("Correct! The '&' operator is used to get the address of a variable.");
    } else {
      setQuiz6Result("Incorrect. Try again!");
    }
  };

  return (
    <div className="container">
      <h1>Interactive C Programming Tutorial - Part 2</h1>

      <h2>4. Functions</h2>
      <p>Functions in C allow you to organize your code into reusable blocks:</p>
      <pre><code className="language-c">
        {`#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Function declaration before main()</li>
        <li>Function call within main()</li>
        <li>Function definition after main()</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Functions</h3>
        <p>What is the return type of the 'add' function?</p>
        <input type="text" id="quiz4-answer" />
        <button onClick={() => checkQuiz4((document.getElementById('quiz4-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz4Result?.includes('Correct') ? 'green' : 'red' }}>{quiz4Result}</p>
      </div>

      <h2>5. Arrays</h2>
      <p>Arrays in C allow you to store multiple values of the same type:</p>
      <pre><code className="language-c">
        {`#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    
    printf("The elements of the array are: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    return 0;
}`}
      </code></pre>
      <p>This example shows:</p>
      <ul>
        <li>Array declaration and initialization</li>
        <li>Accessing array elements using index</li>
        <li>Iterating through an array using a for loop</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Arrays</h3>
        <p>What is the index of the last element in the 'numbers' array?</p>
        <input type="number" id="quiz5-answer" />
        <button onClick={() => checkQuiz5((document.getElementById('quiz5-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz5Result?.includes('Correct') ? 'green' : 'red' }}>{quiz5Result}</p>
      </div>

      <h2>6. Pointers</h2>
      <p>Pointers in C are variables that store memory addresses:</p>
      <pre><code className="language-c">
        {`#include <stdio.h>

int main() {
    int x = 10;
    int *ptr = &x;
    
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", (void*)&x);
    printf("Value of ptr: %p\\n", (void*)ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);
    
    return 0;
}`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Declaring a pointer</li>
        <li>Getting the address of a variable</li>
        <li>Dereferencing a pointer</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Pointers</h3>
        <p>What operator is used to get the address of a variable?</p>
        <input type="text" id="quiz6-answer" />
        <button onClick={() => checkQuiz6((document.getElementById('quiz6-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz6Result?.includes('Correct') ? 'green' : 'red' }}>{quiz6Result}</p>
      </div>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1, h2 {
          color: #333;
        }
        .code-block {
          background-color: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 20px;
        }
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

export default HomePage;