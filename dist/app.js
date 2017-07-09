(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reducer = require('./reducer');

var _helpers = require('./helpers');

var _constants = require('./constants');

var _Downloads = require('./components/Downloads');

var _Downloads2 = _interopRequireDefault(_Downloads);

var _SearchBoxMain = require('./components/SearchBoxMain');

var _SearchBoxMain2 = _interopRequireDefault(_SearchBoxMain);

var _SearchBoxHeader = require('./components/SearchBoxHeader');

var _SearchBoxHeader2 = _interopRequireDefault(_SearchBoxHeader);

var _OnBoarding = require('./components/OnBoarding');

var _OnBoarding2 = _interopRequireDefault(_OnBoarding);

var _SaveIcon = require('./components/SaveIcon');

var _SaveIcon2 = _interopRequireDefault(_SaveIcon);

var _Full = require('./components/Full');

var _Full2 = _interopRequireDefault(_Full);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = exports.d = document;

// view
var body = d.querySelector('body');
var header = d.querySelector('header');
var actions = header.querySelector('.actions');
var folder = header.querySelector('.downloads');
var image = body.querySelector('.image');
var footer = body.querySelector('footer');

_reducer.store.subscribe(function (state, action) {
  var props = _extends({
    dispatch: _reducer.store.dispatch
  }, state);

  // route changes
  var searchBoxMainPreviousNode = d.querySelector('#search');
  var onBoardingNode = image.querySelector('#on-boarding');

  if (state.routes.path === '/' && !(0, _helpers.exists)(searchBoxMainPreviousNode)) {
    image.appendChild((0, _SearchBoxMain2.default)(props));
  }

  if (state.routes.path !== '/' && (0, _helpers.exists)(searchBoxMainPreviousNode)) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode);
  }

  var isFirstLoad = localStorage.getItem('first_load');
  var searchBoxHeaderNode = header.querySelector('.search');

  if (state.routes.path === '/search' && !(0, _helpers.exists)(searchBoxHeaderNode)) {
    header.insertBefore((0, _SearchBoxHeader2.default)(props), actions);
  }

  if (state.routes.path === '/search' && !(0, _helpers.exists)(onBoardingNode) && !(0, _helpers.exists)(isFirstLoad)) {
    image.appendChild((0, _OnBoarding2.default)(props));
    localStorage.setItem('first_load', false);
  }

  // imagesQueue changes
  var downloadPreviousNode = d.querySelector('#download');
  var downloadFullNode = folder.querySelector('.full');

  if (state.displayDownloads && (0, _helpers.exists)(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode);
    body.appendChild((0, _Downloads2.default)(props));
  }

  if (state.imagesQueue.length > 0 && !(0, _helpers.exists)(downloadFullNode)) {
    folder.appendChild((0, _Full2.default)(props));
  }

  if (state.imagesQueue.length === 0 && (0, _helpers.exists)(downloadFullNode)) {
    downloadFullNode.parentNode.removeChild(downloadFullNode);
  }

  // displayDownloads changes
  if (state.displayDownloads && !(0, _helpers.exists)(downloadPreviousNode)) {
    body.appendChild((0, _Downloads2.default)(props));
  }

  if (!state.displayDownloads && (0, _helpers.exists)(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode);
  }

  var userNode = footer.querySelector('.user');
  var userPhotoNode = userNode.querySelector('.photo');
  var userNameNode = userNode.querySelector('.name'

  // imagesList changes
  );if ((0, _helpers.exists)(state.currentImage)) {
    image.setAttribute('style', 'background: ' + state.currentImage.color + ' url(\'' + state.currentImage.urls.thumb + '\') no-repeat; background-size: cover;');
    image.classList.add('loading');
    userPhotoNode.setAttribute('style', 'background-image: url(' + state.currentImage.user.profile_image.small + ')');
    userNameNode.innerText = state.currentImage.user.name;
  }

  // requesting new images
  var isTwoImagesAwayFromEnd = state.currentImageId === state.imagesList.length - 2;
  var isNotInNewPage = state.imagesList.length / 10 === state.currentPage;
  var haveNotFetchedAllImages = state.imagesList.length !== state.totalImages;

  if (isTwoImagesAwayFromEnd && isNotInNewPage && haveNotFetchedAllImages) {
    _reducer.store.dispatch({
      type: 'ON_FETCH_IMAGES',
      payload: {
        currentPage: state.currentPage + 1
      }
    });
  }

  if (state.currentImageId + 1 === state.imagesList.length && state.imagesList.length !== 0) {
    _reducer.store.dispatch({
      type: 'ON_END_OF_LIST'
    });
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN':
      {
        window.history.pushState('', '', 'search?q=' + state.searchValue);
        _reducer.store.dispatch({
          type: 'ON_FETCH_IMAGES',
          payload: {
            currentPage: 1
          }
        });
        break;
      }

    case 'ON_KEY_UP_SPACE_BAR':
      {
        if (!state.isNavigating) break;
        _reducer.store.dispatch({ type: 'ON_LOAD_NEXT_IMAGE' });

        break;
      }

    case 'ON_KEY_UP_S':
      {
        if (!state.isNavigating) break;
        if (state.imagesQueue.some(function (image) {
          return image.id === state.currentImage.id;
        })) break;

        _reducer.store.dispatch({ type: 'ON_ADD_IMAGE_TO_QUEUE' });

        break;
      }

    case 'ON_ADD_IMAGE_TO_QUEUE':
      {
        body.insertBefore((0, _SaveIcon2.default)(props), header);

        setTimeout(function () {
          var saveIconNode = body.querySelector('#save');
          saveIconNode.parentNode.removeChild(saveIconNode);
        }, 300);

        break;
      }

    case 'ON_FETCH_IMAGES':
      {
        var xml = new XMLHttpRequest();

        xml.addEventListener('load', function () {
          _reducer.store.dispatch({
            type: 'ON_FETCH_IMAGES_SUCCESS',
            payload: {
              images: JSON.parse(this.responseText)
            }
          });
        });
        xml.open('GET', (0, _constants.url)(state.currentPage, state.searchValue));
        xml.send();

        break;
      }

    case 'ON_FETCH_IMAGES_SUCCESS':
      {
        var searchBoxHeaderInputNode = searchBoxHeaderNode.querySelector('input');
        if ((0, _helpers.exists)(searchBoxHeaderInputNode)) {
          searchBoxHeaderInputNode.blur();
        }

        break;
      }

    default:
      return false;
  }
}

// events
);window.addEventListener('load', function () {
  _reducer.store.dispatch({ type: 'ON_WINDOW_LOAD' });
});

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    _reducer.store.dispatch({
      type: 'ON_KEY_UP_SPACE_BAR'
    });
  }

  if (e.keyCode === 83) {
    _reducer.store.dispatch({
      type: 'ON_KEY_UP_S'
    });
  }
});

folder.addEventListener('click', function () {
  _reducer.store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' });
});

},{"./components/Downloads":2,"./components/Full":3,"./components/OnBoarding":4,"./components/SaveIcon":5,"./components/SearchBoxHeader":6,"./components/SearchBoxMain":7,"./constants":8,"./helpers":10,"./reducer":12}],2:[function(require,module,exports){
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
    return (0, _Node.Node)('li', { class: 'image', style: 'background: url(\'' + image.urls.thumb + '\')' }, (0, _Node.Node)('div', { class: 'actions', id: i }, (0, _Node.Node)('div', { class: 'remove' }), (0, _Node.Node)('div', { class: 'download' })));
  })))))), (0, _Node.Node)('div', { class: 'footer' }, (0, _Node.Node)('button', { onClick: buttonOnClick }, 'Download selection')));
};

