const API_DOMAIN = 'https://www.gamespot.com'

/* 
  Converts html's <a> and <iframe>-tag sources from relative to absolute.
  Gamespot gives a lot of the sources relative to their domain ('/videos/12345')
  Change those to be under the Gamespot API ('https://www.gamespot.com/videos/12345')
*/

export const fixHTMLDomains = (html) => {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const atags = tempDiv.getElementsByTagName('a')
  for (let i = 0; i < atags.length; i++) {
    const href = atags[i].getAttribute('href')
    if(href[0] === '/') { // Relative domain, change it
      atags[i].setAttribute('href', API_DOMAIN  + href)
    }
  }
  const possibleiFrames = tempDiv.getElementsByTagName('iframe')
  if(possibleiFrames.length === 1) {
    const iframeSrc = possibleiFrames[0].getAttribute('src')
    if(iframeSrc[0] === '/') {  // Relative domain, change it
      possibleiFrames[0].setAttribute('src', API_DOMAIN + iframeSrc)
    }
  }

  return tempDiv.innerHTML
}