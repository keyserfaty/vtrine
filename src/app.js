import { createStore } from './helpers/store'

import Downloads from './components/Downloads'

export const d = document

// model
const initialState = {
  searchValue: '',
  displayDownloads: false,
  imagesQueue: ['./statics/images/1.jpg', './statics/images/1.jpg']
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

    case 'ON_CLEAR_ALL_DOWNLOADS': {
      return {
        ...state,
        imagesQueue: [],
      }
    }

    case 'ON_REMOVE_IMAGE_FROM_QUEUE': {
      return {
        ...state,
        imagesQueue: state.imagesQueue.filter((image, i) => i !== Number(action.payload.id))
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
  const props = {
    dispatch: store.dispatch,
    ...state,
  }

  // displayDownloads changes
  const downloadPreviousNode = d.querySelector('#download')

  if (state.displayDownloads && downloadPreviousNode == null) {
    body.appendChild(Downloads(props))
  }

  if (!state.displayDownloads && downloadPreviousNode != null) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
  }

  // imagesQueue changes
  const content = body.querySelector('#download .content')

  if (state.imagesQueue.length === 0 && content != null) {
    const ul = content.querySelector('#download .content ul')

    if (ul != null) {
      content.removeChild(ul)
    }
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      console.log('should redirect')
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