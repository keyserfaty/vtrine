// router here
const holi = 'holi'
console.log('holi')

const createStore = function createStoreFn (reducer) {
  let state = undefined
  let subscribers = []

  return {
    dispatch: function (action) {
      state = reducer(state, action)
      subscribers.forEach(function (handle) {
        return handle(state, action)
      })
    },
    getState: function () {
      return state
    },
    subscribe: function (handler) {
      subscribers.push(handler)
    }
  }
}

export default createStore
