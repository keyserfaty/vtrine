(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Node = require('./helpers/Node');

var _store = require('./helpers/store');

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
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN':
      {
        console.log('should redirect');
        break;
      }

    case 'ON_TOGGLE_DOWNLOADS':
      {
        // Nodes creation
        var arrow = (0, _Node.Node)('div', { class: 'arrow' });

        var ul = (0, _Node.Node)('ul', null);
        var content = (0, _Node.Node)('div', { class: 'content' }, ul);
        var images = (0, _Node.Node)('div', { class: 'images' }, content);

        var button = (0, _Node.Node)('button', null, 'Download selection');
        var footer = (0, _Node.Node)('div', { class: 'footer' }, button);

        var clear = (0, _Node.Node)('div', { class: 'clear' }, 'Clear all');
        var title = (0, _Node.Node)('div', { class: 'title' }, 'My Collection');

        var _header = (0, _Node.Node)('div', { class: 'header' }, title, clear);
        var downloadsComponent = (0, _Node.Node)('div', { id: 'download' }, _header, arrow, images, footer

        // DOM changes
        );var displayDownloads = state.displayDownloads;

        if (displayDownloads) {
          body.appendChild(downloadsComponent);
          store.dispatch({ type: '_RENDER_IMAGES_QUEUE' });

          clear.addEventListener('click', function () {
            store.dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' });
          });

          button.addEventListener('click', function () {
            store.dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' });
          });

          ul.addEventListener('click', function (e) {
            if (e.target.parentNode.id.length) {
              if (e.target.attributes[0].nodeValue === 'remove') {
                store.dispatch({ type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
              }

              if (e.target.attributes[0].nodeValue === 'download') {
                store.dispatch({ type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } });
              }
            }
          });
        } else {
          var downloadPreviousNode = d.querySelector('#download');
          body.removeChild(downloadPreviousNode);
        }

        break;
      }

    case 'ON_CLEAR_ALL_DOWNLOADS':
      {
        var _content = body.querySelector('#download .content');
        var _ul = _content.querySelector('ul');

        if (_ul != null) {
          _content.removeChild(_ul);
        }

        break;
      }

    /*
    Optimizations in order:
    1) Detect when component is attached to a state change and only then
    re-render on state change. The rest of the elements should remain intact
    2) Detect which elements in a list of elements have changed (for example:
    in this case I shouldn't need to re-render all `li` elements, I should only
    remove the removed ones or change the changed ones. Could use a hash table for that?
     */
    case '_RENDER_IMAGES_QUEUE':
    case 'ON_REMOVE_IMAGE_FROM_QUEUE':
      {
        // Clean DOM
        var _ul2 = body.querySelector('#download .content ul');
        var liListPrevious = _ul2.querySelectorAll('li');

        if (liListPrevious != null) {
          liListPrevious.forEach(function (li) {
            return _ul2.removeChild(li);
          });
        }

        // Build DOM
        var imagesQueue = state.imagesQueue;
        var liList = imagesQueue.map(function (image, i) {
          return (0, _Node.Node)('li', { class: 'image', style: 'background: url(\'' + image + '\')' }, (0, _Node.Node)('div', { class: 'actions', id: i }, (0, _Node.Node)('div', { class: 'remove' }), (0, _Node.Node)('div', { class: 'download' })));
        });

        liList.forEach(function (li) {
          return _ul2.appendChild(li);
        });

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

},{"./helpers/Node":2,"./helpers/store":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeSerializer = exports.Node = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _app = require('../app');

var Node = exports.Node = function Node(elem, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var node = _app.d.createElement(elem);

  if (attrs != null) {
    Object.keys(attrs).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
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

// TODO: won't work with same child props. Works only the first time
var NodeSerializer = exports.NodeSerializer = function NodeSerializer(qty) {
  for (var _len2 = arguments.length, node = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    node[_key2 - 1] = arguments[_key2];
  }

  var list = [];
  for (var i = 0; i < qty; i++) {
    list.push(Node.apply(undefined, node));
  }

  return list;
};

},{"../app":1}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2hlbHBlcnMvTm9kZS5qcyIsInNyYy9oZWxwZXJzL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7O0FBRU8sSUFBTSxnQkFBSSxRQUFWOztBQUVQO0FBQ0EsSUFBTSxlQUFlO0FBQ25CLGVBQWEsRUFETTtBQUVuQixvQkFBa0IsS0FGQztBQUduQixlQUFhLENBQUMsd0JBQUQsRUFBMkIsd0JBQTNCO0FBSE0sQ0FBckI7O0FBTUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFrQztBQUFBLE1BQWpDLEtBQWlDLHVFQUF6QixZQUF5QjtBQUFBLE1BQVgsTUFBVzs7QUFDaEQsVUFBUSxPQUFPLElBQWY7QUFDRSxTQUFLLHlCQUFMO0FBQWdDO0FBQzlCLDRCQUNLLEtBREw7QUFFRSx1QkFBYSxPQUFPLE9BQVAsQ0FBZTtBQUY5QjtBQUlEOztBQUVELFNBQUsscUJBQUw7QUFBNEI7QUFDMUIsNEJBQ0ssS0FETDtBQUVFLDRCQUFrQixDQUFDLE1BQU07QUFGM0I7QUFJRDs7QUFFRCxTQUFLLHdCQUFMO0FBQStCO0FBQzdCLDRCQUNLLEtBREw7QUFFRSx1QkFBYTtBQUZmO0FBSUQ7O0FBRUQsU0FBSyw0QkFBTDtBQUFtQztBQUNqQyw0QkFDSyxLQURMO0FBRUUsdUJBQWEsTUFBTSxXQUFOLENBQWtCLE1BQWxCLENBQXlCLFVBQUMsS0FBRCxFQUFRLENBQVI7QUFBQSxtQkFBYyxNQUFNLE9BQU8sT0FBTyxPQUFQLENBQWUsRUFBdEIsQ0FBcEI7QUFBQSxXQUF6QjtBQUZmO0FBSUQ7O0FBRUQ7QUFDRSxhQUFPLEtBQVA7QUE5Qko7QUFnQ0QsQ0FqQ0Q7O0FBbUNBLElBQU0sUUFBUSx3QkFBWTs7QUFFMUI7QUFGYyxDQUFkLENBR0EsSUFBTSxjQUFjLEVBQUUsYUFBRixDQUFnQixPQUFoQixDQUFwQjtBQUNBLElB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QWlCLEtBQWpCO0FBQ0Q7QUFDRixLQVJEO0FBU0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0F0Qk07O0FBd0JQO0FBQ08sSUFBTSwwQ0FBaUIsU0FBakIsY0FBaUIsQ0FBQyxHQUFELEVBQWtCO0FBQUEscUNBQVQsSUFBUztBQUFULFFBQVM7QUFBQTs7QUFDOUMsTUFBSSxPQUFPLEVBQVg7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksR0FBcEIsRUFBeUIsR0FBekIsRUFBOEI7QUFDNUIsU0FBSyxJQUFMLENBQVUsc0JBQVEsSUFBUixDQUFWO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0FQTTs7Ozs7Ozs7QUMzQkEsSUFBTSxvQ0FBYyxTQUFTLGFBQVQsQ0FBd0IsT0FBeEIsRUFBaUM7QUFDMUQsTUFBSSxRQUFRLFNBQVo7QUFDQSxNQUFJLGNBQWMsRUFBbEI7O0FBRUEsU0FBTztBQUNMLGNBQVUsa0JBQVUsTUFBVixFQUFrQjtBQUMxQixjQUFRLFFBQVEsS0FBUixFQUFlLE1BQWYsQ0FBUjtBQUNBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBcEI7QUFDQSxrQkFBWSxPQUFaLENBQW9CLFVBQVUsTUFBVixFQUFrQjtBQUNwQyxlQUFPLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBUDtBQUNELE9BRkQ7QUFHRCxLQVBJO0FBUUwsY0FBVSxvQkFBWTtBQUNwQixhQUFPLEtBQVA7QUFDRCxLQVZJO0FBV0wsZUFBVyxtQkFBVSxPQUFWLEVBQW1CO0FBQzVCLGtCQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDRDtBQWJJLEdBQVA7QUFlRCxDQW5CTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9oZWxwZXJzL05vZGUnXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vaGVscGVycy9zdG9yZSdcblxuZXhwb3J0IGNvbnN0IGQgPSBkb2N1bWVudFxuXG4vLyBtb2RlbFxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZS5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5cbi8vIHZpZXdcbmNvbnN0IHNlYXJjaElucHV0ID0gZC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaG91bGQgcmVkaXJlY3QnKVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgLy8gTm9kZXMgY3JlYXRpb25cbiAgICAgIGNvbnN0IGFycm93ID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KVxuXG4gICAgICBjb25zdCB1bCA9IE5vZGUoJ3VsJywgbnVsbClcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSwgdWwpXG4gICAgICBjb25zdCBpbWFnZXMgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LCBjb250ZW50KVxuXG4gICAgICBjb25zdCBidXR0b24gPSBOb2RlKCdidXR0b24nLCBudWxsLCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIGNvbnN0IGZvb3RlciA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sIGJ1dHRvbilcblxuICAgICAgY29uc3QgY2xlYXIgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInIH0sICdDbGVhciBhbGwnKVxuICAgICAgY29uc3QgdGl0bGUgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJylcblxuICAgICAgY29uc3QgaGVhZGVyID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSwgdGl0bGUsIGNsZWFyKVxuICAgICAgY29uc3QgZG93bmxvYWRzQ29tcG9uZW50ID0gTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LCBoZWFkZXIsIGFycm93LCBpbWFnZXMsIGZvb3RlcilcblxuICAgICAgLy8gRE9NIGNoYW5nZXNcbiAgICAgIGNvbnN0IGRpc3BsYXlEb3dubG9hZHMgPSBzdGF0ZS5kaXNwbGF5RG93bmxvYWRzXG5cbiAgICAgIGlmIChkaXNwbGF5RG93bmxvYWRzKSB7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRzQ29tcG9uZW50KVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdfUkVOREVSX0lNQUdFU19RVUVVRScgfSlcblxuICAgICAgICBjbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJyB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9ET1dOTE9BRF9BTExfRE9XTkxPQURTJyB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7IGlkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkIH0gfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7IGlkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkIH0gfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICAgIH1cblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJzoge1xuICAgICAgY29uc3QgY29udGVudCA9IGJvZHkucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkIC5jb250ZW50JylcbiAgICAgIGNvbnN0IHVsID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgIGlmICh1bCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQodWwpXG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgLypcbiAgICBPcHRpbWl6YXRpb25zIGluIG9yZGVyOlxuICAgIDEpIERldGVjdCB3aGVuIGNvbXBvbmVudCBpcyBhdHRhY2hlZCB0byBhIHN0YXRlIGNoYW5nZSBhbmQgb25seSB0aGVuXG4gICAgcmUtcmVuZGVyIG9uIHN0YXRlIGNoYW5nZS4gVGhlIHJlc3Qgb2YgdGhlIGVsZW1lbnRzIHNob3VsZCByZW1haW4gaW50YWN0XG4gICAgMikgRGV0ZWN0IHdoaWNoIGVsZW1lbnRzIGluIGEgbGlzdCBvZiBlbGVtZW50cyBoYXZlIGNoYW5nZWQgKGZvciBleGFtcGxlOlxuICAgIGluIHRoaXMgY2FzZSBJIHNob3VsZG4ndCBuZWVkIHRvIHJlLXJlbmRlciBhbGwgYGxpYCBlbGVtZW50cywgSSBzaG91bGQgb25seVxuICAgIHJlbW92ZSB0aGUgcmVtb3ZlZCBvbmVzIG9yIGNoYW5nZSB0aGUgY2hhbmdlZCBvbmVzLiBDb3VsZCB1c2UgYSBoYXNoIHRhYmxlIGZvciB0aGF0P1xuICAgICAqL1xuICAgIGNhc2UgJ19SRU5ERVJfSU1BR0VTX1FVRVVFJzpcbiAgICBjYXNlICdPTl9SRU1PVkVfSU1BR0VfRlJPTV9RVUVVRSc6IHtcbiAgICAgIC8vIENsZWFuIERPTVxuICAgICAgY29uc3QgdWwgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCAuY29udGVudCB1bCcpXG4gICAgICBjb25zdCBsaUxpc3RQcmV2aW91cyA9IHVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcblxuICAgICAgaWYgKGxpTGlzdFByZXZpb3VzICE9IG51bGwpIHtcbiAgICAgICAgbGlMaXN0UHJldmlvdXMuZm9yRWFjaChsaSA9PiB1bC5yZW1vdmVDaGlsZChsaSkpXG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIERPTVxuICAgICAgY29uc3QgaW1hZ2VzUXVldWUgPSBzdGF0ZS5pbWFnZXNRdWV1ZVxuICAgICAgY29uc3QgbGlMaXN0ID0gaW1hZ2VzUXVldWUubWFwKChpbWFnZSwgaSkgPT5cbiAgICAgICAgTm9kZSgnbGknLCB7IGNsYXNzOiAnaW1hZ2UnLCBzdHlsZTogYGJhY2tncm91bmQ6IHVybCgnJHtpbWFnZX0nKWAgfSxcbiAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYWN0aW9ucycsIGlkOiBpIH0sXG4gICAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAncmVtb3ZlJyB9KSwgTm9kZSgnZGl2JywgeyBjbGFzczogJ2Rvd25sb2FkJyB9KSkpXG4gICAgICApXG5cbiAgICAgIGxpTGlzdC5mb3JFYWNoKGxpID0+IHVsLmFwcGVuZENoaWxkKGxpKSlcblxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSlcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSkiLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi4vYXBwJ1xuXG5leHBvcnQgY29uc3QgTm9kZSA9IChlbGVtLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgbGV0IG5vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoZWxlbSlcblxuICBpZiAoYXR0cnMgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG5cbi8vIFRPRE86IHdvbid0IHdvcmsgd2l0aCBzYW1lIGNoaWxkIHByb3BzLiBXb3JrcyBvbmx5IHRoZSBmaXJzdCB0aW1lXG5leHBvcnQgY29uc3QgTm9kZVNlcmlhbGl6ZXIgPSAocXR5LCAuLi5ub2RlKSA9PiB7XG4gIGxldCBsaXN0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdHk7IGkrKykge1xuICAgIGxpc3QucHVzaChOb2RlKC4uLm5vZGUpKVxuICB9XG5cbiAgcmV0dXJuIGxpc3Rcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlRm4gKHJlZHVjZXIpIHtcbiAgbGV0IHN0YXRlID0gdW5kZWZpbmVkXG4gIGxldCBzdWJzY3JpYmVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHN0YXRlKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG4iXX0=
