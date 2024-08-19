import React from 'react'
import { Button } from './ui/button'
const Navbar = () => {
  return (
    <div className=''>
        <h1 className=''>buildguild</h1>
        <div className=''>
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact Us</Button>
        </div>
    </div>
  )
}

export default Navbar