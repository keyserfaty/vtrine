(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _store = require('./helpers/store');

var _helpers = require('./helpers');

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
  var onBoardingNode = single.querySelector('#on-boarding');

  if (state.routes.path === '/' && !(0, _helpers.exists)(searchBoxMainPreviousNode)) {
    single.appendChild((0, _SearchBoxMain2.default)(props));
  }

  if (state.routes.path !== '/' && (0, _helpers.exists)(searchBoxMainPreviousNode)) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode);
  }

  if (state.routes.path === '/search' && !(0, _helpers.exists)(onBoardingNode)) {
    // TODO: should add checking from localStorage too
    single.appendChild((0, _OnBoarding2.default)(props));
  }

  // imagesQueue changes
  var downloadPreviousNode = d.querySelector('#download');

  if (state.displayDownloads && (0, _helpers.exists)(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode);
    body.appendChild((0, _Downloads2.default)(props));
  }

  // displayDownloads changes
  if (state.displayDownloads && !(0, _helpers.exists)(downloadPreviousNode)) {
    body.appendChild((0, _Downloads2.default)(props));
  }

  if (!state.displayDownloads && (0, _helpers.exists)(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode);
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

},{"./components/Downloads":2,"./components/OnBoarding":3,"./components/SearchBoxMain":4,"./helpers":6,"./helpers/store":7}],2:[function(require,module,exports){
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
var exists = exports.exists = function exists(node) {
  return node != null;
};

},{}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvT25Cb2FyZGluZy5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvaGVscGVycy9Ob2RlLmpzIiwic3JjL2hlbHBlcnMvaW5kZXguanMiLCJzcmMvaGVscGVycy9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFTyxJQUFNLGdCQUFJLFFBQVY7O0FBRVA7QUFDQSxJQUFNLGVBQWU7QUFDbkIsVUFBUTtBQUNOLFVBQU07QUFEQSxHQURXO0FBSW5CLGVBQWEsRUFKTTtBQUtuQixvQkFBa0IsS0FMQztBQU1uQixlQUFhLENBQUMsd0JBQUQsRUFBMkIsd0JBQTNCO0FBTk0sQ0FBckI7O0FBU0EsSUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFrQztBQUFBLE1BQWpDLEtBQWlDLHVFQUF6QixZQUF5QjtBQUFBLE1BQVgsTUFBVzs7QUFDaEQsVUFBUSxPQUFPLElBQWY7QUFDRSxTQUFLLHlCQUFMO0FBQWdDO0FBQzlCLDRCQUNLLEtBREw7QUFFRSx1QkFBYSxPQUFPLE9BQVAsQ0FBZSxXQUY5QjtBQUdFLGtCQUFRO0FBQ04sa0JBQU07QUFEQTtBQUhWO0FBT0Q7O0FBRUQsU0FBSyxxQkFBTDtBQUE0QjtBQUMxQiw0QkFDSyxLQURMO0FBRUUsNEJBQWtCLENBQUMsTUFBTTtBQUYzQjtBQUlEOztBQUVELFNBQUssd0JBQUw7QUFBK0I7QUFDN0IsNEJBQ0ssS0FETDtBQUVFLHVCQUFhO0FBRmY7QUFJRDs7QUFFRCxTQUFLLHVCQUFMO0FBQThCO0FBQzVCLDRCQUNLLEtBREw7QUFFRSxvREFDSyxNQUFNLFdBRFgsc0JBRUssT0FBTyxPQUFQLENBQWUsS0FGcEI7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RDtBQUdELEtBUEk7QUFRTCxjQUFVLG9CQUFZO0FBQ3BCLGFBQU8sS0FBUDtBQUNELEtBVkk7QUFXTCxlQUFXLG1CQUFVLE9BQVYsRUFBbUI7QUFDNUIsa0JBQVksSUFBWixDQUFpQixPQUFqQjtBQUNEO0FBYkksR0FBUDtBQWVELENBbkJNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi9oZWxwZXJzL3N0b3JlJ1xuaW1wb3J0IHsgZXhpc3RzIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG5pbXBvcnQgRG93bmxvYWRzIGZyb20gJy4vY29tcG9uZW50cy9Eb3dubG9hZHMnXG5pbXBvcnQgU2VhcmNoQm94TWFpbiBmcm9tICcuL2NvbXBvbmVudHMvU2VhcmNoQm94TWFpbidcbmltcG9ydCBPbkJvYXJkaW5nIGZyb20gJy4vY29tcG9uZW50cy9PbkJvYXJkaW5nJ1xuXG5leHBvcnQgY29uc3QgZCA9IGRvY3VtZW50XG5cbi8vIG1vZGVsXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJvdXRlczoge1xuICAgIHBhdGg6ICcvJ1xuICB9LFxuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgICAgcm91dGVzOiB7XG4gICAgICAgICAgcGF0aDogJy9zZWFyY2gnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0FERF9JTUFHRV9UT19RVUVVRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW1xuICAgICAgICAgIC4uLnN0YXRlLmltYWdlc1F1ZXVlLFxuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmltYWdlXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogc3RhdGUuaW1hZ2VzUXVldWVcbiAgICAgICAgICAuZmlsdGVyKChpbWFnZSwgaSkgPT4gaSAhPT0gTnVtYmVyKGFjdGlvbi5wYXlsb2FkLmlkKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuXG4vLyB2aWV3XG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcbmNvbnN0IHNpbmdsZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnNpbmdsZScpXG5cbnN0b3JlLnN1YnNjcmliZSgoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBkaXNwYXRjaDogc3RvcmUuZGlzcGF0Y2gsXG4gICAgLi4uc3RhdGUsXG4gIH1cblxuICAvLyByb3V0ZSBjaGFuZ2VzXG4gIGNvbnN0IHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKVxuICBjb25zdCBvbkJvYXJkaW5nTm9kZSA9IHNpbmdsZS5xdWVyeVNlbGVjdG9yKCcjb24tYm9hcmRpbmcnKVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy8nICYmICFleGlzdHMoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSkpIHtcbiAgICBzaW5nbGUuYXBwZW5kQ2hpbGQoU2VhcmNoQm94TWFpbihwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggIT09ICcvJyAmJiBleGlzdHMoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSkpIHtcbiAgICBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmICFleGlzdHMob25Cb2FyZGluZ05vZGUpKSB7IC8vIFRPRE86IHNob3VsZCBhZGQgY2hlY2tpbmcgZnJvbSBsb2NhbFN0b3JhZ2UgdG9vXG4gICAgc2luZ2xlLmFwcGVuZENoaWxkKE9uQm9hcmRpbmcocHJvcHMpKVxuICB9XG5cbiAgLy8gaW1hZ2VzUXVldWUgY2hhbmdlc1xuICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICAvLyBkaXNwbGF5RG93bmxvYWRzIGNoYW5nZXNcbiAgaWYgKHN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgIWV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICBpZiAoIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgZXhpc3RzKGRvd25sb2FkUHJldmlvdXNOb2RlKSkge1xuICAgIGRvd25sb2FkUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG93bmxvYWRQcmV2aW91c05vZGUpXG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCAnc2VhcmNoP3E9JyArIHN0YXRlLnNlYXJjaFZhbHVlKTtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBEb3dubG9hZHMgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtcbiAgICBkaXNwYXRjaCxcbiAgICBpbWFnZXNRdWV1ZSxcbiAgfSA9IHByb3BzXG5cbiAgLy8gRXZlbnRzXG4gIGNvbnN0IGNsZWFyT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgYnV0dG9uT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9ET1dOTE9BRF9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgdWxPbkNsaWNrID0gZSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUuaWQubGVuZ3RoKSB7XG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fRE9XTkxPQURfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIERPTVxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdkb3dubG9hZCcgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdoZWFkZXInIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICd0aXRsZScgfSwgJ015IENvbGxlY3Rpb24nKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NsZWFyJywgb25DbGljazogY2xlYXJPbkNsaWNrIH0sICdDbGVhciBhbGwnKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYXJyb3cnIH0pLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ltYWdlcycgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NvbnRlbnQnIH0sXG4gICAgICAgICAgTm9kZSgndWwnLCB7IG9uQ2xpY2s6IHVsT25DbGljayB9LFxuICAgICAgICAgICAgLi4uaW1hZ2VzUXVldWUubWFwKChpbWFnZSwgaSkgPT5cbiAgICAgICAgICAgICAgTm9kZSgnbGknLCB7IGNsYXNzOiAnaW1hZ2UnLCBzdHlsZTogYGJhY2tncm91bmQ6IHVybCgnJHtpbWFnZX0nKWAgfSxcbiAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYWN0aW9ucycsIGlkOiBpIH0sXG4gICAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAncmVtb3ZlJyB9KSwgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Rvd25sb2FkJyB9KSkpXG4gICAgICAgICAgICApKSkpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnYnV0dG9uJywgeyBvbkNsaWNrOiBidXR0b25PbkNsaWNrIH0sICdEb3dubG9hZCBzZWxlY3Rpb24nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3dubG9hZHNcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IE9uQm9hcmRpbmcgPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ29uLWJvYXJkaW5nJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ltYWdlJyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjYXB0aW9uJyB9LCAnUHJlc3Mgc3BhY2ViYXIgdG8gZ2VuZXJhdGUgYSBwaG90bycpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NraXAnIH0sICdTa2lwJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduYXYnIH0sXG4gICAgICAgICAgTm9kZSgndWwnLCBudWxsLFxuICAgICAgICAgICAgTm9kZSgnbGknKSwgTm9kZSgnbGknKSwgTm9kZSgnbGknKSkpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnbmV4dCcgfSwgJ05leHQnKSkpXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT25Cb2FyZGluZ1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgU2VhcmNoQm94TWFpbiA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBkaXNwYXRjaCB9ID0gcHJvcHNcblxuICBjb25zdCBvbktleXVwSW5wdXQgPSBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ3NlYXJjaCcgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdzZWFyY2gtYm94Jywgb25LZXlVcDogb25LZXl1cElucHV0IH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpY29uJyB9KSxcbiAgICAgICAgTm9kZSgnaW5wdXQnLCB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdTZWFyY2ggcGhvdG9zJyB9KSlcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94TWFpblxuIiwiaW1wb3J0IHsgZCB9IGZyb20gJy4uL2FwcCdcblxuY29uc3QgRVZFTlRTID0ge1xuICBvbkNsaWNrOiAnY2xpY2snLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbkxvYWQ6ICdsb2FkJ1xufVxuXG5leHBvcnQgY29uc3QgTm9kZSA9IChlbGVtLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgbGV0IG5vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoZWxlbSlcblxuICBpZiAoYXR0cnMgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKEVWRU5UU1trZXldLCBhdHRyc1trZXldKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBjaGlsZFxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuIiwiZXhwb3J0IGNvbnN0IGV4aXN0cyA9IG5vZGUgPT4gbm9kZSAhPSBudWxsXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coYWN0aW9uLCBzdGF0ZSlcbiAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlKHN0YXRlLCBhY3Rpb24pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuIl19
