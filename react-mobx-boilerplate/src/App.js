import React from 'react';
import { observable } from 'mobx'
import {observer, Provider} from 'mobx-react'
import { create } from 'mobx-persist'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { stores } from './stores'
import './App.css';

import ScrollToTop from './components/fragments/ScrollTop'
import MainPage from './pages/MainPage'
import TestPage from './pages/TestPage'

const browserHistory = createBrowserHistory()

@observer
export default class App extends React.Component {
  @observable isLoadStore
  constructor(props) {
    super(props)

    this.isLoadStore = false
  }

  async componentWillMount() {
    const hydrate = create()
    await hydrate('userStore', stores.userStore)
      .then(() => {
        this.isLoadStore = true
      })
  }

  render() {
    return (
      <Provider {...stores}>
        <Router history={browserHistory}>
          <ScrollToTop>
            {
              this.isLoadStore ?
                <Switch>
                  <Route exact path="/" component={MainPage} />
                  <Route path="/test" component={TestPage} />
                </Switch>
                :
                null
            }
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}