exports.default = Downloads;

},{"../helpers/Node":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var Full = function Full() {
  return (0, _Node.Node)('div', { class: 'full' });
};

exports.default = Full;

},{"../helpers/Node":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var OnBoarding = function OnBoarding(props) {
  return (0, _Node.Node)('div', { id: 'on-boarding' }, (0, _Node.Node)('div', { class: 'image' }), (0, _Node.Node)('div', { class: 'caption' }, 'Press spacebar to generate a photo'), (0, _Node.Node)('div', { class: 'footer' }, (0, _Node.Node)('div', { class: 'skip' }, 'Skip'), (0, _Node.Node)('div', { class: 'nav' }, (0, _Node.Node)('ul', null, (0, _Node.Node)('li'), (0, _Node.Node)('li'), (0, _Node.Node)('li'))), (0, _Node.Node)('div', { class: 'next' }, 'Next')));
};

exports.default = OnBoarding;

},{"../helpers/Node":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var SaveIcon = function SaveIcon() {
  return (0, _Node.Node)('div', { id: 'save' }, (0, _Node.Node)('i', { class: 'icon' }));
};

exports.default = SaveIcon;

},{"../helpers/Node":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Node = require('../helpers/Node');

var SearchBoxHeader = function SearchBoxHeader(props) {
  var dispatch = props.dispatch,
      searchValue = props.searchValue;


  var onSearchBoxFocus = function onSearchBoxFocus() {
    dispatch({ type: 'ON_HEADER_SEARCH_BOX_FOCUS' });
  };

  var onSearchBoxBlur = function onSearchBoxBlur() {
    dispatch({ type: 'ON_HEADER_SEARCH_BOX_BLUR' });
  };

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

  return (0, _Node.Node)('div', { class: 'search' }, (0, _Node.Node)('div', { class: 'search-box' }, (0, _Node.Node)('i', { class: 'icon' }), (0, _Node.Node)('input', { type: 'text', value: searchValue, onKeyUp: onKeyupInput, onFocus: onSearchBoxFocus, onBlur: onSearchBoxBlur })));
};

exports.default = SearchBoxHeader;

},{"../helpers/Node":9}],7:[function(require,module,exports){
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

  return (0, _Node.Node)('div', { id: 'search' }, (0, _Node.Node)('div', { class: 'search-box', onKeyUp: onKeyupInput }, (0, _Node.Node)('div', { class: 'icon' }), (0, _Node.Node)('input', { type: 'text', placeholder: 'Search photos', autofocus: true })));
};

exports.default = SearchBoxMain;

},{"../helpers/Node":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clientId = exports.clientId = '6322e07de0e155ba0d9eca8d67cf27bb9b45417f2feb1a234baa363a1dda3dbe';
var url = exports.url = function url(page, query) {
  return 'https://api.unsplash.com/search/photos?client_id=' + clientId + '&page=' + page + '&query=' + query;
};

},{}],9:[function(require,module,exports){
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
  onLoad: 'load',
  onFocus: 'focus',
  onBlur: 'blur'
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

},{"../app":1}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var exists = exports.exists = function exists(node) {
  return node != null;
};

var imageLoader = function imageLoader(src) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      resolve(src);
    };
    img.onerror = function (err) {
      reject(err);
    };
    img.src = src;
  });
};

/**
 * Takes a list of images urls and returns a list
 * of promises of images loading
 * @param images
 */
