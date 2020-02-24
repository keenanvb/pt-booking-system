import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
// import Footer from './components/layout/Footer'
import Routes from './components/routing/Routes'
import IdleTimer from 'react-idle-timer'


import './App.css';
import setAuthToken from './utils/setAuthToken'
import { loadUser, logout, setAlert } from './actions'


//Redux
import { Provider } from 'react-redux'
import store from './store'

// import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import Sidenav from './components/sidenav'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []) //},[]) will run once ie componentDidMount



  const idleTimer = React.useRef()

  const onAction = (e) => {
    console.log('user did something', e);
  }

  const onIdle = (e) => {
    // console.log('last active', idleTimer.current.getLastActiveTime())
  }

  const onActive = (e) => {
    // console.log('user is active', e)
    // console.log('time remaining', idleTimer.current.getRemainingTime())
    let remainingTime = idleTimer.current.getRemainingTime();

    const state = store.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    if (remainingTime === 0 && isAuthenticated) {
      store.dispatch(logout())
      store.dispatch(setAlert('User has been logged out', 'danger'))
    }
  }

  return (
    <Provider store={store}>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onActive={(e) => { onActive(e) }}
        onIdle={(e) => { onIdle(e) }}
        onAction={(e) => { onAction(e) }}
        debounce={250}
        timeout={600000} />
      <Router>
        <Fragment>
          <Navbar />
          {/* <Sidenav /> */}
          {/* <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                timeout={300}
                classNames='fade'
                key={location.key}
              >
                <Switch location={location}> */}
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route component={Routes} />

          </Switch>
          {/* </CSSTransition>
            </TransitionGroup>
          )}/> */}
          {/* <Footer /> */}
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
