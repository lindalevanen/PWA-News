import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import BaseLayout from './components/BaseLayout'
import NewsItem from './components/NewsItem'
import NewsList from './components/NewsList'
import './index.scss';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <BaseLayout>
          <Switch>
            <Route path="/:articleId" component={NewsItem} />
            <Route path="/" component={NewsList} />
          </Switch>

        </BaseLayout>
      </Router>
    )
  }
}

export default Routes;
