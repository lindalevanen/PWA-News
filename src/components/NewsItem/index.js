import React from 'react';

const NewsItem = (props) => {
  return (
    <div>
      News item with id {props.match.params.newsItemId}
    </div>
  )
};

export default NewsItem;
