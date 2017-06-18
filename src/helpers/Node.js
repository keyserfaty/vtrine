import { d } from '../app'

export const Node = (elem, attrs, ...children) => {
  let node = d.createElement(elem)

  if (attrs != null) {
    Object.keys(attrs).forEach(key => {
      node.setAttribute(key, attrs[key])
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

  return node
}

// TODO: won't work with same child props. Works only the first time
export const NodeSerializer = (qty, ...node) => {
  let list = []
  for (let i = 0; i < qty; i++) {
    list.push(Node(...node))
  }

  return list
}
