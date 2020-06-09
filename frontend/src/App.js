import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import ImageEdit from './components/images/ImageEdit'
import MemeView from './components/images/MemeView'


function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit/:id/meme" component={MemeView} />
        <Route exact path="/edit/:id" component={ImageEdit} />
      </Switch>
    </BrowserRouter>

  )
}

export default App