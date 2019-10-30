import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NewsItem from './components/NewsItem'
import NewsList from './components/NewsList'
import './index.css';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:articleId" component={NewsItem} />
          <Route path="/" component={NewsList} />
        </Switch>
      </Router>
    )
  }
}

export default Routes;
