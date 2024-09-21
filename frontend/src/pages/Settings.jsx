import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Settings = () => {
  return (
    <div className='pt-[100px] p-4 flex flex-col w-full'>
        <div className='flex flex-col self-center w-2/3 gap-5'>
        <p className='text-4xl'>Delete your Account</p>
        <p>Are your surely want to delete your account ? This task cannnot be undone . Our servers doesn't retain data.</p>
        <Input placeholder="Enter password to confirm"/>
        <Button>Verify OTP</Button>
        </div>
    </div>
  )
}

export default Settings