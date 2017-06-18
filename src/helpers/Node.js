import { d } from '../app'
import uniqueId from '../helpers/uniqueId'

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

export const renderNode = (render, node, parent) => {
  const _node = d.querySelector(`[data-unique-id='${node.getAttribute('data-unique-id')}']`)

  if (_node == null && render) {
    const _parent = d.querySelector(parent)
    _parent.appendChild(node)
  } else if (_node != null && !render) {
    _node.parentNode.removeChild(_node)
  }
}
