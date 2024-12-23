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
import Ritesh from "../images/ritesh.png";
import Kanaad from "../images/kannad.png";
import divya from "../images/divya.png";
import Ankur from "../images/ankur.png";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GrMapLocation, GrPhone, GrMail } from "react-icons/gr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useAuth from "@/context/authContext";
import { SiGithub } from "react-icons/si";
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

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gray-100 text-black">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-8 text-lg">
        Contact us for expert assistance with all your construction management needs.
        </p>

        <div className="mb-6 flex items-center">
          <div className="bg-black p-3 rounded-full mr-4">
            <GrMapLocation className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-lg">Nashik, Maharashtra, India</p>
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <div className="bg-black p-3 rounded-full mr-4">
            <GrPhone className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-lg">(+91) 9031138044</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-black p-3 rounded-full mr-4">
            <GrMail className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-lg">buildguild@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 bg-gradient-to-br from-black to-gray-800 text-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Get in Touch
        </h3>
        <form className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="p-4 rounded-lg bg-gray-200 text-black focus:ring-2  transition duration-200 ease-in-out outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-4 rounded-lg bg-gray-200 text-black outline-none"
            required
          />
          <textarea
            placeholder="Message"
            className="p-4 rounded-lg bg-gray-200 text-black outline-none"
            required
          />
        <button
  type="submit"
  className="w-full py-3 bg-gradient-to-r from-gray-900 to-black text-white text-lg font-semibold rounded-lg shadow-md hover:from-gray-800 hover:to-gray-700 "
>
  Send Message
</button>

        </form>
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
        <div className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full  shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Divya Bhavsar
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Passionate about tech and driven to create impactful solutions
              that make a difference.
            </p>

            <img
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={divya}
              alt="Divya"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/divya-bhavsar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a
                href="https://github.com/Divya-Bhavsar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full sm:w-auto sm:translate-y-1/2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              Ritesh Borse
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              A curious problem-solver, always focused on finding the next big
              solution.
            </p>

            <img
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Ritesh}
              alt="Ritesh"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/ritesh-borse-293564223/"
                target="_blank"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-700 transition-colors duration-200" />
              </a>
              <a href="https://github.com/riteshborse" target="_blank">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full  shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Kanaad Bhat
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              A tech enthusiast, always exploring new frontiers in
              problem-solving and innovation.
            </p>

            <img
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Kanaad}
              alt="Kanaad"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/bhatkanaad314/"
                target="_blank"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="https://github.com/kanaadbhat" target="_blank">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full sm:w-auto sm:translate-y-1/2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Ankur Kumar
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Always learning and finding better ways to solve problems.
            </p>

            <img
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Ankur}
              alt="Ankur"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/ankur-kumar-5625a71b0/"
                target="_blank"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="https://github.com/Ankur1404" target="_blank">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
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
      <ContactUs></ContactUs>
      <div
      src="https://www.chatbase.co/chatbot-iframe/OjUPNhz24gT-UgkNyqlj6"
      className="abosolute right-0 bottom-0 size-[50px]"
    ></div>
    </>
  );
};

export default Landing;
