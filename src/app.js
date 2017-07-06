import { createStore } from './helpers/store'
import { exists } from './helpers'
import { clientId, url } from './constants'

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
  imagesQueue: ['./statics/images/1.jpg', './statics/images/1.jpg'],
  imagesList: [],
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

    case 'ON_NEW_IMAGES': {
      return {
        ...state,
        imagesList: action.payload.images
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

  const isFirstLoad = localStorage.getItem('first_load')

  if (state.routes.path === '/search' && !exists(onBoardingNode) && !exists(isFirstLoad)) {
    single.appendChild(OnBoarding(props))
    localStorage.setItem('first_load', false)
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
      window.history.pushState('', '', 'search?q=' + state.searchValue)
      store.dispatch({ type: 'ON_FETCH_IMAGES' })
      break
    }

    case 'ON_FETCH_IMAGES': {
      const xml = new XMLHttpRequest();

      xml.addEventListener('load', function () {
          store.dispatch({
            type: 'ON_NEW_IMAGES',
            payload: {
              images: JSON.parse(this.responseText)
            }
          })
        }
      );
      xml.open('GET', url + clientId);
      xml.send();

      break
    }

    default:
      return false
  }
})

// events
window.addEventListener('load', () => {
  store.dispatch({ type: 'ON_WINDOW_LOAD' })
})

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    store.dispatch({
      type: 'ON_SPACE_BAR'
    })
  }
})

folder.addEventListener('click', () => {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' })
})
