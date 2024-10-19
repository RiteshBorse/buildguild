import { useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Administration = () => {
  const [selection, setSelection] = useState("main-info");
  const { id } = useParams();
  console.log("ID from useParams:", id);

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
        <div className="w-full md:flex flex-wrap justify-center gap-1 hidden md:gap-10">
          {buttonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${
                selection === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="md:hidden flex ml-auto ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-gray-100 hover:font-normal text-black border-2 hover:text-white">
                Sections{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {buttonOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleClick(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />
      <div className={`transition-container ${selection}`}>
        {selection === "main-info" && <MainInfo id={id} />}
        {selection === "address" && <Address id={id} />}
        {selection === "contact" && <Contact id={id} />}
        {selection === "attachment" && <Attachment id={id} />}
        {selection === "extra-info" && <ExtraInfo id={id} />}
      </div>
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
        toast.warning("API Error, Please contact admin");
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

      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="belongs-to" className="mb-1">
            Belongs to
          </Label>
          <Input
            id="belongs-to"
            {...register("belongs_to")}
            placeholder="Belongs to"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="code" className="mb-1">
            Code
          </Label>
          <Input
            id="code"
            {...register("code", { required: "Code is required" })}
            placeholder="Code"
            className="w-full"
          />
          {errors.code && (
            <span className="text-red-500 text-sm">{errors.code.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="start_date" className="mb-1">
            Start Date
          </Label>
          <Input
            id="start_date"
            type="date"
            {...register("start_date")}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="type" className="mb-1">
            Type
          </Label>
          <Input
            id="type"
            {...register("type_info", { required: "Type is required" })}
            placeholder="Type"
            className="w-full"
          />
          {errors.type_info && (
            <span className="text-red-500 text-sm">
              {errors.type_info.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="segment" className="mb-1">
            Segment
          </Label>
          <Input
            id="segment"
            {...register("segment")}
            placeholder="Segment"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="zone" className="mb-1">
            Zone
          </Label>
          <Input
            id="zone"
            {...register("zone")}
            placeholder="Zone"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="start-financial-year" className="mb-1">
            Start Financial Year
          </Label>
          <Input
            id="start-financial-year"
            type="date"
            {...register("start_fin_year")}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mx-6 w-full sm:w-[50%]">
      
        <Label htmlFor="description" className="mb-1">
          Description
        </Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Description"
          className="w-full"
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
        toast.warning("API Error, Please contact admin");
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
      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">
     
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="address_info" className="mb-1">
            Address Info
          </Label>
          <Input
            id="address_info"
            {...register("address_info", {
              required: "Address info is required",
            })}
            placeholder="Address Info"
            className="w-full"
          />
          {errors.address_info && (
            <span className="text-red-500 text-sm">
              {errors.address_info.message}
            </span>
          )}
        </div>

     
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="city" className="mb-1">
            City
          </Label>
          <Input
            id="city"
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </div>


        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="state" className="mb-1">
            State
          </Label>
          <Input
            id="state"
            {...register("state")}
            placeholder="State"
            className="w-full"
          />
        </div>


        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="country" className="mb-1">
            Country
          </Label>
          <Input
            id="country"
            {...register("country")}
            placeholder="Country"
            className="w-full"
          />
        </div>

 
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="postal_code" className="mb-1">
            Postal Code
          </Label>
          <Input
            id="postal_code"
            {...register("postal_code")}
            placeholder="Postal Code"
            className="w-full"
          />
        </div>

      
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="location" className="mb-1">
            Location
          </Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="Google Maps Location"
            className="w-full"
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
        toast.warning("API Error, Please contact admin");
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
      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="name" className="mb-1">
            Name
          </Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

    
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="contact_number" className="mb-1">
            Contact Number
          </Label>
          <Input
            id="contact_number"
            {...register("contact_number")}
            placeholder="Contact Number"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="email" className="mb-1">
            Email
          </Label>
          <Input
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>


        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="effective_from" className="mb-1">
            Effective From
          </Label>
          <Input
            id="effective_from"
            type="date"
            {...register("effective_from")}
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

const ExtraInfo = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/administration/extra-info/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success("Extra Info Updated");
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      if (!apiVerify(response)) {
        toast.warning("API Error, Please contact admin");
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
      <h1 className="text-3xl mb-2 font-bold">Extra Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">
        {[
          {
            id: "company_status",
            label: "Company Status",
            placeholder: "Active/Inactive",
          },
          { id: "cst_no", label: "CST No", placeholder: "CST No" },
          { id: "pan_no", label: "PAN No", placeholder: "PAN No" },
          {
            id: "registration_number",
            label: "Registration Number",
            placeholder: "Registration Number",
          },
          { id: "gst_in", label: "GST IN", placeholder: "GST IN" },
          {
            id: "gst_type",
            label: "GST Type",
            placeholder: "Regular/Composite",
          },
          {
            id: "gstin_reg_date",
            label: "GSTIN Registration Date",
            type: "date",
          },
          {
            id: "gstin_effective_date",
            label: "GSTIN Effective Date",
            type: "date",
          },
          {
            id: "rera_registration_no",
            label: "RERA Registration No",
            placeholder: "RERA Registration No",
          },
        ].map(({ id, label, placeholder, type }) => (
          <div key={id} className="flex flex-col gap-1 w-full">
            <Label htmlFor={id} className="w-full mb-1">
              {label}
            </Label>
            <Input
              id={id}
              type={type || "text"}
              {...register(id, { required: `${label} is required` })}
              placeholder={placeholder}
              className="w-full"
            />
            {errors[id] && (
              <span className="text-red-500 text-sm">{errors[id].message}</span>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

const Attachment = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updatedData = new FormData();
    updatedData.append("uploadfile", data.uploadfile[0]);
    updatedData.append("qr_code", data.qrCode);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/administration/attachment/${id}`,
        updatedData
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success("Attachment Uploaded");
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      if (!apiVerify(response)) {
        toast.warning("API Error, Please contact admin");
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
      <h1 className="text-3xl mb-2 font-bold">Upload Attachment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-4">
      
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="uploadfile" className="w-full mb-1">
            Upload Logo
          </Label>
          <Input
            id="uploadfile"
            type="file"
            {...register("uploadfile", { required: "File is required" })}
            className="w-full"
          />
          {errors.uploadfile && (
            <span className="text-red-500 text-sm">
              {errors.uploadfile.message}
            </span>
          )}
        </div>

   
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="qrCode" className="w-full mb-1">
            QR Code
          </Label>
          <Input
            id="qrCode"
            type="text"
            {...register("qrCode", { required: "QR Code is required" })}
            className="w-full"
          />
          {errors.qrCode && (
            <span className="text-red-500 text-sm">
              {errors.qrCode.message}
            </span>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-4 self-center w-full md:w-[200px]">
        Submit
      </Button>
    </form>
  );
};

export default Administration;
