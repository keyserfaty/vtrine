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
    state.currentImage.src.then(function (src) {
      image.setAttribute('style', 'background: ' + state.currentImage.color + ' url(\'' + src + '\') no-repeat; background-size: cover;');
    });

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

var _helpers = require('./helpers');

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
  preCachedImages: [],
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

        // pre-cache images
        var imagesFromList = imagesList.map(function (item) {
          return item.urls.thumb;
        });
        var preCacheImages = (0, _helpers.preCachedImages)(imagesFromList);

        return _extends({}, state, {
          imagesList: imagesList,
          currentImageId: currentImageId,
          currentImage: _extends({}, imagesList[currentImageId], {
            src: preCacheImages[currentImageId]
          }),
          preCacheImages: preCacheImages,
          isNavigating: true,
          totalPages: action.payload.images.total_pages,
          totalImages: action.payload.images.total
        });
      }

    case 'ON_LOAD_NEXT_IMAGE':
      {
        return _extends({}, state, {
          currentImage: _extends({}, state.imagesList[state.currentImageId + 1], {
            src: state.preCacheImages[state.currentImageId + 1]
          }),
          currentImageId: state.currentImageId + 1
        });
      }

    default:
      return state;
  }
};

var store = exports.store = (0, _store.createStore)(reducer);

},{"./helpers":10,"./helpers/store":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvRnVsbC5qcyIsInNyYy9jb21wb25lbnRzL09uQm9hcmRpbmcuanMiLCJzcmMvY29tcG9uZW50cy9TYXZlSWNvbi5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiLCJzcmMvcmVkdWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxPQUFPLEVBQUUsYUFBRixDQUFnQixNQUFoQixDQUFiO0FBQ0EsSUFBTSxTQUFTLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUFmO0FBQ0EsSUFBTSxVQUFVLE9BQU8sYUFBUCxDQUFxQixVQUFyQixDQUFoQjtBQUNBLElBQU0sU0FBUyxPQUFPLGFBQVAsQ0FBcUIsWUFBckIsQ0FBZjtBQUNBLElBQU0sUUFBUSxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZDtBQUNBLElBQU0sU0FBUyxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZjs7QUFFQSxlQUFNLFNBQU4sQ0FBZ0IsVUFBQyxLQUFELEVBQVEsTUFBUixFQUFtQjtBQUNqQyxNQUFNO0FBQ0osY0FBVSxlQUFNO0FBRFosS0FFRCxLQUZDLENBQU47O0FBS0E7QUFDQSxNQUFNLDRCQUE0QixFQUFFLGFBQUYsQ0FBZ0IsU0FBaEIsQ0FBbEM7QUFD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Q0FBc0IsT0FKVixFQUFuQjs7QUFPQTtBQUNBLFlBQU0saUJBQWlCLFdBQVcsR0FBWCxDQUFlO0FBQUEsaUJBQVEsS0FBSyxJQUFMLENBQVUsS0FBbEI7QUFBQSxTQUFmLENBQXZCO0FBQ0EsWUFBTSxpQkFBaUIsOEJBQWdCLGNBQWhCLENBQXZCOztBQUVBLDRCQUNLLEtBREw7QUFFRSxnQ0FGRjtBQUdFLHdDQUhGO0FBSUUscUNBQ0ssV0FBVyxjQUFYLENBREw7QUFFRSxpQkFBSyxlQUFlLGNBQWY7QUFGUCxZQUpGO0FBUUUsd0NBUkY7QUFTRSx3QkFBYyxJQVRoQjtBQVVFLHNCQUFZLE9BQU8sT0FBUCxDQUFlLE1BQWYsQ0FBc0IsV0FWcEM7QUFXRSx1QkFBYSxPQUFPLE9BQVAsQ0FBZSxNQUFmLENBQXNCO0FBWHJDO0FBYUQ7O0FBRUQsU0FBSyxvQkFBTDtBQUEyQjtBQUN6Qiw0QkFDSyxLQURMO0FBRUUscUNBQ0ssTUFBTSxVQUFOLENBQWlCLE1BQU0sY0FBTixHQUF1QixDQUF4QyxDQURMO0FBRUUsaUJBQUssTUFBTSxjQUFOLENBQXFCLE1BQU0sY0FBTixHQUF1QixDQUE1QztBQUZQLFlBRkY7QUFNRSwwQkFBZ0IsTUFBTSxjQUFOLEdBQXVCO0FBTnpDO0FBUUQ7O0FBRUQ7QUFDRSxhQUFPLEtBQVA7QUFwSEo7QUFzSEQsQ0F2SEQ7O0FBeUhPLElBQU0sd0JBQVEsd0JBQVksT0FBWixDQUFkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuXG5pbXBvcnQgeyBleGlzdHMsIHByZUNhY2hlZEltYWdlcyB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB7IHVybCB9IGZyb20gJy4vY29uc3RhbnRzJ1xuXG5pbXBvcnQgRG93bmxvYWRzIGZyb20gJy4vY29tcG9uZW50cy9Eb3dubG9hZHMnXG5pbXBvcnQgU2VhcmNoQm94TWFpbiBmcm9tICcuL2NvbXBvbmVudHMvU2VhcmNoQm94TWFpbidcbmltcG9ydCBTZWFyY2hCb3hIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlcidcbmltcG9ydCBPbkJvYXJkaW5nIGZyb20gJy4vY29tcG9uZW50cy9PbkJvYXJkaW5nJ1xuaW1wb3J0IFNhdmVJY29uIGZyb20gJy4vY29tcG9uZW50cy9TYXZlSWNvbidcbmltcG9ydCBGdWxsIGZyb20gJy4vY29tcG9uZW50cy9GdWxsJ1xuXG5leHBvcnQgY29uc3QgZCA9IGRvY3VtZW50XG5cbi8vIHZpZXdcbmNvbnN0IGJvZHkgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuY29uc3QgaGVhZGVyID0gZC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKVxuY29uc3QgYWN0aW9ucyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuYWN0aW9ucycpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5jb25zdCBpbWFnZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLmltYWdlJylcbmNvbnN0IGZvb3RlciA9IGJvZHkucXVlcnlTZWxlY3RvcignZm9vdGVyJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAuLi5zdGF0ZSxcbiAgfVxuXG4gIC8vIHJvdXRlIGNoYW5nZXNcbiAgY29uc3Qgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpXG4gIGNvbnN0IG9uQm9hcmRpbmdOb2RlID0gaW1hZ2UucXVlcnlTZWxlY3RvcignI29uLWJvYXJkaW5nJylcblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvJyAmJiAhZXhpc3RzKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpKSB7XG4gICAgaW1hZ2UuYXBwZW5kQ2hpbGQoU2VhcmNoQm94TWFpbihwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggIT09ICcvJyAmJiBleGlzdHMoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSkpIHtcbiAgICBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGNvbnN0IGlzRmlyc3RMb2FkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZpcnN0X2xvYWQnKVxuICBjb25zdCBzZWFyY2hCb3hIZWFkZXJOb2RlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmICFleGlzdHMoc2VhcmNoQm94SGVhZGVyTm9kZSkpIHtcbiAgICBoZWFkZXIuaW5zZXJ0QmVmb3JlKFNlYXJjaEJveEhlYWRlcihwcm9wcyksIGFjdGlvbnMpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvc2VhcmNoJyAmJiAhZXhpc3RzKG9uQm9hcmRpbmdOb2RlKSAmJiAhZXhpc3RzKGlzRmlyc3RMb2FkKSkge1xuICAgIGltYWdlLmFwcGVuZENoaWxkKE9uQm9hcmRpbmcocHJvcHMpKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaXJzdF9sb2FkJywgZmFsc2UpXG4gIH1cblxuICAvLyBpbWFnZXNRdWV1ZSBjaGFuZ2VzXG4gIGNvbnN0IGRvd25sb2FkUHJldmlvdXNOb2RlID0gZC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQnKVxuICBjb25zdCBkb3dubG9hZEZ1bGxOb2RlID0gZm9sZGVyLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUubGVuZ3RoID4gMCAmJiAhZXhpc3RzKGRvd25sb2FkRnVsbE5vZGUpKSB7XG4gICAgZm9sZGVyLmFwcGVuZENoaWxkKEZ1bGwocHJvcHMpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmltYWdlc1F1ZXVlLmxlbmd0aCA9PT0gMCAmJiBleGlzdHMoZG93bmxvYWRGdWxsTm9kZSkpIHtcbiAgICBkb3dubG9hZEZ1bGxOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG93bmxvYWRGdWxsTm9kZSlcbiAgfVxuXG4gIC8vIGRpc3BsYXlEb3dubG9hZHMgY2hhbmdlc1xuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiAhZXhpc3RzKGRvd25sb2FkUHJldmlvdXNOb2RlKSkge1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoRG93bmxvYWRzKHByb3BzKSlcbiAgfVxuXG4gIGlmICghc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGNvbnN0IHVzZXJOb2RlID0gZm9vdGVyLnF1ZXJ5U2VsZWN0b3IoJy51c2VyJylcbiAgY29uc3QgdXNlclBob3RvTm9kZSA9IHVzZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5waG90bycpXG4gIGNvbnN0IHVzZXJOYW1lTm9kZSA9IHVzZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJylcblxuICAvLyBpbWFnZXNMaXN0IGNoYW5nZXNcbiAgaWYgKGV4aXN0cyhzdGF0ZS5jdXJyZW50SW1hZ2UpKSB7XG4gICAgc3RhdGUuY3VycmVudEltYWdlLnNyYy50aGVuKHNyYyA9PiB7XG4gICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQ6ICR7c3RhdGUuY3VycmVudEltYWdlLmNvbG9yfSB1cmwoJyR7c3JjfScpIG5vLXJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtgKVxuICAgIH0pXG5cbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJylcbiAgICB1c2VyUGhvdG9Ob2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYmFja2dyb3VuZC1pbWFnZTogdXJsKCcgKyBzdGF0ZS5jdXJyZW50SW1hZ2UudXNlci5wcm9maWxlX2ltYWdlLnNtYWxsICsnKScpXG4gICAgdXNlck5hbWVOb2RlLmlubmVyVGV4dCA9IHN0YXRlLmN1cnJlbnRJbWFnZS51c2VyLm5hbWVcbiAgfVxuXG4gIC8vIHJlcXVlc3RpbmcgbmV3IGltYWdlc1xuICBjb25zdCBpc1R3b0ltYWdlc0F3YXlGcm9tRW5kID0gc3RhdGUuY3VycmVudEltYWdlSWQgPT09IHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoIC0gMlxuICBjb25zdCBpc05vdEluTmV3UGFnZSA9IHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoIC8gMTAgPT09IHN0YXRlLmN1cnJlbnRQYWdlXG4gIGNvbnN0IGhhdmVOb3RGZXRjaGVkQWxsSW1hZ2VzID0gc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggIT09IHN0YXRlLnRvdGFsSW1hZ2VzXG5cbiAgaWYgKGlzVHdvSW1hZ2VzQXdheUZyb21FbmQgJiYgaXNOb3RJbk5ld1BhZ2UgJiYgaGF2ZU5vdEZldGNoZWRBbGxJbWFnZXMpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fRkVUQ0hfSU1BR0VTJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgY3VycmVudFBhZ2U6IHN0YXRlLmN1cnJlbnRQYWdlICsgMVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoc3RhdGUuY3VycmVudEltYWdlSWQgKyAxID09PSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAmJiBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9FTkRfT0ZfTElTVCdcbiAgICB9KVxuICB9XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgJ3NlYXJjaD9xPScgKyBzdGF0ZS5zZWFyY2hWYWx1ZSlcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ09OX0ZFVENIX0lNQUdFUycsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogMVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9LRVlfVVBfU1BBQ0VfQkFSJzoge1xuICAgICAgaWYgKCFzdGF0ZS5pc05hdmlnYXRpbmcpIGJyZWFrXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9MT0FEX05FWFRfSU1BR0UnIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fS0VZX1VQX1MnOiB7XG4gICAgICBpZiAoIXN0YXRlLmlzTmF2aWdhdGluZykgYnJlYWtcbiAgICAgIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5zb21lKGltYWdlID0+IGltYWdlLmlkID09PSBzdGF0ZS5jdXJyZW50SW1hZ2UuaWQpKSBicmVha1xuXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9BRERfSU1BR0VfVE9fUVVFVUUnIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fQUREX0lNQUdFX1RPX1FVRVVFJzoge1xuICAgICAgYm9keS5pbnNlcnRCZWZvcmUoU2F2ZUljb24ocHJvcHMpLCBoZWFkZXIpXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzYXZlSWNvbk5vZGUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlJylcbiAgICAgICAgc2F2ZUljb25Ob2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2F2ZUljb25Ob2RlKVxuICAgICAgfSwgMzAwKVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0ZFVENIX0lNQUdFUyc6IHtcbiAgICAgIGNvbnN0IHhtbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4bWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnT05fRkVUQ0hfSU1BR0VTX1NVQ0NFU1MnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBpbWFnZXM6IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHhtbC5vcGVuKCdHRVQnLCB1cmwoc3RhdGUuY3VycmVudFBhZ2UsIHN0YXRlLnNlYXJjaFZhbHVlKSk7XG4gICAgICB4bWwuc2VuZCgpO1xuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0ZFVENIX0lNQUdFU19TVUNDRVNTJzoge1xuICAgICAgY29uc3Qgc2VhcmNoQm94SGVhZGVySW5wdXROb2RlID0gc2VhcmNoQm94SGVhZGVyTm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gICAgICBpZiAoZXhpc3RzKHNlYXJjaEJveEhlYWRlcklucHV0Tm9kZSkpIHtcbiAgICAgICAgc2VhcmNoQm94SGVhZGVySW5wdXROb2RlLmJsdXIoKVxuICAgICAgfVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufSlcblxuLy8gZXZlbnRzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fV0lORE9XX0xPQUQnIH0pXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9LRVlfVVBfU1BBQ0VfQkFSJ1xuICAgIH0pXG4gIH1cblxuICBpZiAoZS5rZXlDb2RlID09PSA4Mykge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9LRVlfVVBfUydcbiAgICB9KVxuICB9XG59KVxuXG5mb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1RPR0dMRV9ET1dOTE9BRFMnIH0pXG59KVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgRG93bmxvYWRzID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgZGlzcGF0Y2gsXG4gICAgaW1hZ2VzUXVldWUsXG4gIH0gPSBwcm9wc1xuXG4gIC8vIEV2ZW50c1xuICBjb25zdCBjbGVhck9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fQ0xFQVJfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IGJ1dHRvbk9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fRE9XTkxPQURfQUxMX0RPV05MT0FEUycgfSlcbiAgfVxuXG4gIGNvbnN0IHVsT25DbGljayA9IGUgPT4ge1xuICAgIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmlkLmxlbmd0aCkge1xuICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAncmVtb3ZlJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ2Rvd25sb2FkJykge1xuICAgICAgICBkaXNwYXRjaCh7dHlwZTogJ09OX0RPV05MT0FEX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBET01cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnZG93bmxvYWQnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaGVhZGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjbGVhcicsIG9uQ2xpY2s6IGNsZWFyT25DbGljayB9LCAnQ2xlYXIgYWxsJykpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpbWFnZXMnIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjb250ZW50JyB9LFxuICAgICAgICAgIE5vZGUoJ3VsJywgeyBvbkNsaWNrOiB1bE9uQ2xpY2sgfSxcbiAgICAgICAgICAgIC4uLmltYWdlc1F1ZXVlLm1hcCgoaW1hZ2UsIGkpID0+XG4gICAgICAgICAgICAgIE5vZGUoJ2xpJywgeyBjbGFzczogJ2ltYWdlJywgc3R5bGU6IGBiYWNrZ3JvdW5kOiB1cmwoJyR7aW1hZ2UudXJscy50aHVtYn0nKWAgfSxcbiAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYWN0aW9ucycsIGlkOiBpIH0sXG4gICAgICAgICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAncmVtb3ZlJyB9KSwgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Rvd25sb2FkJyB9KSkpXG4gICAgICAgICAgICApKSkpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnYnV0dG9uJywgeyBvbkNsaWNrOiBidXR0b25PbkNsaWNrIH0sICdEb3dubG9hZCBzZWxlY3Rpb24nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3dubG9hZHNcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IEZ1bGwgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Z1bGwnIH0pXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRnVsbFxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgT25Cb2FyZGluZyA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnb24tYm9hcmRpbmcnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2UnIH0pLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2NhcHRpb24nIH0sICdQcmVzcyBzcGFjZWJhciB0byBnZW5lcmF0ZSBhIHBob3RvJyksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2tpcCcgfSwgJ1NraXAnKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ25hdicgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIG51bGwsXG4gICAgICAgICAgICBOb2RlKCdsaScpLCBOb2RlKCdsaScpLCBOb2RlKCdsaScpKSksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduZXh0JyB9LCAnTmV4dCcpKSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBPbkJvYXJkaW5nXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTYXZlSWNvbiA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnc2F2ZScgfSxcbiAgICAgIE5vZGUoJ2knLCB7IGNsYXNzOiAnaWNvbicgfSlcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2F2ZUljb25cbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IFNlYXJjaEJveEhlYWRlciA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBkaXNwYXRjaCwgc2VhcmNoVmFsdWUgfSA9IHByb3BzXG5cbiAgY29uc3Qgb25TZWFyY2hCb3hGb2N1cyA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9IRUFERVJfU0VBUkNIX0JPWF9GT0NVUycgfSlcbiAgfVxuXG4gIGNvbnN0IG9uU2VhcmNoQm94Qmx1ciA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9IRUFERVJfU0VBUkNIX0JPWF9CTFVSJyB9KVxuICB9XG5cbiAgY29uc3Qgb25LZXl1cElucHV0ID0gZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdzZWFyY2gnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoLWJveCcgfSxcbiAgICAgICAgTm9kZSgnaScsIHsgY2xhc3M6ICdpY29uJyB9KSxcbiAgICAgICAgTm9kZSgnaW5wdXQnLCB7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IHNlYXJjaFZhbHVlLCBvbktleVVwOiBvbktleXVwSW5wdXQsIG9uRm9jdXM6IG9uU2VhcmNoQm94Rm9jdXMsIG9uQmx1cjogb25TZWFyY2hCb3hCbHVyIH0pXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEJveEhlYWRlclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgU2VhcmNoQm94TWFpbiA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBkaXNwYXRjaCB9ID0gcHJvcHNcblxuICBjb25zdCBvbktleXVwSW5wdXQgPSBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ3NlYXJjaCcgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdzZWFyY2gtYm94Jywgb25LZXlVcDogb25LZXl1cElucHV0IH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpY29uJyB9KSxcbiAgICAgICAgTm9kZSgnaW5wdXQnLCB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6ICdTZWFyY2ggcGhvdG9zJywgYXV0b2ZvY3VzOiB0cnVlIH0pKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3hNYWluXG4iLCJleHBvcnQgY29uc3QgY2xpZW50SWQgPSAnNjMyMmUwN2RlMGUxNTViYTBkOWVjYThkNjdjZjI3YmI5YjQ1NDE3ZjJmZWIxYTIzNGJhYTM2M2ExZGRhM2RiZSdcbmV4cG9ydCBjb25zdCB1cmwgPSAocGFnZSwgcXVlcnkpID0+IGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vc2VhcmNoL3Bob3Rvcz9jbGllbnRfaWQ9JHtjbGllbnRJZH0mcGFnZT0ke3BhZ2V9JnF1ZXJ5PSR7cXVlcnl9YFxuIiwiaW1wb3J0IHsgZCB9IGZyb20gJy4uL2FwcCdcblxuY29uc3QgRVZFTlRTID0ge1xuICBvbkNsaWNrOiAnY2xpY2snLFxuICBvbktleVVwOiAna2V5dXAnLFxuICBvbkxvYWQ6ICdsb2FkJyxcbiAgb25Gb2N1czogJ2ZvY3VzJyxcbiAgb25CbHVyOiAnYmx1cidcbn1cblxuZXhwb3J0IGNvbnN0IE5vZGUgPSAoZWxlbSwgYXR0cnMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gIGxldCBub2RlID0gZC5jcmVhdGVFbGVtZW50KGVsZW0pXG5cbiAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFNba2V5XSwgYXR0cnNba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cbiIsImV4cG9ydCBjb25zdCBleGlzdHMgPSBub2RlID0+IG5vZGUgIT0gbnVsbFxuXG5jb25zdCBpbWFnZUxvYWRlciA9IHNyYyA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc29sdmUoc3JjKVxuICAgIH1cbiAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuICAgIGltZy5zcmMgPSBzcmNcbiAgfSlcbn1cblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgaW1hZ2VzIHVybHMgYW5kIHJldHVybnMgYSBsaXN0XG4gKiBvZiBwcm9taXNlcyBvZiBpbWFnZXMgbG9hZGluZ1xuICogQHBhcmFtIGltYWdlc1xuICovXG5leHBvcnQgY29uc3QgcHJlQ2FjaGVkSW1hZ2VzID0gaW1hZ2VzID0+IGltYWdlc1xuICAubWFwKGltYWdlID0+IGltYWdlTG9hZGVyKGltYWdlKSlcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlRm4gKHJlZHVjZXIpIHtcbiAgbGV0IHN0YXRlID0gdW5kZWZpbmVkXG4gIGxldCBzdWJzY3JpYmVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHN0YXRlKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vaGVscGVycy9zdG9yZSdcbmltcG9ydCB7IHByZUNhY2hlZEltYWdlcyB9IGZyb20gJy4vaGVscGVycydcblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgLy8gcm91dGluZ1xuICByb3V0ZXM6IHtcbiAgICBwYXRoOiAnLydcbiAgfSxcblxuICAvLyB1aVxuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpc05hdmlnYXRpbmc6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogW10sXG4gIGN1cnJlbnRJbWFnZTogbnVsbCxcbiAgY3VycmVudEltYWdlSWQ6IDAsXG4gIG5leHRJbWFnZTogbnVsbCxcblxuICAvLyBhc3luY1xuICBpbWFnZXNMaXN0OiBbXSxcbiAgcHJlQ2FjaGVkSW1hZ2VzOiBbXSxcbiAgY3VycmVudFBhZ2U6IG51bGwsXG4gIHRvdGFsUGFnZXM6IG51bGwsXG4gIHRvdGFsSW1hZ2VzOiBudWxsXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwYXRoOiAnL3NlYXJjaCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0hFQURFUl9TRUFSQ0hfQk9YX0ZPQ1VTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzTmF2aWdhdGluZzogZmFsc2UsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fSEVBREVSX1NFQVJDSF9CT1hfQkxVUic6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc05hdmlnYXRpbmc6IHRydWUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fVE9HR0xFX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkaXNwbGF5RG93bmxvYWRzOiAhc3RhdGUuZGlzcGxheURvd25sb2FkcyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9BRERfSU1BR0VfVE9fUVVFVUUnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNRdWV1ZSxcbiAgICAgICAgICBzdGF0ZS5jdXJyZW50SW1hZ2VcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZVxuICAgICAgICAuZmlsdGVyKChpbWFnZSwgaSkgPT4gaSAhPT0gTnVtYmVyKGFjdGlvbi5wYXlsb2FkLmlkKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9FTkRfT0ZfTElTVCc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50SW1hZ2VJZDogMFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0ZFVENIX0lNQUdFUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50UGFnZTogYWN0aW9uLnBheWxvYWQuY3VycmVudFBhZ2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVNfU1VDQ0VTUyc6IHtcbiAgICAgIGNvbnN0IGlzTmV3UmVxdWVzdCA9IHN0YXRlLmN1cnJlbnRQYWdlID09PSAxXG5cbiAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZUlkID0gaXNOZXdSZXF1ZXN0XG4gICAgICAgID8gMFxuICAgICAgICA6IHN0YXRlLmN1cnJlbnRJbWFnZUlkXG5cbiAgICAgIGNvbnN0IGltYWdlc0xpc3QgPSBpc05ld1JlcXVlc3RcbiAgICAgICAgPyBhY3Rpb24ucGF5bG9hZC5pbWFnZXMucmVzdWx0c1xuICAgICAgICA6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNMaXN0LFxuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmltYWdlcy5yZXN1bHRzXG4gICAgICAgIF1cblxuICAgICAgLy8gcHJlLWNhY2hlIGltYWdlc1xuICAgICAgY29uc3QgaW1hZ2VzRnJvbUxpc3QgPSBpbWFnZXNMaXN0Lm1hcChpdGVtID0+IGl0ZW0udXJscy50aHVtYilcbiAgICAgIGNvbnN0IHByZUNhY2hlSW1hZ2VzID0gcHJlQ2FjaGVkSW1hZ2VzKGltYWdlc0Zyb21MaXN0KVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzTGlzdCxcbiAgICAgICAgY3VycmVudEltYWdlSWQsXG4gICAgICAgIGN1cnJlbnRJbWFnZToge1xuICAgICAgICAgIC4uLmltYWdlc0xpc3RbY3VycmVudEltYWdlSWRdLFxuICAgICAgICAgIHNyYzogcHJlQ2FjaGVJbWFnZXNbY3VycmVudEltYWdlSWRdXG4gICAgICAgIH0sXG4gICAgICAgIHByZUNhY2hlSW1hZ2VzLFxuICAgICAgICBpc05hdmlnYXRpbmc6IHRydWUsXG4gICAgICAgIHRvdGFsUGFnZXM6IGFjdGlvbi5wYXlsb2FkLmltYWdlcy50b3RhbF9wYWdlcyxcbiAgICAgICAgdG90YWxJbWFnZXM6IGFjdGlvbi5wYXlsb2FkLmltYWdlcy50b3RhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0xPQURfTkVYVF9JTUFHRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50SW1hZ2U6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNMaXN0W3N0YXRlLmN1cnJlbnRJbWFnZUlkICsgMV0sXG4gICAgICAgICAgc3JjOiBzdGF0ZS5wcmVDYWNoZUltYWdlc1tzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDFdXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRJbWFnZUlkOiBzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcbiJdfQ==
