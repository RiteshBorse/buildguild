import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/context/authContext";
import { apiVerify } from "@/schema/apiSchema";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { CrossIcon, Verified } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const { user , isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        data
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
  };
  if(!isAuthenticated){
    return(
      <div className="flex items-center w-full h-screen justify-center">Access Blocked</div>
    )
  }
  return (
    <div className="w-full h-screen pt-[100px] px-16 py-10 flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-2/3 self-center"
      >
        <h1 className="text-4xl ">Profile</h1>
        <div className="bg-gray-100 px-4 py-4 flex gap-4 w-full rounded-md relative">
          <div className=" flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </div>
          <div>
            <p className="text-2xl ">{user.firstName}</p>
            <p className="text-md font-light">{user.email}</p>
          </div>
          <div className="absolute right-3 top-5">
            {user.verified ? (
              <div className="flex items-center gap-2 border-[0.5px] border-green-600 p-2 rounded-md px-4">
                <p>Verified</p>{" "}
                <Verified className="text-white bg-green-600 rounded-full size-8 p-1" />
              </div>
            ) : (
              <div className="flex items-center gap-2 border-[0.5px] border-red-600 p-2 rounded-md px-4">
                <p>Not Verified</p>{" "}
                <CrossIcon className="rotate-45 text-white bg-red-600 rounded-full size-8 p-1" />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
        <Input placeholder="Update First Name" {...register("firstName")} />
        <Input placeholder="Update Middle Name" {...register("middleName")} />
        <Input placeholder="Update Last Name" {...register("lastName")} />
        </div>
        <Input placeholder="Update Username" {...register("username")} />
        <Input placeholder="Update City" {...register("city")} />
        <Input placeholder="Update State" {...register("state")} />
        <Input placeholder="Update Country" {...register("country")} />
        <Input placeholder="Enter Password" {...register("password")} />
        {
          user.verified ? <Button type="submit" className="mt-2 w-1/3 self-end">
          Update Profile
        </Button> : <p className="text-red-600">Verify your Account to Update Details</p>
        }
        
      </form>
    </div>
  );
};

export default Profile;
