function Charming(element, options) {
  if (!(this instanceof Charming)) {
    return new Charming(element, options)
  }
  options = options || {}
  this.tagName = options.tagName || 'span'
  this.classPrefix = options.classPrefix != null
    ? options.classPrefix
    : 'char'
  this.count = 1
  this.traverse(element)
  return element
}

Charming.prototype.inject = function(element) {
  var parentNode = element.parentNode
  var string = element.nodeValue
  var length = string.length
  var i = -1
  while (++i < length) {
    var node = document.createElement(this.tagName)
    if (this.classPrefix) {
      node.className = this.classPrefix + this.count
      this.count++
    }
    node.appendChild(document.createTextNode(string[i]))
    parentNode.insertBefore(node, element)
  }
  parentNode.removeChild(element)
  return element
}

Charming.prototype.traverse = function(element) {
  // `element` is itself a text node.
  if (element.nodeType === Node.TEXT_NODE) {
    return this.inject(element)
  }

  // `element` has a single child text node.
  var childNodes = Array.prototype.slice.call(element.childNodes) // static array of nodes
  var length = childNodes.length
  if (length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
    this.inject(childNodes[0])
    return element
  }

  // `element` has more than one child node.
  var i = -1
  while (++i < length) {
    this.traverse(childNodes[i])
  }
  return element
}

module.exports = Charming
