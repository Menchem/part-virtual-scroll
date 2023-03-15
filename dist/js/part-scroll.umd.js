(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PartScroll = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function dataHandle(data) {
    if (!Array.isArray(data)) {
      console.error("data not Array");
      return false;
    }
    var arr = data;
    for (var i = 0; i < arr.length; i++) {
      arr[i].uid = i + 1;
    }
    return arr;
  }

  function scroll(el, data) {
    this.outerContainer = typeof el === 'string' ? document.querySelector(el) : el;
    this.listContainer = this.outerContainer.children[0];
    this.data = data ? dataHandle(data) : [];
    this.ITEMHEIGHT = 100;
    this.SCREENhEIGHT = this.outerContainer.getBoundingClientRect().height;
    this.ticking = false;
    this.render = function () {};
    this.itemHTML = '';
    this._events = {};
  }
  scroll.prototype = {
    init: function init() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.render = option.hasOwnProperty('render') ? option.render : function () {
        return '';
      };
      this.ITEMHEIGHT = option.hasOwnProperty('height') ? option.height : this.ITEMHEIGHT;
      this.scrollCallBack();
      this.outerContainer.addEventListener('scroll', this.onScroll.bind(this));
      this.listContainer.addEventListener('click', this.onClick.bind(this));
    },
    scrollCallBack: function scrollCallBack() {
      var scrollTop = Math.max(this.outerContainer.scrollTop, 0);
      var startIndex = Math.floor(scrollTop / this.ITEMHEIGHT);
      var endIndex = startIndex + Math.ceil(this.SCREENhEIGHT / this.ITEMHEIGHT);
      var paddingTop = startIndex * this.ITEMHEIGHT;
      var paddingBottom = (this.data.length - endIndex) * this.ITEMHEIGHT;
      var viewData = this.data.slice(startIndex, endIndex + 1);
      var fragment = document.createDocumentFragment();
      this.listContainer.innerHTML = '';
      for (var i = 0; i < viewData.length; i++) {
        var item = document.createElement('div');
        item.className = 'list-item';
        var itemData = viewData[i];
        item.setAttribute('data-index', itemData.uid);
        var html = this.render(itemData) + '';
        item.innerHTML = html;
        item.setAttribute('style', "height: ".concat(this.ITEMHEIGHT, "px;"));
        fragment.appendChild(item);
      }
      this.listContainer.appendChild(fragment);
      this.listContainer.setAttribute('style', "padding-top: ".concat(paddingTop, "px; padding-bottom: ").concat(paddingBottom, "px"));
      this.ticking = false;
    },
    onScroll: function onScroll(e) {
      this.trigger('scroll', e);
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(this.scrollCallBack.bind(this));
      }
    },
    onClick: function onClick(e) {
      var ev = e.target;
      var evt = ev;
      var obj = null;
      while (evt.className !== 'list-item') {
        evt = evt.parentNode;
      }
      if (evt.className === 'list-item') {
        var index = evt.getAttribute('data-index');
        obj = this.data[Number(index) - 1];
      }
      this.trigger('click', e, obj);
    },
    extension: function extension() {
      console.log('extension');
    },
    on: function on(type, fn) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      if (!this._events[type]) {
        this._events[type] = [];
      }
      this._events[type].push([fn, context]);
    },
    trigger: function trigger(type) {
      var events = this._events[type];
      if (!events) {
        return;
      }
      var _events$ = _slicedToArray(events[0], 2),
        fn = _events$[0],
        context = _events$[1];
      fn.apply(context, [].slice.call(arguments, 1));
    }
  };

  var version = "1.0.0";

  scroll.version = version;

  return scroll;

}));
