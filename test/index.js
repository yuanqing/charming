/* globals describe, it, expect */
'use strict';

var charming = require('../');

describe('charming(elem, opts)', function() {

  var createElement = function (innerHTML) {
    var elem = document.createElement('div');
    elem.innerHTML = innerHTML || '';
    document.body.appendChild(elem);
    return elem;
  };

  it('should not inject spans when `elem` has no child nodes', function() {
    var elem = createElement();
    charming(elem);
    expect(elem.innerHTML).toMatch('');
  });

  it('should not inject spans when `elem` has no child text nodes', function() {
    var innerHTML = '<span></span>',
      elem = createElement(innerHTML);
    charming(elem);
    expect(elem.innerHTML).toMatch(innerHTML);
  });

  it('should inject spans when `elem` has a single child text node', function() {
    var elem = createElement('foo');
    charming(elem);
    expect(elem.innerHTML).toMatch('<span class="char1">f</span><span class="char2">o</span><span class="char3">o</span>');
  });

  it('should inject spans when `elem` has multiple child text nodes', function() {
    var elem = createElement('<span>foo</span> <span>bar <span>baz</span></span>');
    charming(elem);
    expect(elem.innerHTML).toMatch('<span><span class="char1">f</span><span class="char2">o</span><span class="char3">o</span></span><span class="char4"> </span><span><span class="char5">b</span><span class="char6">a</span><span class="char7">r</span><span class="char8"> </span><span><span class="char9">b</span><span class="char10">a</span><span class="char11">z</span></span></span>');
  });

  it('can inject custom tags', function() {
    var elem = createElement('foo');
    charming(elem, {
      tagName: 'b'
    });
    expect(elem.innerHTML).toMatch('<b class="char1">f</b><b class="char2">o</b><b class="char3">o</b>');
  });

  it('can inject spans without classes', function() {
    var elem = createElement('foo');
    charming(elem, {
      classPrefix: false
    });
    expect(elem.innerHTML).toMatch('<span>f</span><span>o</span><span>o</span>');
  });

  it('can inject spans with a custom class prefix', function() {
    var elem = createElement('foo');
    charming(elem, {
      classPrefix: 'c'
    });
    expect(elem.innerHTML).toMatch('<span class="c1">f</span><span class="c2">o</span><span class="c3">o</span>');
  });

});
