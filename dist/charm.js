/* globals define */
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.charm = factory(root);
  }

})(this, function () {

  'use strict';

  return function (elem, opts) {

    opts = opts || {};
    var tagName = opts.tagName || 'span',
      classPrefix = typeof opts.classPrefix !== 'undefined' ? opts.classPrefix : 'char',
      count = 0;

    var traverse = function (elem) {
      var childNodes = Array.prototype.slice.call(elem.childNodes); // static array of nodes
      for (var i = 0, len = childNodes.length; i < len; i++) {
        traverse(childNodes[i]);
      }
      if (elem.nodeType === Node.TEXT_NODE) {
        inject(elem);
      }
    };

    var inject = function (elem) {
      var str = elem.nodeValue,
        parentNode = elem.parentNode;
      for (var i = 0, len = str.length; i < len; i++) {
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

    traverse(elem);

    return elem;

  };

});
