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

var _OnBoarding = require('./components/OnBoarding');

var _OnBoarding2 = _interopRequireDefault(_OnBoarding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    case 'ON_ADD_IMAGE_TO_QUEUE':
      {
        return _extends({}, state, {
          imagesQueue: [].concat(_toConsumableArray(state.imagesQueue), _toConsumableArray(action.payload.image))
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

  // route changes
  var searchBoxMainPreviousNode = d.querySelector('#search');

  if (state.routes.path === '/') {
    single.appendChild((0, _SearchBoxMain2.default)(props));
  }

  if (state.routes.path !== '/' && searchBoxMainPreviousNode != null) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode);
  }

  if (state.routes.path === '/search' && single.querySelector('#on-boarding') == null) {
    single.appendChild((0, _OnBoarding2.default)(props));
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

},{"./components/Downloads":2,"./components/OnBoarding":3,"./components/SearchBoxMain":4,"./helpers/store":6}],2:[function(require,module,exports){
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

},{"../helpers/Node":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var OnBoarding = function OnBoarding(props) {
  return (0, _Node.Node)('div', { id: 'on-boarding' }, (0, _Node.Node)('div', { class: 'image' }), (0, _Node.Node)('div', { class: 'caption' }, 'Press spacebar to generate a photo'), (0, _Node.Node)('div', { class: 'footer' }, (0, _Node.Node)('div', { class: 'skip' }, 'Skip'), (0, _Node.Node)('div', { class: 'nav' }, (0, _Node.Node)('ul', null, (0, _Node.Node)('li'), (0, _Node.Node)('li'), (0, _Node.Node)('li'))), (0, _Node.Node)('div', { class: 'next' }, 'Next')));
};

exports.default = OnBoarding;

},{"../helpers/Node":5}],4:[function(require,module,exports){
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

},{"../helpers/Node":5}],5:[function(require,module,exports){
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

},{"../app":1}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvT25Cb2FyZGluZy5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvaGVscGVycy9Ob2RlLmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxlQUFlO0FBQ25CLFVBQVE7QUFDTixVQUFNO0FBREEsR0FEVztBQUluQixlQUFhLEVBSk07QUFLbkIsb0JBQWtCLEtBTEM7QUFNbkIsZUFBYSxDQUFDLHdCQUFELEVBQTJCLHdCQUEzQjtBQU5NLENBQXJCOztBQVNBLElBQU0sVUFBVSxTQUFWLE9BQVUsR0FBa0M7QUFBQSxNQUFqQyxLQUFpQyx1RUFBekIsWUFBeUI7QUFBQSxNQUFYLE1BQVc7O0FBQ2hELFVBQVEsT0FBTyxJQUFmO0FBQ0UsU0FBSyx5QkFBTDtBQUFnQztBQUM5Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWEsT0FBTyxPQUFQLENBQWUsV0FGOUI7QUFHRSxrQkFBUTtBQUNOLGtCQUFNO0FBREE7QUFIVjtBQU9EOztBQUVELFNBQUsscUJBQUw7QUFBNEI7QUFDMUIsNEJBQ0ssS0FETDtBQUVFLDRCQUFrQixDQUFDLE1BQU07QUFGM0I7QUFJRDs7QUFFRCxTQUFLLHdCQUFMO0FBQStCO0FBQzdCLDRCQUNLLEtBREw7QUFFRSx1QkFBYTtBQUZmO0FBSUQ7O0FBRUQsU0FBSyx1QkFBTDtBQUE4QjtBQUM1Qiw0QkFDSyxLQURMO0FBRUUsb0RBQ0ssTUFBTSxXQURYLHNCQUVLLE9BQU8sT0FBUCxDQUFlLEtBRnBCO0FBRkY7QUFPRDs7QUFFRCxTQUFLLDRCQUFMO0FB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QUFaLENBQWlCLE9BQWpCO0FBQ0Q7QUFiSSxHQUFQO0FBZUQsQ0FuQk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmUnXG5cbmltcG9ydCBEb3dubG9hZHMgZnJvbSAnLi9jb21wb25lbnRzL0Rvd25sb2FkcydcbmltcG9ydCBTZWFyY2hCb3hNYWluIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2hCb3hNYWluJ1xuaW1wb3J0IE9uQm9hcmRpbmcgZnJvbSAnLi9jb21wb25lbnRzL09uQm9hcmRpbmcnXG5cbmV4cG9ydCBjb25zdCBkID0gZG9jdW1lbnRcblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcm91dGVzOiB7XG4gICAgcGF0aDogJy8nXG4gIH0sXG4gIHNlYXJjaFZhbHVlOiAnJyxcbiAgZGlzcGxheURvd25sb2FkczogZmFsc2UsXG4gIGltYWdlc1F1ZXVlOiBbJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnLCAnLi9zdGF0aWNzL2ltYWdlcy8xLmpwZyddXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwYXRoOiAnL3NlYXJjaCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGlzcGxheURvd25sb2FkczogIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW10sXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQUREX0lNQUdFX1RPX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXG4gICAgICAgICAgLi4uc3RhdGUuaW1hZ2VzUXVldWUsXG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuaW1hZ2VcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZS5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5cbi8vIHZpZXdcbmNvbnN0IGJvZHkgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuY29uc3QgaGVhZGVyID0gZC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKVxuY29uc3QgZm9sZGVyID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5kb3dubG9hZHMnKVxuY29uc3Qgc2luZ2xlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcuc2luZ2xlJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAuLi5zdGF0ZSxcbiAgfVxuXG4gIC8vIHJvdXRlIGNoYW5nZXNcbiAgY29uc3Qgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpXG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoID09PSAnLycpIHtcbiAgICBzaW5nbGUuYXBwZW5kQ2hpbGQoU2VhcmNoQm94TWFpbihwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggIT09ICcvJyAmJiBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlICE9IG51bGwpIHtcbiAgICBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmIHNpbmdsZS5xdWVyeVNlbGVjdG9yKCcjb24tYm9hcmRpbmcnKSA9PSBudWxsKSB7XG4gICAgc2luZ2xlLmFwcGVuZENoaWxkKE9uQm9hcmRpbmcocHJvcHMpKVxuICB9XG5cbiAgLy8gZGlzcGxheURvd25sb2FkcyBjaGFuZ2VzXG4gIGNvbnN0IGRvd25sb2FkUHJldmlvdXNOb2RlID0gZC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQnKVxuXG4gIGlmIChzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGRvd25sb2FkUHJldmlvdXNOb2RlID09IG51bGwpIHtcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICBpZiAoIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgZG93bmxvYWRQcmV2aW91c05vZGUgIT0gbnVsbCkge1xuICAgIGRvd25sb2FkUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG93bmxvYWRQcmV2aW91c05vZGUpXG4gIH1cblxuICAvLyBpbWFnZXNRdWV1ZSBjaGFuZ2VzXG4gIGNvbnN0IGNvbnRlbnQgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCAuY29udGVudCcpXG5cbiAgaWYgKHN0YXRlLmltYWdlc1F1ZXVlLmxlbmd0aCA9PT0gMCAmJiBjb250ZW50ICE9IG51bGwpIHtcbiAgICBjb25zdCB1bCA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkIC5jb250ZW50IHVsJylcblxuICAgIGlmICh1bCAhPSBudWxsKSB7XG4gICAgICBjb250ZW50LnJlbW92ZUNoaWxkKHVsKVxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsICdzZWFyY2g/cT0nICsgc3RhdGUuc2VhcmNoVmFsdWUpO1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSlcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IERvd25sb2FkcyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGRpc3BhdGNoLFxuICAgIGltYWdlc1F1ZXVlLFxuICB9ID0gcHJvcHNcblxuICAvLyBFdmVudHNcbiAgY29uc3QgY2xlYXJPbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCBidXR0b25PbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCB1bE9uQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9ET1dOTE9BRF9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIHsgb25DbGljazogdWxPbkNsaWNrIH0sXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlfScpYCB9LFxuICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhY3Rpb25zJywgaWQ6IGkgfSxcbiAgICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdyZW1vdmUnIH0pLCBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZG93bmxvYWQnIH0pKSlcbiAgICAgICAgICAgICkpKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdidXR0b24nLCB7IG9uQ2xpY2s6IGJ1dHRvbk9uQ2xpY2sgfSwgJ0Rvd25sb2FkIHNlbGVjdGlvbicpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2Fkc1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgT25Cb2FyZGluZyA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnb24tYm9hcmRpbmcnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2UnIH0pLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NhcHRpb24nIH0sICdQcmVzcyBzcGFjZWJhciB0byBnZW5lcmF0ZSBhIHBob3RvJyksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2tpcCcgfSwgJ1NraXAnKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ25hdicgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIG51bGwsXG4gICAgICAgICAgICBOb2RlKCdsaScpLCBOb2RlKCdsaScpLCBOb2RlKCdsaScpKSksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduZXh0JyB9LCAnTmV4dCcpKSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBPbkJvYXJkaW5nXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTZWFyY2hCb3hNYWluID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRpc3BhdGNoIH0gPSBwcm9wc1xuXG4gIGNvbnN0IG9uS2V5dXBJbnB1dCA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnc2VhcmNoJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaC1ib3gnLCBvbktleVVwOiBvbktleXVwSW5wdXQgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ljb24nIH0pLFxuICAgICAgICBOb2RlKCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ1NlYXJjaCBwaG90b3MnIH0pKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3hNYWluXG4iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi4vYXBwJ1xuXG5jb25zdCBFVkVOVFMgPSB7XG4gIG9uQ2xpY2s6ICdjbGljaycsXG4gIG9uS2V5VXA6ICdrZXl1cCcsXG4gIG9uTG9hZDogJ2xvYWQnXG59XG5cbmV4cG9ydCBjb25zdCBOb2RlID0gKGVsZW0sIGF0dHJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBsZXQgbm9kZSA9IGQuY3JlYXRlRWxlbWVudChlbGVtKVxuXG4gIGlmIChhdHRycyAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTW2tleV0sIGF0dHJzW2tleV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coYWN0aW9uLCBzdGF0ZSlcbiAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlKHN0YXRlLCBhY3Rpb24pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuIl19
