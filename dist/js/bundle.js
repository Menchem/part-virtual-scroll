var version = "1.0.0";

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body,* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\nbody {\n  padding: 2rem;\n  background-image: linear-gradient(to bottom,\n    #efefff 0%,\n    #fff 100%\n  );\n  background-repeat: no-repeat;\n}";
styleInject(css_248z);

console.log("version", version);
document.body.innerText = '测试页面';
