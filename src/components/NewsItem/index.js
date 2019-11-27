import React from 'react';
import { connect } from 'react-redux'
import './index.scss'

import { getArticleDetails } from '../../NewsService.js'
import { fixHTMLDomains } from '../utils.js'

class NewsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: undefined,
    }
  }

  componentDidMount() {
    const { articleId } = this.props.match.params

    const newsItem = this.props.news.find(newsItem => newsItem.id.toString() === articleId)

    if(!newsItem) {
      getArticleDetails(articleId).then(res => {
        if(res) {
          const fixedHTML = fixHTMLDomains(res.body)
          this.setState({article: {...res, body: fixedHTML}})
        }
      })
    } else {
      this.setState({article: newsItem})
    }
  }

  render() {
    const { article } = this.state
    const date = new Date(article && article.publish_date)
    const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  
    return (
      <>
        {article && (
          <div className="news-wrapper">
            <div className="title">{article.title}</div>
            <div className="description">{article.deck}</div>
            <div className="date">
                <span>{parsedDate}</span>
                <span>{parsedTime}</span>
            </div>
            <img src={article.image.original} className="thumbnail" alt="thumbnail" />
            <div dangerouslySetInnerHTML={{__html: article.body}}/>
          </div>
        )}
      </>
    )
  }
};

const mapStateToProps = state => {
  return {
    news: state.news
  }
}

export default connect(mapStateToProps)(NewsItem)

