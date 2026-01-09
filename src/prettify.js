import * as prettier from 'prettier';

export default function (inputCSS) {
  return prettier.format(inputCSS, {
    singleQuote: false,
    parser: 'css',
  });
}
