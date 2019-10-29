import React from 'react';
import { Link } from "react-router-dom";
 
const NewsList = () => (
  <div>
    <ul>
      <li><Link to="/1">News item 1</Link></li>
      <li><Link to="/2">News item 2</Link></li>
    </ul>
  </div>
);

export default NewsList;
