import React, {useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home.js'
import Signin from './components/Signin.js'

const App = () => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

const renderHome = () => (
<Home user={user} setUser={setUser} />
)

const renderSignin = () => (
<Signin user={user} setUser={setUser} />
)

return(
<Router>
  <Route path="/" exact render={renderHome} />
  <Route path="/signin" render={renderSignin} />
</Router>
)
}

export default App;