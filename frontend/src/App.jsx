import React from 'react'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
const App = () => {
  return (
    <div>
      <Navbar auth={true}/>
       <Signup/>
    </div>
  )
}

export default App