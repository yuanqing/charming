const test = require('tape')
const charming = require('./')

function createElement (innerHTML) {
  const element = document.createElement('div')
  element.innerHTML = innerHTML || ''
  document.body.appendChild(element)
  return element
}

test('should not inject spans when `element` has no child nodes', function (t) {
  t.plan(2)
  const element = createElement()
  charming(element)
  t.equal(element.innerHTML, '')
  t.equal(element.getAttribute('aria-label'), null)
})

test('should not inject spans when `element` has no child text nodes', function (t) {
  t.plan(2)
  const innerHTML = '<span></span>'
  const element = createElement(innerHTML)
  charming(element)
  t.equal(element.innerHTML, innerHTML)
  t.equal(element.getAttribute('aria-label'), null)
})

test('should inject spans when `element` has a single child text node', function (t) {
  t.plan(2)
  const element = createElement('foo')
  charming(element)
  t.equal(element.getAttribute('aria-label'), 'foo')
  t.equal(
    element.innerHTML,
    '<span class="char1" aria-hidden="true">f</span><span class="char2" aria-hidden="true">o</span><span class="char3" aria-hidden="true">o</span>'
  )
})

test('should inject spans when `element` has multiple child text nodes', function (t) {
  t.plan(2)
  const element = createElement(
    '<span>foo</span> <span>bar <span>baz</span></span>'
  )
  charming(element)
  t.equal(element.getAttribute('aria-label'), null)
  t.equal(
    element.innerHTML,
    '<span aria-label="foo"><span class="char1" aria-hidden="true">f</span><span class="char2" aria-hidden="true">o</span><span class="char3" aria-hidden="true">o</span></span><span class="char4" aria-hidden="true"> </span><span aria-label="bar "><span class="char5" aria-hidden="true">b</span><span class="char6" aria-hidden="true">a</span><span class="char7" aria-hidden="true">r</span><span class="char8" aria-hidden="true"> </span><span aria-label="baz"><span class="char9" aria-hidden="true">b</span><span class="char10" aria-hidden="true">a</span><span class="char11" aria-hidden="true">z</span></span></span>'
  )
})

test('should correctly set `aria-label` when `element` contains adjacent child text nodes', function (t) {
  t.plan(2)
  const element = createElement()
  element.appendChild(document.createTextNode('foo'))
  element.appendChild(document.createTextNode('bar'))
  charming(element)
  t.equal(element.getAttribute('aria-label'), 'foobar')
  t.equal(
    element.innerHTML,
    '<span class="char1" aria-hidden="true">f</span><span class="char2" aria-hidden="true">o</span><span class="char3" aria-hidden="true">o</span><span class="char4" aria-hidden="true">b</span><span class="char5" aria-hidden="true">a</span><span class="char6" aria-hidden="true">r</span>'
  )
})

test('can inject custom tags', function (t) {
  t.plan(2)
  const element = createElement('foo')
  charming(element, {
    tagName: 'b'
  })
  t.equal(element.getAttribute('aria-label'), 'foo')
  t.equal(
    element.innerHTML,
    '<b class="char1" aria-hidden="true">f</b><b class="char2" aria-hidden="true">o</b><b class="char3" aria-hidden="true">o</b>'
  )
})

test('can inject spans without classes', function (t) {
  t.plan(2)
  const element = createElement('foo')
  charming(element, {
    setClassName: function () {
      return null
    }
  })
  t.equal(element.getAttribute('aria-label'), 'foo')
  t.equal(
    element.innerHTML,
    '<span aria-hidden="true">f</span><span aria-hidden="true">o</span><span aria-hidden="true">o</span>'
  )
})

test('can inject spans with a custom class', function (t) {
  t.plan(2)
  const element = createElement('foo')
  charming(element, {
    setClassName: function (index, letter) {
      return `index-${index} letter-${letter}`
    }
  })
  t.equal(element.getAttribute('aria-label'), 'foo')
  t.equal(
    element.innerHTML,
    '<span class="index-1 letter-f" aria-hidden="true">f</span><span class="index-2 letter-o" aria-hidden="true">o</span><span class="index-3 letter-o" aria-hidden="true">o</span>'
  )
})

test('supports passing in a regular expression for splitting the `element`', function (t) {
  t.plan(2)
  const element = createElement('foo bar')
  charming(element, {
    split: function (string) {
      return string.split(/(\s+)/)
    },
    setClassName: function (index) {
      return `word${index}`
    }
  })
  t.equal(element.getAttribute('aria-label'), 'foo bar')
  t.equal(
    element.innerHTML,
    '<span class="word1" aria-hidden="true">foo</span><span class="word2" aria-hidden="true"> </span><span class="word3" aria-hidden="true">bar</span>'
  )
})
