export const exists = node => node != null

/**
 * Takes the src of an image and returns a promise
 * that resolves when that image is done downloading
 * @param src
 * @returns {Promise}
 */
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

/**
 * Encode a string into base64
 * @param inputStr
 * @returns {string}
 */
export const base64Encode = inputStr => {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  var outputStr = ""
  var i = 0

  while (i < inputStr.length)
  {
    //all three "& 0xff" added below are there to fix a known bug 
    //with bytes returned by xhr.responseText
    var byte1 = inputStr.charCodeAt(i++) & 0xff
    var byte2 = inputStr.charCodeAt(i++) & 0xff
    var byte3 = inputStr.charCodeAt(i++) & 0xff

    var enc1 = byte1 >> 2
    var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4)

    var enc3, enc4
    if (isNaN(byte2))
    {
      enc3 = enc4 = 64
    }
    else
    {
      enc3 = ((byte2 & 15) << 2) | (byte3 >> 6)
      if (isNaN(byte3))
      {
        enc4 = 64
      }
      else
      {
        enc4 = byte3 & 63
      }
    }

    outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4)
  }

  return outputStr
}

function loadImage(imageURI) {
  const request = new XMLHttpRequest();

  request.onprogress = function (e) {
    if (e.lengthComputable) {
      loadingBar.setAttribute('style', 'width: ' + e.loaded / e.total * 100 + '%')
    }
  }
  request.onload = function () {
    image.setAttribute('style', `background: url(data:image/jpeg;base64,${base64Encode(request.responseText)}) no-repeat; background-size: cover;`)
    image.classList.remove('loading')
    image.classList.add('loaded')
  }
  request.onloadend = function () {
    loadingBar.setAttribute('style', 'width: 0%')
  }
  request.open("GET", imageURI, true);
  request.overrideMimeType('text/plain; charset=x-user-defined');
  request.send(null);
}

/**
 * Takes the source of an image
 * and returns a promise when the image is done downloading
 * @param src
 * @returns {Promise}
 */
export const imageDownload = src => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.onload = function () {
      resolve(base64Encode(request.responseText))
    }
    request.onerror = function (err) {
      reject(err)
    }

    request.open('GET', src, true)
    request.overrideMimeType('text/plain; charset=x-user-defined');
    request.send(null);
  })
}

/**
 * Takes a list of images and return
 * a list of promises when for all downloads
 * @param images
 */
export const imagesDownload = images => images
  .map(image => imageDownload(image))
