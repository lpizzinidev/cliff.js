'use strict';

export enum CliffTypes {
  number,
  string,
}

type CliffStringOpts = {
  length: number;
  alphabet?: string;
};

type CliffNumberOpts = {
  max: number;
  min?: number;
};

type CliffVectorOpts<T extends CliffTypes> = {
  type?: T;
  length: number;
  itemOpts: T extends number ? CliffNumberOpts : CliffStringOpts;
};

type CliffMatrixOpts<T extends CliffTypes> = {
  type?: T;
  width: number;
  height: number;
  itemOpts: T extends number ? CliffNumberOpts : CliffStringOpts;
};

export enum CliffAlphabets {
  ALL_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALL_VOWELS = 'aeiouAEIOU',
  ALPHA_NUMERICS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  BINARIES = '01',
  LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz',
  LOWER_VOWELS = 'aeiou',
  NUMBERS = '0123456789',
  UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  UPPER_VOWELS = 'AEIOU',
}

export const repeat = (generator: () => any, times: number): string => {
  // Handle non-positive `times` parameter
  times = Math.max(1, times);
  let result = '';
  for (let i = 0; i < times; i++) { 
    result += generator().toString();
    if (i < times - 1) result += '\n';
  }
  return result;
}

export const generateString = (opts: CliffStringOpts): string => {
  if (opts.length < 0) throw 'Length must be greater than zero';
  // Default alphabet to lowercase english letters
  if (opts.alphabet === undefined) opts.alphabet = CliffAlphabets.LOWER_LETTERS
  if (opts.alphabet.length === 0) throw 'Alphabet must contain at least one character';
  let result = '';
  for (var i = 0; i < opts.length; i++) {
    result += opts.alphabet[generateNumber({ max: opts.alphabet.length - 1 })];
  }
  return result;
};

export const generateNumber = (opts: CliffNumberOpts): number => {
  const max = opts.max;
  const min = opts.min || 0;
  if (max < min) throw 'Maximum value must be greater than or equal to minimum value';
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateVector = <T extends CliffTypes>(
  opts: CliffVectorOpts<T>
): T[] => {
  if (opts.length <= 0) throw 'Length must be greater than zero';
  const res = [];
  for (let i = 0; i < opts.length; i++) {
    switch (opts.type) {
      case CliffTypes.number:
        res.push(generateNumber(opts.itemOpts as CliffNumberOpts));
        break;
      case CliffTypes.string:
        res.push(generateString(opts.itemOpts as CliffStringOpts));
        break;
      default:
        break;
    }
  }
  return res;
};

export const generateMatrix = <T extends CliffTypes>(
  opts: CliffMatrixOpts<T>
): T[][] => {
  if (opts.width <= 0) throw 'Width must be greater than zero';
  if (opts.height <= 0) throw 'Height must be greater than zero';
  const res = [];
  for (let i = 0; i < opts.width; i++) {
    res.push(
      generateVector<T>({
        type: opts.type,
        length: opts.height,
        itemOpts: opts.itemOpts,
      })
    );
  }
  return res;
};
