(function(fn) {
  /* istanbul ignore else  */
  if (typeof module === 'undefined') {
    this.charming = fn;
  } else {
    module.exports = fn;
  }
})(function(elem, opts) {

  'use strict';

  opts = opts || {};
  var tagName = opts.tagName || 'span';
  var classPrefix = opts.classPrefix != null ? opts.classPrefix : 'char';

  var count = 1;

  var inject = function(elem) {
    var parentNode = elem.parentNode;
    var str = elem.nodeValue;
    var len = str.length;
    var i = -1;
    while (++i < len) {
      var node = document.createElement(tagName);
      if (classPrefix) {
        node.className = classPrefix + count;
        count++;
      }
      node.appendChild(document.createTextNode(str[i]));
      parentNode.insertBefore(node, elem);
    }
    parentNode.removeChild(elem);
  };

  (function traverse(elem) {
    var childNodes = [].slice.call(elem.childNodes); // static array of nodes
    var len = childNodes.length;
    var i = -1;
    while (++i < len) {
      traverse(childNodes[i]);
    }
    if (elem.nodeType === Node.TEXT_NODE) {
      inject(elem);
    }
  })(elem);

  return elem;

});
