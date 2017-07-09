import { Node } from '../helpers/Node'

const Downloads = props => {
  const {
    dispatch,
    imagesQueue,
    searchValue,
  } = props

  // Events
  const clearOnClick = () => {
    dispatch({ type: 'ON_CLEAR_ALL_DOWNLOADS' })
  }

  const buttonOnClick = () => {
    dispatch({ type: 'ON_DOWNLOAD_ALL_DOWNLOADS' })
  }

  const removeOnClick = e => {
    dispatch({type: 'ON_REMOVE_IMAGE_FROM_QUEUE', payload: {id: e.target.parentNode.id}})
  }

  const downloadOnClick = e => {
    dispatch({type: 'ON_DOWNLOAD_IMAGE_FROM_QUEUE', payload: {id: e.target.parentNode.id}})
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
          Node('ul', null,
            ...imagesQueue.map((image, i) =>
              Node('li', { class: 'image', style: `background: url('${image.urls.thumb}')` },
                Node('div', { class: 'actions', id: i },
                  Node('div', { class: 'remove', onClick: removeOnClick }),
                  Node('a', { class: 'download', download: `${searchValue}_${image.id}`, href: image.links.download, onClick: downloadOnClick },
                    Node('img', { style: 'display:none;', src: image.links.download  })))
              )
            )))),
      Node('div', { class: 'footer' },
        Node('button', { onClick: buttonOnClick }, 'Download selection')
      )
    )
  )
}

export default Downloads
