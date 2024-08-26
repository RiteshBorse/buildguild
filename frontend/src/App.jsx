import React from 'react'
import Navbar from './components/Navbar'
import ExploreInfo from './pages/ExploreInfo'
const App = () => {
  return (
    <div>
      <Navbar auth={false}/>
       <ExploreInfo/>
    </div>
  )
}

export default App