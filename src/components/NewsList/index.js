import React from 'react';
import { Link } from "react-router-dom";
import { Header } from '../common/Header.js'
import './index.scss'

import { getArticles, loadMoreArticles } from '../../NewsService.js'

const NewsBlock = ({ item }) => {
  const date = new Date(item.publish_date)
  const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  
  return (
    <Link to={`/${item.id}`} className='news-item'>
      <div className="content">
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
      amount: 5,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    getArticles().then(res => {
      this.setState({ items: res, loading: false })
    })
  }

  loadMore = () => {
    this.setState({loading: true})
    const firstPostPubDate = this.state.items[0].publish_date.trim().replace(' ', 'T')
    loadMoreArticles(this.state.amount, firstPostPubDate).then(res => {
      this.setState(prevState => ({
        items: prevState.items.concat(res),
        amount: prevState.amount + 5,
        loading: false
      }))
    })
  }

  render() {
    const { items } = this.state

    return (
      <>
        <Header />
        <div className='news-list'>
          {items.map(item => (
            <NewsBlock item={item} key={item.id} />
          ))}
          <button onClick={() => !this.state.loading && this.loadMore()}>Load more</button>
        </div>
      </>
    )
  }
}

export default NewsList;
