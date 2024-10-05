import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiVerify } from "@/schema/apiSchema";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "@/context/authContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const [data, setdata] = useState({});
  const [Otp, setOtp] = useState("");
  const { handleSubmit, register, watch } = useForm();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgotpassword`,
        data
      );
      if (!apiVerify(res)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      toast.success(res.data.message);
      setdata(data);
      setisOpen(true);
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
  const getOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgotpassword/verifyOtp`,
        {
          otp: Otp,
          newPassword: data.password,
          email: data.email,
        }
      );
      if (!apiVerify(res)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      setisOpen(false);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      const { response } = error;
      if (!response) {
        console.log(error);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-5 w-full pt-[100px]">
          <div className="flex flex-col self-center w-[80%] sm:w-1/2 gap-8 sm:gap-6">
            <h1 className="text-4xl">Reset your Password</h1>
            <Input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <Input
              type="password"
              placeholder="Enter New Password"
              {...register("password")}
            />
            <Button type="submit">Get OTP</Button>
          </div>
        </div>
      </form>
      {isOpen && (
        <Dialog open={isOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>OTP Verification</DialogTitle>
              <DialogDescription className="flex flex-col gap-4 py-4 items-center">
                <Input
                  type="number"
                  className="w-1/2 self-center"
                  placeholder="OTP"
                  value={Otp}
                  onChange={(event) => {
                    setOtp(event.target.value);
                  }}
                />
                <Button onClick={getOtp} className="w-1/2">
                  Verify
                </Button>
                <div className="flex items-center">
                  <p>Didn't Recieve OTP </p>
                  <Button variant="link">Resend</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ForgotPassword;
