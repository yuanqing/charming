# Charming.js [![npm Version](http://img.shields.io/npm/v/charming.svg?style=flat)](https://www.npmjs.org/package/charming) [![Build Status](https://img.shields.io/travis/yuanqing/charming.svg?style=flat)](https://travis-ci.org/yuanqing/charming) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/charming.svg?style=flat)](https://coveralls.io/r/yuanqing/charming)

> [Lettering.js](https://github.com/davatron5000/Lettering.js) in vanilla JavaScript.

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

Charming.js also works when [the given element contains other (possibly nested) DOM elements](https://github.com/yuanqing/charming/blob/master/test/spec/charm.spec.js); any character that is inside a [text node](https://developer.mozilla.org/en-US/docs/Web/API/Text) in the given element will be wrapped.

## API

### charming(elem, [opts])

Pass in an `opts` object if you want to change the `tagName` and/or the `classPrefix`:

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

1. Install via [npm](https://www.npmjs.org/package/charming):

  ```bash
  $ npm i --save charming
  ```

  Or just [grab the zip](https://github.com/yuanqing/charming/archive/master.zip).

2. Include [the minified script](https://github.com/yuanqing/charming/blob/master/dist/charm.min.js) in your HTML:

  ```html
  <body>
    <!-- ... -->
    <script src="path/to/charm/dist/charm.min.js"></script>
    <script>
      // charm available here
    </script>
  </body>
  ```

## License

[MIT license](https://github.com/yuanqing/charming/blob/master/LICENSE)
