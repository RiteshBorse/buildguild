import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom';
const Navbar = ({auth}) => {
  const user = auth;
  return (
    <div className='z-20 font-roboto flex items-center h-fit w-full justify-between px-11 py-4 shadow-lg fixed top-0 left-0 right-0 bg-white'>
         <Link to="/"><h1 className='text-4xl font-bold'>buildguild</h1></Link>
        <div className='flex text-xl items-center gap-6'>
           <Link to="/"> <Button className='text-lg font-light' variant="ghost">Home</Button></Link>
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