// src/utils/imageDBUtils.ts
import { openDB } from 'idb';

export const dbPromise = openDB('imagesDB', 1, {
  upgrade(db) {
    db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
  },
});

export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', blobUrl);
    xhr.responseType = 'blob';
    xhr.send();
  });
};