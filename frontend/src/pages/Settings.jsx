import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useAuth from '@/context/authContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { apiVerify } from '@/schema/apiSchema'
import { toast } from 'sonner'

const Settings = () => {
  const { isAuthenticated , user , useAuthLogin } = useAuth();
  const [password, setpassword] = useState("");
  if(!isAuthenticated){
    return(
      <div className="flex items-center w-full h-screen justify-center">Access Blocked</div>
    )
  }
  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/delete`,
        { password }
      );
      if (!apiVerify(res)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      if (!apiVerify(response)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      toast.error(response.data.message);
    }
  }
  return (
    <div className='pt-[100px] p-4 flex flex-col w-full'>
        <div className='flex flex-col self-center w-2/3 gap-5'>
        <p className='text-4xl'>Delete your Account</p>
        <p>Are your surely want to delete your account ? This task cannnot be undone . Our servers doesn't retain data.</p>
        <Input value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter password to confirm" />
        <Button onClick={handleClick}>Verify OTP</Button>
        </div>
    </div>
  )
}

export default Settings