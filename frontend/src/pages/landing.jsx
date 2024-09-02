import React from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa6";
import { IoBarChart } from "react-icons/io5";
import Image from "../assets/images.jpeg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="grid grid-cols-1 font-roboto-condensed pt-14 sm:pt-20">
      <div className="px-14">
        <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 mt-10 py-2 text-3xl md:text-7xl">
          Building Dreams, Managing Reality
        </h1>
        <div className="text-gray-500 mt-5 text-2xl w-40 sm:w-80 ">
          <p>Next Generation Construction Management Tool</p>
          <p className="text-xl mt-5 text-gray-400 w-[300px] sm:w-[600px]">
            A construction management system integrates tools for efficient,
            accurate <br />
            project completion
          </p>
        </div>
        <div className="mt-6 flex gap-4">
          <Link to="/signup">
            {" "}
            <Button>Get Started</Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline">Explore</Button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex mt-10 mx-14 gap-8 sm:flex flex-wrap font-roboto-condensed">
      <div className="shadow-lg bg-clip-border rounded-xl w-80 p-4">
        <p className="text-3xl">
          <FaUserCheck />
        </p>
        <h2 className="text-xl font-semibold">User Friendly Interface</h2>
        <p>User-friendly customizable dashboard for quick customization</p>
      </div>
      <div className="shadow-lg bg-clip-border rounded-xl w-80 p-4">
        <p className="text-3xl">
          <FaToolbox />
        </p>
        <h2 className="text-xl font-semibold">Comprehensive Feature Set</h2>
        <p>All-in-one solution with advanced collaboration tools</p>
      </div>
      <div className="shadow-lg bg-clip-border rounded-xl w-80 p-4">
        <p className="text-3xl">
          <IoBarChart />
        </p>
        <h2 className="text-xl font-semibold">Scalability and Flexibility</h2>
        <p>Scalable for all projects with custom integrations</p>
      </div>
    </div>
  );
};

const Report = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full bg-black min-h-1/3 mt-10 text-white font-roboto-condensed p-10">
        <div className="sm:order-1">
          <h1 className="text-white text-4xl sm:text-6xl px-6">
            Field Reporting
          </h1>
          <div>
            <p className="mt-4 text-lg px-6 text-gray-200 font-extralight">
              Capture real-time data, track progress, and generate instant
              reports directly from the field. Streamline communication between
              on-site teams and management for efficient project oversight.
            </p>
          </div>
        </div>
        <div className="flex justify-center sm:order-2 p-6 sm:mt-0">
          <img src={Image} alt="Field Reporting" />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="font-roboto-condensed">
      <div>
        <h1 className="font-bold text-center sm:text-left text-4xl p-6 sm:p-10">
          About Us
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-6 px-20 py-2 text-white mb-10 sm:mb-60 h-full">
        <div className="bg-black flex flex-1 rounded-lg p-6 w-full sm:w-auto">
          <div>
            <h2 className="text-xl sm:text-2xl">Divya</h2>
            <p className="font-thin">
              Crafting visually appealing and responsive user interfaces
            </p>
            <img
              className="mt-6 rounded-lg"
              src="https://via.placeholder.com/200x200.png/f0eaea/fbf9f9?Text=200x200"
              alt="Divya"
            />
          </div>
        </div>
        <div className="bg-black flex flex-1 rounded-lg p-6 w-full sm:w-auto sm:translate-y-1/2">
          <div>
            <h2 className="text-xl sm:text-2xl">Ritesh</h2>
            <p className="font-thin">
              Crafting visually appealing and responsive user interfaces
            </p>
            <img
              className="mt-6 rounded-lg"
              src="https://via.placeholder.com/200x200.png/f0eaea/fbf9f9?Text=200x200"
              alt="Ritesh"
            />
          </div>
        </div>
        <div className="bg-black flex flex-1 p-6 rounded-lg w-full sm:w-auto">
          <div>
            <h2 className="text-xl sm:text-2xl">Kanaad</h2>
            <p className="font-thin">
              Crafting visually appealing and responsive user interfaces
            </p>
            <img
              className="mt-6 rounded-lg"
              src="https://via.placeholder.com/200x200.png/f0eaea/fbf9f9?Text=200x200"
              alt="Kanaad"
            />
          </div>
        </div>
        <div className="bg-black flex flex-1 p-6 rounded-lg w-full sm:w-auto sm:translate-y-1/2">
          <div>
            <h2 className="text-xl sm:text-2xl">Ankur</h2>
            <p className="font-thin">
              Crafting visually appealing and responsive user interfaces
            </p>
            <img
              className="mt-6 rounded-lg"
              src="https://via.placeholder.com/200x200.png/f0eaea/fbf9f9?Text=200x200"
              alt="Ankur"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <>
      <Intro />
      <Services />
      <Report />
      <About />
    </>
  );
};

export default Landing;
