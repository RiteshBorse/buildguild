import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiVerify } from '@/schema/apiSchema'
import axios from 'axios'
import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Profile = () => {
    const { register , handleSubmit  } = useForm();
    const onSubmit = async (data) => {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          data
        );
        if (!apiVerify(res)) {
          toast.warning("Api Error , Please contact admin");
          return;
        }
        toast.success(res.data.message);
      } catch (error) {
        console.log(error)
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
    <div className='w-full h-screen pt-[100px] px-16 py-10 flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-2/3 self-center'>
        <h1 className='text-4xl '>Profile</h1>
        <Input placeholder="Enter First Name" {...register("firstName")}/>
        <Input placeholder="Enter Middle Name"{...register("middleName")} />
        <Input placeholder="Enter Last Name" {...register("lastName")}/>
        <Input placeholder="Enter Username" {...register("username")}/>
        <Input placeholder="Enter Email" {...register("email")}/>
        <Input placeholder="Enter City" {...register("city")}/>
        <Input placeholder="Enter State" {...register("state")}/>
        <Input placeholder="Enter Country" {...register("country")}/>
        <Input placeholder="Enter Password" {...register("password")}/>
        
        <Button type="submit" className="mt-4 w-1/3 self-end">Update Profile</Button>
      </form>
    </div>
  )
}

export default Profile