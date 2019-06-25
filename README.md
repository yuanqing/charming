# charming [![npm Version](https://badgen.net/npm/v/charming)](https://www.npmjs.org/package/charming) [![Build Status](https://badgen.net/travis/yuanqing/charming?label=build)](https://travis-ci.org/yuanqing/charming) [![Coverage Status](https://badgen.net/coveralls/c/github/yuanqing/charming)](https://coveralls.io/r/yuanqing/charming) [![Bundle Size](https://badgen.net/bundlephobia/minzip/charming)](https://bundlephobia.com/result?p=charming)

> [Lettering.js](https://github.com/davatron5000/Lettering.js) in vanilla JavaScript

- Supports changing the inserted DOM element
- Supports setting a custom class on each inserted DOM element
- Supports passing in callback to control how the contents of the element are wrapped

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/YeYdrm)

HTML:

```html
<h1>foo</h1>
```

JavaScript:

```js
const charming = require('charming')

const element = document.querySelector('h1')
charming(element)
```

Boom:

```html
<h1 aria-label="foo">
  <span class="char1" aria-hidden="true">f</span>
  <span class="char2" aria-hidden="true">o</span>
  <span class="char3" aria-hidden="true">o</span>
</h1>
```

- Charming also works when the given element contains other (possibly nested) DOM elements; any character that is inside a [text node](https://developer.mozilla.org/en-US/docs/Web/API/Text) in the given element will be wrapped.
- For accessibility, Charming adds an `aria-label` attribute on the given element and `aria-hidden` attributes on each of the inserted DOM elements.

## API

```js
const charming = require('charming')
```

### charming(element [, options])

- `element` is a DOM element
- `options` is an optional configuration object

Use `tagName` to change the tag name of the wrapper element:

```js
charming(element, {
  tagName: 'b'
})
```

Use the `setClassName` callback to change the class name on each wrapper element:

```js
charming(element, {
  setClassName: function (index, letter) {
    return `index-${index} letter-${letter}`
  }
})
```

Use the `split` callback to control how the contents of the element are wrapped:

```js
charming(element, {
  split: function (string) {
    return string.split(/(\s+)/)
  },
  setClassName: function (index) {
    return `word-${index}`
  }
})
```

## Installation

```sh
$ yarn add charming
```

## License

[MIT](LICENSE.md)
