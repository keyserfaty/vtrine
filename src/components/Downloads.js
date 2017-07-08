import { Node } from '../helpers/Node'

const Downloads = props => {
  const {
    dispatch,
    imagesQueue,
  } = props

  // Events
  const clearOnClick = () => {
    dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' })
  }

  const buttonOnClick = () => {
    dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' })
  }

  const ulOnClick = e => {
    if (e.target.parentNode.id.length) {
      if (e.target.attributes[0].nodeValue === 'remove') {
        dispatch({type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: {id: e.target.parentNode.id}})
      }

      if (e.target.attributes[0].nodeValue === 'download') {
        dispatch({type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: {id: e.target.parentNode.id}})
      }
    }
  }

  // DOM
  return (
    Node('div', { id: 'download' },
      Node('div', { class: 'header' },
        Node('div', { class: 'title' }, 'My Collection'),
        Node('div', { class: 'clear', onClick: clearOnClick }, 'Clear all')),
      Node('div', { class: 'arrow' }),
      Node('div', { class: 'images' },
        Node('div', { class: 'content' },
          Node('ul', { onClick: ulOnClick },
            ...imagesQueue.map((image, i) =>
              Node('li', { class: 'image', style: `background: url('${image.urls.thumb}')` },
                Node('div', { class: 'actions', id: i },
                  Node('div', { class: 'remove' }), Node('div', { class: 'download' })))
            )))),
      Node('div', { class: 'footer' },
        Node('button', { onClick: buttonOnClick }, 'Download selection')
      )
    )
  )
}

export default Downloads
