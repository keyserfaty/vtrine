const createStore = function createStoreFn (reducer) {
  let state = undefined
  let subscribers = []

  return {
    dispatch: function (action) {
      state = reducer(state, action)
      console.log(action, state)
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

// model
const initialState = {
  searchValue: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_WINDOW_LOAD': {
      return {
        ...state,
      }
    }

    default:
      return state
  }
}

const store = createStore(reducer)

// view
store.subscribe((state, action) => {

})

// events
window.addEventListener('load', () => {
  store.dispatch({ type: 'ON_WINDOW_LOAD' })
})