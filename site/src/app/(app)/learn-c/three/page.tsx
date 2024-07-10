// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/default.min.css';

hljs.registerLanguage('c', c);

const HomePage: React.FC = () => {
  const [quiz7Result, setQuiz7Result] = useState<string | null>(null);
  const [quiz8Result, setQuiz8Result] = useState<string | null>(null);
  const [quiz9Result, setQuiz9Result] = useState<string | null>(null);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, []);

  const checkQuiz7 = (answer: string) => {
    if (answer === '.') {
      setQuiz7Result("Correct! The '.' (dot) operator is used to access structure members.");
    } else {
      setQuiz7Result("Incorrect. Try again!");
    }
  };

  const checkQuiz8 = (answer: string) => {
    if (answer.toLowerCase() === 'fopen') {
      setQuiz8Result("Correct! The fopen() function is used to open a file in C.");
    } else {
      setQuiz8Result("Incorrect. Try again!");
    }
  };

  const checkQuiz9 = (answer: string) => {
    if (answer.toLowerCase() === 'free') {
      setQuiz9Result("Correct! The free() function is used to free dynamically allocated memory in C.");
    } else {
      setQuiz9Result("Incorrect. Try again!");
    }
  };

  return (
    <div className="container">
      <h1>Interactive C Programming Tutorial - Part 3</h1>

      <h2>7. Structures</h2>
      <p>Structures in C allow you to group different data types under a single name:</p>
      <pre><code className="language-c">
        {`#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1;
    
    strcpy(s1.name, "John Doe");
    s1.age = 20;
    s1.gpa = 3.8;
    
    printf("Student: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.2f\\n", s1.gpa);
    
    return 0;
}`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Defining a structure</li>
        <li>Creating a structure variable</li>
        <li>Accessing structure members</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Structures</h3>
        <p>What operator is used to access structure members?</p>
        <input type="text" id="quiz7-answer" />
        <button onClick={() => checkQuiz7((document.getElementById('quiz7-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz7Result?.includes('Correct') ? 'green' : 'red' }}>{quiz7Result}</p>
      </div>

      <h2>8. File I/O</h2>
      <p>C provides functions to read from and write to files:</p>
      <pre><code className="language-c">
        {`#include <stdio.h>

int main() {
    FILE *file;
    char text[] = "Hello, File I/O!";
    char buffer[100];

    // Writing to a file
    file = fopen("example.txt", "w");
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    fprintf(file, "%s", text);
    fclose(file);

    // Reading from a file
    file = fopen("example.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    fgets(buffer, sizeof(buffer), file);
    printf("Read from file: %s\\n", buffer);
    fclose(file);

    return 0;
}`}
      </code></pre>
      <p>This example shows:</p>
      <ul>
        <li>Opening a file for writing and reading</li>
        <li>Writing to a file using fprintf()</li>
        <li>Reading from a file using fgets()</li>
        <li>Closing files</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: File I/O</h3>
        <p>What function is used to open a file in C?</p>
        <input type="text" id="quiz8-answer" />
        <button onClick={() => checkQuiz8((document.getElementById('quiz8-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz8Result?.includes('Correct') ? 'green' : 'red' }}>{quiz8Result}</p>
      </div>

      <h2>9. Dynamic Memory Allocation</h2>
      <p>C allows you to allocate memory dynamically using functions like malloc() and free():</p>
      <pre><code className="language-c">
        {`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *numbers;
    int n = 5;

    // Allocate memory
    numbers = (int*)malloc(n * sizeof(int));
    
    if (numbers == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < n; i++) {
        numbers[i] = i * 10;
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(numbers);

    return 0;
}`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Allocating memory dynamically using malloc()</li>
        <li>Checking if memory allocation was successful</li>
        <li>Using the allocated memory</li>
        <li>Freeing the allocated memory using free()</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Dynamic Memory Allocation</h3>
        <p>What function is used to free dynamically allocated memory in C?</p>
        <input type="text" id="quiz9-answer" />
        <button onClick={() => checkQuiz9((document.getElementById('quiz9-answer') as HTMLInputElement)?.value || '')}>Submit</button>
        <p style={{ color: quiz9Result?.includes('Correct') ? 'green' : 'red' }}>{quiz9Result}</p>
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