module.exports = function (element, options, regex) {
  options = options || {};
  element.normalize();
  regex = regex || null;

  var tagName = options.tagName || 'span';
  var classPrefix = options.classPrefix != null ? options.classPrefix : 'char';
  var count = 1;

  function inject (element) {
    var string = element.nodeValue;
    var parentNode = element.parentNode;
    var letter_data = [];
    if (regex){
      letter_data = string.match(regex);
    } else {
      letter_data = string.split('');
    }
    var length = letter_data.length;
    for (var i = 0; i < length; i++){
      var node = document.createElement(tagName);
      if (classPrefix) {
        node.className = classPrefix + count;
        count++;
      }
      node.appendChild(document.createTextNode(letter_data[i]));
      node.setAttribute('aria-hidden', 'true');
      parentNode.insertBefore(node, element);
    }
    if (string.trim() != "") {
      parentNode.setAttribute('aria-label', string);
    }
    parentNode.removeChild(element);
  };
  
  (function traverse (element) {
    // `element` is itself a text node.
    if (element.nodeType === Node.TEXT_NODE) {
      return inject(element);
    }

    // `element` has a single child text node.
    var childNodes = Array.prototype.slice.call(element.childNodes); // static array of nodes
    var length = childNodes.length;
    if (length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      return inject(childNodes[0]);
    }

    // `element` has more than one child node.
    var i = -1;
    while (++i < length) {
      traverse(childNodes[i]);
    }
  })(element);
}