var preCachedImages = exports.preCachedImages = function preCachedImages(images) {
  return images.map(function (image) {
    return imageLoader(image);
  });
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _store = require('./helpers/store');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// model
var initialState = {
  // routing
  routes: {
    path: '/'
  },

  // ui
  searchValue: '',
  displayDownloads: false,
  isNavigating: false,
  imagesQueue: [],
  currentImage: null,
  currentImageId: 0,
  nextImage: null,

  // async
  imagesList: [],
  currentPage: null,
  totalPages: null,
  totalImages: null
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

    case 'ON_HEADER_SEARCH_BOX_FOCUS':
      {
        return _extends({}, state, {
          isNavigating: false
        });
      }

    case 'ON_HEADER_SEARCH_BOX_BLUR':
      {
        return _extends({}, state, {
          isNavigating: true
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
          imagesQueue: [].concat(_toConsumableArray(state.imagesQueue), [state.currentImage])
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

    case 'ON_END_OF_LIST':
      {
        return _extends({}, state, {
          currentImageId: 0
        });
      }

    case 'ON_FETCH_IMAGES':
      {
        return _extends({}, state, {
          currentPage: action.payload.currentPage
        });
      }

    case 'ON_FETCH_IMAGES_SUCCESS':
      {
        var isNewRequest = state.currentPage === 1;

        var currentImageId = isNewRequest ? 0 : state.currentImageId;

        var imagesList = isNewRequest ? action.payload.images.results : [].concat(_toConsumableArray(state.imagesList), _toConsumableArray(action.payload.images.results));

        var currentImage = isNewRequest ? action.payload.images.results[currentImageId] : state.imagesList[currentImageId];

        return _extends({}, state, {
          imagesList: imagesList,
          currentImage: currentImage,
          currentImageId: currentImageId,
          isNavigating: true,
          nextImage: action.payload.images.results[currentImageId + 1],
          totalPages: action.payload.images.total_pages,
          totalImages: action.payload.images.total
        });
      }

    case 'ON_LOAD_NEXT_IMAGE':
      {
        return _extends({}, state, {
          currentImage: state.imagesList[state.currentImageId + 1],
          nextImage: state.imagesList[state.currentImageId + 2],
          currentImageId: state.currentImageId + 1
        });
      }

    default:
      return state;
  }
};

var store = exports.store = (0, _store.createStore)(reducer);

},{"./helpers/store":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvRnVsbC5qcyIsInNyYy9jb21wb25lbnRzL09uQm9hcmRpbmcuanMiLCJzcmMvY29tcG9uZW50cy9TYXZlSWNvbi5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiLCJzcmMvcmVkdWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxPQUFPLEVBQUUsYUFBRixDQUFnQixNQUFoQixDQUFiO0FBQ0EsSUFBTSxTQUFTLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUFmO0FBQ0EsSUFBTSxVQUFVLE9BQU8sYUFBUCxDQUFxQixVQUFyQixDQUFoQjtBQUNBLElBQU0sU0FBUyxPQUFPLGFBQVAsQ0FBcUIsWUFBckIsQ0FBZjtBQUNBLElBQU0sUUFBUSxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZDtBQUNBLElBQU0sU0FBUyxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZjs7QUFFQSxlQUFNLFNBQU4sQ0FBZ0IsVUFBQyxLQUFELEVBQVEsTUFBUixFQUFtQjtBQUNqQyxNQUFNO0FBQ0osY0FBVSxlQUFNO0FBRFosS0FFRCxLQUZDLENBQU47O0FBS0E7QUFDQSxNQUFNLDRCQUE0QixFQUFFLGFBQUYsQ0FBZ0IsU0FBaEIsQ0FBbEM7QUFDQSxNQUFNLGlCQUFpQixNQUFNLGFBQU4sQ0FBb0IsY0FBcEIsQ0FBdkI7O0FBRUEsTUFBSSxNQUFNLE1BQU4sQ0FBYSxJQUFiLEtBQXNCLEdBQXRCLElBQTZCLENBQUMscUJBQU8seUJBQVAsQ0FBbEMsRUFBcUU7QUFDbkUsVUFBTSxXQUFOLENBQWtCLDZCQUFjLEtBQWQsQ0FBbEI7QUFDRDs7QUFFRCxNQUFJLE1BQU0sTUFBTixDQUFhLElBQWIsS0FBc0IsR0FBdEIsSUFBNkIscUJBQU8seUJBQVAsQ0FBakMsRUFBb0U7QUFDbEUsOEJBQTBCLFVBQTFCLENBQXFDLFdBQXJDLENBQWlELHlCQUFqRDtBQUNEOztBQUVELE1BQU0sY0FBYyxhQUFhLE9BQWIsQ0FBcUIsWUFBckIsQ0FBcEI7QUFDQSxNQUFNLHNCQUFzQixPQUFPLGFBQVAsQ0FBcUIsU0FBckIsQ0FBNUI7O0FBRUEsTUFBSSxNQUFNLE1BQU4sQ0FBYSxJQUFiLEtBQXNCLFNBQXRCLElBQW1DLENBQUMscUJBQU8sbUJBQVAsQ0FBeEMsRUFBcUU7QUFDbkUsV0FBTyxZQUFQLENBQW9CLCtCQUFnQixLQUFoQixDQUFwQixFQUE0QyxPQUE1QztBQUNEOztBQUVELE1BQUksTUFBTSxNQUFOLENBQWEsSUFBYixLQUFzQixTQUF0QixJQUFtQyxDQUFDLHFCQUFPLGNBQVAsQ0FBcEMsSUFBOEQsQ0FBQyxxQkFBTyxXQUFQLENBQW5FLEVBQXdGO0FBQ3RGLFVBQU0sV0FBTixDQUFrQiwwQkFBVyxLQUFYLENBQWxCO0FBQ0EsaUJBQWEsT0FBYixDQUFxQixZQUFyQixFQUFtQyxLQUFuQztBQUNEOztBQUVEO0FBQ0EsTUFBTSx1QkFBdUIsRUFBRSxhQUFGLENBQWdCLFdBQWhCLENBQTdCO0FBQ0EsTUFBTSxtQkFBbUIsT0FBTyxhQUFQLENBQXFCLE9BQXJCLENBQXpCOztBQUVBLE1BQUksTUFBTSxnQkFBTixJQUEwQixxQkFBTyxvQkFBUCxDQUE5QixFQUE0RDtBQUMxRCx5QkFBcUIsVUFBckIsQ0FBZ0MsV0FBaEMsQ0FBNEMsb0JBQTVDO0FBQ0EsU0FBSyxXQUFMLENBQWlCLHlCQUFVLEtBQVYsQ0FBakI7QUFDRDs7QUFFRCxNQUFJLE1BQU0sV0FBTixDQUFrQixNQUFsQixHQUEyQixDQUEzQixJQUFnQyxDQUFDLHFCQUFPLGdCQUFQLENBQXJDLEVBQStEO0FBQzdELFdBQU8sV0FBUCxDQUFtQixvQkFBSyxLQUFMLENBQW5CO0FBQ0Q7O0FBRUQsTUFBSSxNQUFNLFdBQU4sQ0FBa0IsTUFBbEIsS0FBNkIsQ0FBN0IsSUFBa0MscUJBQU8sZ0JBQVAsQ0FBdEMsRUFBZ0U7QUFDOUQscUJBQWlCLFVBQWpCLENBQTRCLFdBQTVCLENBQXdDLGdCQUF4QztBQUNEOztBQUVEO0FBQ0EsTUFBSSxNQUFNLGdCQUFOLElBQTBCLENBQUMscUJBQU8sb0JBQVAsQ0FBL0IsRUFBNkQ7QUFDM0QsU0FBSyxXQUFMLENBQWlCLHlCQUFVLEtBQVYsQ0FBakI7QUFDRDs7QUFFRCxNQUFJLENBQUMsTUFBTSxnQkFBUCxJQUEyQixxQkFBTyxvQkFBUCxDQUEvQixFQUE2RDtBQUMzRCx5QkFBcUIsVUFBckIsQ0FBZ0MsV0FBaEMsQ0FBNEMsb0JBQTVDO0FBQ0Q7O0FBRUQsTUFBTSxXQUFXLE9BQU8sYUFBUCxDQUFxQixPQUFyQixDQUFqQjtBQUNBLE1BQU0sZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBLE1BQU0sZUFBZSxTQUFTLGFBQVQsQ0FBdUI7O0FBRTVDO0FBRnFCLEdBQXJCLENBR0EsSUFBSSxxQkFBTyxNQUFNLFlBQWIsQ0FBSixFQUFnQztBQUM5QixVQUFNLFlBQU4sQ0FBbUIsT0FBbkIsbUJBQTJDLE1BQU0sWUFBTixDQUFtQixLQUE5RCxlQUE0RSxNQUFNLFlBQU4sQ0FBbUIsSUFBbkIsQ0FBd0IsS0FBcEc7QUFDQSxVQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsU0FBcEI7QUFDQSxrQkFBYyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DLDJCQUEyQixNQUFNLFlBQU4sQ0FBbUIsSUFBbkIsQ0FBd0IsYUFBeEIsQ0FBc0MsS0FBakUsR0FBd0UsR0FBNUc7QUFDQSxpQkFBYSxTQUFiLEdBQXlCLE1BQU0sWUFBTixDQUFtQixJQUFuQixDQUF3QixJQUFqRDtBQUNEOztBQUVEO0FBQ0EsTUFBTSx5QkFBeUIsTUFBTSxjQUFOLEtBQXlCLE1BQU0sVUFBTixDQUFpQixNQUFqQixHQUEwQixDQUFsRjtBQUNBLE1BQU0saUJBQWlCLE1BQU0sVUFBTixDQUFpQixNQUFqQixHQUEwQixFQUExQixLQUFpQyxNQUFNLFdBQTlEO0FBQ0EsTUFBTSwwQkFBMEIsTUFBTSxVQUFOLENBQWlCLE1BQWpCLEtBQTRCLE1BQU0sV0FBbEU7O0FBRUEsTUFBSSwwQkFBMEIsY0FBMUIsSUFBNEMsdUJBQWhELEVBQXlFO0FBQ3ZFLG1CQUFNLFFBQU4sQ0FBZTtBQUNiLFlBQU0saUJBRE87QUFFYixlQUFTO0FBQ1AscUJBQWEsTUFBTSxXQUFOLEdBQW9CO0FBRDFCO0FBRkksS0FBZjtBQU1EOztBQUVELE1BQUksTUFBTSxjQUFOLEdBQXVCLENBQXZCLEtBQTZCLE1BQU0sVUFBTixDQUFpQixNQUE5QyxJQUF3RCxNQUFNLFVBQU4sQ0FBaUIsTUFBakIsS0FBNEIsQ0FBeEYsRUFBMkY7QUFDekYsbUJBQU0sUUFBTixDQUFlO0FBQ2IsWUFBTTtBQURPLEtBQWY7QUFHRDs7QUFFRCxVQUFRLE9BQU8sSUFBZjtBQUNFLFNBQUsseUJBQUw7QUFBZ0M7QUFDOUIsZUFBTyxPQUFQLENBQWUsU0FBZixDQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxjQUFjLE1BQU0sV0FBckQ7QUFDQSx1QkFBTSxRQUFOLENBQWU7QUFDYixnQkFBTSxpQkFETztBQUViLG1CQUFTO0FBQ1AseUJBQWE7QUFETjtBQUZJLFNBQWY7QUFNQTtBQUNEOztBQUVELFNBQUsscUJBQUw7QUFBNEI7QUFDMUIsWUFBSSxDQUFDLE1BQU0sWUFBWCxFQUF5QjtBQUN6Qix1QkFBTSxRQUFOLENBQWUsRUFBRSxNQUFNLG9CQUFSLEVBQWY7O0FBRUE7QUFDRDs7QUFFRCxTQUFLLGFBQUw7QUFBb0I7QUFDbEIsWUFBSSxDQUFDLE1BQU0sWUFBWCxFQUF5QjtBQUN6QixZQUFJLE1BQU0sV0FBTixDQUFrQixJQUFsQixDQUF1QjtBQUFBLGlCQUFTLE1BQU0sRUFBTixLQUFhLE1BQU0sWUFBTixDQUFtQixFQUF6QztBQUFBLFNBQXZCLENBQUosRUFBeUU7O0FBRXpFLHVCQUFNLFFBQU4sQ0FBZSxFQUFFLE1BQU0sdUJBQVIsRUFBZjs7QUFFQTtBQUNEOztBQUVELFNBQUssdUJBQUw7QUFBOEI7QUFDNUIsYUFBSyxZQUFMLENBQWtCLHdCQUFTLEtBQVQsQ0FBbEIsRUFBbUMsTUFBbkM7O0FBRUEsbUJBQVcsWUFBTTtBQUNmLGNBQU0sZUFBZSxLQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBckI7QUFDQSx1QkFBYSxVQUFiLENBQXdCLFdBQXhCLENBQW9DLFlBQXBDO0FBQ0QsU0FIRCxFQUdHLEdBSEg7O0FBS0E7QUFDRDs7QUFFRCxTQUFLLGlCQUFMO0FBQXdCO0FBQ3RCLFlBQU0sTUFBTSxJQUFJLGNBQUosRUFBWjs7QUFFQSxZQUFJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQVk7QUFDckMseUJBQU0sUUFBTixDQUFlO0FBQ2Isa0JBQU0seUJBRE87QUFFYixxQkFBUztBQUNQLHNCQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssWUFBaEI7QUFERDtBQUZJLFdBQWY7QUFNRCxTQVBIO0FBU0EsWUFBSSxJQUFKLENBQVMsS0FBVCxFQUFnQixvQkFBSSxNQUFNLFdBQVYsRUFBdUIsTUFBTSxXQUE3QixDQUFoQjtBQUNBLFlBQUksSUFBSjs7QUFFQTtBQUNEOztBQUVELFNBQUsseUJBQUw7QUFBZ0M7QUFDOUIsWUFBTSwyQkFBMkIsb0JBQW9CLGFBQXBCLENBQWtDLE9BQWxDLENBQWpDO0FBQ0EsWUFBSSxxQkFBTyx3QkFBUCxDQUFKLEVBQXNDO0FBQ3BDLG1DQUF5QixJQUF6QjtBQUNEOztBQUVEO0FBQ0Q7O0FBRUQ7QUFDRSxhQUFPLEtBQVA7QUFuRUo7QUFxRUQ7O0FBRUQ7QUEvSkEsRUFnS0EsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLGlCQUFNLFFBQU4sQ0FBZSxFQUFFLE1BQU0sZ0JBQVIsRUFBZjtBQUNELENBRkQ7O0FBSUEsT0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDLENBQUQsRUFBTztBQUN0QyxNQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG1CQUFNLFFBQU4sQ0FBZTtBQUNiLFlBQU07QUFETyxLQUFmO0FBR0Q7O0FBRUQsTUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixtQkFBTSxRQUFOLENBQWU7QUFDYixZQUFNO0FBRE8sS0FBZjtBQUdEO0FBQ0YsQ0FaRDs7QUFjQSxPQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07QUFDckMsaUJBQU0sUUFBTixDQUFlLEVBQUUsTUFBTSxxQkFBUixFQUFmO0FBQ0QsQ0FGRDs7Ozs7Ozs7O0FDeE1BOzs7O0FBRUEsSUFBTSxZQUFZLFNBQVosU0FBWSxRQUFTO0FBQUEsTUFFdkIsUUFGdUIsR0FJckIsS0FKcUIsQ0FFdkIsUUFGdUI7QUFBQSxNQUd2QixXQUh1QixHQUlyQixLQUpxQixDQUd2QixXQUh1Qjs7QUFNekI7O0FBQ0EsTUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFNO0FBQ3pCLGFBQVMsRUFBRSxNQUFNLHdCQUFSLEVBQVQ7QUFDRCxHQUZEOztBQUlBLE1BQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLEdBQU07QUFDMUIsYUFBUyxFQUFFLE1BQU0sMkJBQVIsRUFBVDtBQUNELEdBRkQ7O0FBSUEsTUFBTSxZQUFZLFNBQVosU0FBWSxJQUFLO0FBQ3JCLFFBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUFwQixDQUF1QixNQUEzQixFQUFtQztBQUNqQyxVQUFJLEVBQUUsTUFBRixDQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsU0FBdkIsS0FBcUMsUUFBekMsRUFBbUQ7QUFDakQsaUJBQVMsRUFBQyxNQUFNLDRCQUFQLEVBQXFDLFNBQVMsRUFBQyxJQUFJLEVBQUUsTUFBRixDQUFTLFVBQVQsQ0FBb0IsRUFBekIsRUFBOUMsRUFBVDtBQUNEOztBQUVELFVBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QixTQUF2QixLQUFxQyxVQUF6QyxFQUFxRDtBQUNuRCxpQkFBUyxFQUFDLE1BQU0sOEJBQVAsRUFBdUMsU0FBUyxFQUFDLElBQUksRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUF6QixFQUFoRCxFQUFUO0FBQ0Q7QUFDRjtBQUNGLEdBVkQ7O0FBWUE7QUFDQSxTQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLElBQUksVUFBTixFQUFaLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxRQUFULEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE9BQVQsRUFBWixFQUFnQyxlQUFoQyxDQURGLEVBRUUsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxPQUFULEVBQWtCLFNBQVMsWUFBM0IsRUFBWixFQUF1RCxXQUF2RCxDQUZGLENBREYsRUFJRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE9BQVQsRUFBWixDQUpGLEVBS0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxRQUFULEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFNBQVQsRUFBWixFQUNFLDZCQUFLLElBQUwsRUFBVyxFQUFFLFNBQVMsU0FBWCxFQUFYLDRCQUNLLFlBQVksR0FBWixDQUFnQixVQUFDLEtBQUQsRUFBUSxDQUFSO0FBQUEsV0FDakIsZ0JBQUssSUFBTCxFQUFXLEVBQUUsT0FBTyxPQUFULEVBQWtCLDhCQUEyQixNQUFNLElBQU4sQ0FBVyxLQUF0QyxRQUFsQixFQUFYLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxTQUFULEVBQW9CLElBQUksQ0FBeEIsRUFBWixFQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLE9BQU8sUUFBVCxFQUFaLENBREYsRUFDb0MsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxVQUFULEVBQVosQ0FEcEMsQ0FERixDQURpQjtBQUFBLEdBQWhCLENBREwsR0FERixDQURGLENBTEYsRUFhRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFFBQVQsRUFBWixFQUNFLGdCQUFLLFFBQUwsRUFBZSxFQUFFLFNBQVMsYUFBWCxFQUFmLEVBQTJDLG9CQUEzQyxDQURGLENBYkYsQ0FERjtBQW1CRCxDQS9DRDs7a0JBaURlLFM7Ozs7Ozs7OztBQ25EZjs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDakIsU0FDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE1BQVQsRUFBWixDQURGO0FBR0QsQ0FKRDs7a0JBTWUsSTs7Ozs7Ozs7O0FDUmY7O0FBRUEsSUFBTSxhQUFhLFNBQWIsVUFBYSxRQUFTO0FBQzFCLFNBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsSUFBSSxhQUFOLEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLE9BQVQsRUFBWixDQURGLEVBRUUsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxTQUFULEVBQVosRUFBa0Msb0NBQWxDLENBRkYsRUFHRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFFBQVQsRUFBWixFQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLE9BQU8sTUFBVCxFQUFaLEVBQStCLE1BQS9CLENBREYsRUFFRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLEtBQVQsRUFBWixFQUNFLGdCQUFLLElBQUwsRUFBVyxJQUFYLEVBQ0UsZ0JBQUssSUFBTCxDQURGLEVBQ2MsZ0JBQUssSUFBTCxDQURkLEVBQzBCLGdCQUFLLElBQUwsQ0FEMUIsQ0FERixDQUZGLEVBS0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxNQUFULEVBQVosRUFBK0IsTUFBL0IsQ0FMRixDQUhGLENBREY7QUFXRCxDQVpEOztrQkFjZSxVOzs7Ozs7Ozs7QUNoQmY7O0FBRUEsSUFBTSxXQUFXLFNBQVgsUUFBVyxHQUFNO0FBQ3JCLFNBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsSUFBSSxNQUFOLEVBQVosRUFDRSxnQkFBSyxHQUFMLEVBQVUsRUFBRSxPQUFPLE1BQVQsRUFBVixDQURGLENBREY7QUFLRCxDQU5EOztrQkFRZSxROzs7Ozs7Ozs7QUNWZjs7QUFFQSxJQUFNLGtCQUFrQixTQUFsQixlQUFrQixRQUFTO0FBQUEsTUFDdkIsUUFEdUIsR0FDRyxLQURILENBQ3ZCLFFBRHVCO0FBQUEsTUFDYixXQURhLEdBQ0csS0FESCxDQUNiLFdBRGE7OztBQUcvQixNQUFNLG1CQUFtQixTQUFuQixnQkFBbUIsR0FBTTtBQUM3QixhQUFTLEVBQUUsTUFBTSw0QkFBUixFQUFUO0FBQ0QsR0FGRDs7QUFJQSxNQUFNLGtCQUFrQixTQUFsQixlQUFrQixHQUFNO0FBQzVCLGFBQVMsRUFBRSxNQUFNLDJCQUFSLEVBQVQ7QUFDRCxHQUZEOztBQUlBLE1BQU0sZUFBZSxTQUFmLFlBQWUsSUFBSztBQUN4QixRQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLGVBQVM7QUFDUCxjQUFNLHlCQURDO0FBRVAsaUJBQVM7QUFDUCx1QkFBYSxFQUFFLE1BQUYsQ0FBUztBQURmO0FBRkYsT0FBVDtBQU1EO0FBQ0YsR0FURDs7QUFXQSxTQUNFLGdCQUFLLEtBQUwsRUFBWSxFQUFFLE9BQU8sUUFBVCxFQUFaLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxZQUFULEVBQVosRUFDRSxnQkFBSyxHQUFMLEVBQVUsRUFBRSxPQUFPLE1BQVQsRUFBVixDQURGLEVBRUUsZ0JBQUssT0FBTCxFQUFjLEVBQUUsTUFBTSxNQUFSLEVBQWdCLE9BQU8sV0FBdkIsRUFBb0MsU0FBUyxZQUE3QyxFQUEyRCxTQUFTLGdCQUFwRSxFQUFzRixRQUFRLGVBQTlGLEVBQWQsQ0FGRixDQURGLENBREY7QUFRRCxDQTlCRDs7a0JBZ0NlLGU7Ozs7Ozs7OztBQ2xDZjs7QUFFQSxJQUFNLGdCQUFnQixTQUFoQixhQUFnQixRQUFTO0FBQUEsTUFDckIsUUFEcUIsR0FDUixLQURRLENBQ3JCLFFBRHFCOzs7QUFHN0IsTUFBTSxlQUFlLFNBQWYsWUFBZSxJQUFLO0FBQ3hCLFFBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsZUFBUztBQUNQLGNBQU0seUJBREM7QUFFUCxpQkFBUztBQUNQLHVCQUFhLEVBQUUsTUFBRixDQUFTO0FBRGY7QUFGRixPQUFUO0FBTUQ7QUFDRixHQVREOztBQVdBLFNBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsSUFBSSxRQUFOLEVBQVosRUFDRSxnQkFBSyxLQUFMLEVBQVksRUFBRSxPQUFPLFlBQVQsRUFBdUIsU0FBUyxZQUFoQyxFQUFaLEVBQ0UsZ0JBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxNQUFULEVBQVosQ0FERixFQUVFLGdCQUFLLE9BQUwsRUFBYyxFQUFFLE1BQU0sTUFBUixFQUFnQixhQUFhLGVBQTdCLEVBQThDLFdBQVcsSUFBekQsRUFBZCxDQUZGLENBREYsQ0FERjtBQU9ELENBckJEOztrQkF1QmUsYTs7Ozs7Ozs7QUN6QlIsSUFBTSw4QkFBVyxrRUFBakI7QUFDQSxJQUFNLG9CQUFNLFNBQU4sR0FBTSxDQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsK0RBQXFFLFFBQXJFLGNBQXNGLElBQXRGLGVBQW9HLEtBQXBHO0FBQUEsQ0FBWjs7Ozs7Ozs7Ozs7O0FDRFA7O0FBRUEsSUFBTSxTQUFTO0FBQ2IsV0FBUyxPQURJO0FBRWIsV0FBUyxPQUZJO0FBR2IsVUFBUSxNQUhLO0FBSWIsV0FBUyxPQUpJO0FBS2IsVUFBUTtBQUxLLENBQWY7O0FBUU8sSUFBTSxzQkFBTyxTQUFQLElBQU8sQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUE4QjtBQUFBLG9DQUFiLFFBQWE7QUFBYixZQUFhO0FBQUE7O0FBQ2hELE1BQUksT0FBTyxPQUFFLGFBQUYsQ0FBZ0IsSUFBaEIsQ0FBWDs7QUFFQSxNQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixXQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLGVBQU87QUFDaEMsVUFBSSxPQUFPLGNBQVAsQ0FBc0IsR0FBdEIsQ0FBSixFQUFnQztBQUM5QixhQUFLLGdCQUFMLENBQXNCLE9BQU8sR0FBUCxDQUF0QixFQUFtQyxNQUFNLEdBQU4sQ0FBbkM7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsTUFBTSxHQUFOLENBQXZCO0FBQ0Q7QUFDRixLQU5EO0FBT0Q7O0FBRUQsTUFBSSxTQUFTLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsYUFBUyxPQUFULENBQWlCLGlCQUFTO0FBQ3hCLFVBQUksT0FBTyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLGFBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztBQUVELFVBQUksUUFBTyxLQUFQLHlDQUFPLEtBQVAsT0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsYUFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7QUFDRixLQVJEO0FBU0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0ExQk07Ozs7Ozs7O0FDVkEsSUFBTSwwQkFBUyxTQUFULE1BQVM7QUFBQSxTQUFRLFFBQVEsSUFBaEI7QUFBQSxDQUFmOztBQUVQLElBQU0sY0FBYyxTQUFkLFdBQWMsTUFBTztBQUN6QixTQUFPLElBQUksT0FBSixDQUFZLFVBQVUsT0FBVixFQUFtQixNQUFuQixFQUEyQjtBQUM1QyxRQUFJLE1BQU0sSUFBSSxLQUFKLEVBQVY7QUFDQSxRQUFJLE1BQUosR0FBYSxZQUFZO0FBQ3ZCLGNBQVEsR0FBUjtBQUNELEtBRkQ7QUFHQSxRQUFJLE9BQUosR0FBYyxVQUFVLEdBQVYsRUFBZTtBQUMzQixhQUFPLEdBQVA7QUFDRCxLQUZEO0FBR0EsUUFBSSxHQUFKLEdBQVUsR0FBVjtBQUNELEdBVE0sQ0FBUDtBQVVELENBWEQ7O0FBYUE7Ozs7O0FBS08sSUFBTSw0Q0FBa0IsU0FBbEIsZUFBa0I7QUFBQSxTQUFVLE9BQ3RDLEdBRHNDLENBQ2xDO0FBQUEsV0FBUyxZQUFZLEtBQVosQ0FBVDtBQUFBLEdBRGtDLENBQVY7QUFBQSxDQUF4Qjs7Ozs7Ozs7QUNwQkEsSUFBTSxvQ0FBYyxTQUFTLGFBQVQsQ0FBd0IsT0FBeEIsRUFBaUM7QUFDMUQsTUFBSSxRQUFRLFNBQVo7QUFDQSxNQUFJLGNBQWMsRUFBbEI7O0FBRUEsU0FBTztBQUNMLGNBQVUsa0JBQVUsTUFBVixFQUFrQjtBQUMxQixjQUFRLFFBQVEsS0FBUixFQUFlLE1BQWYsQ0FBUjtBQUNBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBcEI7QUFDQSxrQkFBWSxPQUFaLENBQW9CLFVBQVUsTUFBVixFQUFrQjtBQUNwQyxlQUFPLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBUDtBQUNELE9BRkQ7QUFHRCxLQVBJO0FBUUwsY0FBVSxvQkFBWTtBQUNwQixhQUFPLEtBQVA7QUFDRCxLQVZJO0FBV0wsZUFBVyxtQkFBVSxPQUFWLEVBQW1CO0FBQzVCLGtCQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDRDtBQWJJLEdBQVA7QUFlRCxDQW5CTTs7Ozs7Ozs7Ozs7O0FDQVA7Ozs7QUFFQTtBQUNBLElBQU0sZUFBZTtBQUNuQjtBQUNBLFVBQVE7QUFDTixVQUFNO0FBREEsR0FGVzs7QUFNbkI7QUFDQSxlQUFhLEVBUE07QUFRbkIsb0JBQWtCLEtBUkM7QUFTbkIsZ0JBQWMsS0FUSztBQVVuQixlQUFhLEVBVk07QUFXbkIsZ0JBQWMsSUFYSztBQVluQixrQkFBZ0IsQ0FaRztBQWFuQixhQUFXLElBYlE7O0FBZW5CO0FBQ0EsY0FBWSxFQWhCTztBQWlCbkIsZUFBYSxJQWpCTTtBQWtCbkIsY0FBWSxJQWxCTztBQW1CbkIsZUFBYTtBQW5CTSxDQUFyQjs7QUFzQkEsSUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFrQztBQUFBLE1BQWpDLEtBQWlDLHVFQUF6QixZQUF5QjtBQUFBLE1BQVgsTUFBVzs7QUFDaEQsVUFBUSxPQUFPLElBQWY7QUFDRSxTQUFLLHlCQUFMO0FBQWdDO0FBQzlCLDRCQUNLLEtBREw7QUFFRSx1QkFBYSxPQUFPLE9BQVAsQ0FBZSxXQUY5QjtBQUdFLGtCQUFRO0FBQ04sa0JBQU07QUFEQTtBQUhWO0FBT0Q7O0FBRUQsU0FBSyw0QkFBTDtBQUFtQztBQUNqQyw0QkFDSyxLQURMO0FBRUUsd0JBQWM7QUFGaEI7QUFJRDs7QUFFRCxTQUFLLDJCQUFMO0FBQWtDO0FBQ2hDLDRCQUNLLEtBREw7QUFFRSx3QkFBYztBQUZoQjtBQUlEOztBQUVELFNBQUsscUJBQUw7QUFBNEI7QUFDMUIsNEJBQ0ssS0FETDtBQUVFLDRCQUFrQixDQUFDLE1BQU07QUFGM0I7QUFJRDs7QUFFRCxTQUFLLHdCQUFMO0FBQStCO0FBQzdCLDRCQUNLLEtBREw7QUFFRSx1QkFBYTtBQUZmO0FBSUQ7O0FBRUQsU0FBSyx1QkFBTDtBQUE4QjtBQUM1Qiw0QkFDSyxLQURMO0FBRUUsb0RBQ0ssTUFBTSxXQURYLElBRUUsTUFBTSxZQUZSO0FBRkY7QUFPRDs7QUFFRCxTQUFLLDRCQUFMO0FBQW1DO0FBQ2pDLDRCQUNLLEtBREw7QUFFRSx1QkFBYSxNQUFNLFdBQU4sQ0FDWixNQURZLENBQ0wsVUFBQyxLQUFELEVBQVEsQ0FBUjtBQUFBLG1CQUFjLE1BQU0sT0FBTyxPQUFPLE9BQVAsQ0FBZSxFQUF0QixDQUFwQjtBQUFBLFdBREs7QUFGZjtBQUtEOztBQUVELFNBQUssZ0JBQUw7QUFBdUI7QUFDckIsNEJBQ0ssS0FETDtBQUVFLDBCQUFnQjtBQUZsQjtBQUlEOztBQUVELFNBQUssaUJBQUw7QUFBd0I7QUFDdEIsNEJBQ0ssS0FETDtBQUVFLHVCQUFhLE9BQU8sT0FBUCxDQUFlO0FBRjlCO0FBSUQ7O0FBRUQsU0FBSyx5QkFBTDtBQUFnQztBQUM5QixZQUFNLGVBQWUsTUFBTSxXQUFOLEtBQXNCLENBQTNDOztBQUVBLFlBQU0saUJBQWlCLGVBQ25CLENBRG1CLEdBRW5CLE1BQU0sY0FGVjs7QUFJQSxZQUFNLGFBQWEsZUFDZixPQUFPLE9BQVAsQ0FBZSxNQUFmLENBQXNCLE9BRFAsZ0NBR1osTUFBTSxVQUhNLHNCQUlaLE9BQU8sT0FBUCxDQUFlLE1BQWYsQ0FBc0IsT0FKVixFQUFuQjs7QUFPQSxZQUFNLGVBQWUsZUFDakIsT0FBTyxPQUFQLENBQWUsTUFBZixDQUFzQixPQUF0QixDQUE4QixjQUE5QixDQURpQixHQUVqQixNQUFNLFVBQU4sQ0FBaUIsY0FBakIsQ0FGSjs7QUFJQSw0QkFDSyxLQURMO0FBRUUsZ0NBRkY7QUFHRSxvQ0FIRjtBQUlFLHdDQUpGO0FBS0Usd0JBQWMsSUFMaEI7QUFNRSxxQkFBVyxPQUFPLE9BQVAsQ0FBZSxNQUFmLENBQXNCLE9BQXRCLENBQThCLGlCQUFpQixDQUEvQyxDQU5iO0FBT0Usc0JBQVksT0FBTyxPQUFQLENBQWUsTUFBZixDQUFzQixXQVBwQztBQVFFLHVCQUFhLE9BQU8sT0FBUCxDQUFlLE1BQWYsQ0FBc0I7QUFSckM7QUFVRDs7QUFFRCxTQUFLLG9CQUFMO0FBQTJCO0FBQ3pCLDRCQUNLLEtBREw7QUFFRSx3QkFBYyxNQUFNLFVBQU4sQ0FBaUIsTUFBTSxjQUFOLEdBQXVCLENBQXhDLENBRmhCO0FBR0UscUJBQVcsTUFBTSxVQUFOLENBQWlCLE1BQU0sY0FBTixHQUF1QixDQUF4QyxDQUhiO0FBSUUsMEJBQWdCLE1BQU0sY0FBTixHQUF1QjtBQUp6QztBQU1EOztBQUVEO0FBQ0UsYUFBTyxLQUFQO0FBL0dKO0FBaUhELENBbEhEOztBQW9ITyxJQUFNLHdCQUFRLHdCQUFZLE9BQVosQ0FBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vcmVkdWNlcidcblxuaW1wb3J0IHsgZXhpc3RzIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHsgdXJsIH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbmltcG9ydCBEb3dubG9hZHMgZnJvbSAnLi9jb21wb25lbnRzL0Rvd25sb2FkcydcbmltcG9ydCBTZWFyY2hCb3hNYWluIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2hCb3hNYWluJ1xuaW1wb3J0IFNlYXJjaEJveEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvU2VhcmNoQm94SGVhZGVyJ1xuaW1wb3J0IE9uQm9hcmRpbmcgZnJvbSAnLi9jb21wb25lbnRzL09uQm9hcmRpbmcnXG5pbXBvcnQgU2F2ZUljb24gZnJvbSAnLi9jb21wb25lbnRzL1NhdmVJY29uJ1xuaW1wb3J0IEZ1bGwgZnJvbSAnLi9jb21wb25lbnRzL0Z1bGwnXG5cbmV4cG9ydCBjb25zdCBkID0gZG9jdW1lbnRcblxuLy8gdmlld1xuY29uc3QgYm9keSA9IGQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpXG5jb25zdCBhY3Rpb25zID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5hY3Rpb25zJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcbmNvbnN0IGltYWdlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UnKVxuY29uc3QgZm9vdGVyID0gYm9keS5xdWVyeVNlbGVjdG9yKCdmb290ZXInKVxuXG5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgZGlzcGF0Y2g6IHN0b3JlLmRpc3BhdGNoLFxuICAgIC4uLnN0YXRlLFxuICB9XG5cbiAgLy8gcm91dGUgY2hhbmdlc1xuICBjb25zdCBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlID0gZC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJylcbiAgY29uc3Qgb25Cb2FyZGluZ05vZGUgPSBpbWFnZS5xdWVyeVNlbGVjdG9yKCcjb24tYm9hcmRpbmcnKVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy8nICYmICFleGlzdHMoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSkpIHtcbiAgICBpbWFnZS5hcHBlbmRDaGlsZChTZWFyY2hCb3hNYWluKHByb3BzKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCAhPT0gJy8nICYmIGV4aXN0cyhzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlKSkge1xuICAgIHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgY29uc3QgaXNGaXJzdExvYWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmlyc3RfbG9hZCcpXG4gIGNvbnN0IHNlYXJjaEJveEhlYWRlck5vZGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpXG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoID09PSAnL3NlYXJjaCcgJiYgIWV4aXN0cyhzZWFyY2hCb3hIZWFkZXJOb2RlKSkge1xuICAgIGhlYWRlci5pbnNlcnRCZWZvcmUoU2VhcmNoQm94SGVhZGVyKHByb3BzKSwgYWN0aW9ucylcbiAgfVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmICFleGlzdHMob25Cb2FyZGluZ05vZGUpICYmICFleGlzdHMoaXNGaXJzdExvYWQpKSB7XG4gICAgaW1hZ2UuYXBwZW5kQ2hpbGQoT25Cb2FyZGluZyhwcm9wcykpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZpcnN0X2xvYWQnLCBmYWxzZSlcbiAgfVxuXG4gIC8vIGltYWdlc1F1ZXVlIGNoYW5nZXNcbiAgY29uc3QgZG93bmxvYWRQcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpXG4gIGNvbnN0IGRvd25sb2FkRnVsbE5vZGUgPSBmb2xkZXIucXVlcnlTZWxlY3RvcignLmZ1bGwnKVxuXG4gIGlmIChzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoRG93bmxvYWRzKHByb3BzKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5sZW5ndGggPiAwICYmICFleGlzdHMoZG93bmxvYWRGdWxsTm9kZSkpIHtcbiAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoRnVsbChwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUubGVuZ3RoID09PSAwICYmIGV4aXN0cyhkb3dubG9hZEZ1bGxOb2RlKSkge1xuICAgIGRvd25sb2FkRnVsbE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZEZ1bGxOb2RlKVxuICB9XG5cbiAgLy8gZGlzcGxheURvd25sb2FkcyBjaGFuZ2VzXG4gIGlmIChzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmICFleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgYm9keS5hcHBlbmRDaGlsZChEb3dubG9hZHMocHJvcHMpKVxuICB9XG5cbiAgaWYgKCFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgY29uc3QgdXNlck5vZGUgPSBmb290ZXIucXVlcnlTZWxlY3RvcignLnVzZXInKVxuICBjb25zdCB1c2VyUGhvdG9Ob2RlID0gdXNlck5vZGUucXVlcnlTZWxlY3RvcignLnBob3RvJylcbiAgY29uc3QgdXNlck5hbWVOb2RlID0gdXNlck5vZGUucXVlcnlTZWxlY3RvcignLm5hbWUnKVxuXG4gIC8vIGltYWdlc0xpc3QgY2hhbmdlc1xuICBpZiAoZXhpc3RzKHN0YXRlLmN1cnJlbnRJbWFnZSkpIHtcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQ6ICR7c3RhdGUuY3VycmVudEltYWdlLmNvbG9yfSB1cmwoJyR7c3RhdGUuY3VycmVudEltYWdlLnVybHMudGh1bWJ9Jykgbm8tcmVwZWF0OyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO2ApXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpXG4gICAgdXNlclBob3RvTm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgc3RhdGUuY3VycmVudEltYWdlLnVzZXIucHJvZmlsZV9pbWFnZS5zbWFsbCArJyknKVxuICAgIHVzZXJOYW1lTm9kZS5pbm5lclRleHQgPSBzdGF0ZS5jdXJyZW50SW1hZ2UudXNlci5uYW1lXG4gIH1cblxuICAvLyByZXF1ZXN0aW5nIG5ldyBpbWFnZXNcbiAgY29uc3QgaXNUd29JbWFnZXNBd2F5RnJvbUVuZCA9IHN0YXRlLmN1cnJlbnRJbWFnZUlkID09PSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAtIDJcbiAgY29uc3QgaXNOb3RJbk5ld1BhZ2UgPSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAvIDEwID09PSBzdGF0ZS5jdXJyZW50UGFnZVxuICBjb25zdCBoYXZlTm90RmV0Y2hlZEFsbEltYWdlcyA9IHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoICE9PSBzdGF0ZS50b3RhbEltYWdlc1xuXG4gIGlmIChpc1R3b0ltYWdlc0F3YXlGcm9tRW5kICYmIGlzTm90SW5OZXdQYWdlICYmIGhhdmVOb3RGZXRjaGVkQWxsSW1hZ2VzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0ZFVENIX0lNQUdFUycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiBzdGF0ZS5jdXJyZW50UGFnZSArIDFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKHN0YXRlLmN1cnJlbnRJbWFnZUlkICsgMSA9PT0gc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggJiYgc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fRU5EX09GX0xJU1QnXG4gICAgfSlcbiAgfVxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsICdzZWFyY2g/cT0nICsgc3RhdGUuc2VhcmNoVmFsdWUpXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9GRVRDSF9JTUFHRVMnLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IDFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fS0VZX1VQX1NQQUNFX0JBUic6IHtcbiAgICAgIGlmICghc3RhdGUuaXNOYXZpZ2F0aW5nKSBicmVha1xuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fTE9BRF9ORVhUX0lNQUdFJyB9KVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0tFWV9VUF9TJzoge1xuICAgICAgaWYgKCFzdGF0ZS5pc05hdmlnYXRpbmcpIGJyZWFrXG4gICAgICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUuc29tZShpbWFnZSA9PiBpbWFnZS5pZCA9PT0gc3RhdGUuY3VycmVudEltYWdlLmlkKSkgYnJlYWtcblxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fQUREX0lNQUdFX1RPX1FVRVVFJyB9KVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0FERF9JTUFHRV9UT19RVUVVRSc6IHtcbiAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKFNhdmVJY29uKHByb3BzKSwgaGVhZGVyKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZUljb25Ob2RlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpXG4gICAgICAgIHNhdmVJY29uTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNhdmVJY29uTm9kZSlcbiAgICAgIH0sIDMwMClcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVMnOiB7XG4gICAgICBjb25zdCB4bWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeG1sLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ09OX0ZFVENIX0lNQUdFU19TVUNDRVNTJyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgaW1hZ2VzOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB4bWwub3BlbignR0VUJywgdXJsKHN0YXRlLmN1cnJlbnRQYWdlLCBzdGF0ZS5zZWFyY2hWYWx1ZSkpO1xuICAgICAgeG1sLnNlbmQoKTtcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVNfU1VDQ0VTUyc6IHtcbiAgICAgIGNvbnN0IHNlYXJjaEJveEhlYWRlcklucHV0Tm9kZSA9IHNlYXJjaEJveEhlYWRlck5vZGUucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuICAgICAgaWYgKGV4aXN0cyhzZWFyY2hCb3hIZWFkZXJJbnB1dE5vZGUpKSB7XG4gICAgICAgIHNlYXJjaEJveEhlYWRlcklucHV0Tm9kZS5ibHVyKClcbiAgICAgIH1cblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fS0VZX1VQX1NQQUNFX0JBUidcbiAgICB9KVxuICB9XG5cbiAgaWYgKGUua2V5Q29kZSA9PT0gODMpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fS0VZX1VQX1MnXG4gICAgfSlcbiAgfVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSlcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IERvd25sb2FkcyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGRpc3BhdGNoLFxuICAgIGltYWdlc1F1ZXVlLFxuICB9ID0gcHJvcHNcblxuICAvLyBFdmVudHNcbiAgY29uc3QgY2xlYXJPbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCBidXR0b25PbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCB1bE9uQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9ET1dOTE9BRF9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIHsgb25DbGljazogdWxPbkNsaWNrIH0sXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlLnVybHMudGh1bWJ9JylgIH0sXG4gICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2FjdGlvbnMnLCBpZDogaSB9LFxuICAgICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScgfSksIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdkb3dubG9hZCcgfSkpKVxuICAgICAgICAgICAgKSkpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sXG4gICAgICAgIE5vZGUoJ2J1dHRvbicsIHsgb25DbGljazogYnV0dG9uT25DbGljayB9LCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRzXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBGdWxsID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmdWxsJyB9KVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZ1bGxcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IE9uQm9hcmRpbmcgPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ29uLWJvYXJkaW5nJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ltYWdlJyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjYXB0aW9uJyB9LCAnUHJlc3Mgc3BhY2ViYXIgdG8gZ2VuZXJhdGUgYSBwaG90bycpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NraXAnIH0sICdTa2lwJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduYXYnIH0sXG4gICAgICAgICAgTm9kZSgndWwnLCBudWxsLFxuICAgICAgICAgICAgTm9kZSgnbGknKSwgTm9kZSgnbGknKSwgTm9kZSgnbGknKSkpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnbmV4dCcgfSwgJ05leHQnKSkpXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT25Cb2FyZGluZ1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgU2F2ZUljb24gPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ3NhdmUnIH0sXG4gICAgICBOb2RlKCdpJywgeyBjbGFzczogJ2ljb24nIH0pXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNhdmVJY29uXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTZWFyY2hCb3hIZWFkZXIgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZGlzcGF0Y2gsIHNlYXJjaFZhbHVlIH0gPSBwcm9wc1xuXG4gIGNvbnN0IG9uU2VhcmNoQm94Rm9jdXMgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fSEVBREVSX1NFQVJDSF9CT1hfRk9DVVMnIH0pXG4gIH1cblxuICBjb25zdCBvblNlYXJjaEJveEJsdXIgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fSEVBREVSX1NFQVJDSF9CT1hfQkxVUicgfSlcbiAgfVxuXG4gIGNvbnN0IG9uS2V5dXBJbnB1dCA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaC1ib3gnIH0sXG4gICAgICAgIE5vZGUoJ2knLCB7IGNsYXNzOiAnaWNvbicgfSksXG4gICAgICAgIE5vZGUoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHZhbHVlOiBzZWFyY2hWYWx1ZSwgb25LZXlVcDogb25LZXl1cElucHV0LCBvbkZvY3VzOiBvblNlYXJjaEJveEZvY3VzLCBvbkJsdXI6IG9uU2VhcmNoQm94Qmx1ciB9KVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3hIZWFkZXJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IFNlYXJjaEJveE1haW4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHByb3BzXG5cbiAgY29uc3Qgb25LZXl1cElucHV0ID0gZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdzZWFyY2gnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoLWJveCcsIG9uS2V5VXA6IG9uS2V5dXBJbnB1dCB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaWNvbicgfSksXG4gICAgICAgIE5vZGUoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnU2VhcmNoIHBob3RvcycsIGF1dG9mb2N1czogdHJ1ZSB9KSlcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94TWFpblxuIiwiZXhwb3J0IGNvbnN0IGNsaWVudElkID0gJzYzMjJlMDdkZTBlMTU1YmEwZDllY2E4ZDY3Y2YyN2JiOWI0NTQxN2YyZmViMWEyMzRiYWEzNjNhMWRkYTNkYmUnXG5leHBvcnQgY29uc3QgdXJsID0gKHBhZ2UsIHF1ZXJ5KSA9PiBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3NlYXJjaC9waG90b3M/Y2xpZW50X2lkPSR7Y2xpZW50SWR9JnBhZ2U9JHtwYWdlfSZxdWVyeT0ke3F1ZXJ5fWBcbiIsImltcG9ydCB7IGQgfSBmcm9tICcuLi9hcHAnXG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25LZXlVcDogJ2tleXVwJyxcbiAgb25Mb2FkOiAnbG9hZCcsXG4gIG9uRm9jdXM6ICdmb2N1cycsXG4gIG9uQmx1cjogJ2JsdXInXG59XG5cbmV4cG9ydCBjb25zdCBOb2RlID0gKGVsZW0sIGF0dHJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBsZXQgbm9kZSA9IGQuY3JlYXRlRWxlbWVudChlbGVtKVxuXG4gIGlmIChhdHRycyAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTW2tleV0sIGF0dHJzW2tleV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG4iLCJleHBvcnQgY29uc3QgZXhpc3RzID0gbm9kZSA9PiBub2RlICE9IG51bGxcblxuY29uc3QgaW1hZ2VMb2FkZXIgPSBzcmMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKHNyYylcbiAgICB9XG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cbiAgICBpbWcuc3JjID0gc3JjXG4gIH0pXG59XG5cbi8qKlxuICogVGFrZXMgYSBsaXN0IG9mIGltYWdlcyB1cmxzIGFuZCByZXR1cm5zIGEgbGlzdFxuICogb2YgcHJvbWlzZXMgb2YgaW1hZ2VzIGxvYWRpbmdcbiAqIEBwYXJhbSBpbWFnZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHByZUNhY2hlZEltYWdlcyA9IGltYWdlcyA9PiBpbWFnZXNcbiAgLm1hcChpbWFnZSA9PiBpbWFnZUxvYWRlcihpbWFnZSkpXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coYWN0aW9uLCBzdGF0ZSlcbiAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlKHN0YXRlLCBhY3Rpb24pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmUnXG5cbi8vIG1vZGVsXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIC8vIHJvdXRpbmdcbiAgcm91dGVzOiB7XG4gICAgcGF0aDogJy8nXG4gIH0sXG5cbiAgLy8gdWlcbiAgc2VhcmNoVmFsdWU6ICcnLFxuICBkaXNwbGF5RG93bmxvYWRzOiBmYWxzZSxcbiAgaXNOYXZpZ2F0aW5nOiBmYWxzZSxcbiAgaW1hZ2VzUXVldWU6IFtdLFxuICBjdXJyZW50SW1hZ2U6IG51bGwsXG4gIGN1cnJlbnRJbWFnZUlkOiAwLFxuICBuZXh0SW1hZ2U6IG51bGwsXG5cbiAgLy8gYXN5bmNcbiAgaW1hZ2VzTGlzdDogW10sXG4gIGN1cnJlbnRQYWdlOiBudWxsLFxuICB0b3RhbFBhZ2VzOiBudWxsLFxuICB0b3RhbEltYWdlczogbnVsbFxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgICAgcm91dGVzOiB7XG4gICAgICAgICAgcGF0aDogJy9zZWFyY2gnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9IRUFERVJfU0VBUkNIX0JPWF9GT0NVUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc05hdmlnYXRpbmc6IGZhbHNlLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0hFQURFUl9TRUFSQ0hfQk9YX0JMVVInOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNOYXZpZ2F0aW5nOiB0cnVlLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGlzcGxheURvd25sb2FkczogIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW10sXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fQUREX0lNQUdFX1RPX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXG4gICAgICAgICAgLi4uc3RhdGUuaW1hZ2VzUXVldWUsXG4gICAgICAgICAgc3RhdGUuY3VycmVudEltYWdlXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogc3RhdGUuaW1hZ2VzUXVldWVcbiAgICAgICAgLmZpbHRlcigoaW1hZ2UsIGkpID0+IGkgIT09IE51bWJlcihhY3Rpb24ucGF5bG9hZC5pZCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fRU5EX09GX0xJU1QnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3VycmVudEltYWdlSWQ6IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3VycmVudFBhZ2U6IGFjdGlvbi5wYXlsb2FkLmN1cnJlbnRQYWdlXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fRkVUQ0hfSU1BR0VTX1NVQ0NFU1MnOiB7XG4gICAgICBjb25zdCBpc05ld1JlcXVlc3QgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PT0gMVxuXG4gICAgICBjb25zdCBjdXJyZW50SW1hZ2VJZCA9IGlzTmV3UmVxdWVzdFxuICAgICAgICA/IDBcbiAgICAgICAgOiBzdGF0ZS5jdXJyZW50SW1hZ2VJZFxuXG4gICAgICBjb25zdCBpbWFnZXNMaXN0ID0gaXNOZXdSZXF1ZXN0XG4gICAgICAgID8gYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnJlc3VsdHNcbiAgICAgICAgOiBbXG4gICAgICAgICAgLi4uc3RhdGUuaW1hZ2VzTGlzdCxcbiAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5pbWFnZXMucmVzdWx0c1xuICAgICAgICBdXG5cbiAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZSA9IGlzTmV3UmVxdWVzdFxuICAgICAgICA/IGFjdGlvbi5wYXlsb2FkLmltYWdlcy5yZXN1bHRzW2N1cnJlbnRJbWFnZUlkXVxuICAgICAgICA6IHN0YXRlLmltYWdlc0xpc3RbY3VycmVudEltYWdlSWRdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNMaXN0LFxuICAgICAgICBjdXJyZW50SW1hZ2UsXG4gICAgICAgIGN1cnJlbnRJbWFnZUlkLFxuICAgICAgICBpc05hdmlnYXRpbmc6IHRydWUsXG4gICAgICAgIG5leHRJbWFnZTogYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnJlc3VsdHNbY3VycmVudEltYWdlSWQgKyAxXSxcbiAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnRvdGFsX3BhZ2VzLFxuICAgICAgICB0b3RhbEltYWdlczogYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnRvdGFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fTE9BRF9ORVhUX0lNQUdFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbnRJbWFnZTogc3RhdGUuaW1hZ2VzTGlzdFtzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDFdLFxuICAgICAgICBuZXh0SW1hZ2U6IHN0YXRlLmltYWdlc0xpc3Rbc3RhdGUuY3VycmVudEltYWdlSWQgKyAyXSxcbiAgICAgICAgY3VycmVudEltYWdlSWQ6IHN0YXRlLmN1cnJlbnRJbWFnZUlkICsgMVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuIl19
