(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

// model
var initialState = {
  searchValue: ''
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'ON_WINDOW_LOAD':
      {
        return _extends({}, state);
      }

    default:
      return state;
  }
};

var store = createStore(reducer

// view
);store.subscribe(function (state, action) {}

// events
);window.addEventListener('load', function () {
  store.dispatch({ type: 'ON_WINDOW_LOAD' });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBLElBQU0sY0FBYyxTQUFTLGFBQVQsQ0FBd0IsT0FBeEIsRUFBaUM7QUFDbkQsTUFBSSxRQUFRLFNBQVo7QUFDQSxNQUFJLGNBQWMsRUFBbEI7O0FBRUEsU0FBTztBQUNMLGNBQVUsa0JBQVUsTUFBVixFQUFrQjtBQUMxQixjQUFRLFFBQVEsS0FBUixFQUFlLE1BQWYsQ0FBUjtBQUNBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBcEI7QUFDQSxrQkFBWSxPQUFaLENBQW9CLFVBQVUsTUFBVixFQUFrQjtBQUNwQyxlQUFPLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBUDtBQUNELE9BRkQ7QUFHRCxLQVBJO0FBUUwsY0FBVSxvQkFBWTtBQUNwQixhQUFPLEtBQVA7QUFDRCxLQVZJO0FBV0wsZUFBVyxtQkFBVSxPQUFWLEVBQW1CO0FBQzVCLGtCQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDRDtBQWJJLEdBQVA7QUFlRCxDQW5CRDs7QUFxQkE7QUFDQSxJQUFNLGVBQWU7QUFDbkIsZUFBYTtBQURNLENBQXJCOztBQUlBLElBQU0sVUFBVSxTQUFWLE9BQVUsR0FBa0M7QUFBQSxNQUFqQyxLQUFpQyx1RUFBekIsWUFBeUI7QUFBQSxNQUFYLE1BQVc7O0FBQ2hELFVBQVEsT0FBTyxJQUFmO0FBQ0UsU0FBSyxnQkFBTDtBQUF1QjtBQUNyQiw0QkFDSyxLQURMO0FBR0Q7O0FBRUQ7QUFDRSxhQUFPLEtBQVA7QUFSSjtBQVVELENBWEQ7O0FBYUEsSUFBTSxRQUFRLFlBQVk7O0FBRTFCO0FBRmMsQ0FBZCxDQUdBLE1BQU0sU0FBTixDQUFnQixVQUFDLEtBQUQsRUFBUSxNQUFSLEVBQW1CLENBRWxDOztBQUVEO0FBSkEsRUFLQSxPQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcEMsUUFBTSxRQUFOLENBQWUsRUFBRSxNQUFNLGdCQUFSLEVBQWY7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gY3JlYXRlU3RvcmVGbiAocmVkdWNlcikge1xuICBsZXQgc3RhdGUgPSB1bmRlZmluZWRcbiAgbGV0IHN1YnNjcmliZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICBzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgc3RhdGUpXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZShzdGF0ZSwgYWN0aW9uKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cblxuLy8gbW9kZWxcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc2VhcmNoVmFsdWU6ICcnLFxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ09OX1dJTkRPV19MT0FEJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcilcblxuLy8gdmlld1xuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZSwgYWN0aW9uKSA9PiB7XG5cbn0pXG5cbi8vIGV2ZW50c1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ09OX1dJTkRPV19MT0FEJyB9KVxufSkiXX0=
