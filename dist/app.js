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

  node.setAttribute('data-unique-id', uniqueId());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBRUE7Ozs7OztBQUVPLElBQU0sZ0JBQUksUUFBVjs7QUFFUDtBQUNBLElBQU0sZUFBZTtBQUNuQixlQUFhLEVBRE07QUFFbkIsb0JBQWtCLEtBRkM7QUFHbkIsZUFBYSxDQUFDLHdCQUFELEVBQTJCLHdCQUEzQjtBQUhNLENBQXJCOztBQU1BLElBQU0sVUFBVSxTQUFWLE9BQVUsR0FBa0M7QUFBQSxNQUFqQyxLQUFpQyx1RUFBekIsWUFBeUI7QUFBQSxNQUFYLE1BQVc7O0FBQ2hELFVBQVEsT0FBTyxJQUFmO0FBQ0UsU0FBSyx5QkFBTDtBQUFnQztBQUM5Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWEsT0FBTyxPQUFQLENBQWU7QUFGOUI7QUFJRDs7QUFFRCxTQUFLLHFCQUFMO0FBQTRCO0FBQzFCLDRCQUNLLEtBREw7QUFFRSw0QkFBa0IsQ0FBQyxNQUFNO0FBRjNCO0FBSUQ7O0FBRUQsU0FBSyx3QkFBTDtBQUErQjtBQUM3Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWE7QUFGZjtBQUlEOztBQUVELFNBQUssNEJBQUw7QUFBbUM7QUFDakMsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE1BQU0sV0FBTixDQUFrQixNQUFsQixDQUF5QixVQUFDLEtBQUQsRUFBUSxDQUFSO0FBQUEsbUJBQWMsTUFBTSxPQUFPLE9BQU8sT0FBUCxDQUFlLEVBQXRCLENBQXBCO0FBQUEsV0FBekI7QUFGZjtBQUlEOztBQUVEO0FBQ0UsYUFBTyxLQUFQO0FBOUJKO0FBZ0NELENBakNEOztBQW1DQSxJQUFNLFFBQVEsd0JBQVk7O0FBRTFCO0FBRmMsQ0FBZCxDQUdBLElBQU0sY0FBYyxFQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FBcEI7QUFDQSxJQUFNLE9BQU8sRUFBRSxhQUFGLENBQWdCLE1BQWhCLENBQWI7QUFDQSxJQUFNLFNBQVMsRUFBRSxhQUFGLENBQWdCLFFBQWhCLENBQWY7QUFDQSxJQUFNLFNBQVMsT0FBTyxhQUFQLENBQXFCLFlBQXJCLENBQWY7O0FBRUEsTUFBTSxTQUFOLENBQWdCLFVBQUMsS0FBRCxFQUFRLE1BQVIsRUFBbUI7QUFDakMsTUFBTTtBQUNKLGNBQVUsTUFBTTtBQURaLEtBRUQsS0FGQyxDQUFOOztBQUtBO0FBQ0EsTUFBTSx1QkFBdUIsRUFBRSxhQUFGLENBQWdCLFdBQWhCLENBQTdCOztBQUVBLE1BQUksTUFBTSxnQkFBTixJQUEwQix3QkFBd0IsSUFBdEQsRUFBNEQ7QUFDMUQsU0FBSyxXQUFMLENBQWlCLHlCQUFVLEtBQVYsQ0FBakI7QUFDRDs7QUFFRCxNQUFJLENBQUMsTUFBTSxnQkFBUCxJQUEyQix3QkFBd0IsSUFBdkQsRUFBNkQ7QUFDM0QseUJBQXFCLFVBQXJCLENBQWdDLFdBQWhDLENBQTRDLG9CQUE1QztBQUNEOztBQUVEO0FBQ0EsTUFBTSxVQUFVLEtBQUssYUFBTCxDQUFtQixvQkFBbkIsQ0FBaEI7O0FBRUEsTUFBSSxNQUFNLFdBQU4sQ0FBa0IsTUFBbEIsS0FBNkIsQ0FBN0IsSUFBa0MsV0FBVyxJQUFqRCxFQUF1RDtBQUNyRCxRQUFNLEtBQUssUUFBUSxhQUFSLENBQXNCLHVCQUF0QixDQUFYOztBQUVBLFFBQUksTUFBTSxJQUFWLEVBQWdCO0FBQ2QsY0FBUSxXQUFSLENBQW9CLEVBQXBCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFRLE9BQU8sSUFBZjtBQUNFLFNBQUsseUJBQUw7QUFBZ0M7QUFDOUIsZ0JBQVEsR0FBUixDQUFZLGlCQUFaO0FBQ0E7QUFDRDtBQUpIO0FBTUQ7O0FBRUQ7QUFwQ0EsRUFxQ0EsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLFFBQU0sUUFBTixDQUFlLEVBQUUsTUFBTSxnQkFBUixFQUFmO0FBQ0QsQ0FGRDs7QUFJQSxZQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLGFBQUs7QUFDekMsTUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixVQUFNLFFBQU4sQ0FBZTtBQUNiLFlBQU0seUJBRE87QUFFYixlQUFTO0FBQ1AscUJBQWEsRUFBRSxNQUFGLENBQVM7QUFEZjtBQUZJLEtBQWY7QUFNRDtBQUNGLENBVEQ7O0FBV0EsT0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFNO0FBQ3JDLFFBQU0sUUFBTixDQUFlLEVBQUUsTUFBTSxxQkFBUixFQUFmO0FBQ0QsQ0FGRDs7Ozs7Ozs7O0FDNUdBOzs7O0FBRUEsSUFBTSxZQUFZLFNBQVosU0FBWSxRQUFTO0FBQUEsTUFFdkIsUUFGdUIsR0FJckIsS0FKcUIsQ0FFdkIsUUFGdUI7QUFBQSxNQUd2QixXQUh1QixHQUlyQixLQUpxQixDQUd2QixXQUh1Qjs7QUFNekI7O0FBQ0EsTUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFNO0FBQ3pCLGFBQVMsRUFBRSxNQUFNLHdCQUFSLEVBQVQ7QUFDRCxHQUZEOztBQUlBLE1BQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLEdBQU07QUFDMUIsYUFBUyxFQUFFLE1BQU0sMkJBQVIsRUFBVDtBQUNELEdBRkQ7O0FBSUEsTUFBTSxZQUFZLFNBQVosU0FBWSxJQUFLO0FBQ3JCLFFBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUFwQixDQUF1QixNQUEzQixFQUFtQztBQUNqQyxVQUFJLEVBQUUsTUFBRixDQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsU0FBdkIsS0FBcUMsUUFBekMsRUFBbUQ7QUFDakQsaUJBQVMsRUFBQyxNQUFNLDRCQUFQLEVBQXFDLFNBQVMsRUFBQyxJQUFJLEVBQUUsTUFBRixDQUFTLFVBQVQsQ0FBb0IsRUFBekIsRUFBOUMsRUFBVDtBQUNEOztBQUVELFVBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixTQUF2QixLQUFxQyxVQUF6QyxFQUFxRDtBQUNuRCxpQkFBUyxFQUFDLE1BQU0sOEJBQVAsRUFBdUMsU0FBUyxFQUFDLElBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUF6QixFQUFoRCxFQUFUO0FBQ0Q7QUFDRjtBQUNGLEdBVkQ7O0FBWUE7QUFDQSxTQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLElBQUksVUFBTixFQUFaLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxRQUFULEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE9BQVQsRUFBWixFQUFnQyxlQUFoQyxDQURGLEVBRUUsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxPQUFULEVBQWtCLFNBQVMsWUFBM0IsRUFBWixFQUF1RCxXQUF2RCxDQUZGLENBREYsRUFJRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE9BQVQsRUFBWixDQUpGLEVBS0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxRQUFULEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFNBQVQsRUFBWixFQUNFLDZCQUFLLElBQUwsRUFBVyxFQUFFLFNBQVMsU0FBWCxFQUFYLDRCQUNLLFlBQVksR0FBWixDQUFnQixVQUFDLEtBQUQsRUFBUSxDQUFSO0FBQUEsV0FDakIsZ0JBQUssSUFBTCxFQUFXLEVBQUUsT0FBTyxPQUFULEVBQWtCLDhCQUEyQixLQUEzQixRQUFsQixFQUFYLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxTQUFULEVBQW9CLElBQUksQ0FBeEIsRUFBWixFQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLE9BQU8sUUFBVCxFQUFaLENBREYsRUFDb0MsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxVQUFULEVBQVosQ0FEcEMsQ0FERixDQURpQjtBQUFBLEdBQWhCLENBREwsR0FERixDQURGLENBTEYsRUFhRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFFBQVQsRUFBWixFQUNFLGdCQUFLLFFBQUwsRUFBZSxFQUFFLFNBQVMsYUFBWCxFQUFmLEVBQTJDLG9CQUEzQyxDQURGLENBYkYsQ0FERjtBQW1CRCxDQS9DRDs7a0JBaURlLFM7Ozs7Ozs7Ozs7OztBQ25EZjs7QUFFQSxJQUFNLFNBQVM7QUFDYixXQUFTLE9BREk7QUFFYixXQUFTLE9BRkk7QUFHYixVQUFRO0FBSEssQ0FBZjs7QUFNTyxJQUFNLHNCQUFPLFNBQVAsSUFBTyxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQThCO0FBQUEsb0NBQWIsUUFBYTtBQUFiLFlBQWE7QUFBQTs7QUFDaEQsTUFBSSxPQUFPLE9BQUUsYUFBRixDQUFnQixJQUFoQixDQUFYOztBQUVBLE1BQUksU0FBUyxJQUFiLEVBQW1CO0FBQ2pCLFdBQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsZUFBTztBQUNoQyxVQUFJLE9BQU8sY0FBUCxDQUFzQixHQUF0QixDQUFKLEVBQWdDO0FBQzlCLGFBQUssZ0JBQUwsQ0FBc0IsT0FBTyxHQUFQLENBQXRCLEVBQW1DLE1BQU0sR0FBTixDQUFuQztBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssWUFBTCxDQUFrQixHQUFsQixFQUF1QixNQUFNLEdBQU4sQ0FBdkI7QUFDRDtBQUNGLEtBTkQ7QUFPRDs7QUFFRCxNQUFJLFNBQVMsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUN2QixhQUFTLE9BQVQsQ0FBaUIsaUJBQVM7QUFDeEIsVUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsYUFBSyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7O0FBRUQsVUFBSSxRQUFPLEtBQVAseUNBQU8sS0FBUCxPQUFpQixRQUFyQixFQUErQjtBQUM3QixhQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDRDtBQUNGLEtBUkQ7QUFTRDs7QUFFRCxPQUFLLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DLFVBQXBDOztBQUVBLFNBQU8sSUFBUDtBQUNELENBNUJNOzs7Ozs7OztBQ1JBLElBQU0sb0NBQWMsU0FBUyxhQUFULENBQXdCLE9BQXhCLEVBQWlDO0FBQzFELE1BQUksUUFBUSxTQUFaO0FBQ0EsTUFBSSxjQUFjLEVBQWxCOztBQUVBLFNBQU87QUFDTCxjQUFVLGtCQUFVLE1BQVYsRUFBa0I7QUFDMUIsY0FBUSxRQUFRLEtBQVIsRUFBZSxNQUFmLENBQVI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO0FBQ0Esa0JBQVksT0FBWixDQUFvQixVQUFVLE1BQVYsRUFBa0I7QUFDcEMsZUFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQVA7QUFDRCxPQUZEO0FBR0QsS0FQSTtBQVFMLGNBQVUsb0JBQVk7QUFDcEIsYUFBTyxLQUFQO0FBQ0QsS0FWSTtBQVdMLGVBQVcsbUJBQVUsT0FBVixFQUFtQjtBQUM1QixrQkFBWSxJQUFaLENBQWlCLE9BQWpCO0FBQ0Q7QUFiSSxHQUFQO0FBZUQsQ0FuQk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmUnXG5cbmltcG9ydCBEb3dubG9hZHMgZnJvbSAnLi9jb21wb25lbnRzL0Rvd25sb2FkcydcblxuZXhwb3J0IGNvbnN0IGQgPSBkb2N1bWVudFxuXG4vLyBtb2RlbFxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZS5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5cbi8vIHZpZXdcbmNvbnN0IHNlYXJjaElucHV0ID0gZC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAuLi5zdGF0ZSxcbiAgfVxuXG4gIC8vIGRpc3BsYXlEb3dubG9hZHMgY2hhbmdlc1xuICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBkb3dubG9hZFByZXZpb3VzTm9kZSA9PSBudWxsKSB7XG4gICAgYm9keS5hcHBlbmRDaGlsZChEb3dubG9hZHMocHJvcHMpKVxuICB9XG5cbiAgaWYgKCFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGRvd25sb2FkUHJldmlvdXNOb2RlICE9IG51bGwpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgLy8gaW1hZ2VzUXVldWUgY2hhbmdlc1xuICBjb25zdCBjb250ZW50ID0gYm9keS5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQgLmNvbnRlbnQnKVxuXG4gIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5sZW5ndGggPT09IDAgJiYgY29udGVudCAhPSBudWxsKSB7XG4gICAgY29uc3QgdWwgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCAuY29udGVudCB1bCcpXG5cbiAgICBpZiAodWwgIT0gbnVsbCkge1xuICAgICAgY29udGVudC5yZW1vdmVDaGlsZCh1bClcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICBjb25zb2xlLmxvZygnc2hvdWxkIHJlZGlyZWN0JylcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgRG93bmxvYWRzID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgZGlzcGF0Y2gsXG4gICAgaW1hZ2VzUXVldWUsXG4gIH0gPSBwcm9wc1xuXG4gIC8vIEV2ZW50c1xuICBjb25zdCBjbGVhck9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IGJ1dHRvbk9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fRE9XTkxPQURfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IHVsT25DbGljayA9IGUgPT4ge1xuICAgIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmlkLmxlbmd0aCkge1xuICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAncmVtb3ZlJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ2Rvd25sb2FkJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX0RPV05MT0FEX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBET01cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnZG93bmxvYWQnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaGVhZGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjbGVhcicsIG9uQ2xpY2s6IGNsZWFyT25DbGljayB9LCAnQ2xlYXIgYWxsJykpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpbWFnZXMnIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjb250ZW50JyB9LFxuICAgICAgICAgIE5vZGUoJ3VsJywgeyBvbkNsaWNrOiB1bE9uQ2xpY2sgfSxcbiAgICAgICAgICAgIC4uLmltYWdlc1F1ZXVlLm1hcCgoaW1hZ2UsIGkpID0+XG4gICAgICAgICAgICAgIE5vZGUoJ2xpJywgeyBjbGFzczogJ2ltYWdlJywgc3R5bGU6IGBiYWNrZ3JvdW5kOiB1cmwoJyR7aW1hZ2V9JylgIH0sXG4gICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2FjdGlvbnMnLCBpZDogaSB9LFxuICAgICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScgfSksIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdkb3dubG9hZCcgfSkpKVxuICAgICAgICAgICAgKSkpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sXG4gICAgICAgIE5vZGUoJ2J1dHRvbicsIHsgb25DbGljazogYnV0dG9uT25DbGljayB9LCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRzXG4iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi4vYXBwJ1xuXG5jb25zdCBFVkVOVFMgPSB7XG4gIG9uQ2xpY2s6ICdjbGljaycsXG4gIG9uS2V5VXA6ICdrZXl1cCcsXG4gIG9uTG9hZDogJ2xvYWQnXG59XG5cbmV4cG9ydCBjb25zdCBOb2RlID0gKGVsZW0sIGF0dHJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBsZXQgbm9kZSA9IGQuY3JlYXRlRWxlbWVudChlbGVtKVxuXG4gIGlmIChhdHRycyAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTW2tleV0sIGF0dHJzW2tleV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXVuaXF1ZS1pZCcsIHVuaXF1ZUlkKCkpXG5cbiAgcmV0dXJuIG5vZGVcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlRm4gKHJlZHVjZXIpIHtcbiAgbGV0IHN0YXRlID0gdW5kZWZpbmVkXG4gIGxldCBzdWJzY3JpYmVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHN0YXRlKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG4iXX0=
