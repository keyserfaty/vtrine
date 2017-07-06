import { createStore } from './helpers/store'
import { exists } from './helpers'

import Downloads from './components/Downloads'
import SearchBoxMain from './components/SearchBoxMain'
import OnBoarding from './components/OnBoarding'

export const d = document

// model
const initialState = {
  routes: {
    path: '/'
  },
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
        routes: {
          path: '/search'
        }
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

    case 'ON_ADD_IMAGE_TO_QUEUE': {
      return {
        ...state,
        imagesQueue: [
          ...state.imagesQueue,
          ...action.payload.image
        ]
      }
    }

    case 'ON_REMOVE_IMAGE_FROM_QUEUE': {
      return {
        ...state,
        imagesQueue: state.imagesQueue
          .filter((image, i) => i !== Number(action.payload.id))
      }
    }

    default:
      return state
  }
}

const store = createStore(reducer)

// view
const body = d.querySelector('body')
const header = d.querySelector('header')
const folder = header.querySelector('.downloads')
const single = body.querySelector('.single')

store.subscribe((state, action) => {
  const props = {
    dispatch: store.dispatch,
    ...state,
  }

  // route changes
  const searchBoxMainPreviousNode = d.querySelector('#search')
  const onBoardingNode = single.querySelector('#on-boarding')

  if (state.routes.path === '/' && !exists(searchBoxMainPreviousNode)) {
    single.appendChild(SearchBoxMain(props))
  }

  if (state.routes.path !== '/' && exists(searchBoxMainPreviousNode)) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode)
  }

  if (state.routes.path === '/search' && !exists(onBoardingNode)) { // TODO: should add checking from localStorage too
    single.appendChild(OnBoarding(props))
  }

  // imagesQueue changes
  const downloadPreviousNode = d.querySelector('#download')

  if (state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
    body.appendChild(Downloads(props))
  }

  // displayDownloads changes
  if (state.displayDownloads && !exists(downloadPreviousNode)) {
    body.appendChild(Downloads(props))
  }

  if (!state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      window.history.pushState('', '', 'search?q=' + state.searchValue);
      break
    }
  }
})

// events
window.addEventListener('load', () => {
  store.dispatch({ type: 'ON_WINDOW_LOAD' })
})

folder.addEventListener('click', () => {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' })
})
