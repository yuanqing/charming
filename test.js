const test = require('tape')
const charming = require('./')

function createElement (innerHTML) {
  const elem = document.createElement('div')
  elem.innerHTML = innerHTML || ''
  document.body.appendChild(elem)
  return elem
}

test('should not inject spans when `elem` has no child nodes', function (t) {
  t.plan(1)
  const elem = createElement()
  charming(elem)
  t.equal(elem.innerHTML, '')
})

test('should not inject spans when `elem` has no child text nodes', function (
  t
) {
  t.plan(1)
  const innerHTML = '<span></span>'
  const elem = createElement(innerHTML)
  charming(elem)
  t.equal(elem.innerHTML, innerHTML)
})

test('should inject spans when `elem` has a single child text node', function (
  t
) {
  t.plan(1)
  const elem = createElement('foo')
  charming(elem)
  t.equal(
    elem.innerHTML,
    '<span class="char1">f</span><span class="char2">o</span><span class="char3">o</span>'
  )
})

test('should inject spans when `elem` has multiple child text nodes', function (
  t
) {
  t.plan(1)
  const elem = createElement(
    '<span>foo</span> <span>bar <span>baz</span></span>'
  )
  charming(elem)
  t.equal(
    elem.innerHTML,
    '<span><span class="char1">f</span><span class="char2">o</span><span class="char3">o</span></span><span class="char4"> </span><span><span class="char5">b</span><span class="char6">a</span><span class="char7">r</span><span class="char8"> </span><span><span class="char9">b</span><span class="char10">a</span><span class="char11">z</span></span></span>'
  )
})

test('can inject custom tags', function (t) {
  t.plan(1)
  const elem = createElement('foo')
  charming(elem, {
    tagName: 'b'
  })
  t.equal(
    elem.innerHTML,
    '<b class="char1">f</b><b class="char2">o</b><b class="char3">o</b>'
  )
})

test('can inject spans without classes', function (t) {
  t.plan(1)
  const elem = createElement('foo')
  charming(elem, {
    classPrefix: false
  })
  t.equal(elem.innerHTML, '<span>f</span><span>o</span><span>o</span>')
})

test('can inject spans with a custom class prefix', function (t) {
  t.plan(1)
  const elem = createElement('foo')
  charming(elem, {
    classPrefix: 'c'
  })
  t.equal(
    elem.innerHTML,
    '<span class="c1">f</span><span class="c2">o</span><span class="c3">o</span>'
  )
})
