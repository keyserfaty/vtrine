(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        console.log('should redirect');
        break;
      }

    case 'ON_TOGGLE_DOWNLOADS':
      {
        // Nodes creation
        var arrow = Node('div', { class: 'arrow' });

        var ul = Node('ul', null);
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
          return Node('li', { class: 'image', style: 'background: url(\'' + image + '\')' }, Node('div', { class: 'actions', id: i }, Node('div', { class: 'remove' }), Node('div', { class: 'download' })));
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBTSxJQUFJLFFBQVY7O0FBRUEsSUFBTSxjQUFjLFNBQVMsYUFBVCxDQUF3QixPQUF4QixFQUFpQztBQUNuRCxNQUFJLFFBQVEsU0FBWjtBQUNBLE1BQUksY0FBYyxFQUFsQjs7QUFFQSxTQUFPO0FBQ0wsY0FBVSxrQkFBVSxNQUFWLEVBQWtCO0FBQzFCLGNBQVEsUUFBUSxLQUFSLEVBQWUsTUFBZixDQUFSO0FBQ0EsY0FBUSxHQUFSLENBQVksTUFBWixFQUFvQixLQUFwQjtBQUNBLGtCQUFZLE9BQVosQ0FBb0IsVUFBVSxNQUFWLEVBQWtCO0FBQ3BDLGVBQU8sT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFQO0FBQ0QsT0FGRDtBQUdELEtBUEk7QUFRTCxjQUFVLG9CQUFZO0FBQ3BCLGFBQU8sS0FBUDtBQUNELEtBVkk7QUFXTCxlQUFXLG1CQUFVLE9BQVYsRUFBbUI7QUFDNUIsa0JBQVksSUFBWixDQUFpQixPQUFqQjtBQUNEO0FBYkksR0FBUDtBQWVELENBbkJEOztBQXFCQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBOEI7QUFBQSxvQ0FBYixRQUFhO0FBQWIsWUFBYTtBQUFBOztBQUN6QyxNQUFJLE9BQU8sRUFBRSxhQUFGLENBQWdCLElBQWhCLENBQVg7O0FBRUEsTUFBSSxTQUFTLElBQWIsRUFBbUI7QUFDakIsV0FBTyxJQUFQLENBQVksS0FBWixFQUFtQixPQUFuQixDQUEyQixlQUFPO0FBQ2hDLFdBQUssWUFBTCxDQUFrQixHQUFsQixFQUF1QixNQUFNLEdBQU4sQ0FBdkI7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsTUFBSSxTQUFTLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsYUFBUyxPQUFULENBQWlCLGlCQUFTO0FBQ3hCLFVBQUksT0FBTyxL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QUksQ0FBeEIsRUFBWixFQUNFLEtBQUssS0FBTCxFQUFZLEVBQUUsT0FBTyxRQUFULEVBQVosQ0FERixFQUNvQyxLQUFLLEtBQUwsRUFBWSxFQUFFLE9BQU8sVUFBVCxFQUFaLENBRHBDLENBREYsQ0FENkI7QUFBQSxTQUFoQixDQUFmOztBQU1BLGVBQU8sT0FBUCxDQUFlO0FBQUEsaUJBQU0sS0FBRyxXQUFILENBQWUsRUFBZixDQUFOO0FBQUEsU0FBZjs7QUFFQTtBQUNEO0FBekZIO0FBMkZEOztBQUVEO0FBOUZBLEVBK0ZBLE9BQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtBQUNwQyxRQUFNLFFBQU4sQ0FBZSxFQUFFLE1BQU0sZ0JBQVIsRUFBZjtBQUNELENBRkQ7O0FBSUEsWUFBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxhQUFLO0FBQ3pDLE1BQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsVUFBTSxRQUFOLENBQWU7QUFDYixZQUFNLHlCQURPO0FBRWIsZUFBUztBQUNQLHFCQUFhLEVBQUUsTUFBRixDQUFTO0FBRGY7QUFGSSxLQUFmO0FBTUQ7QUFDRixDQVREOztBQVdBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBTTtBQUNyQyxRQUFNLFFBQU4sQ0FBZSxFQUFFLE1BQU0scUJBQVIsRUFBZjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgZCA9IGRvY3VtZW50XG5cbmNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTm9kZSA9IChlbGVtLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgbGV0IG5vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoZWxlbSlcblxuICBpZiAoYXR0cnMgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pXG4gICAgfSlcbiAgfVxuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGNoaWxkXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG5cbi8vIFRPRE86IHdvbid0IHdvcmsgd2l0aCBzYW1lIGNoaWxkIHByb3BzLiBXb3JrcyBvbmx5IHRoZSBmaXJzdCB0aW1lXG5jb25zdCBOb2RlU2VyaWFsaXplciA9IChxdHksIC4uLm5vZGUpID0+IHtcbiAgbGV0IGxpc3QgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHF0eTsgaSsrKSB7XG4gICAgbGlzdC5wdXNoKE5vZGUoLi4ubm9kZSkpXG4gIH1cblxuICByZXR1cm4gbGlzdFxufVxuXG4vLyBtb2RlbFxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBzZWFyY2hWYWx1ZTogJycsXG4gIGRpc3BsYXlEb3dubG9hZHM6IGZhbHNlLFxuICBpbWFnZXNRdWV1ZTogWycuL3N0YXRpY3MvaW1hZ2VzLzEuanBnJywgJy4vc3RhdGljcy9pbWFnZXMvMS5qcGcnXVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX0lOUFVUX0VOVEVSX0tFWV9ET1dOJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBhY3Rpb24ucGF5bG9hZC5zZWFyY2hWYWx1ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRpc3BsYXlEb3dubG9hZHM6ICFzdGF0ZS5kaXNwbGF5RG93bmxvYWRzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX0NMRUFSX0FMTF9ET1dOTE9BRFMnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW1hZ2VzUXVldWU6IFtdLFxuICAgICAgfVxuICAgIH1cblxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGltYWdlc1F1ZXVlOiBzdGF0ZS5pbWFnZXNRdWV1ZS5maWx0ZXIoKGltYWdlLCBpKSA9PiBpICE9PSBOdW1iZXIoYWN0aW9uLnBheWxvYWQuaWQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpXG5cbi8vIHZpZXdcbmNvbnN0IHNlYXJjaElucHV0ID0gZC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG5jb25zdCBib2R5ID0gZC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IGhlYWRlciA9IGQucXVlcnlTZWxlY3RvcignaGVhZGVyJylcbmNvbnN0IGZvbGRlciA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuZG93bmxvYWRzJylcblxuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTic6IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzaG91bGQgcmVkaXJlY3QnKVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9UT0dHTEVfRE9XTkxPQURTJzoge1xuICAgICAgLy8gTm9kZXMgY3JlYXRpb25cbiAgICAgIGNvbnN0IGFycm93ID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2Fycm93JyB9KVxuXG4gICAgICBjb25zdCB1bCA9IE5vZGUoJ3VsJywgbnVsbClcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY29udGVudCcgfSwgdWwpXG4gICAgICBjb25zdCBpbWFnZXMgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnaW1hZ2VzJyB9LCBjb250ZW50KVxuXG4gICAgICBjb25zdCBidXR0b24gPSBOb2RlKCdidXR0b24nLCBudWxsLCAnRG93bmxvYWQgc2VsZWN0aW9uJylcbiAgICAgIGNvbnN0IGZvb3RlciA9IE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdmb290ZXInIH0sIGJ1dHRvbilcblxuICAgICAgY29uc3QgY2xlYXIgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnY2xlYXInIH0sICdDbGVhciBhbGwnKVxuICAgICAgY29uc3QgdGl0bGUgPSBOb2RlKCdkaXYnLCB7IGNsYXNzOiAndGl0bGUnIH0sICdNeSBDb2xsZWN0aW9uJylcblxuICAgICAgY29uc3QgaGVhZGVyID0gTm9kZSgnZGl2JywgeyBjbGFzczogJ2hlYWRlcicgfSwgdGl0bGUsIGNsZWFyKVxuICAgICAgY29uc3QgZG93bmxvYWRzQ29tcG9uZW50ID0gTm9kZSgnZGl2JywgeyBpZDogJ2Rvd25sb2FkJyB9LCBoZWFkZXIsIGFycm93LCBpbWFnZXMsIGZvb3RlcilcblxuICAgICAgLy8gRE9NIGNoYW5nZXNcbiAgICAgIGNvbnN0IGRpc3BsYXlEb3dubG9hZHMgPSBzdGF0ZS5kaXNwbGF5RG93bmxvYWRzXG5cbiAgICAgIGlmIChkaXNwbGF5RG93bmxvYWRzKSB7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRzQ29tcG9uZW50KVxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdfUkVOREVSX0lNQUdFU19RVUVVRScgfSlcblxuICAgICAgICBjbGVhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJyB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdPTl9ET1dOTE9BRF9BTExfRE9XTkxPQURTJyB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5pZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fUkVNT1ZFX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7IGlkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkIH0gfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlID09PSAnZG93bmxvYWQnKSB7XG4gICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX0RPV05MT0FEX0lNQUdFX0ZST01fUVVFVUUnLCBwYXlsb2FkOiB7IGlkOiBlLnRhcmdldC5wYXJlbnROb2RlLmlkIH0gfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb3dubG9hZFByZXZpb3VzTm9kZSA9IGQucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkJylcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChkb3dubG9hZFByZXZpb3VzTm9kZSlcbiAgICAgIH1cblxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBjYXNlICdPTl9DTEVBUl9BTExfRE9XTkxPQURTJzoge1xuICAgICAgY29uc3QgY29udGVudCA9IGJvZHkucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkIC5jb250ZW50JylcbiAgICAgIGNvbnN0IHVsID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgIGlmICh1bCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQodWwpXG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgY2FzZSAnX1JFTkRFUl9JTUFHRVNfUVVFVUUnOlxuICAgIGNhc2UgJ09OX1JFTU9WRV9JTUFHRV9GUk9NX1FVRVVFJzoge1xuICAgICAgLy8gQ2xlYW4gRE9NXG4gICAgICBjb25zdCB1bCA9IGJvZHkucXVlcnlTZWxlY3RvcignI2Rvd25sb2FkIC5jb250ZW50IHVsJylcbiAgICAgIGNvbnN0IGxpTGlzdFByZXZpb3VzID0gdWwucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuXG4gICAgICBpZiAobGlMaXN0UHJldmlvdXMgIT0gbnVsbCkge1xuICAgICAgICBsaUxpc3RQcmV2aW91cy5mb3JFYWNoKGxpID0+IHVsLnJlbW92ZUNoaWxkKGxpKSlcbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgRE9NXG4gICAgICBjb25zdCBpbWFnZXNRdWV1ZSA9IHN0YXRlLmltYWdlc1F1ZXVlXG4gICAgICBjb25zdCBsaUxpc3QgPSBpbWFnZXNRdWV1ZS5tYXAoKGltYWdlLCBpKSA9PlxuICAgICAgICBOb2RlKCdsaScsIHsgY2xhc3M6ICdpbWFnZScsIHN0eWxlOiBgYmFja2dyb3VuZDogdXJsKCcke2ltYWdlfScpYCB9LFxuICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdhY3Rpb25zJywgaWQ6IGkgfSxcbiAgICAgICAgICAgIE5vZGUoJ2RpdicsIHsgY2xhc3M6ICdyZW1vdmUnIH0pLCBOb2RlKCdkaXYnLCB7IGNsYXNzOiAnZG93bmxvYWQnIH0pKSlcbiAgICAgIClcblxuICAgICAgbGlMaXN0LmZvckVhY2gobGkgPT4gdWwuYXBwZW5kQ2hpbGQobGkpKVxuXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufSlcblxuLy8gZXZlbnRzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnT05fV0lORE9XX0xPQUQnIH0pXG59KVxuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdPTl9JTlBVVF9FTlRFUl9LRVlfRE9XTicsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHNlYXJjaFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuXG5mb2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1RPR0dMRV9ET1dOTE9BRFMnIH0pXG59KSJdfQ==
