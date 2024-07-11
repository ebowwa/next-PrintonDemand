// app/page.tsx
"use client";

import React, { useState } from 'react';
import hljs from '../highlight';
import 'highlight.js/styles/default.min.css';
import Quiz from '../quiz';

const HomePage: React.FC = () => {
  const [quiz1Result, setQuiz1Result] = useState<string | null>(null);
  const [quiz2Result, setQuiz2Result] = useState<string | null>(null);
  const [quiz3Result, setQuiz3Result] = useState<string | null>(null);

  const checkQuiz1 = (answer: string) => {
    if (answer.toLowerCase() === 'printf') {
      return "Correct! printf is used to print text to the console in C.";
    } else {
      return "Incorrect. Try again!";
    }
  };

  const checkQuiz2 = (answer: string) => {
    if (answer === 'float') {
      return "Correct! float is suitable for storing decimal numbers like weight.";
    } else {
      return "Incorrect. Try again!";
    }
  };

  const checkQuiz3 = (answer: string) => {
    if (answer.trim() === '1 2 3 4 5') {
      return "Correct! The loop prints numbers from 1 to 5.";
    } else {
      return "Incorrect. Try again!";
    }
  };

  return (
    <div className="container">
      <h1>Interactive C Programming Tutorial</h1>

      <h2>1. Hello, World!</h2>
      <p>Let's start with the classic "Hello, World!" program:</p>
      <pre><code className="language-c hljs" dangerouslySetInnerHTML={{
        __html: hljs.highlight(`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`, { language: 'c' }).value
      }}></code></pre>
      <p>This program does the following:</p>
      <ul>
        <li>Includes the standard input/output library</li>
        <li>Defines the main function, which is the entry point of every C program</li>
        <li>Uses printf to print "Hello, World!" to the console</li>
        <li>Returns 0 to indicate successful execution</li>
      </ul>

      <Quiz
        question="What function is used to print text to the console in C?"
        inputType="text"
        checkAnswer={checkQuiz1}
      />

      <h2>2. Variables and Data Types</h2>
      <p>C has several basic data types:</p>
      <ul>
        <li>int: for integers</li>
        <li>float: for single-precision floating-point numbers</li>
        <li>double: for double-precision floating-point numbers</li>
        <li>char: for single characters</li>
      </ul>
      <p>Here's an example using different data types:</p>
      <pre><code className="language-c hljs" dangerouslySetInnerHTML={{
        __html: hljs.highlight(`#include <stdio.h>

int main() {
    int age = 25;
    float height = 1.75;
    char grade = 'A';
    
    printf("Age: %d\\n", age);
    printf("Height: %.2f meters\\n", height);
    printf("Grade: %c\\n", grade);
    
    return 0;
}`, { language: 'c' }).value
      }}></code></pre>

      <Quiz
        question="Which data type would you use to store a person's weight in kilograms (e.g., 68.5)?"
        inputType="select"
        options={['int', 'float', 'char']}
        checkAnswer={checkQuiz2}
      />

      <h2>3. Control Structures</h2>
      <p>C provides various control structures for decision making and looping:</p>
      <h3>If-Else Statement</h3>
      <pre><code className="language-c hljs" dangerouslySetInnerHTML={{
        __html: hljs.highlight(`#include <stdio.h>

int main() {
    int number = 10;
    
    if (number > 0) {
        printf("The number is positive.\\n");
    } else if (number < 0) {
        printf("The number is negative.\\n");
    } else {
        printf("The number is zero.\\n");
    }
    
    return 0;
}`, { language: 'c' }).value
      }}></code></pre>

      <h3>For Loop</h3>
      <pre><code className="language-c hljs" dangerouslySetInnerHTML={{
        __html: hljs.highlight(`#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    return 0;
}`, { language: 'c' }).value
      }}></code></pre>

      <Quiz
        question="What will be the output of the for loop above?"
        inputType="text"
        checkAnswer={checkQuiz3}
      />

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