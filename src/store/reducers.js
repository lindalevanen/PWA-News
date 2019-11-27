import { fixHTMLDomains } from '../components/utils.js'

const initialState = {
  news: []
}

function newsApp(state = initialState, action) {
  switch (action.type) {
    case 'SET_NEWS':
      const newsItems = action.news.map(newsItem => ({...newsItem, body: fixHTMLDomains(newsItem.body)}))
      
      return {
        ...state,
        news: state.news.concat(newsItems)
      }
    default:
      return state
  }
}

export default newsApp
