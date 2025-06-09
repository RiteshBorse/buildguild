import React from 'react'
import { IoIosWarning } from "react-icons/io";
export const Maintenaince = () => {
  return (
    <div className='bg-red-500 text-white h-8 w-full flex px-10 items-center justify-center text-bold text-xl z-50 mt-16 gap-2'>
        <IoIosWarning/><p>buildguild is going through emergency maintenaince</p>
    </div>
  )
}
