const d = document

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

const Node = (elem, attrs, ...children) => {
  let node = d.createElement(elem)

  if (attrs != null) {
    Object.keys(attrs).forEach(key => {
      node.setAttribute(key, attrs[key])
    })
  }

  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string') {
        node.innerHTML = child
      }

      if (typeof child === 'object') {
        node.appendChild(child)
      }
    })
  }

  return node
}

// TODO: won't work with same child props. Works only the first time
const NodeSerializer = (qty, ...node) => {
  let list = []
  for (let i = 0; i < qty; i++) {
    list.push(Node(...node))
  }

  return list
}

// model
const initialState = {
  searchValue: '',
  displayDownloads: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      return {
        ...state,
        searchValue: action.payload.searchValue,
      }
    }

    case 'ON_TOGGLE_DOWNLOADS': {
      return {
        ...state,
        displayDownloads: !state.displayDownloads,
      }
    }

    default:
      return state
  }
}

const store = createStore(reducer)

// view
const searchInput = d.querySelector('input')
const body = d.querySelector('body')
const header = d.querySelector('header')
const folder = header.querySelector('.downloads')

store.subscribe((state, action) => {
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      console.log('holi')
      break
    }

    case 'ON_TOGGLE_DOWNLOADS': {
      // Nodes creation
      const arrow = Node('div', { class: 'arrow' })

      // TODO: should come from state
      const imagesList = ['./statics/images/1.jpg', './statics/images/1.jpg']
      const liList = imagesList.map(image =>
        Node('li', { class: 'image', style: `background: url('${image}')` },
          Node('div', { class: 'actions' },
            Node('div', { class: 'remove' }), Node('div', { class: 'download' })))
      )

      const ul = Node('ul', null, ...liList)
      const content = Node('div', { class: 'content' }, ul)
      const images = Node('div', { class: 'images' }, content)

      const button = Node('button', null, 'Download selection')
      const footer = Node('div', { class: 'footer' }, button)

      const clear = Node('div', { class: 'clear' }, 'Clear all')
      const title = Node('div', { class: 'title' }, 'My Collection')

      const header = Node('div', { class: 'header' }, title, clear)
      const downloadsComponent = Node('div', { id: 'download' }, header, arrow, images, footer)

      // DOM changes
      const displayDownloads = state.displayDownloads

      if (displayDownloads) {
        body.appendChild(downloadsComponent)
      } else {
        const downloadPreviousNode = d.querySelector('#download')
        body.removeChild(downloadPreviousNode)
      }

      break
    }
  }
})

// events
window.addEventListener('load', () => {
  store.dispatch({ type: 'ON_WINDOW_LOAD' })
})

searchInput.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    store.dispatch({
      type: 'ON_INPUT_ENTER_KEY_DOWN',
      payload: {
        searchValue: e.target.value,
      }
    })
  }
})

folder.addEventListener('click', () => {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' })
})