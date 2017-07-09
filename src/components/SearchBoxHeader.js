import { Node } from '../helpers/Node'

const SearchBoxHeader = props => {
  const { dispatch, searchValue } = props

  const onSearchBoxFocus = () => {
    dispatch({ type: 'ON_HEADER_SEARCH_BOX_FOCUS' })
  }

  const onSearchBoxBlur = () => {
    dispatch({ type: 'ON_HEADER_SEARCH_BOX_BLUR' })
  }

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
    Node('div', { class: 'search' },
      Node('div', { class: 'search-box' },
        Node('i', { class: 'icon' }),
        Node('input', { type: 'text', value: searchValue, onKeyUp: onKeyupInput, onFocus: onSearchBoxFocus, onBlur: onSearchBoxBlur })
      )
    )
  )
}

export default SearchBoxHeader
