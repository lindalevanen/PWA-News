import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Loader from '../common/Loader'

import './index.scss'

import { getArticles, loadMoreArticles, ITEM_LIMIT } from '../../NewsService.js'

const NewsLine = ({ item }) => {
  const date = new Date(item.publish_date)
  const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  
  return (
    <Link to={`/${item.id}`} className='news-item'>
      <div className="line-content">
        <span>{item.title}</span>
        <div className="date">
          <span>{parsedDate} </span>
          <span>{parsedTime}</span>
        </div>
      </div>
      <div className="image-container">
        <img src={item.image.screen_tiny} className="thumbnail" alt="thumbnail" />
      </div>
    </Link>
  )
}

class NewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      amount: ITEM_LIMIT,
      loading: false,
      firstPatchReady: false
    }
  }

  componentDidMount() {
    const { news } = this.props
    if(news.length === 0) {
      this.setState({loading: true})
      getArticles().then(res => {
        if(res) {
          this.setState({ loading: false, firstPatchReady: true })
          this.props.loadedNews(res)
        }
      })
    } else {
      this.setState({ firstPatchReady: true })
    }
  }

  loadMore = () => {
    this.setState({loading: true})
    const firstPostPubDate = this.props.news[0].publish_date.trim().replace(' ', 'T')
    loadMoreArticles(this.state.amount, firstPostPubDate).then(res => {
      if(res) {
        this.props.loadedNews(res)
        this.setState(prevState => ({
          amount: prevState.amount + ITEM_LIMIT,
          loading: false
        }))  
      }
    })
  }

  render() {
    const { news } = this.props

    return (
      <>
        <Loader loading={this.state.loading} />
        <div className='news-list'>
          {news.map(item => (
            <NewsLine item={item} key={item.id} />
          ))}
          {this.state.firstPatchReady && (
            <button 
              className='load-more-button'
              onClick={() => !this.state.loading && this.loadMore()}>
              Load more
            </button>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadedNews: (news) => dispatch({type: "SET_NEWS", news: news})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
