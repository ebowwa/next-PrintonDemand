// app/page.tsx
"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/default.min.css';

hljs.registerLanguage('c', c);

const Page = () => {
  const [quiz13Result, setQuiz13Result] = useState('');
  const [quiz14Result, setQuiz14Result] = useState('');
  const [quiz15Result, setQuiz15Result] = useState('');

  const checkQuiz13 = () => {
    const answer = (document.getElementById('quiz13-answer') as HTMLInputElement).value.toLowerCase();
    if (answer === '#ifndef' || answer === 'ifndef') {
      setQuiz13Result("Correct! #ifndef is used to create header guards and prevent multiple inclusions.");
    } else {
      setQuiz13Result("Incorrect. Try again!");
    }
  };

  const checkQuiz14 = () => {
    const answer = (document.getElementById('quiz14-answer') as HTMLInputElement).value.toLowerCase();
    if (answer === 'strerror') {
      setQuiz14Result("Correct! strerror() is used to get a string description of the last error.");
    } else {
      setQuiz14Result("Incorrect. Try again!");
    }
  };

  const checkQuiz15 = () => {
    const answer = (document.getElementById('quiz15-answer') as HTMLInputElement).value.toLowerCase();
    if (answer === 'argc') {
      setQuiz15Result("Correct! argc holds the number of command-line arguments.");
    } else {
      setQuiz15Result("Incorrect. Try again!");
    }
  };

  return (
    <div>
      <Head>
        <title>Interactive C Programming Tutorial - Part 5</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <style jsx>{`
        body {
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
      <h1>Interactive C Programming Tutorial - Part 5</h1>
      
      <h2>13. Multi-file Programs and Header Files</h2>
      <p>Large C programs are typically split into multiple files for better organization:</p>
      <pre><code className="language-c">
{`
// math_operations.h
#ifndef MATH_OPERATIONS_H
#define MATH_OPERATIONS_H

int add(int a, int b);
int subtract(int a, int b);

#endif

// math_operations.c
#include "math_operations.h"

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

// main.c
#include <stdio.h>
#include "math_operations.h"

int main() {
    printf("10 + 5 = %d\n", add(10, 5));
    printf("10 - 5 = %d\n", subtract(10, 5));
    return 0;
}
`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Creating header files with function declarations</li>
        <li>Implementing functions in separate .c files</li>
        <li>Using header guards to prevent multiple inclusions</li>
        <li>Including custom header files in other .c files</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Multi-file Programs</h3>
        <p>What preprocessor directive is used to prevent multiple inclusions of a header file?</p>
        <input type="text" id="quiz13-answer" />
        <button onClick={checkQuiz13}>Submit</button>
        <p style={{ color: quiz13Result.includes('Correct') ? 'green' : 'red' }}>{quiz13Result}</p>
      </div>

      <h2>14. Error Handling and Assert</h2>
      <p>Proper error handling is crucial for robust C programs:</p>
      <pre><code className="language-c">
{`
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <string.h>

int divide(int a, int b) {
    assert(b != 0);  // Will terminate the program if b is zero
    return a / b;
}

int main() {
    FILE *file = fopen("nonexistent.txt", "r");
    if (file == NULL) {
        fprintf(stderr, "Error opening file: %s\n", strerror(errno));
        return 1;
    }

    int result = divide(10, 2);
    printf("10 / 2 = %d\n", result);

    result = divide(10, 0);  // This will trigger the assert
    printf("This line will not be executed\n");

    return 0;
}
`}
      </code></pre>
      <p>This example shows:</p>
      <ul>
        <li>Using assert() for runtime checks</li>
        <li>Handling file opening errors</li>
        <li>Using errno and strerror() for detailed error information</li>
        <li>Proper error reporting to stderr</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Error Handling</h3>
        <p>What function is used to get a string description of the last error that occurred?</p>
        <input type="text" id="quiz14-answer" />
        <button onClick={checkQuiz14}>Submit</button>
        <p style={{ color: quiz14Result.includes('Correct') ? 'green' : 'red' }}>{quiz14Result}</p>
      </div>

      <h2>15. Command-line Arguments</h2>
      <p>C programs can accept arguments from the command line:</p>
      <pre><code className="language-c">
{`
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <num1> <num2>\n", argv[0]);
        return 1;
    }

    int num1 = atoi(argv[1]);
    int num2 = atoi(argv[2]);

    printf("Sum: %d\n", num1 + num2);
    printf("Difference: %d\n", num1 - num2);
    printf("Product: %d\n", num1 * num2);

    if (num2 != 0) {
        printf("Quotient: %d\n", num1 / num2);
    } else {
        fprintf(stderr, "Error: Division by zero\n");
    }

    return 0;
}
`}
      </code></pre>
      <p>This example demonstrates:</p>
      <ul>
        <li>Accessing command-line arguments using argc and argv</li>
        <li>Converting string arguments to integers using atoi()</li>
        <li>Proper usage messages and error handling</li>
        <li>Performing operations based on command-line input</li>
      </ul>

      <div className="quiz">
        <h3>Quiz: Command-line Arguments</h3>
        <p>What is the name of the parameter that holds the number of command-line arguments?</p>
        <input type="text" id="quiz15-answer" />
        <button onClick={checkQuiz15}>Submit</button>
        <p style={{ color: quiz15Result.includes('Correct') ? 'green' : 'red' }}>{quiz15Result}</p>
      </div>
    </div>
  );
};

export default Page;