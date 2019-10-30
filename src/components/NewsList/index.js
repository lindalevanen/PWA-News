import React from 'react';
import { Link } from "react-router-dom";
import './index.scss'

import { getArticles, loadMoreArticles } from '../../NewsService.js'

const NewsBlock = ({ item }) => {
  const date = new Date(item.publish_date)
  const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  
  return (
    <Link to={`/${item.id}`} className='news-item'>
      <div className="content">
        <span>{item.deck}</span>
        <div className="date">
          <span>{parsedDate} </span>
          <span>{parsedTime}</span>
        </div>
      </div>
      <div className="image-container">
        <img src={item.image.square_tiny} className="thumbnail" alt="thumbnail" />
      </div>
    </Link>
  )
}

class NewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      amount: 5
    }
  }

  componentDidMount() {
    getArticles().then(res => {
      this.setState({ items: res })
    })
  }

  loadMore = () => {
    loadMoreArticles(this.state.amount).then(res => {
      this.setState(prevState => ({
        items: prevState.items.concat(res),
        amount: prevState.amount + 5
      }))
    })
  }  
  render() {
    const { items } = this.state

    return (
      <div className='news-list'>
        {items.map(item => (
          <NewsBlock item={item} key={item.id} />
        ))}
        <button onClick={this.loadMore}>Load more</button>
      </div>
    )
  }
}

export default NewsList;
