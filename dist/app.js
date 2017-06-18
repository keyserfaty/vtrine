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
  displayDownloads: false
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
        var arrow = Node('div', { class: 'arrow' }

        // TODO: should come from state
        );var imagesList = ['./statics/images/1.jpg', './statics/images/1.jpg'];
        var liList = imagesList.map(function (image) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxJQUFNLElBQUksUUFBVjs7QUFFQSxJQUFNLGNBQWMsU0FBUyxhQUFULENBQXdCLE9BQXhCLEVBQWlDO0FBQ25ELE1BQUksUUFBUSxTQUFaO0FBQ0EsTUFBSSxjQUFjLEVBQWxCOztBQUVBLFNBQU87QUFDTCxjQUFVLGtCQUFVLE1BQVYsRUFBa0I7QUFDMUIsY0FBUSxRQUFRLEtBQVIsRUFBZSxNQUFmLENBQVI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO0FBQ0Esa0JBQVksT0FBWixDQUFvQixVQUFVLE1BQVYsRUFBa0I7QUFDcEMsZUFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQVA7QUFDRCxPQUZEO0FBR0QsS0FQSTtBQVFMLGNBQVUsb0JBQVk7QUFDcEIsYUFBTyxLQUFQO0FBQ0QsS0FWSTtBQVdMLGVBQVcsbUJBQVUsT0FBVixFQUFtQjtBQUM1QixrQkFBWSxJQUFaLENBQWlCLE9BQWpCO0FBQ0Q7QUFiSSxHQUFQO0FBZUQsQ0FuQkQ7O0FBcUJBLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUE4QjtBQUFBLG9DQUFiLFFBQWE7QUFBYixZQUFhO0FBQUE7O0FBQ3pDLE1BQUksT0FBTyxFQUFFLGFBQUYsQ0FBZ0IsSUFBaEIsQ0FBWDs7QUFFQSxNQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixXQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLGVBQU87QUFDaEMsV0FBSyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLE1BQU0sR0FBTixDQUF2QjtBQUNELEtBRkQ7QUFHRDs7QUFFRCxNQUFJLFNBQVMsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUN2QixhQUFTLE9BQVQsQ0FBaUIsaUJBQVM7QUFDeEIsVUFBSSxPQUFP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Q0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBkID0gZG9jdW1lbnRcblxuY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coYWN0aW9uLCBzdGF0ZSlcbiAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlKHN0YXRlLCBhY3Rpb24pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBOb2RlID0gKGVsZW0sIGF0dHJzLCAuLi5jaGlsZHJlbikgPT4ge1xuICBsZXQgbm9kZSA9IGQuY3JlYXRlRWxlbWVudChlbGVtKVxuXG4gIGlmIChhdHRycyAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSlcbiAgICB9KVxuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLy8gVE9ETzogd29uJ3Qgd29yayB3aXRoIHNhbWUgY2hpbGQgcHJvcHMuIFdvcmtzIG9ubHkgdGhlIGZpcnN0IHRpbWVcbmNvbnN0IE5vZGVTZXJpYWxpemVyID0gKHF0eSwgLi4ubm9kZSkgPT4ge1xuICBsZXQgbGlzdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcXR5OyBpKyspIHtcbiAgICBsaXN0LnB1c2goTm9kZSguLi5ub2RlKSlcbiAgfVxuXG4gIHJldHVybiBsaXN0XG59XG5cbi8vIG1vZGVsXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHNlYXJjaFZhbHVlOiAnJyxcbiAgZGlzcGxheURvd25sb2FkczogZmFsc2UsXG59XG5cbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnT05fSU5QVVRfRU5URVJfS0VZX0RPV04nOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGFjdGlvbi5wYXlsb2FkLnNlYXJjaFZhbHVlLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1RPR0dMRV9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGlzcGxheURvd25sb2FkczogIXN0YXRlLmRpc3BsYXlEb3dubG9hZHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcblxuLy8gdmlld1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcbmNvbnN0IGJvZHkgPSBkLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuY29uc3QgaGVhZGVyID0gZC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKVxuY29uc3QgZm9sZGVyID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5kb3dubG9hZHMnKVxuXG5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgY29uc29sZS5sb2coJ2hvbGknKVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgLy8gTm9kZXMgY3JlYXRpb25cbiAgICAgIGNvbnN0IGFycm93ID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KVxuXG4gICAgICAvLyBUT0RPOiBzaG91bGQgY29tZSBmcm9tIHN0YXRlXG4gICAgICBjb25zdCBpbWFnZXNMaXN0ID0gWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxuICAgICAgY29uc3QgbGlMaXN0ID0gaW1hZ2VzTGlzdC5tYXAoaW1hZ2UgPT5cbiAgICAgICAgTm9kZSgnbGknLCB7IGNsYXNzOiAnaW1hZ2UnLCBzdHlsZTogYGJhY2tncm91bmQ6IHVybCgnJHtpbWFnZX0nKWAgfSxcbiAgICAgICAgICBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnYWN0aW9ucycgfSxcbiAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdyZW1vdmUnIH0pLCBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZG93bmxvYWQnIH0pKSlcbiAgICAgIClcblxuICAgICAgY29uc3QgdWwgPSBOb2RlKCd1bCcsIG51bGwsIC4uLmxpTGlzdClcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSwgdWwpXG4gICAgICBjb25zdCBpbWFnZXMgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LCBjb250ZW50KVxuXG4gICAgICBjb25zdCBidXR0b24gPSBOb2RlKCdidXR0b24nLCBudWxsLCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIGNvbnN0IGZvb3RlciA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sIGJ1dHRvbilcblxuICAgICAgY29uc3QgY2xlYXIgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInIH0sICdDbGVhciBhbGwnKVxuICAgICAgY29uc3QgdGl0bGUgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJylcblxuICAgICAgY29uc3QgaGVhZGVyID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSwgdGl0bGUsIGNsZWFyKVxuICAgICAgY29uc3QgZG93bmxvYWRzQ29tcG9uZW50ID0gTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LCBoZWFkZXIsIGFycm93LCBpbWFnZXMsIGZvb3RlcilcblxuICAgICAgLy8gRE9NIGNoYW5nZXNcbiAgICAgIGNvbnN0IGRpc3BsYXlEb3dubG9hZHMgPSBzdGF0ZS5kaXNwbGF5RG93bmxvYWRzXG5cbiAgICAgIGlmIChkaXNwbGF5RG93bmxvYWRzKSB7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRzQ29tcG9uZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZG93bmxvYWRQcmV2aW91c05vZGUgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNkb3dubG9hZCcpXG4gICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoZG93bmxvYWRQcmV2aW91c05vZGUpXG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59KVxuXG4vLyBldmVudHNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9XSU5ET1dfTE9BRCcgfSlcbn0pXG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgc2VhcmNoVmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG5cbmZvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fVE9HR0xFX0RPV05MT0FEUycgfSlcbn0pIl19
