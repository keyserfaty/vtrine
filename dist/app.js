(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _store = require('./helpers/store');

var _Downloads = require('./components/Downloads');

var _Downloads2 = _interopRequireDefault(_Downloads);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = exports.d = document;

// model
var initialState = {
  searchValue: '',
  displayDownloads: false,
  imagesQueue: ['./statics/images/1.jpg', './statics/images/1.jpg']
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN':
      {
        return _extends({}, state, {
          searchValue: action.payload.searchValue
        });
      }

    case 'ON_TOGGLE_DOWNLOADS':
      {
        return _extends({}, state, {
          displayDownloads: !state.displayDownloads
        });
      }

    case 'ON_CLEAR_ALL_DOWNLOADS':
      {
        return _extends({}, state, {
          imagesQueue: []
        });
      }

    case 'ON_REMOVE_IMAGE_FROM_QUEUE':
      {
        return _extends({}, state, {
          imagesQueue: state.imagesQueue.filter(function (image, i) {
            return i !== Number(action.payload.id);
          })
        });
      }

    default:
      return state;
  }
};

var store = (0, _store.createStore)(reducer

// view
);var searchInput = d.querySelector('input');
var body = d.querySelector('body');
var header = d.querySelector('header');
var folder = header.querySelector('.downloads');

store.subscribe(function (state, action) {
  var props = _extends({
    dispatch: store.dispatch
  }, state);

  // displayDownloads changes
  var downloadPreviousNode = d.querySelector('#download');

  if (state.displayDownloads && downloadPreviousNode == null) {
    body.appendChild((0, _Downloads2.default)(props));
  }

  if (!state.displayDownloads && downloadPreviousNode != null) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode);
  }

  // imagesQueue changes
  var content = body.querySelector('#download .content');

  if (state.imagesQueue.length === 0 && content != null) {
    var ul = content.querySelector('#download .content ul');

    if (ul != null) {
      content.removeChild(ul);
    }
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN':
      {
        console.log('should redirect');
        break;
      }
  }
}

// events
);window.addEventListener('load', function () {
  store.dispatch({ type: 'ON_WINDOW_LOAD' });
});

searchInput.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    store.dispatch({
      type: 'ON_INPUT_ENTER_KEY_DOWN',
      payload: {
        searchValue: e.target.value
      }
    });
  }
});

