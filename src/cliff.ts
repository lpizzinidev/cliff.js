'use strict';

export enum CliffAlphabets {
    LETTERS = 'abcdefghijklmnopqrstuvwxyz',
    DIGITS = '0123456789',
    BINARIES = '01'
}

class Cliff {
    public static randomString(length: number, alphabet = CliffAlphabets.LETTERS): string {
        let result = '';
        for (var i = 0; i < length; i++) {
            result += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return result;
    }

    public static randomNumber(max: number, min = 0): number {
        return Math.floor(Math.random() * max) + min;
    }

    public static randomVector(length: number): any[] {
        const res = [];
        for (let i = 0; i < length; i++) {
            res.push(this.randomNumber(1000));
        }
        return res;
    }
}

export default Cliff;