import React, { useState } from "react";
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
import { z } from "zod";
import { toast } from "sonner";

const Signup = () => {
  const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    middleName: z.string().trim().optional(), // Made middleName optional
    lastName: z.string().trim().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    otp: z.string().trim().min(6, "OTP must be 6 characters"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Confirm password must be at least 8 characters")
      ,
    city: z.string().trim().min(2, "City is Required"),
    state: z.string().trim().min(2, "State is Required"),
    country: z.string().trim().min(2, "Country is Required"),
  });

  const [formData, setFormData] = useState({
    name: "",
    middleName: "",
    lastName: "",
    email: "",
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState({}); // Use `errors` for clarity

  const handleSubmit = (e) => {
    e.preventDefault();
      const validatedData = formSchema.safeParse(formData);
      if (!validatedData.success) {
        // Handle validation errors
        const fieldErrors = validatedData.error.formErrors.fieldErrors;
        setErrors(fieldErrors);
        return;
      }
      console.log("Form data is valid:", validatedData.data); // Log the validated data
      toast.success("Account Created Successfully");
  };

  return (
    <>
      <div className="h-fit px-16 py-10 w-full pt-[100px] min-h-screen bg-[#151515] text-white flex flex-col gap-10">
        <h1 className="text-4xl font-bold ">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-around self-start gap-8 w-2/3 mt-2 flex-col"
        >
          <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col">
            <Input
              style="custom"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <span className="text-red-600 text-sm self-center">
                *{errors.name}
              </span>
            )}
            </div>
            <div className="flex flex-col">
            <Input
              style="custom"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
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
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {errors.username && (
              <span className="text-red-600 text-sm self-center">
                *{errors.username}
              </span>
            )}
            </div>
            <div className="flex flex-col">
            <Input
              style="custom"
              placeholder="OTP"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
            />
            {errors.otp && (
              <span className="text-red-600 text-sm self-center">
                *{errors.otp}
              </span>
            )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  gap-6">
          <div className="flex flex-col">
            <Input
              style="custom"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
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
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
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
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData , confirmPassword: e.target.value })
              }
            />
             {errors.password && (
              <span className="text-red-600 text-sm self-center">
                *{errors.confirmPassword}
              </span>
            )}
            </div>
          </div>
          <Button
            type="submit"
            className="dark font-bold text-lg"
            // onClick={() => toast.success("Account created Successfully")}
          >
            SignUp
          </Button>
        </form>
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
