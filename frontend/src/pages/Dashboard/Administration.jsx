import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiVerify } from "@/schema/apiSchema";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Administration = () => {
  const [selection, setSelection] = useState("main-info");
  const { id } = useParams();
  const handleClick = (value) => {
    setSelection(value);
  };
  



  const buttonOptions = [
    { label: "Main Info", value: "main-info" },
    { label: "Address", value: "address" },
    { label: "Contact", value: "contact" },
    { label: "Attachment", value: "attachment" },
    { label: "Extra Info", value: "extra-info" },
  ];

  return (
    <div className="w-full h-screen pt-[85px] px-2 md:px-8 py-10">
      <div className="flex md:flex-row items-center md:items-start w-full h-fit my-1">
        <Sidebar />
        <div className="w-full md:flex flex-wrap justify-center gap-1 hidden md:gap-10 " >
          {buttonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${selection === option.value ? "bg-gray-200"  : ""}`}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        
        <div className="md:hidden flex ml-auto ">
           <DropdownMenu >
            <DropdownMenuTrigger >
              <Button className="bg-gray-100 hover:font-normal text-black border-2 hover:text-white">Sections </Button>
            </DropdownMenuTrigger>
           <DropdownMenuContent> 
           {buttonOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => handleClick(option.value)}>
              {option.label}
            </DropdownMenuItem>
            ))}
            </DropdownMenuContent>    
           </DropdownMenu>
        </div>
     </div>

      <Separator />
      {selection === "main-info" && <MainInfo id={id} />}
      {selection === "address" && <Address id={id} />}
      {selection === "contact" && <Contact id={id} />}
      {selection === "attachment" && <div>Attachment</div>}
      {selection === "extra-info" && <div>Extra Info</div>}
    </div>

  );
};

const MainInfo = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/administration/main-info/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success("Main Info Updated");
    } catch (error) {
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

  return (
    <form 
      className="flex flex-col gap-4 w-full bg-gray-100 mt-2 rounded-lg p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl mb-2 font-bold">Main Info </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  mx-6 gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="belongs-to">Belongs to</Label>
          <Input
            id="belongs-to"
            {...register("belongs_to")}
            placeholder="Belongs to"
            className="md:mr-20"
          />
        </div>

        <div className="flex items-center gap-6 md:gap-2 ">
        <Label htmlFor="code">Code</Label>
        <div className="flex flex-col w-full md:mr-20">
        <Input
            id="code"
            {...register("code", { required: "Code is required" })}
            placeholder="Code"
          />
          {errors.code && (
            <span className="text-red-500 text-sm">{errors.code.message}</span>
          )}
        </div>
        </div>

        

        <div className="flex items-center gap-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            {...register("startDate")}
            className=" md:mr-20"
          />
        </div>

        <div className="flex items-center gap-7 md:gap-2">
       
        <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            {...register("type_info", { required: "Type is required" })}
            placeholder="Type"
            className=" md:mr-20"
          />
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
        <Label htmlFor="segment">Segment</Label>
          <Input
            id="segment"
            {...register("segment")}
            placeholder="Segment"
            className=" md:mr-20"
          />
         
        </div>

        <div className="flex items-center gap-8 md:gap-2">
          <Label htmlFor="zone">Zone</Label>
          <Input
            id="zone"
            {...register("zone")}
            placeholder="Zone"
            className="md:mr-20"
          />
        </div>

        <div className="flex items-center gap-2">
        <Label htmlFor="start-financial-year">Start Financial Year</Label>
          <Input
            id="start-financial-year"
            type="date"
            {...register("start_fin_year")}
            placeholder="Start Date"
            className=" md:mr-20 "
          />

        </div>
      </div>

      <div className="flex items-center mx-6 gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Description"
          className=" md:mr-20"
        />
      </div>
      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

const Address = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/administration/address/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success("Address Updated");
    } catch (error) {
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

  return (
    <form
 className="flex flex-col gap-4 w-full bg-gray-100 mt-2 rounded-lg p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl mb-2 font-bold">Address</h1>
      <div className="flex flex-col mx-6 w-[80%] md:w-[70%] gap-4 ">

       <div className="flex w-full items-center">
            <Label htmlFor="address_info">Address Info</Label>
         <div className="w-full">
         <Input
          id="address_info"
          {...register("address_info", {
            required: "Address info is required",
          })}
          placeholder="Address Info"
          
          />
          {errors.address_info && (
          <span className="text-red-500 text-sm ">
            {errors.address_info.message}
          </span>
          )}
         </div>  
       </div>

     
          <div className="flex w-full items-center gap-10 ">
            <Label htmlFor="city">City</Label>
         <div className="w-full">
         <Input
          id="city"
          {...register("city", {
            required: "City is required",
          })}
          placeholder="City"
        
          />
          {errors.address_info && (
          <span className="text-red-500 text-sm ">
            {errors.city.message}
          </span>
          )}
         
         </div>  
       </div>

      <div className="flex items-center gap-8">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          {...register("state")}
          placeholder="State"
        />
      </div>
    
      <div className="flex items-center gap-4">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          {...register("country")}
          placeholder="Country"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-0">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input
          id="postal_code"
          {...register("postal_code")}
          placeholder="Postal Code"       
        />
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register("location")}
          placeholder="Google Maps Location"    
        />
      </div>
   </div>
      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

const Contact = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/administration/contact/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success("Contact Updated");
    } catch (error) {
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

  return (
    <form
     className="flex flex-col gap-4 w-full bg-gray-100 mt-2 rounded-lg p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl mb-2 font-bold">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-6  gap-4">


      <div className="flex items-center gap-9 md:gap-3 md:w-[80%]  md:mr-10">
        <Label htmlFor="name">Name </Label>
        <div className=" w-full">
        <Input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
           
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        </div>
      
      </div>

      <div className="flex items-center md:w-[80%] md:mr-10">
        <Label htmlFor="contact_number">Contact Number </Label>
        <Input
          id="contact_number"
          {...register("contact_number")}
          placeholder="Contact Number"
        
        />
      </div>
      <div className="flex items-center gap-10 md:mr-10 md:w-[80%]  md:gap-3">
        <Label htmlFor="email">Email </Label>
        <div className="w-full">
        <Input
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        </div>
      </div>

    
      <div className="flex items-center gap-2  md:w-[80%]  md:mr-10">
        <Label htmlFor="effective_from">Effective From </Label>
        <Input
          id="effective_from"
          type="date"
          {...register("effective_from")}
          placeholder="Effective From" 
        />
       </div>
      </div>
      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

export default Administration;
