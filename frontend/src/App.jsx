import React from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/landing'
const App = () => {
  return (
    <div>
      <Navbar auth={false}/>
      <Landing></Landing>
    </div>
  )
}

export default App