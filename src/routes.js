import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NewsItem from './components/NewsItem'
import NewsList from './components/NewsList'
import './index.css';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/:newsItemId" component={NewsItem} />
      <Route path="/" component={NewsList} />
    </Switch>
  </Router>
);

export default Routes;
