import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
const Navbar = ({ auth }) => {
  const user = auth;
  const [isOpen, setisOpen] = useState(false);
  const [onClickLogin, setonClickLogin] = useState(false);

  const toggleMenu = () => {
    setisOpen(!isOpen);
  };

  const toggleLogin = () => {
    setonClickLogin(!onClickLogin);
  };
  return (
    <div className="z-20 font-roboto flex items-center h-fit w-full justify-between px-11 py-4 shadow-lg fixed top-0 left-0 right-0 bg-white">
      <Link to="/">
        <h1 className="text-4xl font-bold">buildguild</h1>
      </Link>

      {/* Hamburger Menu */}
      <Menu
        className="sm:hidden text-2xl justify-self-end"
        onClick={toggleMenu}
      />

      {/* Desktop View */}
      <div className="hidden md:flex text-xl items-center gap-6">
        <Link to="/">
          <Button className="text-lg font-light" variant="ghost">
            Home
          </Button>
        </Link>
        <Button className="text-lg font-light" variant="ghost">
          Features
        </Button>
        <Button className="text-lg font-light" variant="ghost">
          About
        </Button>
        <Button className="text-lg font-light" variant="ghost">
          Contact Us
        </Button>
        {!user ? (
          <Link to="/signup">
            <Button className="text-lg font-light">Login</Button>
          </Link>
        ) : (
          <Button className="text-lg font-light" variant="outline">
            Logout
          </Button>
        )}
      </div>

      {/* Mobile View */}
      {isOpen && (
        <Sheet open={isOpen} onOpenChange={setisOpen}>
          <SheetContent side="right">
            <SheetHeader className="flex flex-col mx-auto items-center justify-center my-10  gap-5">
              <SheetTitle className="text-3xl">
               buildguild
              </SheetTitle>
              <SheetDescription>
                <div className="flex flex-col text-xl items-center gap-6">
                  <Link to="/">
                    <Button
                      onClick={toggleMenu}
                      className="text-lg font-light"
                      variant="ghost"
                    >
                      Home
                    </Button>
                  </Link>
                  <Button
                    onClick={toggleMenu}
                    className="text-lg font-light"
                    variant="ghost"
                  >
                    Features
                  </Button>
                  <Button
                    onClick={toggleMenu}
                    className="text-lg font-light"
                    variant="ghost"
                  >
                    About
                  </Button>
                  <Button
                    onClick={toggleMenu}
                    className="text-lg font-light"
                    variant="ghost"
                  >
                    Contact Us
                  </Button>
                  {!user ? (
                    <Button
                      onClick={()=>{
                        toggleMenu(); 
                        toggleLogin();
                      }
                      }
                      className="text-lg font-light"
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        toggleMenu, onClickLogin;
                      }}
                      className="text-lg font-light"
                      variant="outline"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}

      {onClickLogin && (
        <Sheet open={onClickLogin} onOpenChange={setonClickLogin}>
          <SheetContent side="bottom">
            <SheetHeader className="flex flex-col mx-auto items-center justify-center w-[80%] sm:w-1/3 my-10  gap-5">
              <SheetTitle className="text-3xl">
              Login
              </SheetTitle>
              <SheetDescription className="flex flex-col w-full gap-6">
                <Input placeholder="Username" />
                <Input placeholder="Password" />
                <Button>Login</Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Navbar;
