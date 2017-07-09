export const exists = node => node != null

const imageLoader = src => {
  return new Promise(function (resolve, reject) {
    let img = new Image()
    img.onload = function () {
      resolve(src)
    }
    img.onerror = function (err) {
      reject(err)
    }
    img.src = src
  })
}

/**
 * Takes a list of images urls and returns a list
 * of promises of images loading
 * @param images
 */
export const preCachedImages = images => images
  .map(image => imageLoader(image))
