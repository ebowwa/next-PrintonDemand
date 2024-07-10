// utils/base64.ts

/**
 * Reads a file and returns its content as a base64 encoded string.
 * @param file - The file to read.
 * @returns A promise that resolves to the base64 encoded string.
 */
export const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Converts a base64 encoded string to a Blob object.
 * @param base64 - The base64 encoded string.
 * @param mimeType - The MIME type of the resulting Blob.
 * @returns A Blob object.
 */
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};

/**
 * Converts a Blob object to a base64 encoded string.
 * @param blob - The Blob object to convert.
 * @returns A promise that resolves to the base64 encoded string.
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};

/**
 * Converts a base64 encoded string to a File object.
 * @param base64 - The base64 encoded string.
 * @param fileName - The name of the file.
 * @param mimeType - The MIME type of the file.
 * @returns A File object.
 */
export const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
};

/**
 * Checks if a string is a valid base64 encoded string.
 * @param str - The string to check.
 * @returns True if the string is a valid base64 encoded string, false otherwise.
 */
export const isBase64 = (str: string): boolean => {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};