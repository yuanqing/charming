function addCharPrefix (index) {
  return 'char' + index
}

module.exports = function (element, options) {
  options = options || {}
  element.normalize()
  var split = options.split

  var tagName = options.tagName || 'span'
  var setClassName =
    typeof options.setClassName === 'function'
      ? options.setClassName
      : addCharPrefix
  var count = 1

  function inject (element) {
    var parentNode = element.parentNode
    var nodeValue = element.nodeValue
    var string = split ? split(nodeValue) : nodeValue
    var length = string.length
    var i = -1
    while (++i < length) {
      var node = document.createElement(tagName)
      var className = setClassName(count++, string[i])
      if (className) {
        node.className = className
      }
      node.appendChild(document.createTextNode(string[i]))
      node.setAttribute('aria-hidden', 'true')
      parentNode.insertBefore(node, element)
    }
    if (nodeValue.trim() !== '') {
      parentNode.setAttribute('aria-label', nodeValue)
    }
    parentNode.removeChild(element)
  }

  ;(function traverse (element) {
    // `element` is itself a text node.
    if (element.nodeType === 3) {
      return inject(element)
    }

    // `element` has a single child text node.
    var childNodes = Array.prototype.slice.call(element.childNodes) // static array of nodes
    var length = childNodes.length
    if (length === 1 && childNodes[0].nodeType === 3) {
      return inject(childNodes[0])
    }

    // `element` has more than one child node.
    var i = -1
    while (++i < length) {
      traverse(childNodes[i])
    }
  })(element)
}
