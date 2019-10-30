import React from 'react';

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

  createMarkup = (html) => (
      {__html: html}
  )

  render() {
    return (
      <div>
        {this.state.article && (
          <>
            <h1>{this.state.article.deck}</h1>
            <div dangerouslySetInnerHTML={this.createMarkup(this.state.article.body)} />
          </>
        )}
      </div>
    )
  }
};

export default NewsItem;
