import { d } from '../app'

const EVENTS = {
  onClick: 'click',
  onKeyUp: 'keyup',
  onLoad: 'load'
}

export const Node = (elem, attrs, ...children) => {
  let node = d.createElement(elem)

  if (attrs != null) {
    Object.keys(attrs).forEach(key => {
      if (EVENTS.hasOwnProperty(key)) {
        node.addEventListener(EVENTS[key], attrs[key])
      } else {
        node.setAttribute(key, attrs[key])
      }
    })
  }

  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string') {
        node.innerHTML = child
      }

      if (typeof child === 'object') {
        node.appendChild(child)
      }
    })
  }

  node.setAttribute('data-unique-id', uniqueId())

  return node
}
