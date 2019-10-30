import React from 'react';
import { Link } from "react-router-dom";

import { getArticles, loadMoreArticles } from '../../NewsService.js'

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
    return (
      <div>
        <ul>
          {this.state.items.map((item) => (
            <li key={item.id} style={{marginBottom: '10px'}}>
              <img src={item.image.square_tiny} alt='' />
              <div>
                <span>{item.publish_date}</span>
              </div>
              <div>
                <Link to={`/${item.id}`}>{item.deck}</Link>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={this.loadMore}>Load more</button>
      </div>
  
    )
  }
}

export default NewsList;
