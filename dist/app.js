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
exports.Node = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _app = require('../app');

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

  return node;
};

},{"../app":1}],4:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBRUE7Ozs7OztBQUVPLElBQU0sZ0JBQUksUUFBVjs7QUFFUDtBQUNBLElBQU0sZUFBZTtBQUNuQixlQUFhLEVBRE07QUFFbkIsb0JBQWtCLEtBRkM7QUFHbkIsZUFBYSxDQUFDLHdCQUFELEVBQTJCLHdCQUEzQjtBQUhNLENBQXJCOztBQU1BLElBQU0sVUFBVSxTQUFWLE9BQVUsR0FBa0M7QUFBQSxNQUFqQyxLQUFpQyx1RUFBekIsWUFBeUI7QUFBQSxNQUFYLE1BQVc7O0FBQ2hELFVBQVEsT0FBTyxJQUFmO0FBQ0UsU0FBSyx5QkFBTDtBQUFnQztBQUM5Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWEsT0FBTyxPQUFQLENBQWU7QUFGOUI7QUFJRDs7QUFFRCxTQUFLLHFCQUFMO0FBQTRCO0FBQzFCLDRCQUNLLEtBREw7QUFFRSw0QkFBa0IsQ0FBQyxNQUFNO0FBRjNCO0FBSUQ7O0FBRUQsU0FBSyx3QkFBTDtBQUErQjtBQUM3Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWE7QUFGZjtBQUlEOztBQUVELFNBQUssNEJBQUw7QUFBbUM7QUFDakMsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE1BQU0sV0FBTixDQUFrQixNQUFsQixDQUF5QixVQUFDLEtBQUQsRUFBUSxDQUFSO0FBQUEsbUJBQWMsTUFBTSxPQUFPLE9BQU8sT0FBUCxDQUFlLEVBQXRCLENBQXBCO0FBQUEsV0FBekI7QUFGZjtBQUlEOztBQUVEO0FBQ0UsYUFBTyxLQUFQO0FBOUJKO0FBZ0NELENBakNEOztBQW1DQSxJQUFNLFFBQVEsd0JBQVk7O0FBRTFCO0FBRmMsQ0FBZCxDQUdBLElBQU0sY0FBYyxF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O0FBQ0wsY0FBVSxrQkFBVSxNQUFWLEVBQWtCO0FBQzFCLGNBQVEsUUFBUSxLQUFSLEVBQWUsTUFBZixDQUFSO0FBQ0EsY0FBUSxHQUFSLENBQVksTUFBWixFQUFvQixLQUFwQjtBQUNBLGtCQUFZLE9BQVosQ0FBb0IsVUFBVSxNQUFWLEVBQWtCO0FBQ3BDLGVBQU8sT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFQO0FBQ0QsT0FGRDtBQUdELEtBUEk7QUFRTCxjQUFVLG9CQUFZO0FBQ3BCLGFBQU8sS0FBUDtBQUNELEtBVkk7QUFXTCxlQUFXLG1CQUFVLE9BQVYsRUFBbUI7QUFDNUIsa0JBQVksSUFBWixDQUFpQixPQUFqQjtBQUNEO0FBYkksR0FBUDtBQWVELENBbkJNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi9oZWxwZXJzL3N0b3JlJ1xuXG5pbXBvcnQgRG93bmxvYWRzIGZyb20gJy4vY29tcG9uZW50cy9Eb3dubG9hZHMnXG5cbmV4cG9ydCBjb25zdCBkID0gZG9jdW1lbnRcblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc2VhcmNoVmFsdWU6ICcnLFxuICBkaXNwbGF5RG93bmxvYWRzOiBmYWxzZSxcbiAgaW1hZ2VzUXVldWU6IFsnLi9zdGF0aWNzL2ltYWdlcy8xLmpwZycsICcuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJ11cbn1cblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzZWFyY2hWYWx1ZTogYWN0aW9uLnBheWxvYWQuc2VhcmNoVmFsdWUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fVE9HR0xFX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkaXNwbGF5RG93bmxvYWRzOiAhc3RhdGUuZGlzcGxheURvd25sb2FkcyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogc3RhdGUuaW1hZ2VzUXVldWUuZmlsdGVyKChpbWFnZSwgaSkgPT4gaSAhPT0gTnVtYmVyKGFjdGlvbi5wYXlsb2FkLmlkKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuXG4vLyB2aWV3XG5jb25zdCBzZWFyY2hJbnB1dCA9IGQucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuY29uc3QgYm9keSA9IGQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5cbnN0b3JlLnN1YnNjcmliZSgoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBkaXNwYXRjaDogc3RvcmUuZGlzcGF0Y2gsXG4gICAgLi4uc3RhdGUsXG4gIH1cblxuICAvLyBkaXNwbGF5RG93bmxvYWRzIGNoYW5nZXNcbiAgY29uc3QgZG93bmxvYWRQcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpXG5cbiAgaWYgKHN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgZG93bmxvYWRQcmV2aW91c05vZGUgPT0gbnVsbCkge1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoRG93bmxvYWRzKHByb3BzKSlcbiAgfVxuXG4gIGlmICghc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBkb3dubG9hZFByZXZpb3VzTm9kZSAhPSBudWxsKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIC8vIGltYWdlc1F1ZXVlIGNoYW5nZXNcbiAgY29uc3QgY29udGVudCA9IGJvZHkucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkIC5jb250ZW50JylcblxuICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUubGVuZ3RoID09PSAwICYmIGNvbnRlbnQgIT0gbnVsbCkge1xuICAgIGNvbnN0IHVsID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQgLmNvbnRlbnQgdWwnKVxuXG4gICAgaWYgKHVsICE9IG51bGwpIHtcbiAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQodWwpXG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgY29uc29sZS5sb2coJ3Nob3VsZCByZWRpcmVjdCcpXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufSlcblxuLy8gZXZlbnRzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fV0lORE9XX0xPQUQnIH0pXG59KVxuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuXG5mb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1RPR0dMRV9ET1dOTE9BRFMnIH0pXG59KSIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IERvd25sb2FkcyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGRpc3BhdGNoLFxuICAgIGltYWdlc1F1ZXVlLFxuICB9ID0gcHJvcHNcblxuICAvLyBFdmVudHNcbiAgY29uc3QgY2xlYXJPbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCBidXR0b25PbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCB1bE9uQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9ET1dOTE9BRF9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIHsgb25DbGljazogdWxPbkNsaWNrIH0sXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlfScpYCB9LFxuICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhY3Rpb25zJywgaWQ6IGkgfSxcbiAgICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdyZW1vdmUnIH0pLCBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZG93bmxvYWQnIH0pKSlcbiAgICAgICAgICAgICkpKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdidXR0b24nLCB7IG9uQ2xpY2s6IGJ1dHRvbk9uQ2xpY2sgfSwgJ0Rvd25sb2FkIHNlbGVjdGlvbicpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2Fkc1xuIiwiaW1wb3J0IHsgZCB9IGZyb20gJy4uL2FwcCdcblxuY29uc3QgRVZFTlRTID0ge1xuICBvbkNsaWNrOiAnY2xpY2snLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbkxvYWQ6ICdsb2FkJ1xufVxuXG5leHBvcnQgY29uc3QgTm9kZSA9IChlbGVtLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgbGV0IG5vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoZWxlbSlcblxuICBpZiAoYXR0cnMgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKEVWRU5UU1trZXldLCBhdHRyc1trZXldKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBjaGlsZFxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cbiJdfQ==
