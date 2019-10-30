import React from 'react';
import './index.scss'

import { getArticleDetails } from '../../NewsService.js'

class NewsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: undefined
    }
  }

  componentDidMount() {
    getArticleDetails(this.props.match.params.articleId).then(res => {
      this.setState({article: res})
    })
  }

  render() {
    const { article } = this.state
    const date = new Date(article.publish_date)
    const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  
    return (
      article && (
        <div className="news-wrapper">
          <div className="title">{article.deck}</div>
          <div className="date">
              <span>{parsedDate}</span>
              <span>{parsedTime}</span>
          </div>
          {/*<img src={newsItem.enclosure["-url"]} className="thumbnail" alt="thumbnail" />*/}
          <div dangerouslySetInnerHTML={{__html: article.body}}/>;
        </div>
      )
    )
  }
};

export default NewsItem;
