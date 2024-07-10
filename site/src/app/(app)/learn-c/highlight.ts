// src/app/learn-c/highlight.ts
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';

hljs.registerLanguage('c', c);

export default hljs;