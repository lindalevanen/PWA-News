const API_DOMAIN = 'https://www.gamespot.com'

/* 
  Converts html's <a> and <iframe>-tag sources from relative to absolute.
  Gamespot gives a lot of the sources relative to their domain ('/videos/12345')
  Change those to be under the Gamespot API ('https://www.gamespot.com/videos/12345')
*/

export const fixHTMLDomains = (html) => {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  fixTagDomains(tempDiv, 'a', 'href')
  fixTagDomains(tempDiv, 'iframe', 'src')

  return tempDiv.innerHTML
}

const fixTagDomains = (rootEl, tag, srcAttrName) => {
  const tags = rootEl.getElementsByTagName(tag)
  for (let i = 0; i < tags.length; i++) {
    const src = tags[i].getAttribute(srcAttrName)
    if(src && src[0] === '/' && src[1] !== '/') { // Relative domain, change it. With // apparently it's just https or something
      tags[i].setAttribute(srcAttrName, API_DOMAIN  + src)
    }
  }
}