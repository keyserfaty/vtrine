# Implementation details:


The pattern I'm using is:
1) Making changes to the state
2) If the element is present in the DOM then I will re-render it. That's been done like this:

``` js

  if (exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
    body.appendChild(Downloads(props))
  }

```

Should probably come up with a better way of re-rendering but, as far as I'm concerned, if I'm trying to avoid using trees of elements I don't have much choice but to create and remove the elements from the DOM directly (which is known to be a really expensive operation for the browser).

