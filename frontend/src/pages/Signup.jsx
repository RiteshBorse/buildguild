import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/schema/loginSchema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signUp } from "@/schema/signUpSchema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const [errors, seterrors] = useState({});
  const { handleSubmit, register, watch } = useForm();
  const onSubmit = (data) => {
    const result = signUp.safeParse(data);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      seterrors(fieldError);
      return;
    }
    seterrors({});
    toast.success("Account Created Successfully")
    console.log(data);
  };

  return (
    <>
      
        <h1 className="text-4xl font-bold ">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-around self-start gap-8 w-2/3 mt-2 flex-col"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col">
              <Input
                style="custom"
                placeholder="Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.firstName}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                placeholder="Middle Name"
                {...register("middleName")}
              />
              {errors.middleName && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.middleName}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.lastName}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  gap-6">
            <div className="flex flex-col">
              <Input
                style="custom"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.username}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input style="custom" placeholder="OTP" {...register("otp")} />
              {errors.otp && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.otp}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  gap-6">
            <div className="flex flex-col">
              <Input style="custom" placeholder="City" {...register("city")} />
              {errors.city && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.city}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                placeholder="State"
                {...register("state")}
              />
              {errors.state && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.state}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                placeholder="Country"
                {...register("country")}
              />
              {errors.country && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.country}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  gap-6 self-start">
            <div className="flex flex-col">
              <Input
                style="custom"
                type="password"
                placeholder="Set Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.password}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                style="custom"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.password && (
                <span className="text-red-600 text-sm self-center">
                  *{errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="dark font-bold text-lg">
            SignUp
          </Button>
        </form>
    </>
  );
};

const LoginForm = () => {
  const {handleSubmit , register } = useForm();
  const [errors, seterrors] = useState({})
  const onSubmit = (data) => {
    const result = login.safeParse(data);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      seterrors(fieldError);
      return;
    }
    seterrors({});
    toast.success("Login Successfully")
  }
  return (
    <div className="flex flex-col self-center">
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
            <SheetDescription className="w-full">
              <form className="flex flex-col w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
                  <Input placeholder="Username" {...register("username")} />
                  {errors.username && (
                    <span className="text-red-600 text-sm self-center">
                      *{errors.username}
                    </span>
                  )}
                  <Input placeholder="Password" {...register("password")} />
                  {errors.password && (
                    <span className="text-red-600 text-sm self-center">
                      *{errors.password}
                    </span>
                  )}
                  <Button type="submit">Login</Button>
                </form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="h-fit px-16 py-10 w-full pt-[100px] min-h-screen bg-[#151515] text-white flex flex-col gap-10">
      <SignUpForm />
      <LoginForm/>
    </div>
  );
};

export default Signup;
