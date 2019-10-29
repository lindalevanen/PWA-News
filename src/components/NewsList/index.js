import React from 'react';
import { Link } from "react-router-dom";
import { dummyNews } from "./dummyNews.js"
import './index.scss'

const NewsBlock = ({ newsItem }) => {
  const date = new Date(newsItem.pubDate)
  const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const parsedTime = `${date.getHours()}.${date.getMinutes()}`
  const id = newsItem.guid['#text'].split('/')[4]
  
  return (
    <Link to={`/${id}`} className='news-item'>
      <div className="content">
        <span>{newsItem.title}</span>
        <div className="date">
          <span>{parsedDate} </span>
          <span>{parsedTime}</span>
        </div>
      </div>
      <div className="image-container">
        <img src={newsItem.enclosure["-url"]} className="thumbnail" alt="thumbnail" />
      </div>
    </Link>
  )
}

const NewsList = () => {
  const newsItems = dummyNews.rss.channel.item

  return (
    <div className='news-list'>
      {newsItems.map(newsItem => (
        <NewsBlock newsItem={newsItem} key={newsItem.title} />
      ))}
    </div>
  )
}

export default NewsList;
