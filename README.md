# Charm.js [![Build Status](https://travis-ci.org/yuanqing/charm.svg?branch=master)](https://travis-ci.org/yuanqing/charm)

A vanilla JavaScript port of [Lettering.js](https://github.com/davatron5000/Lettering.js).

## Usage

We begin with an arbitary DOM element:

```html
<h1>foo</h1>
```

Invoking `charm`&hellip;

```js
var element = document.querySelectorAll('h1')[0];
charm(element);
```

&hellip;will give us:

```html
<h1>
  <span class="char1">f</span>
  <span class="char2">o</span>
  <span class="char3">o</span>
</h1>
```

Charm also works when [the given element contains other (possibly nested) DOM elements](https://github.com/yuanqing/charm/blob/master/test/spec/charm.spec.js). Essentially any character that is inside a child [text node](https://developer.mozilla.org/en-US/docs/Web/API/Text) of the given element will be captured and wrapped.

## Options

Pass in an options object if you want to change the `tagName` and/or `classPrefix`:

```js
charm(element, {
  tagName: 'b', // defaults to 'span'
  classPrefix: 'letter' // defaults to 'char'
});
```

Set `classPrefix` to `false` if you don&rsquo;t need numbered classes:

```js
charm(element, {
  classPrefix: false
});
```

## Installation

1. Install with [Bower](http://bower.io/):

  ```
  bower install https://github.com/yuanqing/charm.git
  ```

  Or just [grab the zip](https://github.com/yuanqing/charm/archive/master.zip).

2. Include [the minified script](https://github.com/yuanqing/charm/blob/master/dist/charm.min.js) in your HTML:

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

[MIT license](https://github.com/yuanqing/charm/blob/master/LICENSE)
