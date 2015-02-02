# Charming.js [![npm Version](http://img.shields.io/npm/v/charming.svg?style=flat)](https://www.npmjs.org/package/charming) [![Build Status](https://img.shields.io/travis/yuanqing/charming.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/charming) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/charming.svg?style=flat)](https://coveralls.io/r/yuanqing/charming)

> [Lettering.js](https://github.com/davatron5000/Lettering.js) in vanilla JavaScript.

- Optionally change the inserted DOM element (defaults to `span`), or change or remove the class prefix (defaults to `char`)
- Just 0.53 KB [minified](https://github.com/yuanqing/charming/blob/master/charming.min.js), or 0.37 KB minified and gzipped

## Usage

HTML:

```html
<h1>foo</h1>
```

JavaScript:

```js
var element = document.querySelectorAll('h1')[0];
charming(element);
```

Boom:

```html
<h1>
  <span class="char1">f</span>
  <span class="char2">o</span>
  <span class="char3">o</span>
</h1>
```

Charming also works when the given element contains other (possibly nested) DOM elements; any character that is inside a [text node](https://developer.mozilla.org/en-US/docs/Web/API/Text) in the given element will be wrapped.

## API

### charming(elem [, opts])

Pass in an `opts` object if you want to change the `tagName` or `classPrefix`:

```js
charming(element, {
  tagName: 'b', // defaults to 'span'
  classPrefix: 'letter' // defaults to 'char'
});
```

Set `classPrefix` to `false` if you don&rsquo;t need a class on each wrapper element:

```js
charming(element, {
  classPrefix: false
});
```

## Installation

Install via [npm](https://npmjs.com/):

```bash
$ npm i --save charming
```

Install via [bower](http://bower.io/):

```bash
$ bower i --save yuanqing/charming
```

To use Charming in the browser, include [the minified script](https://github.com/yuanqing/charming/blob/master/charming.min.js) in your HTML:

```html
<body>
  <!-- ... -->
  <script src="path/to/charming.min.js"></script>
  <script>
    // charming available here
  </script>
</body>
```

## License

[MIT](https://github.com/yuanqing/charming/blob/master/LICENSE)
