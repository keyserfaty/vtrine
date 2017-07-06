(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _store = require('./helpers/store');

var _helpers = require('./helpers');

var _constants = require('./constants');

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
  imagesQueue: ['./statics/images/1.jpg', './statics/images/1.jpg'],
  imagesList: []
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

    case 'ON_NEW_IMAGES':
      {
        return _extends({}, state, {
          imagesList: action.payload.images
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

  var isFirstLoad = localStorage.getItem('first_load');

  if (state.routes.path === '/search' && !(0, _helpers.exists)(onBoardingNode) && !(0, _helpers.exists)(isFirstLoad)) {
    single.appendChild((0, _OnBoarding2.default)(props));
    localStorage.setItem('first_load', false);
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
        store.dispatch({ type: 'ON_FETCH_IMAGES' });
        break;
      }

    case 'ON_FETCH_IMAGES':
      {
        var xml = new XMLHttpRequest();

        xml.addEventListener('load', function () {
          store.dispatch({
            type: 'ON_NEW_IMAGES',
            payload: {
              images: JSON.parse(this.responseText)
            }
          });
        });
        xml.open('GET', _constants.url + _constants.clientId);
        xml.send();

        break;
      }

    default:
      return false;
  }
}

// events
);window.addEventListener('load', function () {
  store.dispatch({ type: 'ON_WINDOW_LOAD' });
});

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    store.dispatch({
      type: 'ON_SPACE_BAR'
    });
  }
});

