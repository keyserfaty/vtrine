import { createStore } from './helpers/store'
import { preCachedImages } from './helpers'

// model
const initialState = {
  // routing
  routes: {
    path: '/'
  },

  // ui
  searchValue: '',
  displayDownloads: false,
  isNavigating: false,
  imagesQueue: [],
  currentImage: null,
  currentImageId: 0,

  // async
  imagesList: [],
  preCachedImages: [],
  currentPage: null,
  totalPages: null,
  totalImages: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_WINDOW_LOAD':
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      return {
        ...state,
        searchValue: action.payload.searchValue,
        routes: {
          path: action.payload.path
        }
      }
    }

    case 'ON_HEADER_SEARCH_BOX_FOCUS': {
      return {
        ...state,
        isNavigating: false,
      }
    }

    case 'ON_HEADER_SEARCH_BOX_BLUR': {
      return {
        ...state,
        isNavigating: true,
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
          state.currentImage
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

    case 'ON_END_OF_LIST': {
      return {
        ...state,
        currentImageId: 0
      }
    }

    case 'ON_FETCH_IMAGES': {
      return {
        ...state,
        currentPage: action.payload.currentPage
      }
    }

    case 'ON_FETCH_IMAGES_SUCCESS': {
      const isNewRequest = state.currentPage === 1

      const currentImageId = isNewRequest
        ? 0
        : state.currentImageId

      const imagesList = isNewRequest
        ? action.payload.images.results
        : [
          ...state.imagesList,
          ...action.payload.images.results
        ]

      // pre-cache images
      const imagesFromList = imagesList.map(item => item.urls.thumb)
      const preCacheImages = preCachedImages(imagesFromList)

      return {
        ...state,
        imagesList,
        currentImageId,
        currentImage: {
          ...imagesList[currentImageId],
          src: preCacheImages[currentImageId]
        },
        preCacheImages,
        isNavigating: true,
        totalPages: action.payload.images.total_pages,
        totalImages: action.payload.images.total
      }
    }

    case 'ON_LOAD_NEXT_IMAGE': {
      return {
        ...state,
        currentImage: {
          ...state.imagesList[state.currentImageId + 1],
          src: state.preCacheImages[state.currentImageId + 1]
        },
        currentImageId: state.currentImageId + 1
      }
    }

    default:
      return state
  }
}

export const store = createStore(reducer)
