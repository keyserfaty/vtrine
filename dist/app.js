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

var _SearchBoxMain = require('./components/SearchBoxMain');

var _SearchBoxMain2 = _interopRequireDefault(_SearchBoxMain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = exports.d = document;

// model
var initialState = {
  routes: {
    path: '/'
  },
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
          searchValue: action.payload.searchValue,
          routes: {
            path: '/search'
          }
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
);var body = d.querySelector('body');
var header = d.querySelector('header');
var folder = header.querySelector('.downloads');
var single = body.querySelector('.single');

store.subscribe(function (state, action) {
  var props = _extends({
    dispatch: store.dispatch
  }, state);

  var searchBoxMainPreviousNode = d.querySelector('#search');

  if (state.routes.path === '/') {
    single.appendChild((0, _SearchBoxMain2.default)(props));
  }

  if (state.routes.path !== '/' && searchBoxMainPreviousNode != null) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode);
  }

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
        window.history.pushState('', '', 'search?q=' + state.searchValue);
        break;
      }
  }
}

// events
);window.addEventListener('load', function () {
  store.dispatch({ type: 'ON_WINDOW_LOAD' });
});

folder.addEventListener('click', function () {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' });
});

},{"./components/Downloads":2,"./components/SearchBoxMain":3,"./helpers/store":5}],2:[function(require,module,exports){
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

},{"../helpers/Node":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var SearchBoxMain = function SearchBoxMain(props) {
  var dispatch = props.dispatch;


  var onKeyupInput = function onKeyupInput(e) {
    if (e.keyCode === 13) {
      dispatch({
        type: 'ON_INPUT_ENTER_KEY_DOWN',
        payload: {
          searchValue: e.target.value
        }
      });
    }
  };

  return (0, _Node.Node)('div', { id: 'search' }, (0, _Node.Node)('div', { class: 'search-box', onKeyUp: onKeyupInput }, (0, _Node.Node)('div', { class: 'icon' }), (0, _Node.Node)('input', { type: 'text', placeholder: 'Search photos' })));
};

exports.default = SearchBoxMain;

},{"../helpers/Node":4}],4:[function(require,module,exports){
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

},{"../app":1}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvU2VhcmNoQm94TWFpbi5qcyIsInNyYy9oZWxwZXJzL05vZGUuanMiLCJzcmMvaGVscGVycy9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU0sZ0JBQUksUUFBVjs7QUFFUDtBQUNBLElBQU0sZUFBZTtBQUNuQixVQUFRO0FBQ04sVUFBTTtBQURBLEdBRFc7QUFJbkIsZUFBYSxFQUpNO0FBS25CLG9CQUFrQixLQUxDO0FBTW5CLGVBQWEsQ0FBQyx3QkFBRCxFQUEyQix3QkFBM0I7QUFOTSxDQUFyQjs7QUFTQSxJQUFNLFVBQVUsU0FBVixPQUFVLEdBQWtDO0FBQUEsTUFBakMsS0FBaUMsdUVBQXpCLFlBQXlCO0FBQUEsTUFBWCxNQUFXOztBQUNoRCxVQUFRLE9BQU8sSUFBZjtBQUNFLFNBQUsseUJBQUw7QUFBZ0M7QUFDOUIsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE9BQU8sT0FBUCxDQUFlLFdBRjlCO0FBR0Usa0JBQVE7QUFDTixrQkFBTTtBQURBO0FBSFY7QUFPRDs7QUFFRCxTQUFLLHFCQUFMO0FBQTRCO0FBQzFCLDRCQUNLLEtBREw7QUFFRSw0QkFBa0IsQ0FBQyxNQUFNO0FBRjNCO0FBSUQ7O0FBRUQsU0FBSyx3QkFBTDtBQUErQjtBQUM3Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWE7QUFGZjtBQUlEOztBQUVELFNBQUssNEJBQUw7QUFBbUM7QUFDakMsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE1BQU0sV0FBTixDQUFrQixNQUFsQixDQUF5QixVQUFDLEtBQUQsRUFBUSxDQUFSO0FBQUEsbUJBQWMsTUFBTSxPQUFPLE9BQU8sT0FBUCxDQUFlLEVBQXRCLENBQXBCO0FBQUEsV0FBekI7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LE9BRkQ7QUFHRCxLQVBJO0FBUUwsY0FBVSxvQkFBWTtBQUNwQixhQUFPLEtBQVA7QUFDRCxLQVZJO0FBV0wsZUFBVyxtQkFBVSxPQUFWLEVBQW1CO0FBQzVCLGtCQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDRDtBQWJJLEdBQVA7QUFlRCxDQW5CTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vaGVscGVycy9zdG9yZSdcblxuaW1wb3J0IERvd25sb2FkcyBmcm9tICcuL2NvbXBvbmVudHMvRG93bmxvYWRzJ1xuaW1wb3J0IFNlYXJjaEJveE1haW4gZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaEJveE1haW4nXG5cbmV4cG9ydCBjb25zdCBkID0gZG9jdW1lbnRcblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcm91dGVzOiB7XG4gICAgcGF0aDogJy8nXG4gIH0sXG4gIHNlYXJjaFZhbHVlOiAnJyxcbiAgZGlzcGxheURvd25sb2FkczogZmFsc2UsXG4gIGltYWdlc1F1ZXVlOiBbJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnLCAnLi9zdGF0aWNzL2ltYWdlcy8xLmpwZyddXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwYXRoOiAnL3NlYXJjaCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGlzcGxheURvd25sb2FkczogIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW10sXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IHN0YXRlLmltYWdlc1F1ZXVlLmZpbHRlcigoaW1hZ2UsIGkpID0+IGkgIT09IE51bWJlcihhY3Rpb24ucGF5bG9hZC5pZCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcblxuLy8gdmlld1xuY29uc3QgYm9keSA9IGQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5jb25zdCBzaW5nbGUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5zaW5nbGUnKVxuXG5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgZGlzcGF0Y2g6IHN0b3JlLmRpc3BhdGNoLFxuICAgIC4uLnN0YXRlLFxuICB9XG5cbiAgY29uc3Qgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpXG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoID09PSAnLycpIHtcbiAgICBzaW5nbGUuYXBwZW5kQ2hpbGQoU2VhcmNoQm94TWFpbihwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggIT09ICcvJyAmJiBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlICE9IG51bGwpIHtcbiAgICBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIC8vIGRpc3BsYXlEb3dubG9hZHMgY2hhbmdlc1xuICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBkb3dubG9hZFByZXZpb3VzTm9kZSA9PSBudWxsKSB7XG4gICAgYm9keS5hcHBlbmRDaGlsZChEb3dubG9hZHMocHJvcHMpKVxuICB9XG5cbiAgaWYgKCFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGRvd25sb2FkUHJldmlvdXNOb2RlICE9IG51bGwpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgLy8gaW1hZ2VzUXVldWUgY2hhbmdlc1xuICBjb25zdCBjb250ZW50ID0gYm9keS5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQgLmNvbnRlbnQnKVxuXG4gIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5sZW5ndGggPT09IDAgJiYgY29udGVudCAhPSBudWxsKSB7XG4gICAgY29uc3QgdWwgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCAuY29udGVudCB1bCcpXG5cbiAgICBpZiAodWwgIT0gbnVsbCkge1xuICAgICAgY29udGVudC5yZW1vdmVDaGlsZCh1bClcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCAnc2VhcmNoP3E9JyArIHN0YXRlLnNlYXJjaFZhbHVlKTtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBEb3dubG9hZHMgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtcbiAgICBkaXNwYXRjaCxcbiAgICBpbWFnZXNRdWV1ZSxcbiAgfSA9IHByb3BzXG5cbiAgLy8gRXZlbnRzXG4gIGNvbnN0IGNsZWFyT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgYnV0dG9uT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9ET1dOTE9BRF9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgdWxPbkNsaWNrID0gZSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUuaWQubGVuZ3RoKSB7XG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fRE9XTkxPQURfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIERPTVxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdkb3dubG9hZCcgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdoZWFkZXInIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICd0aXRsZScgfSwgJ015IENvbGxlY3Rpb24nKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NsZWFyJywgb25DbGljazogY2xlYXJPbkNsaWNrIH0sICdDbGVhciBhbGwnKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYXJyb3cnIH0pLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ltYWdlcycgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NvbnRlbnQnIH0sXG4gICAgICAgICAgTm9kZSgndWwnLCB7IG9uQ2xpY2s6IHVsT25DbGljayB9LFxuICAgICAgICAgICAgLi4uaW1hZ2VzUXVldWUubWFwKChpbWFnZSwgaSkgPT5cbiAgICAgICAgICAgICAgTm9kZSgnbGknLCB7IGNsYXNzOiAnaW1hZ2UnLCBzdHlsZTogYGJhY2tncm91bmQ6IHVybCgnJHtpbWFnZX0nKWAgfSxcbiAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYWN0aW9ucycsIGlkOiBpIH0sXG4gICAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAncmVtb3ZlJyB9KSwgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Rvd25sb2FkJyB9KSkpXG4gICAgICAgICAgICApKSkpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnYnV0dG9uJywgeyBvbkNsaWNrOiBidXR0b25PbkNsaWNrIH0sICdEb3dubG9hZCBzZWxlY3Rpb24nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3dubG9hZHNcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IFNlYXJjaEJveE1haW4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHByb3BzXG5cbiAgY29uc3Qgb25LZXl1cElucHV0ID0gZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdzZWFyY2gnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoLWJveCcsIG9uS2V5VXA6IG9uS2V5dXBJbnB1dCB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaWNvbicgfSksXG4gICAgICAgIE5vZGUoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnU2VhcmNoIHBob3RvcycgfSkpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEJveE1haW5cbiIsImltcG9ydCB7IGQgfSBmcm9tICcuLi9hcHAnXG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25LZXlVcDogJ2tleXVwJyxcbiAgb25Mb2FkOiAnbG9hZCdcbn1cblxuZXhwb3J0IGNvbnN0IE5vZGUgPSAoZWxlbSwgYXR0cnMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gIGxldCBub2RlID0gZC5jcmVhdGVFbGVtZW50KGVsZW0pXG5cbiAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFNba2V5XSwgYXR0cnNba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlRm4gKHJlZHVjZXIpIHtcbiAgbGV0IHN0YXRlID0gdW5kZWZpbmVkXG4gIGxldCBzdWJzY3JpYmVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHN0YXRlKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG4iXX0=
