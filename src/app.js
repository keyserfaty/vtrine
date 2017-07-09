import { saveAs } from 'file-saver' // polyfill for saving zip files
import JSZip from 'jszip'

import { store } from './reducer'

import { exists, base64Encode, imagesDownload } from './helpers'
import { url } from './constants'

import Downloads from './components/Downloads'
import SearchBoxMain from './components/SearchBoxMain'
import SearchBoxHeader from './components/SearchBoxHeader'
import OnBoarding from './components/OnBoarding'
import SaveIcon from './components/SaveIcon'
import Full from './components/Full'

export const d = document

// view
const body = d.querySelector('body')
const header = d.querySelector('header')
const actions = header.querySelector('.actions')
const folder = header.querySelector('.downloads')
const image = body.querySelector('.image')
const footer = body.querySelector('footer')

store.subscribe((state, action) => {
  const props = {
    dispatch: store.dispatch,
    ...state,
  }

  // route changes
  const searchBoxMainPreviousNode = d.querySelector('#search')
  const onBoardingNode = body.querySelector('#on-boarding')

  if (state.routes.path === '/' && !exists(searchBoxMainPreviousNode)) {
    image.appendChild(SearchBoxMain(props))
  }

  if (state.routes.path !== '/' && exists(searchBoxMainPreviousNode)) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode)
  }

  const isFirstLoad = localStorage.getItem('first_load')
  const searchBoxHeaderNode = header.querySelector('.search')

  if (state.routes.path === '/search' && !exists(searchBoxHeaderNode)) {
    header.insertBefore(SearchBoxHeader(props), actions)
  }

  // onBoarding changes
  if (state.routes.path === '/search' && !exists(onBoardingNode) && !exists(isFirstLoad)) {
    body.appendChild(OnBoarding(props))
    localStorage.setItem('first_load', false)
  }

  // imagesQueue changes
  const downloadPreviousNode = d.querySelector('#download')
  const downloadFullNode = folder.querySelector('.full')
  const folderPathNode = folder.querySelector('path')

  if (state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
    body.appendChild(Downloads(props))
  }

  if (state.imagesQueue.length > 0 && !exists(downloadFullNode)) {
    folder.appendChild(Full(props))
  }

  if (state.imagesQueue.length === 0 && exists(downloadFullNode)) {
    downloadFullNode.parentNode.removeChild(downloadFullNode)
  }

  // displayDownloads changes
  if (state.displayDownloads && !exists(downloadPreviousNode)) {
    body.appendChild(Downloads(props))
    folderPathNode.classList.add('selected')
  }

  if (!state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
    folderPathNode.classList.remove('selected')
  }

  const userNode = footer.querySelector('.user')
  const userPhotoNode = userNode.querySelector('.photo')
  const userNameNode = userNode.querySelector('.name')
  const loadingBar = d.querySelector('.loading-bar')

  // imagesList changes
  if (exists(state.currentImage) && state.currentImage.id !== image.id) {
    image.classList.remove('loaded')
    image.classList.add('loading')

    state.currentImage.src.then(src => {
      image.setAttribute('style', `background: ${state.currentImage.color} url('${src}') no-repeat; background-size: cover;`)
      image.setAttribute('id', state.currentImage.id)
    })

    image.classList.add('loading')
    userPhotoNode.setAttribute('style', `background-image: url('${state.currentImage.user.profile_image.small}')`)
    userNameNode.innerText = state.currentImage.user.name
  }

  if (exists(state.currentImage) && state.currentImage.id !== image.id && !exists(onBoardingNode)) {
    const imageURI = state.currentImage.urls.full
    const request = new XMLHttpRequest()

    request.onprogress = function (e) {
      if (e.lengthComputable) {
        loadingBar.setAttribute('style', 'width: ' + e.loaded / e.total * 100 + '%')
      }
    }

    request.onload = function () {
      image.setAttribute('style', `background-image: url(data:image;base64,${base64Encode(request.responseText)})`)
      image.classList.remove('loading')
      image.classList.add('loaded')
    }

    request.onloadend = function () {
      loadingBar.setAttribute('style', 'width: 0%')
    }

    request.open("GET", imageURI, true)
    request.overrideMimeType('text/plain charset=x-user-defined')
    request.send(null)
  }

  // requesting new images
  const isTwoImagesAwayFromEnd = state.currentImageId === state.imagesList.length - 2
  const isNotInNewPage = state.imagesList.length / 10 === state.currentPage
  const haveNotFetchedAllImages = state.imagesList.length !== state.totalImages

  if (isTwoImagesAwayFromEnd && isNotInNewPage && haveNotFetchedAllImages) {
    store.dispatch({
      type: 'ON_FETCH_IMAGES',
      payload: {
        currentPage: state.currentPage + 1
      }
    })
  }

  if (state.currentImageId + 1 === state.imagesList.length && state.imagesList.length !== 0) {
    store.dispatch({
      type: 'ON_END_OF_LIST'
    })
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      window.history.pushState('', '', 'search?q=' + state.searchValue)
      store.dispatch({
        type: 'ON_FETCH_IMAGES',
        payload: {
          currentPage: 1
        }
      })
      break
    }

    case 'ON_KEY_UP_SPACE_BAR': {
      if (!state.isNavigating) break
      store.dispatch({ type: 'ON_LOAD_NEXT_IMAGE' })

      break
    }

    case 'ON_KEY_UP_S': {
      if (!state.isNavigating) break
      if (state.imagesQueue.some(image => image.id === state.currentImage.id)) break

      store.dispatch({ type: 'ON_ADD_IMAGE_TO_QUEUE' })

      break
    }

    case 'ON_ADD_IMAGE_TO_QUEUE': {
      body.insertBefore(SaveIcon(props), header)

      setTimeout(() => {
        const saveIconNode = body.querySelector('#save')
        saveIconNode.parentNode.removeChild(saveIconNode)
      }, 300)

      break
    }

    case 'ON_FETCH_IMAGES': {
      const xml = new XMLHttpRequest()

      xml.addEventListener('load', function () {
          store.dispatch({
            type: 'ON_FETCH_IMAGES_SUCCESS',
            payload: {
              images: JSON.parse(this.responseText)
            }
          })
        }
      )
      xml.open('GET', url(state.currentPage, state.searchValue))
      xml.send()

      break
    }

    case 'ON_FETCH_IMAGES_SUCCESS': {
      const searchBoxHeaderInputNode = searchBoxHeaderNode.querySelector('input')
      if (exists(searchBoxHeaderInputNode)) {
        searchBoxHeaderInputNode.blur()
      }

      break
    }

    case 'ON_DOWNLOAD_ALL_DOWNLOADS': {
      const urlsList = state.imagesQueue.map(image => image.links.download)
      const imagesListPromises = imagesDownload(urlsList)
      Promise.all(imagesListPromises)
        .then(response => {
          const zip = new JSZip()

          response.forEach((image, i) =>
            zip.file(`${state.imagesQueue[i].id}.jpeg`, image, { base64: true })
          )

          zip.generateAsync({type:"blob"})
          .then(function(content) {
            saveAs(content, "images.zip")
          })
        })

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

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 32) {
    store.dispatch({
      type: 'ON_KEY_UP_SPACE_BAR'
    })
  }

  if (e.keyCode === 83) {
    store.dispatch({
      type: 'ON_KEY_UP_S'
    })
  }
})

folder.addEventListener('click', () => {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' })
})
