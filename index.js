module.exports = function (element, options) {
  options = options || {}

  var tagName = options.tagName || 'span'
  var classPrefix = options.classPrefix != null ? options.classPrefix : 'char'
  var count = 1

  function inject (element) {
    var parentNode = element.parentNode
    var string = element.nodeValue
    var length = string.length
    var i = -1
    while (++i < length) {
      var node = document.createElement(tagName)
      if (classPrefix) {
        node.className = classPrefix + count
        count++
      }
      node.appendChild(document.createTextNode(string[i]))
      parentNode.insertBefore(node, element)
    }
    parentNode.removeChild(element)
  }

  ;(function traverse (element) {
    // `element` is itself a text node.
    if (element.nodeType === Node.TEXT_NODE) {
      return inject(element)
    }

    // `element` has a single child text node.
    var childNodes = Array.prototype.slice.call(element.childNodes) // static array of nodes
    var length = childNodes.length
    if (length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      return inject(childNodes[0])
    }

    // `element` has more than one child node.
    var i = -1
    while (++i < length) {
      traverse(childNodes[i])
    }
  })(element)
}
