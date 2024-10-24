import { useState, useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa6";
import { IoBarChart } from "react-icons/io5";
import report from "../images/report.png";
import chatbot from "../images/chatbot.png";
import budget from "../images/budget.jpg";
import schedule from "../images/schedule.avif";
import document from "../images/budget.jpg";
import communication from "../images/communication.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useAuth from "@/context/authContext";

const Intro = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="grid grid-cols-1 font-roboto-condensed pt-14 sm:pt-20">
      <div className="px-14">
        <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 mt-10 py-1 text-5xl md:text-7xl">
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
          {isAuthenticated ? (
            <Link to="/projectlist">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          )}
          <Link to="/explore">
            <Button variant="outline">Explore</Button>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      title: "Field Reporting",
      description:
        "Capture real-time data, track progress, and generate instant reports directly from the field. Streamline communication between on-site teams and management for efficient project oversight.",
      image: report,
    },
    {
      title: "Budget Management",
      description:
        "Manage your finances effectively, monitor expenses, and create timely reports from anywhere. Enhance collaboration between teams and stakeholders for better budget control and decision-making.",
      image: budget,
    },
    {
      title: "Schedule Management",
      description:
        "Efficiently plan and track project timelines, evaluate progress against milestones, and generate comprehensive reports at any time, ensuring transparency and effective communication among team members.",
      image: schedule,
    },
    {
      title: "Document Management",
      description:
        "Streamline document tracking processes by monitoring versions, ensuring easy access to important files, and facilitating collaboration, which enhances accountability and keeps all team members informed and aligned.",
      image: document,
    },
    {
      title: "Communication Tools",
      description:
        "Utilize integrated communication tools to enhance collaboration, streamline discussions, and provide real-time updates, ensuring that team members stay connected and informed for improved project efficiency.",
      image: communication,
    },
    {
      title: "Chatbot",
      description:
        "Leverage an intuitive chatbot feature to facilitate instant communication, provide quick answers to queries, and enhance user engagement, ensuring a seamless and efficient interaction experience for all stakeholders.",
      image: chatbot,
    },
  ];

  const imageStyles = {
    "Field Reporting":
      "w-full sm:w-[80%] md:w-[90%] h-[260px] sm:h-[240px] object-cover shadow-lg  rounded-2xl",
    "Budget Management":
      "w-full sm:w-[80%] h-[260px] sm:h-[240px] object-cover shadow-lg rounded-2xl",
    "Schedule Management":
      "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    "Document Management":
      "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    "Communication Tools":
      "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    Chatbot: "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <Carousel className="w-full overflow-hidden mt-10">
      <CarouselContent
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <CarouselItem key={index} className="flex-shrink-0 w-full">
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full bg-black min-h-[350px] sm:min-h-[400px] lg:min-h-[350px] text-white font-roboto-condensed p-6 md:p-10">
                <div className="sm:order-1 flex flex-col justify-center">
                  <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4 md:px-6">
                    {item.title}
                  </h1>
                  <p className="mt-2 text-base sm:text-lg px-4 md:px-6 text-gray-200 font-extralight">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-center sm:order-2 p-4 md:p-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={imageStyles[item.title]}
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
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
      <div
      src="https://www.chatbase.co/chatbot-iframe/OjUPNhz24gT-UgkNyqlj6"
      className="abosolute right-0 bottom-0 size-[50px]"
    ></div>
    </>
  );
};

export default Landing;
