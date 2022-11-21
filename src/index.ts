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
  LETTERS = 'abcdefghijklmnopqrstuvwxyz',
  DIGITS = '0123456789',
  BINARIES = '01',
}

export const generateString = (opts: CliffStringOpts): string => {
  if (opts.length < 0) throw 'Length must be greater than zero';
  // Default alphabet to lowercase english letters
  if (opts.alphabet === undefined) opts.alphabet = CliffAlphabets.LETTERS
  if (opts.alphabet.length === 0) throw 'Alphabet must contain at least one character';
  let result = '';
  for (var i = 0; i < opts.length; i++) {
    result += opts.alphabet[Math.floor(Math.random() * opts.alphabet.length)];
  }
  return result;
};

export const generateNumber = (opts: CliffNumberOpts): number => {
  return Math.floor(Math.random() * opts.max) + (opts.min || 0);
};

export const generateVector = <T extends CliffTypes>(
  opts: CliffVectorOpts<T>
): T[] => {
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
        return res;
    }
  }
  return res;
};

export const generateMatrix = <T extends CliffTypes>(
  opts: CliffMatrixOpts<T>
): T[][] => {
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
