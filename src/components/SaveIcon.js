import { Node } from '../helpers/Node'

const SaveIcon = () => {
  return (
    Node('div', { id: 'save' },
      Node('i', { class: 'icon' })
    )
  )
}

export default SaveIcon
