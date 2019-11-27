import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './store/reducers'

import BaseLayout from './components/BaseLayout'
import NewsItem from './components/NewsItem'
import NewsList from './components/NewsList'
import './index.scss';


const store = createStore(rootReducer)

class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <BaseLayout>
            <Switch>
              <Route path="/:articleId" component={NewsItem} />
              <Route path="/" component={NewsList} />
            </Switch>

          </BaseLayout>
        </Router>
      </Provider>
    )
  }
}

export default Routes;
