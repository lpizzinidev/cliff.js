import {
  CliffTypes,
  generateString,
  generateNumber,
  generateVector,
  generateMatrix,
  repeat,
} from '../src/index';

describe('Cliff.js', () => {
  describe('generateString()', () => {
    it('should generate a string of specified length', () => {
      const res = generateString({ length: 10 });
      expect(res.length).toBe(10);
      expect(typeof res).toBe('string');
    });

    it('should not accept a negative length for the string', () => {
      expect(() => {
        generateString({ length: -1 });
      }).toThrow('Length must be greater than zero');
    });

    it('should not accept an empty alphabet', () => {
      expect(() => {
        generateString({ length: 10, alphabet: '' });
      }).toThrow('Alphabet must contain at least one character');
    });

    it('should default alphabet to lowercase english letters', () => {
      const res = generateString({ length: 10 });
      expect(res.match(/^[a-z]+$/)).toBeTruthy();
    });
  });

  describe('generateNumber()', () => {
    it('should generate a number from 0 to max', () => {
      const res = generateNumber({ max: 10 });
      expect(res).toBeGreaterThanOrEqual(0);
      expect(res).toBeLessThanOrEqual(10);
      expect(typeof res).toBe('number');
    });

    it('should generate a number from min to max', () => {
      const res = generateNumber({ max: 10, min: 5 });
      expect(res).toBeGreaterThanOrEqual(5);
      expect(res).toBeLessThanOrEqual(10);
    });

    it('should generate a number with point range', () => {
      const res = generateNumber({ max: 9, min: 9 });
      expect(res).toBe(9);
    });

    it('should generate a a range of negative values', () => {
      const res = generateNumber({ max: -10, min: -20 });
      expect(res).toBeGreaterThanOrEqual(-20);
      expect(res).toBeLessThanOrEqual(-10);
    });

    it('should not accept an invalid range (max < min)', () => {
      expect(() => {
        generateNumber({ max: 4, min: 9 });
      }).toThrow(
        'Maximum value must be greater than or equal to minimum value'
      );
    });
  });

  describe('generateVector()', () => {
    it('should generate a vector of numbers', () => {
      const res = generateVector({
        type: CliffTypes.number,
        length: 10,
        itemOpts: { max: 10 },
      });
      expect(res.length).toBe(10);
      for (const num of res) {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(10);
        expect(typeof num).toBe('number');
      }
    });

    it('should not accept an invalid length', () => {
      expect(() => {
        generateVector({
          type: CliffTypes.number,
          length: -10,
          itemOpts: { max: 10 },
        });
      }).toThrow('Length must be greater than zero');
    });
  });

  describe('generateMatrix()', () => {
    it('should generate a matrix of numbers', () => {
      const res = generateMatrix({
        type: CliffTypes.number,
        width: 10,
        height: 10,
        itemOpts: { max: 10 },
      });
      expect(res.length).toBe(10);
      for (const row of res) {
        expect(row.length).toBe(10);
        for (const num of row) {
          expect(num).toBeGreaterThanOrEqual(0);
          expect(num).toBeLessThanOrEqual(10);
          expect(typeof num).toBe('number');
        }
      }
    });
  });

  it('should not accept an invalid width', () => {
    expect(() => {
      generateMatrix({
        type: CliffTypes.number,
        width: -10,
        height: 10,
        itemOpts: { max: 10 },
      });
    }).toThrow('Width must be greater than zero');
  });

  it('should not accept an invalid height', () => {
    expect(() => {
      generateMatrix({
        type: CliffTypes.number,
        width: 10,
        height: -10,
        itemOpts: { max: 10 },
      });
    }).toThrow('Height must be greater than zero');
  });

  describe('repeat()', () => {
    it('should generate a repeated sequence of numbers', () => {
      const res = repeat(() => generateNumber({ max: 10 }), 10);
      const split = res.split('\n');
      expect(split.length).toEqual(10);
      for (const num of split) {
        expect(Number(num)).not.toBeNaN();
      }
    });

    it('should generate a repeated sequence of strings', () => {
      const res = repeat(() => generateString({ length: 10 }), 10);
      const split = res.split('\n');
      expect(split.length).toEqual(10);
      for (const str of split) {
        expect(str.length).toEqual(10);
      }
    });

    it('should generate a repeated sequence of vectors', () => {
      const res = repeat(
        () =>
          generateVector({
            type: CliffTypes.number,
            length: 10,
            itemOpts: { max: 10 },
          }),
        10
      );
      const split = res.split('\n');
      expect(split.length).toEqual(10);
    });

    it('should generate a repeated sequence of matrices', () => {
      const res = repeat(
        () =>
          generateMatrix({
            type: CliffTypes.number,
            width: 2,
            height: 2,
            itemOpts: { max: 10 },
          }),
        10
      );
      const split = res.split('\n');
      expect(split.length).toEqual(10);
    });

    it('should handle negative `times` parameter values', () => {
      const res = repeat(() => generateNumber({ max: 10 }), -10);
      const split = res.split('\n');
      expect(split.length).toEqual(1);
    });
  });
});
