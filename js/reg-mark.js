(function($) {
  $(document).ready(function() {
    function recurse(element) {
      if (element.childNodes.length > 0) {
        for (var i = 0; i < element.childNodes.length; i++) {
          recurse(element.childNodes[i]);
        }
      }
      if (element.nodeType == 3 && /\S/.test(element.nodeValue)) {
        doReplacements(element, element.parentElement);
      }
    }
    var html = document.getElementsByTagName('html')[0];
    recurse(html);
    function doReplacements(element, parent) {
      var html = element.data;
      if (element.nextSibling) {
        if (element.nextSibling.nodeName.toLowerCase() === 'sup') {
          return;
        }
      }
      html = element.data.replace(/\bWarman\b/gi, "$&<sup>&reg;</sup>");
      html = html.replace(/<sup>&reg;<\/sup>®/gi, "<sup>&reg;</sup>");
      var frag = (function() {
        var wrap = document.createElement('div'),
          frag = document.createDocumentFragment();
        wrap.innerHTML = html;
        while (wrap.firstChild) {
          frag.appendChild(wrap.firstChild);
        }
        return frag;
      })();
      parent.insertBefore(frag, element);
      parent.removeChild(element);
    }
  });
})(jQuery);
