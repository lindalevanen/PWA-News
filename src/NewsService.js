/**
 * The articles are fetched from the Gamespot API https://www.gamespot.com/api/documentation#toc-0-4
 */

const ARTICLES_URL = (
  'https://www.gamespot.com/api/articles/' +
  '?api_key=ac0502dc50b611ff44da3ee2590724945af3e305' +
  '&format=json' +
  '&sort=publish_date:desc' +
  '&limit=5'
)

const ARTICLE_DETAILS_URL = (
  'https://www.gamespot.com/api/articles/' +
  '?api_key=ac0502dc50b611ff44da3ee2590724945af3e305' +
  '&format=json' +
  '&filter=id::id'
)
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

export const getArticles = () => {
  return fetch(CORS_PROXY + ARTICLES_URL)
    .then(response => {
      if(response.status === 200) {
        return response.json()
      }
    })
    .then(res => {
      console.log("Loaded news: ", res.results)
      return res.results
    })
    .catch(err => {
      console.error(err)
    })
}

export const loadMoreArticles = (currentAmount, firstPostTime) => {
  const additionalParams = (
    `&filter=publish_date:1970-01-01T00:00:00|${firstPostTime}` +
    `&offset=${currentAmount}`
  )
  return (
    fetch(CORS_PROXY + ARTICLES_URL.concat(additionalParams))
      .then(response => {
        if(response.status === 200) {
          return response.json()
        }
      })
      .then(res => {
        console.log("Loaded more: ", res.results)
        return res.results
      })
      .catch(err => {
        console.error(err)
      })
  )
}

export const getArticleDetails = (id) => {
  return fetch(CORS_PROXY + ARTICLE_DETAILS_URL.replace(':id', id))
  .then(response => {
    if(response.status === 200) {
      return response.json()
    }
  })
  .then(res => {
    console.log("Loaded details: ", res.results[0])
    return res.results[0]
  })
  .catch(err => {
    console.error(err)
  })
}