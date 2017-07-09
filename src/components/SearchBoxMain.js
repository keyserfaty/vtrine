import { Node } from '../helpers/Node'

const SearchBoxMain = props => {
  const { dispatch } = props

  const onKeyupInput = e => {
    if (e.keyCode === 13) {
      dispatch({
        type: 'ON_INPUT_ENTER_KEY_DOWN',
        payload: {
          searchValue: e.target.value,
          path: '/search'
        }
      })
    }
  }

  return (
    Node('div', { id: 'search' },
      Node('div', { class: 'search-box', onKeyUp: onKeyupInput },
        Node('div', { class: 'icon' }),
        Node('input', { type: 'text', placeholder: 'Search photos', autofocus: true }))
    )
  )
}

export default SearchBoxMain
