import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "sonner";
const Signup = () => {
  return (
    <>
      <div className="h-fit px-16 py-10 w-full pt-[100px] min-h-screen bg-[#151515] text-white flex flex-col gap-10">
        <h1 className="text-4xl font-bold ">Sign Up</h1>
        <div className="flex justify-around self-start gap-8 w-2/3 mt-2 flex-col">
          <div className="flex flex-col sm:flex-row gap-6">
            <Input style="custom" placeholder="Name" />
            <Input style="custom" placeholder="Middle Name" />
            <Input style="custom" placeholder="Last Name" />
          </div>
          <div className="flex flex-col sm:flex-row  gap-6">
            <Input style="custom" type="email" placeholder="Email" />
            <Input style="custom" type="text" placeholder="Username" />
            <Input style="custom" placeholder="OTP" />
          </div>
          <div className="flex flex-col sm:flex-row  gap-6">
            <Input style="custom" placeholder="City" />
            <Input style="custom" placeholder="State" />
            <Input style="custom" placeholder="Country" />
          </div>
          <div className="flex flex-col sm:flex-row  gap-6 self-start">
            <Input
              style="custom"
              type="password"
              placeholder="Set Password"
            ></Input>
            <Input
              style="custom"
              type="password"
              placeholder="Confirm Password"
            ></Input>
          </div>
        </div>
        <div className="flex flex-col self-center">
          <Button
            className="dark font-bold text-lg"
            onClick={() => toast.success("Account created Successfully")}
          >
            SignUp
          </Button>
          <Sheet>
            <p className="text-lg">
              Already have an account ?
              <SheetTrigger>
                <Button className="text-white font-bold text-lg" variant="link">
                  Login
                </Button>
              </SheetTrigger>
            </p>
            <SheetContent side="bottom">
              <SheetHeader className="flex flex-col mx-auto items-center justify-center w-[80%] sm:w-1/3 my-10  gap-5">
                <SheetTitle>
                  <p className="text-3xl">Login</p>
                </SheetTitle>
                <SheetDescription className="flex flex-col w-full gap-6">
                  <Input placeholder="Username" />
                  <Input placeholder="Password" />
                  <Button>Login</Button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Signup;
