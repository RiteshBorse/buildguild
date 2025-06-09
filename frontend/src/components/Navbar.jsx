import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Home, Building2, Info, Phone, LogIn, User } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { login } from "@/schema/loginSchema";
import { apiVerify } from "@/schema/apiSchema";
import axios from "axios";
import useAuth from "@/context/authContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Navbar = ({ scrollTo }) => {
  const { useAuthlogin, useAuthlogout, user, isAuthenticated } = useAuth();
  const [isOpen, setisOpen] = useState(false);
  const [onClickLogin, setonClickLogin] = useState(false);
  const [errors, seterrors] = useState({});
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const result = login.safeParse(data);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      seterrors(fieldError);
      return;
    }
    seterrors({});
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        data
      );
      if (!apiVerify(res)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      toast.success(res.data.message);
      useAuthlogin(res.data.user);
      setonClickLogin(false);
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

  const toggleMenu = () => {
    setisOpen(!isOpen);
  };

  const toggleLogin = () => {
    setonClickLogin(!onClickLogin);
  };

  const navItems = [
    { name: "Home", icon: Home, onClick: () => scrollTo("home") },
    { name: "Features", icon: Building2, onClick: () => scrollTo("features") },
    { name: "About", icon: Info, onClick: () => scrollTo("about") },
    { name: "Contact", icon: Phone, onClick: () => scrollTo("contact") },
  ];

  return (
    <div className="z-20 font-roboto flex items-center h-fit w-full justify-between px-14 py-4 shadow-lg fixed top-0 left-0 right-0 bg-white">
      <Link to="/">
        <h1 className="text-4xl font-bold">buildguild</h1>
      </Link>

      {/* Hamburger Menu */}
      <Menu
        className="sm:hidden text-2xl justify-self-end"
        onClick={toggleMenu}
      />

      {/* Desktop View */}
      <div className="hidden md:flex text-xl items-center gap-3">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            onClick={item.onClick}
            className="h-10 px-4 text-base font-medium flex items-center gap-2 hover:bg-accent"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Button>
        ))}

        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/">
            <Button className="h-10 px-4 text-base font-medium flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90">
              <LogIn className="h-5 w-5" />
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/logout"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              }
            }}
          />
        </SignedIn>
      </div>

      {/* Mobile View */}
      {isOpen && (
        <Sheet open={isOpen} onOpenChange={setisOpen}>
          <SheetContent side="right">
            <SheetHeader className="flex flex-col mx-auto items-center justify-center my-10 gap-5">
              <SheetTitle className="text-3xl">buildguild</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col text-xl items-center gap-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      onClick={() => {
                        item.onClick();
                        toggleMenu();
                      }}
                      className="h-10 px-4 text-base font-medium flex items-center gap-2 hover:bg-accent w-full justify-start"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Button>
                  ))}

                  <div className="w-full pt-4 border-t border-border">
                    <SignedOut>
                      <SignInButton mode="modal" fallbackRedirectUrl="/">
                        <Button className="h-10 px-4 text-base font-medium flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 w-full">
                          <LogIn className="h-5 w-5" />
                          Get Started
                        </Button>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      <UserButton 
                        afterSignOutUrl="/logout"
                        appearance={{
                          elements: {
                            avatarBox: "h-10 w-10 mx-auto"
                          }
                        }}
                      />
                    </SignedIn>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}

      {/* Login Sheet */}
      {onClickLogin && (
        <Sheet open={onClickLogin} onOpenChange={setonClickLogin}>
          <SheetContent side="bottom">
            <SheetHeader className="flex flex-col mx-auto items-center justify-center w-[80%] sm:w-1/3 my-10 gap-5">
              <SheetTitle className="text-3xl">Login</SheetTitle>
              <SheetDescription className="w-full">
                <form
                  className="flex flex-col w-full gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                  <Button type="submit" className="h-10 text-base font-medium flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Button>
                </form>
                <Link to="/forgot-password">
                  <Button variant="link">Forgot Password ?</Button>
                </Link>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

const LoggedUserDropdown = ({ user }) => {
  const { useAuthlogout } = useAuth();
  const navigate = useNavigate();
  const logouttheUser = async () => {
    useAuthlogout();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/logout`
      );
      if (!apiVerify(res)) {
        toast.warning("Api Error , Please contact admin");
        return;
      }
      toast.success(res.data.message);
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
    navigate("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 border-[0.5px] outline-none border-gray-300 shadow-sm rounded-lg px-3 py-1">
          <Avatar>
            <AvatarImage
              src={user.profileImage || "https://github.com/shadcn.png"}
            />
          </Avatar>
          <p className="text-sm font-medium">{user.firstName}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <Link to="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logouttheUser}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
