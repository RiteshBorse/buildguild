import React from 'react'
import { Button } from './ui/button'
const Navbar = ({auth}) => {
  const user = auth;
  return (
    <div className='font-roboto flex items-center h-fit w-full justify-between px-11 py-4 shadow-lg'>
        <h1 className='text-4xl font-bold'>buildguild</h1>
        <div className='flex text-xl items-center gap-6'>
            <Button className='text-lg font-light' variant="ghost">Home</Button>
            <Button className='text-lg font-light' variant="ghost">Features</Button>
            <Button className='text-lg font-light' variant="ghost">About</Button>
            <Button className='text-lg font-light' variant="ghost">Contact Us</Button>
            {
              !user ? <Button className='text-lg font-light'>Login</Button> : 
                     <Button className='text-lg font-light' variant='outline'>Logout</Button>
            }
           
        </div>
    </div>
  )
}

export default Navbar