import { generateString } from '../src/index';

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
});
