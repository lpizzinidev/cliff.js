'use strict';

enum CliffTypes {
    String,
    Number
}

type CliffStringOpts = {
    length: number,
    alphabet: string
}

type CliffNumberOpts = {
    max: number,
    min?: number
}

type CliffVectorOpts<T extends CliffTypes> = {
    type: T extends CliffTypes.String ? 'string' : 'number',
    length: number,
    itemOpts: T extends CliffTypes.String ? CliffStringOpts : CliffNumberOpts
}

type CliffMatrixOpts<T extends CliffTypes> = {
    type: T extends CliffTypes.String ? 'string' : 'number',
    width: number,
    height: number,
    itemOpts: T extends CliffTypes.String ? CliffStringOpts : CliffNumberOpts
}

export enum CliffAlphabets {
    LETTERS = 'abcdefghijklmnopqrstuvwxyz',
    DIGITS = '0123456789',
    BINARIES = '01'
}

export const generateString = (opts: CliffStringOpts): string => {
    let result = '';
    for (var i = 0; i < opts.length; i++) {
        result += opts.alphabet[Math.floor(Math.random() * opts.alphabet.length)];
    }
    return result;
}

export const generateNumber = (opts: CliffNumberOpts): number => {
    return Math.floor(Math.random() * opts.max) + (opts.min || 0);
}

export const generateVector = <T extends CliffTypes>(opts: CliffVectorOpts<T>): any[] => {
    const res = [];
    let generator;
    switch (opts.type) {
        case 'string':
            generator = generateString(opts.itemOpts as CliffStringOpts);
            break;
        case 'number':
            generator = generateNumber(opts.itemOpts as CliffNumberOpts);
            break;
        default:
            return res;
    }
    for (let i = 0; i < opts.length; i++) {
        res.push(generator());
    }
    return res;
}

export const generateMatrix = <T extends CliffTypes>(opts: CliffMatrixOpts<T>): any[] => {
    const res = [];
    let generator;
    switch (opts.type) {
        case 'string':
            generator = generateString(opts.itemOpts as CliffStringOpts);
            break;
        case 'number':
            generator = generateNumber(opts.itemOpts as CliffNumberOpts);
            break;
        default:
            return res;
    }
    for (let i = 0; i < opts.width; i++) {
        const row = [];
        for (let j = 0; j < opts.height; j++) {
            row.push(generator());
        }
        res.push(row);
    }
    return res;
}