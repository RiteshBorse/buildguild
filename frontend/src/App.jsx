import React from 'react'
import Navbar from './components/Navbar'

import Explore from './components/Explore'



const App = () => {
  return (
    <div>
      <Navbar auth={false}/>
       <Explore/>
    </div>
  )
}

export default App