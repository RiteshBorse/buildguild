import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUp } from '@/schema/signUpSchema'
import React , {useState} from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
    const [data, setdata] = useState({})
    const [errors, seterrors] = useState({})
    const { register , handleSubmit  } = useForm();
    const onSubmit = (data) => {
        const result = signUp.safeParse(data);
        if (!result.success) {
          const fieldError = result.error.formErrors.fieldErrors;
          seterrors(fieldError);
          return;
        }
        setdata(data);
        seterrors({});
    }
  return (
    <div className='w-full h-screen pt-[100px] px-16 py-10 flex flex-col'>
      <form action="" className='flex flex-col gap-4 w-2/3 self-center'>
        <h1 className='text-4xl '>Profile</h1>
        <Input placeholder="Enter First Name"/>
        <Input placeholder="Enter Middle Name"/>
        <Input placeholder="Enter Last Name"/>
        <Input placeholder="Enter Email"/>
        <Input placeholder="Enter Username"/>
        <Input placeholder="Enter City"/>
        <Input placeholder="Enter State"/>
        <Input placeholder="Enter Country"/>
        <Button className="mt-4 w-1/3 self-end">Update Profile</Button>
      </form>
    </div>
  )
}

export default Profile