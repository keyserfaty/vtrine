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

  //if (state.routes.path === '/search' && !exists(onBoardingNode) && !exists(isFirstLoad)) {
  //  image.appendChild(OnBoarding(props))
  //  localStorage.setItem('first_load', false)
  //}

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
  var userNameNode = userNode.querySelector('.name');
  var loadingBar = d.querySelector('.loading-bar'

  // imagesList changes
  );if ((0, _helpers.exists)(state.currentImage) && state.currentImage.id !== image.id) {
    var loadImage = function loadImage(imageURI) {
      var request = new XMLHttpRequest();

      request.onprogress = function (e) {
        if (e.lengthComputable) {
          loadingBar.setAttribute('style', 'width: ' + e.loaded / e.total * 100 + '%');
        }
      };
      request.onload = function () {
        image.setAttribute('style', 'background: url(data:image/jpeg;base64,' + (0, _helpers.base64Encode)(request.responseText) + ') no-repeat; background-size: cover;');
        image.classList.remove('loading');
        image.classList.add('loaded');
      };
      request.onloadend = function () {
        loadingBar.setAttribute('style', 'width: 0%');
      };
      request.open("GET", imageURI, true);
      request.overrideMimeType('text/plain; charset=x-user-defined');
      request.send(null);
    };

    image.classList.remove('loaded');
    image.classList.add('loading');

    state.currentImage.src.then(function (src) {
      image.setAttribute('style', 'background: ' + state.currentImage.color + ' url(\'' + src + '\') no-repeat; background-size: cover;');
      image.setAttribute('id', state.currentImage.id);
    });

    loadImage(state.currentImage.urls.full);

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

var base64Encode = exports.base64Encode = function base64Encode(inputStr) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var outputStr = "";
  var i = 0;

  while (i < inputStr.length) {
    //all three "& 0xff" added below are there to fix a known bug 
    //with bytes returned by xhr.responseText
    var byte1 = inputStr.charCodeAt(i++) & 0xff;
    var byte2 = inputStr.charCodeAt(i++) & 0xff;
    var byte3 = inputStr.charCodeAt(i++) & 0xff;

    var enc1 = byte1 >> 2;
    var enc2 = (byte1 & 3) << 4 | byte2 >> 4;

    var enc3, enc4;
    if (isNaN(byte2)) {
      enc3 = enc4 = 64;
    } else {
      enc3 = (byte2 & 15) << 2 | byte3 >> 6;
      if (isNaN(byte3)) {
        enc4 = 64;
      } else {
        enc4 = byte3 & 63;
      }
    }

    outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
  }

  return outputStr;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvRnVsbC5qcyIsInNyYy9jb21wb25lbnRzL09uQm9hcmRpbmcuanMiLCJzcmMvY29tcG9uZW50cy9TYXZlSWNvbi5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiLCJzcmMvcmVkdWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxPQUFPLEVBQUUsYUFBRixDQUFnQixNQUFoQixDQUFiO0FBQ0EsSUFBTSxTQUFTLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUFmO0FBQ0EsSUFBTSxVQUFVLE9BQU8sYUFBUCxDQUFxQixVQUFyQixDQUFoQjtBQUNBLElBQU0sU0FBUyxPQUFPLGFBQVAsQ0FBcUIsWUFBckIsQ0FBZjtBQUNBLElBQU0sUUFBUSxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZDtBQUNBLElBQU0sU0FBUyxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZjs7QUFFQSxlQUFNLFNBQU4sQ0FBZ0IsVUFBQyxLQUFELEVBQVEsTUFBUixFQUFtQjtBQUNqQyxNQUFNO0FBQ0osY0FBVSxlQUFNO0FBRFosS0FFRCxLQUZDLENBQU47O0FBS0E7QUFDQSxNQUFNLDRCQUE0QixFQUFFLGFBQUYsQ0FBZ0IsU0FBaEIsQ0FBbEM7QUFD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QjtBQVhyQztBQWFEOztBQUVELFNBQUssb0JBQUw7QUFBMkI7QUFDekIsNEJBQ0ssS0FETDtBQUVFLHFDQUNLLE1BQU0sVUFBTixDQUFpQixNQUFNLGNBQU4sR0FBdUIsQ0FBeEMsQ0FETDtBQUVFLGlCQUFLLE1BQU0sY0FBTixDQUFxQixNQUFNLGNBQU4sR0FBdUIsQ0FBNUM7QUFGUCxZQUZGO0FBTUUsMEJBQWdCLE1BQU0sY0FBTixHQUF1QjtBQU56QztBQVFEOztBQUVEO0FBQ0UsYUFBTyxLQUFQO0FBcEhKO0FBc0hELENBdkhEOztBQXlITyxJQUFNLHdCQUFRLHdCQUFZLE9BQVosQ0FBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vcmVkdWNlcidcblxuaW1wb3J0IHsgZXhpc3RzLCBwcmVDYWNoZWRJbWFnZXMsIGJhc2U2NEVuY29kZSB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB7IHVybCB9IGZyb20gJy4vY29uc3RhbnRzJ1xuXG5pbXBvcnQgRG93bmxvYWRzIGZyb20gJy4vY29tcG9uZW50cy9Eb3dubG9hZHMnXG5pbXBvcnQgU2VhcmNoQm94TWFpbiBmcm9tICcuL2NvbXBvbmVudHMvU2VhcmNoQm94TWFpbidcbmltcG9ydCBTZWFyY2hCb3hIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlcidcbmltcG9ydCBPbkJvYXJkaW5nIGZyb20gJy4vY29tcG9uZW50cy9PbkJvYXJkaW5nJ1xuaW1wb3J0IFNhdmVJY29uIGZyb20gJy4vY29tcG9uZW50cy9TYXZlSWNvbidcbmltcG9ydCBGdWxsIGZyb20gJy4vY29tcG9uZW50cy9GdWxsJ1xuXG5leHBvcnQgY29uc3QgZCA9IGRvY3VtZW50XG5cbi8vIHZpZXdcbmNvbnN0IGJvZHkgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuY29uc3QgaGVhZGVyID0gZC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKVxuY29uc3QgYWN0aW9ucyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuYWN0aW9ucycpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5jb25zdCBpbWFnZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLmltYWdlJylcbmNvbnN0IGZvb3RlciA9IGJvZHkucXVlcnlTZWxlY3RvcignZm9vdGVyJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAuLi5zdGF0ZSxcbiAgfVxuXG4gIC8vIHJvdXRlIGNoYW5nZXNcbiAgY29uc3Qgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpXG4gIGNvbnN0IG9uQm9hcmRpbmdOb2RlID0gaW1hZ2UucXVlcnlTZWxlY3RvcignI29uLWJvYXJkaW5nJylcblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvJyAmJiAhZXhpc3RzKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpKSB7XG4gICAgaW1hZ2UuYXBwZW5kQ2hpbGQoU2VhcmNoQm94TWFpbihwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggIT09ICcvJyAmJiBleGlzdHMoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSkpIHtcbiAgICBzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGNvbnN0IGlzRmlyc3RMb2FkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZpcnN0X2xvYWQnKVxuICBjb25zdCBzZWFyY2hCb3hIZWFkZXJOb2RlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKVxuXG4gIGlmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmICFleGlzdHMoc2VhcmNoQm94SGVhZGVyTm9kZSkpIHtcbiAgICBoZWFkZXIuaW5zZXJ0QmVmb3JlKFNlYXJjaEJveEhlYWRlcihwcm9wcyksIGFjdGlvbnMpXG4gIH1cblxuICAvL2lmIChzdGF0ZS5yb3V0ZXMucGF0aCA9PT0gJy9zZWFyY2gnICYmICFleGlzdHMob25Cb2FyZGluZ05vZGUpICYmICFleGlzdHMoaXNGaXJzdExvYWQpKSB7XG4gIC8vICBpbWFnZS5hcHBlbmRDaGlsZChPbkJvYXJkaW5nKHByb3BzKSlcbiAgLy8gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaXJzdF9sb2FkJywgZmFsc2UpXG4gIC8vfVxuXG4gIC8vIGltYWdlc1F1ZXVlIGNoYW5nZXNcbiAgY29uc3QgZG93bmxvYWRQcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpXG4gIGNvbnN0IGRvd25sb2FkRnVsbE5vZGUgPSBmb2xkZXIucXVlcnlTZWxlY3RvcignLmZ1bGwnKVxuXG4gIGlmIChzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoRG93bmxvYWRzKHByb3BzKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5pbWFnZXNRdWV1ZS5sZW5ndGggPiAwICYmICFleGlzdHMoZG93bmxvYWRGdWxsTm9kZSkpIHtcbiAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoRnVsbChwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUubGVuZ3RoID09PSAwICYmIGV4aXN0cyhkb3dubG9hZEZ1bGxOb2RlKSkge1xuICAgIGRvd25sb2FkRnVsbE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZEZ1bGxOb2RlKVxuICB9XG5cbiAgLy8gZGlzcGxheURvd25sb2FkcyBjaGFuZ2VzXG4gIGlmIChzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmICFleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgYm9keS5hcHBlbmRDaGlsZChEb3dubG9hZHMocHJvcHMpKVxuICB9XG5cbiAgaWYgKCFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzICYmIGV4aXN0cyhkb3dubG9hZFByZXZpb3VzTm9kZSkpIHtcbiAgICBkb3dubG9hZFByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvd25sb2FkUHJldmlvdXNOb2RlKVxuICB9XG5cbiAgY29uc3QgdXNlck5vZGUgPSBmb290ZXIucXVlcnlTZWxlY3RvcignLnVzZXInKVxuICBjb25zdCB1c2VyUGhvdG9Ob2RlID0gdXNlck5vZGUucXVlcnlTZWxlY3RvcignLnBob3RvJylcbiAgY29uc3QgdXNlck5hbWVOb2RlID0gdXNlck5vZGUucXVlcnlTZWxlY3RvcignLm5hbWUnKVxuICBjb25zdCBsb2FkaW5nQmFyID0gZC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZy1iYXInKVxuXG4gIC8vIGltYWdlc0xpc3QgY2hhbmdlc1xuICBpZiAoZXhpc3RzKHN0YXRlLmN1cnJlbnRJbWFnZSkgJiYgc3RhdGUuY3VycmVudEltYWdlLmlkICE9PSBpbWFnZS5pZCkge1xuICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpXG5cbiAgICBzdGF0ZS5jdXJyZW50SW1hZ2Uuc3JjLnRoZW4oc3JjID0+IHtcbiAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgYmFja2dyb3VuZDogJHtzdGF0ZS5jdXJyZW50SW1hZ2UuY29sb3J9IHVybCgnJHtzcmN9Jykgbm8tcmVwZWF0OyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO2ApXG4gICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgc3RhdGUuY3VycmVudEltYWdlLmlkKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2VVUkkpIHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgIGxvYWRpbmdCYXIuc2V0QXR0cmlidXRlKCdzdHlsZScsICd3aWR0aDogJyArIGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCArICclJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2UvanBlZztiYXNlNjQsJHtiYXNlNjRFbmNvZGUocmVxdWVzdC5yZXNwb25zZVRleHQpfSkgbm8tcmVwZWF0OyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO2ApXG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKVxuICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuICAgICAgfVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvYWRpbmdCYXIuc2V0QXR0cmlidXRlKCdzdHlsZScsICd3aWR0aDogMCUnKVxuICAgICAgfVxuICAgICAgcmVxdWVzdC5vcGVuKFwiR0VUXCIsIGltYWdlVVJJLCB0cnVlKTtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpO1xuICAgICAgcmVxdWVzdC5zZW5kKG51bGwpO1xuICAgIH1cblxuICAgIGxvYWRJbWFnZShzdGF0ZS5jdXJyZW50SW1hZ2UudXJscy5mdWxsKVxuXG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpXG4gICAgdXNlclBob3RvTm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2JhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgc3RhdGUuY3VycmVudEltYWdlLnVzZXIucHJvZmlsZV9pbWFnZS5zbWFsbCArJyknKVxuICAgIHVzZXJOYW1lTm9kZS5pbm5lclRleHQgPSBzdGF0ZS5jdXJyZW50SW1hZ2UudXNlci5uYW1lXG4gIH1cblxuICAvLyByZXF1ZXN0aW5nIG5ldyBpbWFnZXNcbiAgY29uc3QgaXNUd29JbWFnZXNBd2F5RnJvbUVuZCA9IHN0YXRlLmN1cnJlbnRJbWFnZUlkID09PSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAtIDJcbiAgY29uc3QgaXNOb3RJbk5ld1BhZ2UgPSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAvIDEwID09PSBzdGF0ZS5jdXJyZW50UGFnZVxuICBjb25zdCBoYXZlTm90RmV0Y2hlZEFsbEltYWdlcyA9IHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoICE9PSBzdGF0ZS50b3RhbEltYWdlc1xuXG4gIGlmIChpc1R3b0ltYWdlc0F3YXlGcm9tRW5kICYmIGlzTm90SW5OZXdQYWdlICYmIGhhdmVOb3RGZXRjaGVkQWxsSW1hZ2VzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0ZFVENIX0lNQUdFUycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiBzdGF0ZS5jdXJyZW50UGFnZSArIDFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKHN0YXRlLmN1cnJlbnRJbWFnZUlkICsgMSA9PT0gc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggJiYgc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fRU5EX09GX0xJU1QnXG4gICAgfSlcbiAgfVxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsICdzZWFyY2g/cT0nICsgc3RhdGUuc2VhcmNoVmFsdWUpXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9GRVRDSF9JTUFHRVMnLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IDFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fS0VZX1VQX1NQQUNFX0JBUic6IHtcbiAgICAgIGlmICghc3RhdGUuaXNOYXZpZ2F0aW5nKSBicmVha1xuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fTE9BRF9ORVhUX0lNQUdFJyB9KVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0tFWV9VUF9TJzoge1xuICAgICAgaWYgKCFzdGF0ZS5pc05hdmlnYXRpbmcpIGJyZWFrXG4gICAgICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUuc29tZShpbWFnZSA9PiBpbWFnZS5pZCA9PT0gc3RhdGUuY3VycmVudEltYWdlLmlkKSkgYnJlYWtcblxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fQUREX0lNQUdFX1RPX1FVRVVFJyB9KVxuXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0FERF9JTUFHRV9UT19RVUVVRSc6IHtcbiAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKFNhdmVJY29uKHByb3BzKSwgaGVhZGVyKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZUljb25Ob2RlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpXG4gICAgICAgIHNhdmVJY29uTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNhdmVJY29uTm9kZSlcbiAgICAgIH0sIDMwMClcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVMnOiB7XG4gICAgICBjb25zdCB4bWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeG1sLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ09OX0ZFVENIX0lNQUdFU19TVUNDRVNTJyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgaW1hZ2VzOiBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB4bWwub3BlbignR0VUJywgdXJsKHN0YXRlLmN1cnJlbnRQYWdlLCBzdGF0ZS5zZWFyY2hWYWx1ZSkpO1xuICAgICAgeG1sLnNlbmQoKTtcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVNfU1VDQ0VTUyc6IHtcbiAgICAgIGNvbnN0IHNlYXJjaEJveEhlYWRlcklucHV0Tm9kZSA9IHNlYXJjaEJveEhlYWRlck5vZGUucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuICAgICAgaWYgKGV4aXN0cyhzZWFyY2hCb3hIZWFkZXJJbnB1dE5vZGUpKSB7XG4gICAgICAgIHNlYXJjaEJveEhlYWRlcklucHV0Tm9kZS5ibHVyKClcbiAgICAgIH1cblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fS0VZX1VQX1NQQUNFX0JBUidcbiAgICB9KVxuICB9XG5cbiAgaWYgKGUua2V5Q29kZSA9PT0gODMpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fS0VZX1VQX1MnXG4gICAgfSlcbiAgfVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSlcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IERvd25sb2FkcyA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGRpc3BhdGNoLFxuICAgIGltYWdlc1F1ZXVlLFxuICB9ID0gcHJvcHNcblxuICAvLyBFdmVudHNcbiAgY29uc3QgY2xlYXJPbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCBidXR0b25PbkNsaWNrID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0FMTF9ET1dOTE9BRFMnIH0pXG4gIH1cblxuICBjb25zdCB1bE9uQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuYXR0cmlidXRlc1swXS5ub2RlVmFsdWUgPT09ICdkb3dubG9hZCcpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICdPTl9ET1dOTE9BRF9JTUFHRV9GUk9NX1FVRVVFJywgcGF5bG9hZDoge2lkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkfX0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIHsgb25DbGljazogdWxPbkNsaWNrIH0sXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlLnVybHMudGh1bWJ9JylgIH0sXG4gICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2FjdGlvbnMnLCBpZDogaSB9LFxuICAgICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScgfSksIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdkb3dubG9hZCcgfSkpKVxuICAgICAgICAgICAgKSkpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sXG4gICAgICAgIE5vZGUoJ2J1dHRvbicsIHsgb25DbGljazogYnV0dG9uT25DbGljayB9LCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRzXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBGdWxsID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmdWxsJyB9KVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZ1bGxcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IE9uQm9hcmRpbmcgPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ29uLWJvYXJkaW5nJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ltYWdlJyB9KSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjYXB0aW9uJyB9LCAnUHJlc3Mgc3BhY2ViYXIgdG8gZ2VuZXJhdGUgYSBwaG90bycpLFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NraXAnIH0sICdTa2lwJyksXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICduYXYnIH0sXG4gICAgICAgICAgTm9kZSgndWwnLCBudWxsLFxuICAgICAgICAgICAgTm9kZSgnbGknKSwgTm9kZSgnbGknKSwgTm9kZSgnbGknKSkpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnbmV4dCcgfSwgJ05leHQnKSkpXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT25Cb2FyZGluZ1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgU2F2ZUljb24gPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ3NhdmUnIH0sXG4gICAgICBOb2RlKCdpJywgeyBjbGFzczogJ2ljb24nIH0pXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNhdmVJY29uXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTZWFyY2hCb3hIZWFkZXIgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZGlzcGF0Y2gsIHNlYXJjaFZhbHVlIH0gPSBwcm9wc1xuXG4gIGNvbnN0IG9uU2VhcmNoQm94Rm9jdXMgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fSEVBREVSX1NFQVJDSF9CT1hfRk9DVVMnIH0pXG4gIH1cblxuICBjb25zdCBvblNlYXJjaEJveEJsdXIgPSAoKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnT05fSEVBREVSX1NFQVJDSF9CT1hfQkxVUicgfSlcbiAgfVxuXG4gIGNvbnN0IG9uS2V5dXBJbnB1dCA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaC1ib3gnIH0sXG4gICAgICAgIE5vZGUoJ2knLCB7IGNsYXNzOiAnaWNvbicgfSksXG4gICAgICAgIE5vZGUoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHZhbHVlOiBzZWFyY2hWYWx1ZSwgb25LZXlVcDogb25LZXl1cElucHV0LCBvbkZvY3VzOiBvblNlYXJjaEJveEZvY3VzLCBvbkJsdXI6IG9uU2VhcmNoQm94Qmx1ciB9KVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3hIZWFkZXJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IFNlYXJjaEJveE1haW4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHByb3BzXG5cbiAgY29uc3Qgb25LZXl1cElucHV0ID0gZSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdzZWFyY2gnIH0sXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnc2VhcmNoLWJveCcsIG9uS2V5VXA6IG9uS2V5dXBJbnB1dCB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaWNvbicgfSksXG4gICAgICAgIE5vZGUoJ2lucHV0JywgeyB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAnU2VhcmNoIHBob3RvcycsIGF1dG9mb2N1czogdHJ1ZSB9KSlcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94TWFpblxuIiwiZXhwb3J0IGNvbnN0IGNsaWVudElkID0gJzYzMjJlMDdkZTBlMTU1YmEwZDllY2E4ZDY3Y2YyN2JiOWI0NTQxN2YyZmViMWEyMzRiYWEzNjNhMWRkYTNkYmUnXG5leHBvcnQgY29uc3QgdXJsID0gKHBhZ2UsIHF1ZXJ5KSA9PiBgaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3NlYXJjaC9waG90b3M/Y2xpZW50X2lkPSR7Y2xpZW50SWR9JnBhZ2U9JHtwYWdlfSZxdWVyeT0ke3F1ZXJ5fWBcbiIsImltcG9ydCB7IGQgfSBmcm9tICcuLi9hcHAnXG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgb25DbGljazogJ2NsaWNrJyxcbiAgb25LZXlVcDogJ2tleXVwJyxcbiAgb25Mb2FkOiAnbG9hZCcsXG4gIG9uRm9jdXM6ICdmb2N1cycsXG4gIG9uQmx1cjogJ2JsdXInXG59XG5cbmV4cG9ydCBjb25zdCBOb2RlID0gKGVsZW0sIGF0dHJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBsZXQgbm9kZSA9IGQuY3JlYXRlRWxlbWVudChlbGVtKVxuXG4gIGlmIChhdHRycyAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTW2tleV0sIGF0dHJzW2tleV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG4iLCJleHBvcnQgY29uc3QgZXhpc3RzID0gbm9kZSA9PiBub2RlICE9IG51bGxcblxuY29uc3QgaW1hZ2VMb2FkZXIgPSBzcmMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKHNyYylcbiAgICB9XG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cbiAgICBpbWcuc3JjID0gc3JjXG4gIH0pXG59XG5cbi8qKlxuICogVGFrZXMgYSBsaXN0IG9mIGltYWdlcyB1cmxzIGFuZCByZXR1cm5zIGEgbGlzdFxuICogb2YgcHJvbWlzZXMgb2YgaW1hZ2VzIGxvYWRpbmdcbiAqIEBwYXJhbSBpbWFnZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHByZUNhY2hlZEltYWdlcyA9IGltYWdlcyA9PiBpbWFnZXNcbiAgLm1hcChpbWFnZSA9PiBpbWFnZUxvYWRlcihpbWFnZSkpXG5cbmV4cG9ydCBjb25zdCBiYXNlNjRFbmNvZGUgPSBpbnB1dFN0ciA9PiB7XG4gIHZhciBiNjQgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCJcbiAgdmFyIG91dHB1dFN0ciA9IFwiXCJcbiAgdmFyIGkgPSAwXG5cbiAgd2hpbGUgKGkgPCBpbnB1dFN0ci5sZW5ndGgpXG4gIHtcbiAgICAvL2FsbCB0aHJlZSBcIiYgMHhmZlwiIGFkZGVkIGJlbG93IGFyZSB0aGVyZSB0byBmaXggYSBrbm93biBidWcgXG4gICAgLy93aXRoIGJ5dGVzIHJldHVybmVkIGJ5IHhoci5yZXNwb25zZVRleHRcbiAgICB2YXIgYnl0ZTEgPSBpbnB1dFN0ci5jaGFyQ29kZUF0KGkrKykgJiAweGZmXG4gICAgdmFyIGJ5dGUyID0gaW5wdXRTdHIuY2hhckNvZGVBdChpKyspICYgMHhmZlxuICAgIHZhciBieXRlMyA9IGlucHV0U3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmZcblxuICAgIHZhciBlbmMxID0gYnl0ZTEgPj4gMlxuICAgIHZhciBlbmMyID0gKChieXRlMSAmIDMpIDw8IDQpIHwgKGJ5dGUyID4+IDQpXG5cbiAgICB2YXIgZW5jMywgZW5jNFxuICAgIGlmIChpc05hTihieXRlMikpXG4gICAge1xuICAgICAgZW5jMyA9IGVuYzQgPSA2NFxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZW5jMyA9ICgoYnl0ZTIgJiAxNSkgPDwgMikgfCAoYnl0ZTMgPj4gNilcbiAgICAgIGlmIChpc05hTihieXRlMykpXG4gICAgICB7XG4gICAgICAgIGVuYzQgPSA2NFxuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICBlbmM0ID0gYnl0ZTMgJiA2M1xuICAgICAgfVxuICAgIH1cblxuICAgIG91dHB1dFN0ciArPSBiNjQuY2hhckF0KGVuYzEpICsgYjY0LmNoYXJBdChlbmMyKSArIGI2NC5jaGFyQXQoZW5jMykgKyBiNjQuY2hhckF0KGVuYzQpXG4gIH1cblxuICByZXR1cm4gb3V0cHV0U3RyXG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coYWN0aW9uLCBzdGF0ZSlcbiAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlKHN0YXRlLCBhY3Rpb24pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMvc3RvcmUnXG5pbXBvcnQgeyBwcmVDYWNoZWRJbWFnZXMgfSBmcm9tICcuL2hlbHBlcnMnXG5cbi8vIG1vZGVsXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIC8vIHJvdXRpbmdcbiAgcm91dGVzOiB7XG4gICAgcGF0aDogJy8nXG4gIH0sXG5cbiAgLy8gdWlcbiAgc2VhcmNoVmFsdWU6ICcnLFxuICBkaXNwbGF5RG93bmxvYWRzOiBmYWxzZSxcbiAgaXNOYXZpZ2F0aW5nOiBmYWxzZSxcbiAgaW1hZ2VzUXVldWU6IFtdLFxuICBjdXJyZW50SW1hZ2U6IG51bGwsXG4gIGN1cnJlbnRJbWFnZUlkOiAwLFxuXG4gIC8vIGFzeW5jXG4gIGltYWdlc0xpc3Q6IFtdLFxuICBwcmVDYWNoZWRJbWFnZXM6IFtdLFxuICBjdXJyZW50UGFnZTogbnVsbCxcbiAgdG90YWxQYWdlczogbnVsbCxcbiAgdG90YWxJbWFnZXM6IG51bGxcbn1cblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzZWFyY2hWYWx1ZTogYWN0aW9uLnBheWxvYWQuc2VhcmNoVmFsdWUsXG4gICAgICAgIHJvdXRlczoge1xuICAgICAgICAgIHBhdGg6ICcvc2VhcmNoJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fSEVBREVSX1NFQVJDSF9CT1hfRk9DVVMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNOYXZpZ2F0aW5nOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9IRUFERVJfU0VBUkNIX0JPWF9CTFVSJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzTmF2aWdhdGluZzogdHJ1ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0FERF9JTUFHRV9UT19RVUVVRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNRdWV1ZTogW1xuICAgICAgICAgIC4uLnN0YXRlLmltYWdlc1F1ZXVlLFxuICAgICAgICAgIHN0YXRlLmN1cnJlbnRJbWFnZVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IHN0YXRlLmltYWdlc1F1ZXVlXG4gICAgICAgIC5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0VORF9PRl9MSVNUJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbnRJbWFnZUlkOiAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fRkVUQ0hfSU1BR0VTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbnRQYWdlOiBhY3Rpb24ucGF5bG9hZC5jdXJyZW50UGFnZVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0ZFVENIX0lNQUdFU19TVUNDRVNTJzoge1xuICAgICAgY29uc3QgaXNOZXdSZXF1ZXN0ID0gc3RhdGUuY3VycmVudFBhZ2UgPT09IDFcblxuICAgICAgY29uc3QgY3VycmVudEltYWdlSWQgPSBpc05ld1JlcXVlc3RcbiAgICAgICAgPyAwXG4gICAgICAgIDogc3RhdGUuY3VycmVudEltYWdlSWRcblxuICAgICAgY29uc3QgaW1hZ2VzTGlzdCA9IGlzTmV3UmVxdWVzdFxuICAgICAgICA/IGFjdGlvbi5wYXlsb2FkLmltYWdlcy5yZXN1bHRzXG4gICAgICAgIDogW1xuICAgICAgICAgIC4uLnN0YXRlLmltYWdlc0xpc3QsXG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnJlc3VsdHNcbiAgICAgICAgXVxuXG4gICAgICAvLyBwcmUtY2FjaGUgaW1hZ2VzXG4gICAgICBjb25zdCBpbWFnZXNGcm9tTGlzdCA9IGltYWdlc0xpc3QubWFwKGl0ZW0gPT4gaXRlbS51cmxzLnRodW1iKVxuICAgICAgY29uc3QgcHJlQ2FjaGVJbWFnZXMgPSBwcmVDYWNoZWRJbWFnZXMoaW1hZ2VzRnJvbUxpc3QpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpbWFnZXNMaXN0LFxuICAgICAgICBjdXJyZW50SW1hZ2VJZCxcbiAgICAgICAgY3VycmVudEltYWdlOiB7XG4gICAgICAgICAgLi4uaW1hZ2VzTGlzdFtjdXJyZW50SW1hZ2VJZF0sXG4gICAgICAgICAgc3JjOiBwcmVDYWNoZUltYWdlc1tjdXJyZW50SW1hZ2VJZF1cbiAgICAgICAgfSxcbiAgICAgICAgcHJlQ2FjaGVJbWFnZXMsXG4gICAgICAgIGlzTmF2aWdhdGluZzogdHJ1ZSxcbiAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnRvdGFsX3BhZ2VzLFxuICAgICAgICB0b3RhbEltYWdlczogYWN0aW9uLnBheWxvYWQuaW1hZ2VzLnRvdGFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fTE9BRF9ORVhUX0lNQUdFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbnRJbWFnZToge1xuICAgICAgICAgIC4uLnN0YXRlLmltYWdlc0xpc3Rbc3RhdGUuY3VycmVudEltYWdlSWQgKyAxXSxcbiAgICAgICAgICBzcmM6IHN0YXRlLnByZUNhY2hlSW1hZ2VzW3N0YXRlLmN1cnJlbnRJbWFnZUlkICsgMV1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudEltYWdlSWQ6IHN0YXRlLmN1cnJlbnRJbWFnZUlkICsgMVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuIl19
