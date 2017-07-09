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
      imagesQueue = props.imagesQueue,
      searchValue = props.searchValue;

  // Events

  var clearOnClick = function clearOnClick() {
    dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' });
  };

  var buttonOnClick = function buttonOnClick() {
    dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' });
  };

  var removeOnClick = function removeOnClick(e) {
    dispatch({ type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
  };

  var downloadOnClick = function downloadOnClick(e) {
    dispatch({ type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
  };

  // DOM
  return (0, _Node.Node)('div', { id: 'download' }, (0, _Node.Node)('div', { class: 'header' }, (0, _Node.Node)('div', { class: 'title' }, 'My Collection'), (0, _Node.Node)('div', { class: 'clear', onClick: clearOnClick }, 'Clear all')), (0, _Node.Node)('div', { class: 'arrow' }), (0, _Node.Node)('div', { class: 'images' }, (0, _Node.Node)('div', { class: 'content' }, _Node.Node.apply(undefined, ['ul', null].concat(_toConsumableArray(imagesQueue.map(function (image, i) {
    return (0, _Node.Node)('li', { class: 'image', style: 'background: url(\'' + image.urls.thumb + '\')' }, (0, _Node.Node)('div', { class: 'actions', id: i }, (0, _Node.Node)('div', { class: 'remove', onClick: removeOnClick }), (0, _Node.Node)('a', { class: 'download', download: searchValue + '_' + image.id, href: image.links.download, onClick: downloadOnClick }, (0, _Node.Node)('img', { style: 'display:none;', src: image.links.download }))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvRG93bmxvYWRzLmpzIiwic3JjL2NvbXBvbmVudHMvRnVsbC5qcyIsInNyYy9jb21wb25lbnRzL09uQm9hcmRpbmcuanMiLCJzcmMvY29tcG9uZW50cy9TYXZlSWNvbi5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL1NlYXJjaEJveE1haW4uanMiLCJzcmMvY29uc3RhbnRzLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvc3RvcmUuanMiLCJzcmMvcmVkdWNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxPQUFPLEVBQUUsYUFBRixDQUFnQixNQUFoQixDQUFiO0FBQ0EsSUFBTSxTQUFTLEVBQUUsYUFBRixDQUFnQixRQUFoQixDQUFmO0FBQ0EsSUFBTSxVQUFVLE9BQU8sYUFBUCxDQUFxQixVQUFyQixDQUFoQjtBQUNBLElBQU0sU0FBUyxPQUFPLGFBQVAsQ0FBcUIsWUFBckIsQ0FBZjtBQUNBLElBQU0sUUFBUSxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZDtBQUNBLElBQU0sU0FBUyxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBZjs7QUFFQSxlQUFNLFNBQU4sQ0FBZ0IsVUFBQyxLQUFELEVBQVEsTUFBUixFQUFtQjtBQUNqQyxNQUFNO0FBQ0osY0FBVSxlQUFNO0FBRFosS0FFRCxLQUZDLENBQU47O0FBS0E7QUFDQSxNQUFNLDRCQUE0QixFQUFFLGFBQUYsQ0FBZ0IsU0FBaEIsQ0FBbEM7QUFD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QUFhLE9BQU8sT0FBUCxDQUFlLE1BQWYsQ0FBc0I7QUFYckM7QUFhRDs7QUFFRCxTQUFLLG9CQUFMO0FBQTJCO0FBQ3pCLDRCQUNLLEtBREw7QUFFRSxxQ0FDSyxNQUFNLFVBQU4sQ0FBaUIsTUFBTSxjQUFOLEdBQXVCLENBQXhDLENBREw7QUFFRSxpQkFBSyxNQUFNLGNBQU4sQ0FBcUIsTUFBTSxjQUFOLEdBQXVCLENBQTVDO0FBRlAsWUFGRjtBQU1FLDBCQUFnQixNQUFNLGNBQU4sR0FBdUI7QUFOekM7QUFRRDs7QUFFRDtBQUNFLGFBQU8sS0FBUDtBQXBISjtBQXNIRCxDQXZIRDs7QUF5SE8sSUFBTSx3QkFBUSx3QkFBWSxPQUFaLENBQWQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3JlZHVjZXInXG5cbmltcG9ydCB7IGV4aXN0cywgcHJlQ2FjaGVkSW1hZ2VzLCBiYXNlNjRFbmNvZGUgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgeyB1cmwgfSBmcm9tICcuL2NvbnN0YW50cydcblxuaW1wb3J0IERvd25sb2FkcyBmcm9tICcuL2NvbXBvbmVudHMvRG93bmxvYWRzJ1xuaW1wb3J0IFNlYXJjaEJveE1haW4gZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaEJveE1haW4nXG5pbXBvcnQgU2VhcmNoQm94SGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2hCb3hIZWFkZXInXG5pbXBvcnQgT25Cb2FyZGluZyBmcm9tICcuL2NvbXBvbmVudHMvT25Cb2FyZGluZydcbmltcG9ydCBTYXZlSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvU2F2ZUljb24nXG5pbXBvcnQgRnVsbCBmcm9tICcuL2NvbXBvbmVudHMvRnVsbCdcblxuZXhwb3J0IGNvbnN0IGQgPSBkb2N1bWVudFxuXG4vLyB2aWV3XG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGFjdGlvbnMgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmFjdGlvbnMnKVxuY29uc3QgZm9sZGVyID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5kb3dubG9hZHMnKVxuY29uc3QgaW1hZ2UgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZScpXG5jb25zdCBmb290ZXIgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpXG5cbnN0b3JlLnN1YnNjcmliZSgoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBkaXNwYXRjaDogc3RvcmUuZGlzcGF0Y2gsXG4gICAgLi4uc3RhdGUsXG4gIH1cblxuICAvLyByb3V0ZSBjaGFuZ2VzXG4gIGNvbnN0IHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKVxuICBjb25zdCBvbkJvYXJkaW5nTm9kZSA9IGltYWdlLnF1ZXJ5U2VsZWN0b3IoJyNvbi1ib2FyZGluZycpXG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoID09PSAnLycgJiYgIWV4aXN0cyhzZWFyY2hCb3hNYWluUHJldmlvdXNOb2RlKSkge1xuICAgIGltYWdlLmFwcGVuZENoaWxkKFNlYXJjaEJveE1haW4ocHJvcHMpKVxuICB9XG5cbiAgaWYgKHN0YXRlLnJvdXRlcy5wYXRoICE9PSAnLycgJiYgZXhpc3RzKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpKSB7XG4gICAgc2VhcmNoQm94TWFpblByZXZpb3VzTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNlYXJjaEJveE1haW5QcmV2aW91c05vZGUpXG4gIH1cblxuICBjb25zdCBpc0ZpcnN0TG9hZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmaXJzdF9sb2FkJylcbiAgY29uc3Qgc2VhcmNoQm94SGVhZGVyTm9kZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJylcblxuICBpZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvc2VhcmNoJyAmJiAhZXhpc3RzKHNlYXJjaEJveEhlYWRlck5vZGUpKSB7XG4gICAgaGVhZGVyLmluc2VydEJlZm9yZShTZWFyY2hCb3hIZWFkZXIocHJvcHMpLCBhY3Rpb25zKVxuICB9XG5cbiAgLy9pZiAoc3RhdGUucm91dGVzLnBhdGggPT09ICcvc2VhcmNoJyAmJiAhZXhpc3RzKG9uQm9hcmRpbmdOb2RlKSAmJiAhZXhpc3RzKGlzRmlyc3RMb2FkKSkge1xuICAvLyAgaW1hZ2UuYXBwZW5kQ2hpbGQoT25Cb2FyZGluZyhwcm9wcykpXG4gIC8vICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmlyc3RfbG9hZCcsIGZhbHNlKVxuICAvL31cblxuICAvLyBpbWFnZXNRdWV1ZSBjaGFuZ2VzXG4gIGNvbnN0IGRvd25sb2FkUHJldmlvdXNOb2RlID0gZC5xdWVyeVNlbGVjdG9yKCcjZG93bmxvYWQnKVxuICBjb25zdCBkb3dubG9hZEZ1bGxOb2RlID0gZm9sZGVyLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJylcblxuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICBib2R5LmFwcGVuZENoaWxkKERvd25sb2Fkcyhwcm9wcykpXG4gIH1cblxuICBpZiAoc3RhdGUuaW1hZ2VzUXVldWUubGVuZ3RoID4gMCAmJiAhZXhpc3RzKGRvd25sb2FkRnVsbE5vZGUpKSB7XG4gICAgZm9sZGVyLmFwcGVuZENoaWxkKEZ1bGwocHJvcHMpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmltYWdlc1F1ZXVlLmxlbmd0aCA9PT0gMCAmJiBleGlzdHMoZG93bmxvYWRGdWxsTm9kZSkpIHtcbiAgICBkb3dubG9hZEZ1bGxOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG93bmxvYWRGdWxsTm9kZSlcbiAgfVxuXG4gIC8vIGRpc3BsYXlEb3dubG9hZHMgY2hhbmdlc1xuICBpZiAoc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiAhZXhpc3RzKGRvd25sb2FkUHJldmlvdXNOb2RlKSkge1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoRG93bmxvYWRzKHByb3BzKSlcbiAgfVxuXG4gIGlmICghc3RhdGUuZGlzcGxheURvd25sb2FkcyAmJiBleGlzdHMoZG93bmxvYWRQcmV2aW91c05vZGUpKSB7XG4gICAgZG93bmxvYWRQcmV2aW91c05vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgfVxuXG4gIGNvbnN0IHVzZXJOb2RlID0gZm9vdGVyLnF1ZXJ5U2VsZWN0b3IoJy51c2VyJylcbiAgY29uc3QgdXNlclBob3RvTm9kZSA9IHVzZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5waG90bycpXG4gIGNvbnN0IHVzZXJOYW1lTm9kZSA9IHVzZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJylcbiAgY29uc3QgbG9hZGluZ0JhciA9IGQucXVlcnlTZWxlY3RvcignLmxvYWRpbmctYmFyJylcblxuICAvLyBpbWFnZXNMaXN0IGNoYW5nZXNcbiAgaWYgKGV4aXN0cyhzdGF0ZS5jdXJyZW50SW1hZ2UpICYmIHN0YXRlLmN1cnJlbnRJbWFnZS5pZCAhPT0gaW1hZ2UuaWQpIHtcbiAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWQnKVxuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKVxuXG4gICAgc3RhdGUuY3VycmVudEltYWdlLnNyYy50aGVuKHNyYyA9PiB7XG4gICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQ6ICR7c3RhdGUuY3VycmVudEltYWdlLmNvbG9yfSB1cmwoJyR7c3JjfScpIG5vLXJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtgKVxuICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdpZCcsIHN0YXRlLmN1cnJlbnRJbWFnZS5pZClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlVVJJKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICBsb2FkaW5nQmFyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnd2lkdGg6ICcgKyBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDAgKyAnJScpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCR7YmFzZTY0RW5jb2RlKHJlcXVlc3QucmVzcG9uc2VUZXh0KX0pIG5vLXJlcGVhdDsgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtgKVxuICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJylcbiAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcbiAgICAgIH1cbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2FkaW5nQmFyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnd2lkdGg6IDAlJylcbiAgICAgIH1cbiAgICAgIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBpbWFnZVVSSSwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICAgIHJlcXVlc3Quc2VuZChudWxsKTtcbiAgICB9XG5cbiAgICBsb2FkSW1hZ2Uoc3RhdGUuY3VycmVudEltYWdlLnVybHMuZnVsbClcblxuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKVxuICAgIHVzZXJQaG90b05vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIHN0YXRlLmN1cnJlbnRJbWFnZS51c2VyLnByb2ZpbGVfaW1hZ2Uuc21hbGwgKycpJylcbiAgICB1c2VyTmFtZU5vZGUuaW5uZXJUZXh0ID0gc3RhdGUuY3VycmVudEltYWdlLnVzZXIubmFtZVxuICB9XG5cbiAgLy8gcmVxdWVzdGluZyBuZXcgaW1hZ2VzXG4gIGNvbnN0IGlzVHdvSW1hZ2VzQXdheUZyb21FbmQgPSBzdGF0ZS5jdXJyZW50SW1hZ2VJZCA9PT0gc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggLSAyXG4gIGNvbnN0IGlzTm90SW5OZXdQYWdlID0gc3RhdGUuaW1hZ2VzTGlzdC5sZW5ndGggLyAxMCA9PT0gc3RhdGUuY3VycmVudFBhZ2VcbiAgY29uc3QgaGF2ZU5vdEZldGNoZWRBbGxJbWFnZXMgPSBzdGF0ZS5pbWFnZXNMaXN0Lmxlbmd0aCAhPT0gc3RhdGUudG90YWxJbWFnZXNcblxuICBpZiAoaXNUd29JbWFnZXNBd2F5RnJvbUVuZCAmJiBpc05vdEluTmV3UGFnZSAmJiBoYXZlTm90RmV0Y2hlZEFsbEltYWdlcykge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9GRVRDSF9JTUFHRVMnLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjdXJyZW50UGFnZTogc3RhdGUuY3VycmVudFBhZ2UgKyAxXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDEgPT09IHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoICYmIHN0YXRlLmltYWdlc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0VORF9PRl9MSVNUJ1xuICAgIH0pXG4gIH1cblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCAnc2VhcmNoP3E9JyArIHN0YXRlLnNlYXJjaFZhbHVlKVxuICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnT05fRkVUQ0hfSU1BR0VTJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiAxXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX0tFWV9VUF9TUEFDRV9CQVInOiB7XG4gICAgICBpZiAoIXN0YXRlLmlzTmF2aWdhdGluZykgYnJlYWtcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX0xPQURfTkVYVF9JTUFHRScgfSlcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9LRVlfVVBfUyc6IHtcbiAgICAgIGlmICghc3RhdGUuaXNOYXZpZ2F0aW5nKSBicmVha1xuICAgICAgaWYgKHN0YXRlLmltYWdlc1F1ZXVlLnNvbWUoaW1hZ2UgPT4gaW1hZ2UuaWQgPT09IHN0YXRlLmN1cnJlbnRJbWFnZS5pZCkpIGJyZWFrXG5cbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX0FERF9JTUFHRV9UT19RVUVVRScgfSlcblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9BRERfSU1BR0VfVE9fUVVFVUUnOiB7XG4gICAgICBib2R5Lmluc2VydEJlZm9yZShTYXZlSWNvbihwcm9wcyksIGhlYWRlcilcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNhdmVJY29uTm9kZSA9IGJvZHkucXVlcnlTZWxlY3RvcignI3NhdmUnKVxuICAgICAgICBzYXZlSWNvbk5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzYXZlSWNvbk5vZGUpXG4gICAgICB9LCAzMDApXG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fRkVUQ0hfSU1BR0VTJzoge1xuICAgICAgY29uc3QgeG1sID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhtbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdPTl9GRVRDSF9JTUFHRVNfU1VDQ0VTUycsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIGltYWdlczogSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgeG1sLm9wZW4oJ0dFVCcsIHVybChzdGF0ZS5jdXJyZW50UGFnZSwgc3RhdGUuc2VhcmNoVmFsdWUpKTtcbiAgICAgIHhtbC5zZW5kKCk7XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnT05fRkVUQ0hfSU1BR0VTX1NVQ0NFU1MnOiB7XG4gICAgICBjb25zdCBzZWFyY2hCb3hIZWFkZXJJbnB1dE5vZGUgPSBzZWFyY2hCb3hIZWFkZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcbiAgICAgIGlmIChleGlzdHMoc2VhcmNoQm94SGVhZGVySW5wdXROb2RlKSkge1xuICAgICAgICBzZWFyY2hCb3hIZWFkZXJJbnB1dE5vZGUuYmx1cigpXG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0tFWV9VUF9TUEFDRV9CQVInXG4gICAgfSlcbiAgfVxuXG4gIGlmIChlLmtleUNvZGUgPT09IDgzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0tFWV9VUF9TJ1xuICAgIH0pXG4gIH1cbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBEb3dubG9hZHMgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHtcbiAgICBkaXNwYXRjaCxcbiAgICBpbWFnZXNRdWV1ZSxcbiAgICBzZWFyY2hWYWx1ZSxcbiAgfSA9IHByb3BzXG5cbiAgLy8gRXZlbnRzXG4gIGNvbnN0IGNsZWFyT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgYnV0dG9uT25DbGljayA9ICgpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdPTl9ET1dOTE9BRF9BTExfRE9XTkxPQURTJyB9KVxuICB9XG5cbiAgY29uc3QgcmVtb3ZlT25DbGljayA9IGUgPT4ge1xuICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7aWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWR9fSlcbiAgfVxuXG4gIGNvbnN0IGRvd25sb2FkT25DbGljayA9IGUgPT4ge1xuICAgIGRpc3BhdGNoKHt0eXBlOiAnT05fRE9XTkxPQURfSU1BR0VfRlJPTV9RVUVVRScsIHBheWxvYWQ6IHtpZDogZS50YXJnZXQucGFyZW50Tm9kZS5pZH19KVxuICB9XG5cbiAgLy8gRE9NXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3RpdGxlJyB9LCAnTXkgQ29sbGVjdGlvbicpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInLCBvbkNsaWNrOiBjbGVhck9uQ2xpY2sgfSwgJ0NsZWFyIGFsbCcpKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhcnJvdycgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSxcbiAgICAgICAgICBOb2RlKCd1bCcsIG51bGwsXG4gICAgICAgICAgICAuLi5pbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlLnVybHMudGh1bWJ9JylgIH0sXG4gICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2FjdGlvbnMnLCBpZDogaSB9LFxuICAgICAgICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScsIG9uQ2xpY2s6IHJlbW92ZU9uQ2xpY2sgfSksXG4gICAgICAgICAgICAgICAgICBOb2RlKCdhJywgeyBjbGFzczogJ2Rvd25sb2FkJywgZG93bmxvYWQ6IGAke3NlYXJjaFZhbHVlfV8ke2ltYWdlLmlkfWAsIGhyZWY6IGltYWdlLmxpbmtzLmRvd25sb2FkLCBvbkNsaWNrOiBkb3dubG9hZE9uQ2xpY2sgfSxcbiAgICAgICAgICAgICAgICAgICAgTm9kZSgnaW1nJywgeyBzdHlsZTogJ2Rpc3BsYXk6bm9uZTsnLCBzcmM6IGltYWdlLmxpbmtzLmRvd25sb2FkICB9KSkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpKSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZm9vdGVyJyB9LFxuICAgICAgICBOb2RlKCdidXR0b24nLCB7IG9uQ2xpY2s6IGJ1dHRvbk9uQ2xpY2sgfSwgJ0Rvd25sb2FkIHNlbGVjdGlvbicpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2Fkc1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgRnVsbCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZnVsbCcgfSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGdWxsXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBPbkJvYXJkaW5nID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdvbi1ib2FyZGluZycgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpbWFnZScgfSksXG4gICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2FwdGlvbicgfSwgJ1ByZXNzIHNwYWNlYmFyIHRvIGdlbmVyYXRlIGEgcGhvdG8nKSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sXG4gICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdza2lwJyB9LCAnU2tpcCcpLFxuICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnbmF2JyB9LFxuICAgICAgICAgIE5vZGUoJ3VsJywgbnVsbCxcbiAgICAgICAgICAgIE5vZGUoJ2xpJyksIE5vZGUoJ2xpJyksIE5vZGUoJ2xpJykpKSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ25leHQnIH0sICdOZXh0JykpKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9uQm9hcmRpbmdcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9oZWxwZXJzL05vZGUnXG5cbmNvbnN0IFNhdmVJY29uID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIE5vZGUoJ2RpdicsIHsgaWQ6ICdzYXZlJyB9LFxuICAgICAgTm9kZSgnaScsIHsgY2xhc3M6ICdpY29uJyB9KVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYXZlSWNvblxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL2hlbHBlcnMvTm9kZSdcblxuY29uc3QgU2VhcmNoQm94SGVhZGVyID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRpc3BhdGNoLCBzZWFyY2hWYWx1ZSB9ID0gcHJvcHNcblxuICBjb25zdCBvblNlYXJjaEJveEZvY3VzID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0hFQURFUl9TRUFSQ0hfQk9YX0ZPQ1VTJyB9KVxuICB9XG5cbiAgY29uc3Qgb25TZWFyY2hCb3hCbHVyID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ09OX0hFQURFUl9TRUFSQ0hfQk9YX0JMVVInIH0pXG4gIH1cblxuICBjb25zdCBvbktleXVwSW5wdXQgPSBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaCcgfSxcbiAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdzZWFyY2gtYm94JyB9LFxuICAgICAgICBOb2RlKCdpJywgeyBjbGFzczogJ2ljb24nIH0pLFxuICAgICAgICBOb2RlKCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogc2VhcmNoVmFsdWUsIG9uS2V5VXA6IG9uS2V5dXBJbnB1dCwgb25Gb2N1czogb25TZWFyY2hCb3hGb2N1cywgb25CbHVyOiBvblNlYXJjaEJveEJsdXIgfSlcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94SGVhZGVyXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9Ob2RlJ1xuXG5jb25zdCBTZWFyY2hCb3hNYWluID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRpc3BhdGNoIH0gPSBwcm9wc1xuXG4gIGNvbnN0IG9uS2V5dXBJbnB1dCA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICBOb2RlKCdkaXYnLCB7IGlkOiAnc2VhcmNoJyB9LFxuICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3NlYXJjaC1ib3gnLCBvbktleVVwOiBvbktleXVwSW5wdXQgfSxcbiAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ2ljb24nIH0pLFxuICAgICAgICBOb2RlKCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogJ1NlYXJjaCBwaG90b3MnLCBhdXRvZm9jdXM6IHRydWUgfSkpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEJveE1haW5cbiIsImV4cG9ydCBjb25zdCBjbGllbnRJZCA9ICc2MzIyZTA3ZGUwZTE1NWJhMGQ5ZWNhOGQ2N2NmMjdiYjliNDU0MTdmMmZlYjFhMjM0YmFhMzYzYTFkZGEzZGJlJ1xuZXhwb3J0IGNvbnN0IHVybCA9IChwYWdlLCBxdWVyeSkgPT4gYGh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9zZWFyY2gvcGhvdG9zP2NsaWVudF9pZD0ke2NsaWVudElkfSZwYWdlPSR7cGFnZX0mcXVlcnk9JHtxdWVyeX1gXG4iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi4vYXBwJ1xuXG5jb25zdCBFVkVOVFMgPSB7XG4gIG9uQ2xpY2s6ICdjbGljaycsXG4gIG9uS2V5VXA6ICdrZXl1cCcsXG4gIG9uTG9hZDogJ2xvYWQnLFxuICBvbkZvY3VzOiAnZm9jdXMnLFxuICBvbkJsdXI6ICdibHVyJ1xufVxuXG5leHBvcnQgY29uc3QgTm9kZSA9IChlbGVtLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgbGV0IG5vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoZWxlbSlcblxuICBpZiAoYXR0cnMgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKEVWRU5UU1trZXldLCBhdHRyc1trZXldKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBjaGlsZFxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuIiwiZXhwb3J0IGNvbnN0IGV4aXN0cyA9IG5vZGUgPT4gbm9kZSAhPSBudWxsXG5cbmNvbnN0IGltYWdlTG9hZGVyID0gc3JjID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKClcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVzb2x2ZShzcmMpXG4gICAgfVxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG4gICAgaW1nLnNyYyA9IHNyY1xuICB9KVxufVxuXG4vKipcbiAqIFRha2VzIGEgbGlzdCBvZiBpbWFnZXMgdXJscyBhbmQgcmV0dXJucyBhIGxpc3RcbiAqIG9mIHByb21pc2VzIG9mIGltYWdlcyBsb2FkaW5nXG4gKiBAcGFyYW0gaW1hZ2VzXG4gKi9cbmV4cG9ydCBjb25zdCBwcmVDYWNoZWRJbWFnZXMgPSBpbWFnZXMgPT4gaW1hZ2VzXG4gIC5tYXAoaW1hZ2UgPT4gaW1hZ2VMb2FkZXIoaW1hZ2UpKVxuXG5leHBvcnQgY29uc3QgYmFzZTY0RW5jb2RlID0gaW5wdXRTdHIgPT4ge1xuICB2YXIgYjY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiXG4gIHZhciBvdXRwdXRTdHIgPSBcIlwiXG4gIHZhciBpID0gMFxuXG4gIHdoaWxlIChpIDwgaW5wdXRTdHIubGVuZ3RoKVxuICB7XG4gICAgLy9hbGwgdGhyZWUgXCImIDB4ZmZcIiBhZGRlZCBiZWxvdyBhcmUgdGhlcmUgdG8gZml4IGEga25vd24gYnVnIFxuICAgIC8vd2l0aCBieXRlcyByZXR1cm5lZCBieSB4aHIucmVzcG9uc2VUZXh0XG4gICAgdmFyIGJ5dGUxID0gaW5wdXRTdHIuY2hhckNvZGVBdChpKyspICYgMHhmZlxuICAgIHZhciBieXRlMiA9IGlucHV0U3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmZcbiAgICB2YXIgYnl0ZTMgPSBpbnB1dFN0ci5jaGFyQ29kZUF0KGkrKykgJiAweGZmXG5cbiAgICB2YXIgZW5jMSA9IGJ5dGUxID4+IDJcbiAgICB2YXIgZW5jMiA9ICgoYnl0ZTEgJiAzKSA8PCA0KSB8IChieXRlMiA+PiA0KVxuXG4gICAgdmFyIGVuYzMsIGVuYzRcbiAgICBpZiAoaXNOYU4oYnl0ZTIpKVxuICAgIHtcbiAgICAgIGVuYzMgPSBlbmM0ID0gNjRcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGVuYzMgPSAoKGJ5dGUyICYgMTUpIDw8IDIpIHwgKGJ5dGUzID4+IDYpXG4gICAgICBpZiAoaXNOYU4oYnl0ZTMpKVxuICAgICAge1xuICAgICAgICBlbmM0ID0gNjRcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcbiAgICAgICAgZW5jNCA9IGJ5dGUzICYgNjNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvdXRwdXRTdHIgKz0gYjY0LmNoYXJBdChlbmMxKSArIGI2NC5jaGFyQXQoZW5jMikgKyBiNjQuY2hhckF0KGVuYzMpICsgYjY0LmNoYXJBdChlbmM0KVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFN0clxufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi9oZWxwZXJzL3N0b3JlJ1xuaW1wb3J0IHsgcHJlQ2FjaGVkSW1hZ2VzIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG4vLyBtb2RlbFxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAvLyByb3V0aW5nXG4gIHJvdXRlczoge1xuICAgIHBhdGg6ICcvJ1xuICB9LFxuXG4gIC8vIHVpXG4gIHNlYXJjaFZhbHVlOiAnJyxcbiAgZGlzcGxheURvd25sb2FkczogZmFsc2UsXG4gIGlzTmF2aWdhdGluZzogZmFsc2UsXG4gIGltYWdlc1F1ZXVlOiBbXSxcbiAgY3VycmVudEltYWdlOiBudWxsLFxuICBjdXJyZW50SW1hZ2VJZDogMCxcblxuICAvLyBhc3luY1xuICBpbWFnZXNMaXN0OiBbXSxcbiAgcHJlQ2FjaGVkSW1hZ2VzOiBbXSxcbiAgY3VycmVudFBhZ2U6IG51bGwsXG4gIHRvdGFsUGFnZXM6IG51bGwsXG4gIHRvdGFsSW1hZ2VzOiBudWxsXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwYXRoOiAnL3NlYXJjaCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0hFQURFUl9TRUFSQ0hfQk9YX0ZPQ1VTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGlzTmF2aWdhdGluZzogZmFsc2UsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fSEVBREVSX1NFQVJDSF9CT1hfQkxVUic6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc05hdmlnYXRpbmc6IHRydWUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fVE9HR0xFX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkaXNwbGF5RG93bmxvYWRzOiAhc3RhdGUuZGlzcGxheURvd25sb2FkcyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBbXSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9BRERfSU1BR0VfVE9fUVVFVUUnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNRdWV1ZSxcbiAgICAgICAgICBzdGF0ZS5jdXJyZW50SW1hZ2VcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZVxuICAgICAgICAuZmlsdGVyKChpbWFnZSwgaSkgPT4gaSAhPT0gTnVtYmVyKGFjdGlvbi5wYXlsb2FkLmlkKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9FTkRfT0ZfTElTVCc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50SW1hZ2VJZDogMFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0ZFVENIX0lNQUdFUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50UGFnZTogYWN0aW9uLnBheWxvYWQuY3VycmVudFBhZ2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9GRVRDSF9JTUFHRVNfU1VDQ0VTUyc6IHtcbiAgICAgIGNvbnN0IGlzTmV3UmVxdWVzdCA9IHN0YXRlLmN1cnJlbnRQYWdlID09PSAxXG5cbiAgICAgIGNvbnN0IGN1cnJlbnRJbWFnZUlkID0gaXNOZXdSZXF1ZXN0XG4gICAgICAgID8gMFxuICAgICAgICA6IHN0YXRlLmN1cnJlbnRJbWFnZUlkXG5cbiAgICAgIGNvbnN0IGltYWdlc0xpc3QgPSBpc05ld1JlcXVlc3RcbiAgICAgICAgPyBhY3Rpb24ucGF5bG9hZC5pbWFnZXMucmVzdWx0c1xuICAgICAgICA6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNMaXN0LFxuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLmltYWdlcy5yZXN1bHRzXG4gICAgICAgIF1cblxuICAgICAgLy8gcHJlLWNhY2hlIGltYWdlc1xuICAgICAgY29uc3QgaW1hZ2VzRnJvbUxpc3QgPSBpbWFnZXNMaXN0Lm1hcChpdGVtID0+IGl0ZW0udXJscy50aHVtYilcbiAgICAgIGNvbnN0IHByZUNhY2hlSW1hZ2VzID0gcHJlQ2FjaGVkSW1hZ2VzKGltYWdlc0Zyb21MaXN0KVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzTGlzdCxcbiAgICAgICAgY3VycmVudEltYWdlSWQsXG4gICAgICAgIGN1cnJlbnRJbWFnZToge1xuICAgICAgICAgIC4uLmltYWdlc0xpc3RbY3VycmVudEltYWdlSWRdLFxuICAgICAgICAgIHNyYzogcHJlQ2FjaGVJbWFnZXNbY3VycmVudEltYWdlSWRdXG4gICAgICAgIH0sXG4gICAgICAgIHByZUNhY2hlSW1hZ2VzLFxuICAgICAgICBpc05hdmlnYXRpbmc6IHRydWUsXG4gICAgICAgIHRvdGFsUGFnZXM6IGFjdGlvbi5wYXlsb2FkLmltYWdlcy50b3RhbF9wYWdlcyxcbiAgICAgICAgdG90YWxJbWFnZXM6IGFjdGlvbi5wYXlsb2FkLmltYWdlcy50b3RhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0xPQURfTkVYVF9JTUFHRSc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW50SW1hZ2U6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5pbWFnZXNMaXN0W3N0YXRlLmN1cnJlbnRJbWFnZUlkICsgMV0sXG4gICAgICAgICAgc3JjOiBzdGF0ZS5wcmVDYWNoZUltYWdlc1tzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDFdXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRJbWFnZUlkOiBzdGF0ZS5jdXJyZW50SW1hZ2VJZCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcbiJdfQ==
