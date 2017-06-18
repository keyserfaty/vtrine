import { Node } from './helpers/Node'
import { createStore } from './helpers/store'

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
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      console.log('should redirect')
      break
    }

    case 'ON_TOGGLE_DOWNLOADS': {
      // Nodes creation
      const arrow = Node('div', { class: 'arrow' })

      const ul = Node('ul', null)
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
        store.dispatch({ type: '_RENDER_IMAGES_QUEUE' })

        clear.addEventListener('click', () => {
          store.dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' })
        })

        button.addEventListener('click', () => {
          store.dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' })
        })

        ul.addEventListener('click', (e) => {
          if (e.target.parentNode.id.length) {
            if (e.target.attributes[0].nodeValue === 'remove') {
              store.dispatch({ type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } })
            }

            if (e.target.attributes[0].nodeValue === 'download') {
              store.dispatch({ type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: { id: e.target.parentNode.id } })
            }
          }
        })
      } else {
        const downloadPreviousNode = d.querySelector('#download')
        body.removeChild(downloadPreviousNode)
      }

      break
    }

    case 'ON_CLEAR_ALL_DOWNLOADS': {
      const content = body.querySelector('#download .content')
      const ul = content.querySelector('ul')

      if (ul != null) {
        content.removeChild(ul)
      }

      break
    }

    /*
    Optimizations in order:
    1) Detect when component is attached to a state change and only then
    re-render on state change. The rest of the elements should remain intact
    2) Detect which elements in a list of elements have changed (for example:
    in this case I shouldn't need to re-render all `li` elements, I should only
    remove the removed ones or change the changed ones. Could use a hash table for that?
     */
    case '_RENDER_IMAGES_QUEUE':
    case 'ON_REMOVE_IMAGE_FROM_QUEUE': {
      // Clean DOM
      const ul = body.querySelector('#download .content ul')
      const liListPrevious = ul.querySelectorAll('li')

      if (liListPrevious != null) {
        liListPrevious.forEach(li => ul.removeChild(li))
      }

      // Build DOM
      const imagesQueue = state.imagesQueue
      const liList = imagesQueue.map((image, i) =>
        Node('li', { class: 'image', style: `background: url('${image}')` },
          Node('div', { class: 'actions', id: i },
            Node('div', { class: 'remove' }), Node('div', { class: 'download' })))
      )

      liList.forEach(li => ul.appendChild(li))

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