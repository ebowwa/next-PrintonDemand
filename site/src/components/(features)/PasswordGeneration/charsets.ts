export type CharsetKey = 'lowercase' | 'uppercase' | 'numbers' | 'symbols' | 'greek' | 'cyrillic' | 'japanese' | 'arabic';

export type Charsets = {
  [key in CharsetKey]: string;
};
export const charsets: Charsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    greek: 'αβγδεζηθικλμνξοπρστυφχψω',
    cyrillic: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    japanese: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
    arabic: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
  };

export type AdditionalCharsetOption = 'none' | CharsetKey;