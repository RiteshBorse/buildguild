import React from 'react'
import Navbar from './components/Navbar'
import ProjectList from './pages/ProjectList'

const App = () => {
  return (
    <div>
      <Navbar auth={false}/>
       <ProjectList/>
    </div>
  )
}

export default App