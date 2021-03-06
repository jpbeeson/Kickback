import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


import NavBar from './components/NavBar/NavBar'
import Loading from './components/Loading/Loading'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Join from './pages/Join'
import Chat from './pages/Chat'
import Create from './pages/Create'

import "./app.css"


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div><Loading /></div>

  return (
      <div id="app">
      <h1 style={{color: '#31e89f', textShadow: '1px 1px #31e8e8', fontWeight: '600'}}>KickBack</h1>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/join' component={Join} />
            <Route exact path='/chat' component={Chat} />
            <Route exact path='/create' component={Create} />
            <Route path='*' component={Home} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