folder.addEventListener('click', function () {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' });
});

},{"./components/Downloads":2,"./components/OnBoarding":3,"./components/SearchBoxMain":4,"./constants":5,"./helpers":7,"./helpers/store":8}],2:[function(require,module,exports){
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

},{"../helpers/Node":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var OnBoarding = function OnBoarding(props) {
  return (0, _Node.Node)('div', { id: 'on-boarding' }, (0, _Node.Node)('div', { class: 'image' }), (0, _Node.Node)('div', { class: 'caption' }, 'Press spacebar to generate a photo'), (0, _Node.Node)('div', { class: 'footer' }, (0, _Node.Node)('div', { class: 'skip' }, 'Skip'), (0, _Node.Node)('div', { class: 'nav' }, (0, _Node.Node)('ul', null, (0, _Node.Node)('li'), (0, _Node.Node)('li'), (0, _Node.Node)('li'))), (0, _Node.Node)('div', { class: 'next' }, 'Next')));
};

exports.default = OnBoarding;

},{"../helpers/Node":6}],4:[function(require,module,exports){
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

},{"../helpers/Node":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var url = exports.url = 'https://api.unsplash.com/photos/?client_id=';
var clientId = exports.clientId = '6322e07de0e155ba0d9eca8d67cf27bb9b45417f2feb1a234baa363a1dda3dbe';

},{}],6:[function(require,module,exports){
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

},{"../app":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var exists = exports.exists = function exists(node) {
  return node != null;
};

},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvT25Cb2FyZGluZy5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxlQUFlO0FBQ25CLFVBQVE7QUFDTixVQUFNO0FBREEsR0FEVztBQUluQixlQUFhLEVBSk07QUFLbkIsb0JBQWtCLEtBTEM7QUFNbkIsZUFBYSxDQUFDLHdCQUFELEVBQTJCLHdCQUEzQixDQU5NO0FBT25CLGNBQVk7QUFQTyxDQUFyQjs7QUFVQSxJQUFNLFVBQVUsU0FBVixPQUFVLEdBQWtDO0FBQUEsTUFBakMsS0FBaUMsdUVBQXpCLFlBQXlCO0FBQUEsTUFBWCxNQUFXOztBQUNoRCxVQUFRLE9BQU8sSUFBZjtBQUNFLFNBQUsseUJBQUw7QUFBZ0M7QUFDOUIsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE9BQU8sT0FBUCxDQUFlLFdBRjlCO0FBR0Usa0JBQVE7QUFDTixrQkFBTTtBQURBO0FBSFY7QUFPRDs7QUFFRCxTQUFLLHFCQUFMO0FBQTRCO0FBQzFCLDRCQUNLLEtBREw7QUFFRSw0QkFBa0IsQ0FBQyxNQUFNO0FBRjNCO0FBSUQ7O0FBRUQsU0FBSyx3QkFBTDtBQUErQjtBQUM3Qiw0QkFDSyxLQURMO0FBRUUsdUJBQWE7QUFGZjtBQUlEOztBQUVELFNBQUssdUJBQUw7QUFBOEI7QUFDNUIsNEJBQ0ssS0FETDtBQUVFLG9E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bmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi9oZWxwZXJzL3N0b3JlJ1xuaW1wb3J0IHsgZXhpc3RzIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHsgY2xpZW50SWQsIHVybCB9IGZyb20gJy4vY29uc3RhbnRzJ1xuXG5pbXBvcnQgRG93bmxvYWRzIGZyb20gJy4vY29tcG9uZW50cy9Eb3dubG9hZHMnXG5pbXBvcnQgU2VhcmNoQm94TWFpbiBmcm9tICcuL2NvbXBvbmVudHMvU2VhcmNoQm94TWFpbidcbmltcG9ydCBPbkJvYXJkaW5nIGZyb20gJy4vY29tcG9uZW50cy9PbkJvYXJkaW5nJ1xuXG5leHBvcnQgY29uc3QgZCA9IGRvY3VtZW50XG5cbi8vIG1vZGVsXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJvdXRlczoge1xuICAgIHBhdGg6ICcvJ1xuICB9LFxuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXSxcbiAgaW1hZ2VzTGlzdDogW10sXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwYXRoOiAnL3NlYXJjaCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGlzcGxheURvd25sb2FkczogIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW10sXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQUREX0lNQUdFX1RPX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXG4gICAgICAgICAgLi4uc3RhdGUuaW1hZ2VzUXVldWUsXG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuaW1hZ2VcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZVxuICAgICAgICAgIC5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX05FV19JTUFHRVMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzTGlzdDogYWN0aW9uLnBheWxvYWQuaW1hZ2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcblxuLy8gdmlld1xuY29uc3QgYm9keSA9IGQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5jb25zdCBzaW5nbGUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5zaW5nbGUnKVxuXG5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgZGlzcGF0Y2g6IHN0b3JlLmRpc3BhdGNoLFxuICAgIC4uLnN0YXRlLFxuICB9XG5cbiAgLy8gcm91dGUgY2hhbmdlc1xuICBjb25zdCBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlID0gZC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJylcbiAgY29uc3Qgb25Cb2FyZGluZ05vZGUgPSBzaW5nbGUucXVlcnlTZWxlY3RvcignI29uLWJvYXJkaW5nJylcblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvJyAmJiAhZXhpc3RzKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpKSB7XG4gICAgc2luZ2xlLmFwcGVuZENoaWxkKFNlYXJjaEJveE1haW4ocHJvcHMpKVxuICB9XG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoICE9PSAnLycgJiYgZXhpc3RzKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpKSB7XG4gICAgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpXG4gIH1cblxuICBjb25zdCBpc0ZpcnN0TG9hZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmaXJzdF9sb2FkJylcblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvc2VhcmNoJyAmJiAhZXhpc3RzKG9uQm9hcmRpbmdOb2RlKSAmJiAhZXhpc3RzKGlzRmlyc3RMb2FkKSkge1xuICAgIHNpbmdsZS5hcHBlbmRDaGlsZChPbkJvYXJkaW5nKHByb3BzKSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmlyc3RfbG9hZCcsIGZhbHNlKVxuICB9XG5cbiAgLy8gaW1hZ2VzUXVldWUgY2hhbmdlc1xuICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICAvLyBkaXNwbGF5RG93bmxvYWRzIGNoYW5nZXNcbiAgaWYgKHN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgIWV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICBpZiAoIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMgJiYgZXhpc3RzKGRvd25sb2FkUHJldmlvdXNOb2RlKSkge1xuICAgIGRvd25sb2FkUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG93bmxvYWRQcmV2aW91c05vZGUpXG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCAnc2VhcmNoP3E9JyArIHN0YXRlLnNlYXJjaFZhbHVlKVxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fRkVUQ0hfSU1BR0VTJyB9KVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVMnOiB7XG4gICAgICBjb25zdCB4bWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeG1sLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ09OX05FV19JTUFHRVMnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBpbWFnZXM6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHhtbC5vcGVuKCdHRVQnLCB1cmwgKyBjbGllbnRJZCk7XG4gICAgICB4bWwuc2VuZCgpO1xuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufSlcblxuLy8gZXZlbnRzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fV0lORE9XX0xPQUQnIH0pXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9TUEFDRV9CQVInXG4gICAgfSlcbiAgfVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSlcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IERvd25sb2FkcyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGRpc3BhdGNoLFxuICAgIGltYWdlc1F1ZXVlLFxuICB9ID0gcHJvcHNcblxuICAvLyBFdmVudHNcbiAgY29uc3QgY2xlYXJPbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCBidXR0b25PbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCB1bE9uQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9ET1dOTE9BRF9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIHsgb25DbGljazogdWxPbkNsaWNrIH0sXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlfScpYCB9LFxuICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhY3Rpb25zJywgaWQ6IGkgfSxcbiAgICAgICAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdyZW1vdmUnIH0pLCBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZG93bmxvYWQnIH0pKSlcbiAgICAgICAgICAgICkpKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdidXR0b24nLCB7IG9uQ2xpY2s6IGJ1dHRvbk9uQ2xpY2sgfSwgJ0Rvd25sb2FkIHNlbGVjdGlvbicpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2Fkc1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgT25Cb2FyZGluZyA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnb24tYm9hcmRpbmcnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2UnIH0pLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NhcHRpb24nIH0sICdQcmVzcyBzcGFjZWJhciB0byBnZW5lcmF0ZSBhIHBob3RvJyksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2tpcCcgfSwgJ1NraXAnKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ25hdicgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIG51bGwsXG4gICAgICAgICAgICBOb2RlKCdsaScpLCBOb2RlKCdsaScpLCBOb2RlKCdsaScpKSksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduZXh0JyB9LCAnTmV4dCcpKSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBPbkJvYXJkaW5nXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTZWFyY2hCb3hNYWluID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRpc3BhdGNoIH0gPSBwcm9wc1xuXG4gIGNvbnN0IG9uS2V5dXBJbnB1dCA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnc2VhcmNoJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaC1ib3gnLCBvbktleVVwOiBvbktleXVwSW5wdXQgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ljb24nIH0pLFxuICAgICAgICBOb2RlKCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ1NlYXJjaCBwaG90b3MnIH0pKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3hNYWluXG4iLCJleHBvcnQgY29uc3QgdXJsID0gJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvP2NsaWVudF9pZD0nXG5leHBvcnQgY29uc3QgY2xpZW50SWQgPSAnNjMyMmUwN2RlMGUxNTViYTBkOWVjYThkNjdjZjI3YmI5YjQ1NDE3ZjJmZWIxYTIzNGJhYTM2M2ExZGRhM2RiZSdcbiIsImltcG9ydCB7IGQgfSBmcm9tICcuLi9hcHAnXG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25LZXlVcDogJ2tleXVwJyxcbiAgb25Mb2FkOiAnbG9hZCdcbn1cblxuZXhwb3J0IGNvbnN0IE5vZGUgPSAoZWxlbSwgYXR0cnMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gIGxldCBub2RlID0gZC5jcmVhdGVFbGVtZW50KGVsZW0pXG5cbiAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFNba2V5XSwgYXR0cnNba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cbiIsImV4cG9ydCBjb25zdCBleGlzdHMgPSBub2RlID0+IG5vZGUgIT0gbnVsbFxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cbiJdfQ==
