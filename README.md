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
The method accepts two options:
- `max`: Maximum value of the generated number (inclusive).
- `min`: Minimum value of the generated number (inclusive, defaults to 0).
```
import { generateNumber } from 'cliff.js';

const num = generateNumber({ max: 10 });
const num2 = generateNumber({ max: 10, min: 5 });
```

### Generate a random string
You can generate a random string using the `generateString` method.
The method accepts two options:
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

const str3 = generateString({ length: 10, alphabet: CliffAlphabets.DIGITS });
```

### Generate a random vector
You can generate a vector of specified `length` using the `generateVector` method.
The method accepts three options:
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
The method accepts four options:
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

## License
`cliff.js` is available under the MIT license. See the [LICENSE](LICENSE) file for details.