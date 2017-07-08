import { Node } from '../helpers/Node'

const SearchBoxHeader = props => {
  const { searchValue } = props

  return (
    Node('div', { class: 'search' },
      Node('div', { class: 'search-box' },
        Node('i', { class: 'icon' }),
        Node('input', { type: 'text', value: searchValue })
      )
    )
  )
}

export default SearchBoxHeader
