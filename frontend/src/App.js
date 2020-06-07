import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import ImageEdit from './components/images/ImageEdit'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit/:id" component={ImageEdit} />
      </Switch>
    </BrowserRouter>
  )
}

export default App