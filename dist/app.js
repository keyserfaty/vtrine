(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var d = document;

var createStore = function createStoreFn(reducer) {
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

var Node = function Node(elem, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var node = d.createElement(elem);

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
var NodeSerializer = function NodeSerializer(qty) {
  for (var _len2 = arguments.length, node = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    node[_key2 - 1] = arguments[_key2];
  }

  var list = [];
  for (var i = 0; i < qty; i++) {
    list.push(Node.apply(undefined, node));
  }

  return list;
};

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

    default:
      return state;
  }
};

var store = createStore(reducer

// view
);var searchInput = d.querySelector('input');
var body = d.querySelector('body');
var header = d.querySelector('header');
var folder = header.querySelector('.downloads');

store.subscribe(function (state, action) {
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN':
      {
        console.log('holi');
        break;
      }

    case 'ON_TOGGLE_DOWNLOADS':
      {
        // Nodes creation
        var arrow = Node('div', { class: 'arrow' });

        var imagesQueue = state.imagesQueue;
        var liList = imagesQueue.map(function (image) {
          return Node('li', { class: 'image', style: 'background: url(\'' + image + '\')' }, Node('div', { class: 'actions' }, Node('div', { class: 'remove' }), Node('div', { class: 'download' })));
        });

        var ul = Node.apply(undefined, ['ul', null].concat(_toConsumableArray(liList)));
        var content = Node('div', { class: 'content' }, ul);
        var images = Node('div', { class: 'images' }, content);

        var button = Node('button', null, 'Download selection');
        var footer = Node('div', { class: 'footer' }, button);

        var clear = Node('div', { class: 'clear' }, 'Clear all');
        var title = Node('div', { class: 'title' }, 'My Collection');

        var _header = Node('div', { class: 'header' }, title, clear);
        var downloadsComponent = Node('div', { id: 'download' }, _header, arrow, images, footer

        // DOM changes
        );var displayDownloads = state.displayDownloads;

        if (displayDownloads) {
          body.appendChild(downloadsComponent);
        } else {
          var downloadPreviousNode = d.querySelector('#download');
          body.removeChild(downloadPreviousNode);
        }

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxJQUFNLElBQUksUUFBVjs7QUFFQSxJQUFNLGNBQWMsU0FBUyxhQUFULENBQXdCLE9BQXhCLEVBQWlDO0FBQ25ELE1BQUksUUFBUSxTQUFaO0FBQ0EsTUFBSSxjQUFjLEVBQWxCOztBQUVBLFNBQU87QUFDTCxjQUFVLGtCQUFVLE1BQVYsRUFBa0I7QUFDMUIsY0FBUSxRQUFRLEtBQVIsRUFBZSxNQUFmLENBQVI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO0FBQ0Esa0JBQVksT0FBWixDQUFvQixVQUFVLE1BQVYsRUFBa0I7QUFDcEMsZUFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQVA7QUFDRCxPQUZEO0FBR0QsS0FQSTtBQVFMLGNBQVUsb0JBQVk7QUFDcEIsYUFBTyxLQUFQO0FBQ0QsS0FWSTtBQVdMLGVBQVcsbUJBQVUsT0FBVixFQUFtQjtBQUM1QixrQkFBWSxJQUFaLENBQWlCLE9BQWpCO0FBQ0Q7QUFiSSxHQUFQO0FBZUQsQ0FuQkQ7O0FBcUJBLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUE4QjtBQUFBLG9DQUFiLFFBQWE7QUFBYixZQUFhO0FBQUE7O0FBQ3pDLE1BQUksT0FBTyxFQUFFLGFBQUYsQ0FBZ0IsSUFBaEIsQ0FBWDs7QUFFQSxNQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixXQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLGVBQU87QUFDaEMsV0FBSyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLE1BQU0sR0FBTixDQUF2QjtBQUNELEtBRkQ7QUFHRDs7QUFFRCxNQUFJLFNBQVMsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUN2QixhQUFTLE9BQVQsQ0FBaUIsaUJBQVM7QUFDeEIsVUFBSSxPQUFP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QUFNLHFCQUFSLEVBQWY7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGQgPSBkb2N1bWVudFxuXG5jb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlRm4gKHJlZHVjZXIpIHtcbiAgbGV0IHN0YXRlID0gdW5kZWZpbmVkXG4gIGxldCBzdWJzY3JpYmVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHN0YXRlKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IE5vZGUgPSAoZWxlbSwgYXR0cnMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gIGxldCBub2RlID0gZC5jcmVhdGVFbGVtZW50KGVsZW0pXG5cbiAgaWYgKGF0dHJzICE9IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKVxuICAgIH0pXG4gIH1cblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBjaGlsZFxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vLyBUT0RPOiB3b24ndCB3b3JrIHdpdGggc2FtZSBjaGlsZCBwcm9wcy4gV29ya3Mgb25seSB0aGUgZmlyc3QgdGltZVxuY29uc3QgTm9kZVNlcmlhbGl6ZXIgPSAocXR5LCAuLi5ub2RlKSA9PiB7XG4gIGxldCBsaXN0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdHk7IGkrKykge1xuICAgIGxpc3QucHVzaChOb2RlKC4uLm5vZGUpKVxuICB9XG5cbiAgcmV0dXJuIGxpc3Rcbn1cblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc2VhcmNoVmFsdWU6ICcnLFxuICBkaXNwbGF5RG93bmxvYWRzOiBmYWxzZSxcbiAgaW1hZ2VzUXVldWU6IFsnLi9zdGF0aWNzL2ltYWdlcy8xLmpwZycsICcuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJ11cbn1cblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzZWFyY2hWYWx1ZTogYWN0aW9uLnBheWxvYWQuc2VhcmNoVmFsdWUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FzZSAnT05fVE9HR0xFX0RPV05MT0FEUyc6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkaXNwbGF5RG93bmxvYWRzOiAhc3RhdGUuZGlzcGxheURvd25sb2FkcyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKVxuXG4vLyB2aWV3XG5jb25zdCBzZWFyY2hJbnB1dCA9IGQucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuY29uc3QgYm9keSA9IGQucXVlcnlTZWxlY3RvcignYm9keScpXG5jb25zdCBoZWFkZXIgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpXG5jb25zdCBmb2xkZXIgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmRvd25sb2FkcycpXG5cbnN0b3JlLnN1YnNjcmliZSgoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICBjb25zb2xlLmxvZygnaG9saScpXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICAvLyBOb2RlcyBjcmVhdGlvblxuICAgICAgY29uc3QgYXJyb3cgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYXJyb3cnIH0pXG5cbiAgICAgIGNvbnN0IGltYWdlc1F1ZXVlID0gc3RhdGUuaW1hZ2VzUXVldWVcbiAgICAgIGNvbnN0IGxpTGlzdCA9IGltYWdlc1F1ZXVlLm1hcChpbWFnZSA9PlxuICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlfScpYCB9LFxuICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhY3Rpb25zJyB9LFxuICAgICAgICAgICAgTm9kZSgnZGl2JywgeyBjbGFzczogJ3JlbW92ZScgfSksIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdkb3dubG9hZCcgfSkpKVxuICAgICAgKVxuXG4gICAgICBjb25zdCB1bCA9IE5vZGUoJ3VsJywgbnVsbCwgLi4ubGlMaXN0KVxuICAgICAgY29uc3QgY29udGVudCA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjb250ZW50JyB9LCB1bClcbiAgICAgIGNvbnN0IGltYWdlcyA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdpbWFnZXMnIH0sIGNvbnRlbnQpXG5cbiAgICAgIGNvbnN0IGJ1dHRvbiA9IE5vZGUoJ2J1dHRvbicsIG51bGwsICdEb3dubG9hZCBzZWxlY3Rpb24nKVxuICAgICAgY29uc3QgZm9vdGVyID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2Zvb3RlcicgfSwgYnV0dG9uKVxuXG4gICAgICBjb25zdCBjbGVhciA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdjbGVhcicgfSwgJ0NsZWFyIGFsbCcpXG4gICAgICBjb25zdCB0aXRsZSA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICd0aXRsZScgfSwgJ015IENvbGxlY3Rpb24nKVxuXG4gICAgICBjb25zdCBoZWFkZXIgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaGVhZGVyJyB9LCB0aXRsZSwgY2xlYXIpXG4gICAgICBjb25zdCBkb3dubG9hZHNDb21wb25lbnQgPSBOb2RlKCdkaXYnLCB7IGlkOiAnZG93bmxvYWQnIH0sIGhlYWRlciwgYXJyb3csIGltYWdlcywgZm9vdGVyKVxuXG4gICAgICAvLyBET00gY2hhbmdlc1xuICAgICAgY29uc3QgZGlzcGxheURvd25sb2FkcyA9IHN0YXRlLmRpc3BsYXlEb3dubG9hZHNcblxuICAgICAgaWYgKGRpc3BsYXlEb3dubG9hZHMpIHtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChkb3dubG9hZHNDb21wb25lbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICAgIH1cblxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSlcblxuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzZWFyY2hWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcblxuZm9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9UT0dHTEVfRE9XTkxPQURTJyB9KVxufSkiXX0=
