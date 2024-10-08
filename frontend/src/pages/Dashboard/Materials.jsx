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

const Materials = () => {
  const [selection, setSelection] = useState("main-info");
  const { id } = useParams();
  const handleClick = (value) => {
    setSelection(value);
  };

  const buttonOptions = [
    { label: "Main Info", value: "main-info" },
    { label: "Item Info", value: "item-info" },
    { label: "Billing Term", value: "billing-term" },
    { label: "Attachment", value: "attachment" },
    { label: "Approval History", value: "approval-history" },
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
      {selection === "item-info" && <div>Item Info</div>}
      {selection === "billing-term" && <div>Billing Term</div>}
      {selection === "attachment" && <div>Attachment</div>}
      {selection === "approval-history" && <div>Approval History</div>}
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
        `${import.meta.env.VITE_API_URL}/materials/main-info/${id}`,
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

export default Materials