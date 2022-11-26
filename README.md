# cliff.js

`cliff.js` is a automatic test case generator tool.

## Installation
You can install the library by running:
```
npm install cliff.js
```

## Usage
`cliff.js` currently supports the generation of the following data types:
- `number`
- `string`
- vectors of `number`s and `string`s
- matrices of `number`s and `string`s

### Generate a random number
You can generate a random number using the `generateNumber` method.
The method accepts an object parameter with two options:
- `max`: Maximum value of the generated number (inclusive).
- `min`: Minimum value of the generated number (inclusive, defaults to 0).
```
import { generateNumber } from 'cliff.js';

const num = generateNumber({ max: 10 });
const num2 = generateNumber({ max: 10, min: 5 });
```

### Generate a random string
You can generate a random string using the `generateString` method.
The method accepts an object parameter with two options:
- `length`: The length of the generated string.
- `alphabet`: The set of characters that will be used to generate the string (defaults to lowercase english letters).
```
import { generateString } from 'cliff.js';

const str = generateString({ length: 10 });
const str2 = generateString({ length: 10, alphabet: 'abc' });
```

You can access a predefined set of alphabets using `CliffAlphabets`.
```
import { CliffAlphabets } from 'cliff.js';

const str3 = generateString({ length: 10, alphabet: CliffAlphabets.NUMBERS });
```

Currently `CliffAlphabets` supports the following default alphabets:
- `ALL_LETTERS`: List of all lowercase and uppercase letters in the English alphabet.
- `LOWER_LETTERS`: List of all lowercase letters in the English alphabet.
- `UPPER_LETTERS`: List of all uppercase letters in the English alphabet.
- `ALL_VOWELS`: List of all lowercase and uppercase vowels in the English alphabet.
- `LOWER_VOWELS`: List of all lowercase vowels in the English alphabet.
- `UPPER_VOWELS`: List of all uppercase vowels in the English alphabet.
- `NUMBERS`: List of all the digits between 0 and 9.
- `BINARIES`: List of binary digits (0 and 1).
- `ALPHA_NUMERICS`: List of all lowercase and uppercase letters in the English alphabet and all the digits between 0 and 9.

### Generate a random vector
You can generate a vector of specified `length` using the `generateVector` method.
The method accepts an object parameter with three options:
- `type`: The type of the elements in the vector specified as a `CliffTypes`.
- `length`: The length of the vector.
- `itemOpts`: The options for the generation of each element in the vector.
```
import { CliffTypes, generateVector } from 'cliff.js';

const numVec = generateVector({ type: CliffTypes.number, length: 10, itemOpts: { max: 10 } });
const strVec = generateVector({ type: CliffTypes.string, length: 10, itemOpts: { length: 10 } });
```

### Generate a random matrix
You can generate a matrix of specified `width` and `height` using the `generateMatrix` method.
The method accepts an object parameter with four options:
- `type`: The type of the elements in the matrix specified as a `CliffTypes`.
- `width`: The width of the matrix.
- `height`: The height of the matrix.
- `itemOpts`: The options for the generation of each element in the matrix.
```
import { CliffTypes, generateMatrix } from 'cliff.js';

const numMat = generateVector({ 
    type: CliffTypes.number, 
    width: 5, 
    height: 3, 
    itemOpts: { max: 10 } 
});

const strMat = generateVector({ 
    type: CliffTypes.string, 
    width: 4, 
    height: 2, 
    itemOpts: { length: 10 } 
});
```

### Generate repeated values
You can generate repeated values for each of the above functions by using the `repeat` method.
The method accepts two parameters:
- `generator`: A callback function specifying the generator used
- `times`: The number of times the generator call will be repeated.
```
import { repeat, generateNumber } from 'cliff.js';

const repNum = repeat(() => generateNumber({ max: 10 }), 10);
```

## License
`cliff.js` is available under the MIT license. See the [LICENSE](LICENSE) file for details.