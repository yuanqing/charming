const test = require('tape')
const charming = require('./')

function createElement (innerHTML) {
  const elem = document.createElement('div')
  elem.innerHTML = innerHTML || ''
  document.body.appendChild(elem)
  return elem
}

test('should not inject spans when `elem` has no child nodes', function (t) {
  t.plan(2)
  const elem = createElement()
  charming(elem)
  t.equal(elem.innerHTML, '')
  t.equal(elem.getAttribute('aria-label'), null)
})

test('should not inject spans when `elem` has no child text nodes', function (
  t
) {
  t.plan(2)
  const innerHTML = '<span></span>'
  const elem = createElement(innerHTML)
  charming(elem)
  t.equal(elem.innerHTML, innerHTML)
  t.equal(elem.getAttribute('aria-label'), null)
})

test('should inject spans when `elem` has a single child text node', function (
  t
) {
  t.plan(2)
  const elem = createElement('foo')
  charming(elem)
  t.equal(elem.getAttribute('aria-label'), 'foo')
  t.equal(
    elem.innerHTML,
    '<span class="char1" aria-hidden="true">f</span><span class="char2" aria-hidden="true">o</span><span class="char3" aria-hidden="true">o</span>'
  )
})

test('should inject spans when `elem` has multiple child text nodes', function (
  t
) {
  t.plan(2)
  const elem = createElement(
    '<span>foo</span> <span>bar <span>baz</span></span>'
  )
  charming(elem)
  t.equal(elem.getAttribute('aria-label'), null)
  t.equal(
    elem.innerHTML,
    '<span aria-label="foo"><span class="char1" aria-hidden="true">f</span><span class="char2" aria-hidden="true">o</span><span class="char3" aria-hidden="true">o</span></span><span class="char4" aria-hidden="true"> </span><span aria-label="bar "><span class="char5" aria-hidden="true">b</span><span class="char6" aria-hidden="true">a</span><span class="char7" aria-hidden="true">r</span><span class="char8" aria-hidden="true"> </span><span aria-label="baz"><span class="char9" aria-hidden="true">b</span><span class="char10" aria-hidden="true">a</span><span class="char11" aria-hidden="true">z</span></span></span>'
  )
})

test('can inject custom tags', function (t) {
  t.plan(2)
  const elem = createElement('foo')
  charming(elem, {
    tagName: 'b'
  })
  t.equal(elem.getAttribute('aria-label'), 'foo')
  t.equal(
    elem.innerHTML,
    '<b class="char1" aria-hidden="true">f</b><b class="char2" aria-hidden="true">o</b><b class="char3" aria-hidden="true">o</b>'
  )
})

test('can inject spans without classes', function (t) {
  t.plan(2)
  const elem = createElement('foo')
  charming(elem, {
    classPrefix: false
  })
  t.equal(elem.getAttribute('aria-label'), 'foo')
  t.equal(elem.innerHTML, '<span aria-hidden="true">f</span><span aria-hidden="true">o</span><span aria-hidden="true">o</span>')
})

test('can inject spans with a custom class prefix', function (t) {
  t.plan(2)
  const elem = createElement('foo')
  charming(elem, {
    classPrefix: 'c'
  })
  t.equal(elem.getAttribute('aria-label'), 'foo')
  t.equal(
    elem.innerHTML,
    '<span class="c1" aria-hidden="true">f</span><span class="c2" aria-hidden="true">o</span><span class="c3" aria-hidden="true">o</span>'
  )
})
