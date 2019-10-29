import React from 'react';
import './index.scss'

const NewsItem = (props) => {
  const newsItem = (props.location.state.news);
  const date = new Date(newsItem.pubDate)
  const parsedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const parsedTime = `${date.getHours()}.${date.getMinutes()}`

  return (
    <div className="news-wrapper">
      <div className="title">{newsItem.title}</div>
      <div className="description">{newsItem.description}</div>
      <div className="date">
          <span>{parsedDate}</span>
          <span>{parsedTime}</span>
      </div>
      <img src={newsItem.enclosure["-url"]} className="thumbnail" alt="thumbnail" />
      <div dangerouslySetInnerHTML={{__html: newsItem['content:encoded']}}/>;
    </div>
  )
};

export default NewsItem;
