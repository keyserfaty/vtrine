import { Node } from '../helpers/Node'

const OnBoarding = props => {
  return (
    Node('div', { id: 'on-boarding' },
      Node('div', { class: 'image' }),
      Node('div', { class: 'caption' }, 'Press spacebar to generate a photo'),
      Node('div', { class: 'footer' },
        Node('div', { class: 'skip' }, 'Skip'),
        Node('div', { class: 'nav' },
          Node('ul', null,
            Node('li'), Node('li'), Node('li'))),
        Node('div', { class: 'next' }, 'Next')))
  )
}

export default OnBoarding
