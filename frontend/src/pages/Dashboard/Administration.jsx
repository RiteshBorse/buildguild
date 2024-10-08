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
    <div className="w-full h-screen pt-[85px] px-8 py-10">
      <div className="flex items-center w-full h-fit">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          {buttonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${selection === option.value ? "bg-gray-200" : ""}`}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
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
      className="flex flex-col gap-4 w-full "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-bold my-2">Main Info</h1>
      <div className="flex items-center gap-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          {...register("code", { required: "Code is required" })}
          placeholder="Code"
          className="w-1/3"
        />
        {errors.code && (
          <span className="text-red-500 text-sm">{errors.code.message}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          {...register("type_info", { required: "Type is required" })}
          placeholder="Type"
          className="w-1/3"
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
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="start-financial-year">Start Financial Year</Label>
        <Input
          id="start-date"
          type="date"
          {...register("start_fin_year")}
          placeholder="Start Date"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Description"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="belongs-to">Belongs to</Label>
        <Input
          id="belongs-to"
          {...register("belongs_to")}
          placeholder="Belongs to"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="zone">Zone</Label>
        <Input
          id="zone"
          {...register("zone")}
          placeholder="Zone"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="start_date">Start Date</Label>
        <Input
          id="start-date"
          type="date"
          {...register("startDate")}
          className="w-1/3"
        />
      </div>

      <Button type="submit" className="mt-4">
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
      className="flex flex-col gap-4 w-full "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-bold my-2">Address</h1>
      <div className="flex items-center gap-2">
        <Label htmlFor="address_info">Address Info</Label>
        <Input
          id="address_info"
          {...register("address_info", {
            required: "Address info is required",
          })}
          placeholder="Address Info"
          className="w-1/3"
        />
        {errors.address_info && (
          <span className="text-red-500 text-sm">
            {errors.address_info.message}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          {...register("city", { required: "City is required" })}
          placeholder="City"
          className="w-1/3"
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          {...register("state")}
          placeholder="State"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          {...register("country")}
          placeholder="Country"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input
          id="postal_code"
          {...register("postal_code")}
          placeholder="Postal Code"
          className="w-1/3"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register("location")}
          placeholder="Google Maps Location"
          className="w-1/3"
        />
      </div>

      <Button type="submit" className="mt-4">
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
      className="flex flex-col gap-4 w-full px-20 bg-gray-200 p-5 rounded-b-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold my-2 pl-12">Contact</h1>
      <div className="flex items-center gap-2">
        <Label htmlFor="name">Name :</Label>
        <Input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="w-1/3  bg-gray-100"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="email">Email :</Label>
        <Input
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="w-1/3 bg-gray-100"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="contact_number">Contact Number :</Label>
        <Input
          id="contact_number"
          {...register("contact_number")}
          placeholder="Contact Number"
          className="w-1/3  bg-gray-100"
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="effective_from">Effective From :</Label>
        <Input
          id="effective_from"
          type="date"
          {...register("effective_from")}
          placeholder="Effective From"
          className="w-1/3  bg-gray-100"
        />
      </div>

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default Administration;