folder.addEventListener('click', function () {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' });
});

},{"./components/Downloads":2,"./helpers/store":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Downloads = function Downloads(props) {
  var dispatch = props.dispatch,
      imagesQueue = props.imagesQueue;

  // Events

  var clearOnClick = function clearOnClick() {
    dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' });
  };

  var buttonOnClick = function buttonOnClick() {
    dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' });
  };

  var ulOnClick = function ulOnClick(e) {
    if (e.target.parentNode.id.length) {
      if (e.target.attributes[0].nodeValue === 'remove') {
        dispatch({ type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
      }

      if (e.target.attributes[0].nodeValue === 'download') {
        dispatch({ type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
      }
    }
  };

  // DOM
  return (0, _Node.Node)('div', { id: 'download' }, (0, _Node.Node)('div', { class: 'header' }, (0, _Node.Node)('div', { class: 'title' }, 'My Collection'), (0, _Node.Node)('div', { class: 'clear', onClick: clearOnClick }, 'Clear all')), (0, _Node.Node)('div', { class: 'arrow' }), (0, _Node.Node)('div', { class: 'images' }, (0, _Node.Node)('div', { class: 'content' }, _Node.Node.apply(undefined, ['ul', { onClick: ulOnClick }].concat(_toConsumableArray(imagesQueue.map(function (image, i) {
    return (0, _Node.Node)('li', { class: 'image', style: 'background: url(\'' + image + '\')' }, (0, _Node.Node)('div', { class: 'actions', id: i }, (0, _Node.Node)('div', { class: 'remove' }), (0, _Node.Node)('div', { class: 'download' })));
  })))))), (0, _Node.Node)('div', { class: 'footer' }, (0, _Node.Node)('button', { onClick: buttonOnClick }, 'Download selection')));
};

exports.default = Downloads;

},{"../helpers/Node":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNode = exports.Node = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _app = require('../app');

var _uniqueId = require('../helpers/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENTS = {
  onClick: 'click',
  onKeyUp: 'keyup',
  onLoad: 'load'
};

var Node = exports.Node = function Node(elem, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var node = _app.d.createElement(elem);

  if (attrs != null) {
    Object.keys(attrs).forEach(function (key) {
      if (EVENTS.hasOwnProperty(key)) {
        node.addEventListener(EVENTS[key], attrs[key]);
      } else {
        node.setAttribute(key, attrs[key]);
      }
    });
  }

  if (children.length > 0) {
    children.forEach(function (child) {
      if (typeof child === 'string') {
        node.innerHTML = child;
      }

      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
        node.appendChild(child);
      }
    });
  }

  node.setAttribute('data-unique-id', (0, _uniqueId2.default)());

  return node;
};

var renderNode = exports.renderNode = function renderNode(render, node, parent) {
  var _node = _app.d.querySelector('[data-unique-id=\'' + node.getAttribute('data-unique-id') + '\']');

  if (_node == null && render) {
    var _parent = _app.d.querySelector(parent);
    _parent.appendChild(node);
  } else if (_node != null && !render) {
    _node.parentNode.removeChild(_node);
  }
};

},{"../app":1,"../helpers/uniqueId":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createStore = exports.createStore = function createStoreFn(reducer) {
  var state = undefined;
  var subscribers = [];

  return {
    dispatch: function dispatch(action) {
      state = reducer(state, action);
      console.log(action, state);
      subscribers.forEach(function (handle) {
        return handle(state, action);
      });
    },
    getState: function getState() {
      return state;
    },
    subscribe: function subscribe(handler) {
      subscribers.push(handler);
    }
  };
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUniqueId = function getUniqueId() {
  var i = void 0;
  var random = void 0;
  var uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
  }
  return uuid;
};

exports.default = getUniqueId;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL3N0b3JlLmpzIiwic3JjL2hlbHBlcnMvdW5pcXVlSWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxlQUFlO0FBQ25CLGVBQWEsRUFETTtBQUVuQixvQkFBa0IsS0FGQztBQUduQixlQUFhLENBQUMsd0JBQUQsRUFBMkIsd0JBQTNCO0FBSE0sQ0FBckI7O0FBTUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFrQztBQUFBLE1BQWpDLEtBQWlDLHVFQUF6QixZQUF5QjtBQUFBLE1BQVgsTUFBVzs7QUFDaEQsVUFBUSxPQUFPLElBQWY7QUFDRSxTQUFLLHlCQUFMO0FBQWdDO0FBQzlCLDRCQUNLLEtBREw7QUFFRSx1QkFBYSxPQUFPLE9BQVAsQ0FBZTtBQUY5QjtBQUlEOztBQUVELFNBQUsscUJBQUw7QUFBNEI7QUFDMUIsNEJBQ0ssS0FETDtBQUVFLDRCQUFrQixDQUFDLE1BQU07QUFGM0I7QUFJRDs7QUFFRCxTQUFLLHdCQUFMO0FBQStCO0FBQzdCLDRCQUNLLEtBREw7QUFFRSx1QkFBYTtBQUZmO0FBSUQ7O0FBRUQsU0FBSyw0QkFBTDtBQUFtQztBQUNqQyw0QkFDSyxLQURMO0FBRUUsdUJBQWEsTUFBTSxXQUFOLENBQWtCLE1BQWxCLENBQXlCLFVBQUMsS0FBRCxFQUFRLENBQVI7QUFBQSxtQkFBYyxNQUFNLE9BQU8sT0FBTyxPQUFQLENBQWUsRUFBdEIsQ0FBcEI7QUFBQSxXQUF6QjtBQUZmO0FBSUQ7O0FBRUQ7QUFDRSxhQUFPLEtBQVA7QUE5Qko7QUFnQ0QsQ0FqQ0Q7O0FBbUNBLElBQU0sUUFBUSx3QkFBWTs7QUFFMUI7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S0FBSyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQTlCO0FBQ0EsUUFBSSxNQUFNLENBQU4sSUFBVyxNQUFNLEVBQWpCLElBQXVCLE1BQU0sRUFBN0IsSUFBbUMsTUFBTSxFQUE3QyxFQUFpRDtBQUMvQyxjQUFRLEdBQVI7QUFDRDtBQUNELFlBQVEsQ0FBQyxNQUFNLEVBQU4sR0FBVyxDQUFYLEdBQWdCLE1BQU0sRUFBTixHQUFZLFNBQVMsQ0FBVCxHQUFhLENBQXpCLEdBQThCLE1BQS9DLEVBQXdELFFBQXhELENBQWlFLEVBQWpFLENBQVI7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNELENBWkQ7O2tCQWNlLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmUnXG5cbmltcG9ydCBEb3dubG9hZHMgZnJvbSAnLi9jb21wb25lbnRzL0Rvd25sb2FkcydcblxuZXhwb3J0IGNvbnN0IGQgPSBkb2N1bWVudFxuXG4vLyBtb2RlbFxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZS5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5cbi8vIHZpZXdcbmNvbnN0IHNlYXJjaElucHV0ID0gZC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAuLi5zdGF0ZSxcbiAgfVxuXG4gIC8vIGRpc3BsYXlEb3dubG9hZHMgY2hhbmdlc1xuICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBkb3dubG9hZFByZXZpb3VzTm9kZSA9PSBudWxsKSB7XG4gICAgYm9keS5hcHBlbmRDaGlsZChEb3dubG9hZHMocHJvcHMpKVxuICB9XG5cbiAgaWYgKCFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGRvd25sb2FkUHJldmlvdXNOb2RlICE9IG51bGwpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgLy8gaW1hZ2VzUXVldWUgY2hhbmdlc1xuICBjb25zdCBjb250ZW50ID0gYm9keS5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQgLmNvbnRlbnQnKVxuXG4gIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5sZW5ndGggPT09IDAgJiYgY29udGVudCAhPSBudWxsKSB7XG4gICAgY29uc3QgdWwgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCAuY29udGVudCB1bCcpXG5cbiAgICBpZiAodWwgIT0gbnVsbCkge1xuICAgICAgY29udGVudC5yZW1vdmVDaGlsZCh1bClcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICBjb25zb2xlLmxvZygnc2hvdWxkIHJlZGlyZWN0JylcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgRG93bmxvYWRzID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgZGlzcGF0Y2gsXG4gICAgaW1hZ2VzUXVldWUsXG4gIH0gPSBwcm9wc1xuXG4gIC8vIEV2ZW50c1xuICBjb25zdCBjbGVhck9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IGJ1dHRvbk9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fRE9XTkxPQURfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IHVsT25DbGljayA9IGUgPT4ge1xuICAgIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmlkLmxlbmd0aCkge1xuICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAncmVtb3ZlJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ2Rvd25sb2FkJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX0RPV05MT0FEX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBET01cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnZG93bmxvYWQnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaGVhZGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjbGVhcicsIG9uQ2xpY2s6IGNsZWFyT25DbGljayB9LCAnQ2xlYXIgYWxsJykpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpbWFnZXMnIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjb250ZW50JyB9LFxuICAgICAgICAgIE5vZGUoJ3VsJywgeyBvbkNsaWNrOiB1bE9uQ2xpY2sgfSxcbiAgICAgICAgICAgIC4uLmltYWdlc1F1ZXVlLm1hcCgoaW1hZ2UsIGkpID0+XG4gICAgICAgICAgICAgIE5vZGUoJ2xpJywgeyBjbGFzczogJ2ltYWdlJywgc3R5bGU6IGBiYWNrZ3JvdW5kOiB1cmwoJyR7aW1hZ2V9JylgIH0sXG4gICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2FjdGlvbnMnLCBpZDogaSB9LFxuICAgICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScgfSksIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdkb3dubG9hZCcgfSkpKVxuICAgICAgICAgICAgKSkpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sXG4gICAgICAgIE5vZGUoJ2J1dHRvbicsIHsgb25DbGljazogYnV0dG9uT25DbGljayB9LCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRzXG4iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi4vYXBwJ1xuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJy4uL2hlbHBlcnMvdW5pcXVlSWQnXG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25LZXlVcDogJ2tleXVwJyxcbiAgb25Mb2FkOiAnbG9hZCdcbn1cblxuZXhwb3J0IGNvbnN0IE5vZGUgPSAoZWxlbSwgYXR0cnMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gIGxldCBub2RlID0gZC5jcmVhdGVFbGVtZW50KGVsZW0pXG5cbiAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFNba2V5XSwgYXR0cnNba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdW5pcXVlLWlkJywgdW5pcXVlSWQoKSlcblxuICByZXR1cm4gbm9kZVxufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyTm9kZSA9IChyZW5kZXIsIG5vZGUsIHBhcmVudCkgPT4ge1xuICBjb25zdCBfbm9kZSA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtdW5pcXVlLWlkPScke25vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXVuaXF1ZS1pZCcpfSddYClcblxuICBpZiAoX25vZGUgPT0gbnVsbCAmJiByZW5kZXIpIHtcbiAgICBjb25zdCBfcGFyZW50ID0gZC5xdWVyeVNlbGVjdG9yKHBhcmVudClcbiAgICBfcGFyZW50LmFwcGVuZENoaWxkKG5vZGUpXG4gIH0gZWxzZSBpZiAoX25vZGUgIT0gbnVsbCAmJiAhcmVuZGVyKSB7XG4gICAgX25vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfbm9kZSlcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IGdldFVuaXF1ZUlkID0gKCkgPT4ge1xuICBsZXQgaVxuICBsZXQgcmFuZG9tXG4gIGxldCB1dWlkID0gJydcbiAgZm9yIChpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXG4gICAgaWYgKGkgPT09IDggfHwgaSA9PT0gMTIgfHwgaSA9PT0gMTYgfHwgaSA9PT0gMjApIHtcbiAgICAgIHV1aWQgKz0gJy0nXG4gICAgfVxuICAgIHV1aWQgKz0gKGkgPT09IDEyID8gNCA6IChpID09PSAxNiA/IChyYW5kb20gJiAzIHwgOCkgOiByYW5kb20pKS50b1N0cmluZygxNilcbiAgfVxuICByZXR1cm4gdXVpZFxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRVbmlxdWVJZFxuIl19
