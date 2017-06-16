(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// router here
var holi = 'holi';
console.log('holi');

var createStore = function createStoreFn(reducer) {
  var state = undefined;
  var subscribers = [];

  return {
    dispatch: function dispatch(action) {
      state = reducer(state, action);
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

exports.default = createStore;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTtBQUNBLElBQU0sT0FBTyxNQUFiO0FBQ0EsUUFBUSxHQUFSLENBQVksTUFBWjs7QUFFQSxJQUFNLGNBQWMsU0FBUyxhQUFULENBQXdCLE9BQXhCLEVBQWlDO0FBQ25ELE1BQUksUUFBUSxTQUFaO0FBQ0EsTUFBSSxjQUFjLEVBQWxCOztBQUVBLFNBQU87QUFDTCxjQUFVLGtCQUFVLE1BQVYsRUFBa0I7QUFDMUIsY0FBUSxRQUFRLEtBQVIsRUFBZSxNQUFmLENBQVI7QUFDQSxrQkFBWSxPQUFaLENBQW9CLFVBQVUsTUFBVixFQUFrQjtBQUNwQyxlQUFPLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBUDtBQUNELE9BRkQ7QUFHRCxLQU5JO0FBT0wsY0FBVSxvQkFBWTtBQUNwQixhQUFPLEtBQVA7QUFDRCxLQVRJO0FBVUwsZUFBVyxtQkFBVSxPQUFWLEVBQW1CO0FBQzVCLGtCQUFZLElBQVosQ0FBaUIsT0FBakI7QUFDRDtBQVpJLEdBQVA7QUFjRCxDQWxCRDs7a0JBb0JlLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gcm91dGVyIGhlcmVcbmNvbnN0IGhvbGkgPSAnaG9saSdcbmNvbnNvbGUubG9nKCdob2xpJylcblxuY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiBjcmVhdGVTdG9yZUZuIChyZWR1Y2VyKSB7XG4gIGxldCBzdGF0ZSA9IHVuZGVmaW5lZFxuICBsZXQgc3Vic2NyaWJlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGUoc3RhdGUsIGFjdGlvbilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlXG4iXX0=
