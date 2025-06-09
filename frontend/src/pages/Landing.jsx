import { useState, useEffect, useRef } from "react"
import { FaUserCheck } from "react-icons/fa"
import { FaToolbox } from "react-icons/fa6"
import { IoBarChart } from "react-icons/io5"
import report from "../images/report.png"
import chatbot from "../images/chatbot.png"
import budget from "../images/budget.jpg"
import schedule from "../images/schedule.avif"
import document from "../images/budget.jpg"
import communication from "../images/communication.jpg"
import Ritesh from "../images/ritesh.png"
import Kanaad from "../images/kannad.png"
import divya from "../images/divya.png"
import Ankur from "../images/ankur.png"
import { BiLogoLinkedinSquare } from "react-icons/bi"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { GrMapLocation, GrPhone, GrMail } from "react-icons/gr"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import useAuth from "@/context/authContext"
import { SiGithub } from "react-icons/si"
import { motion } from "framer-motion"
import { SignInButton, useUser } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "sonner"
import Navbar from "../components/Navbar"
import { Check, CheckIcon , CrossIcon, Plus } from "lucide-react"
import app from '@/assets/app.png'
import android from '@/assets/android.png'

const Landing = () => {
  const { user: clerkUser, isSignedIn } = useUser();
  const { useAuthlogin } = useAuth();

  useEffect(() => {
    const handleClerkAuth = async () => {
      if (isSignedIn && clerkUser) {
        try {
          const clearLoggedUserData = {
            username: clerkUser.username,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            id: clerkUser.id,
            profileImage: clerkUser.imageUrl,
            verified: true
          };
          
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/users/clerk-sign`,
            clearLoggedUserData
          );
          
          if (res.data.success) {
            useAuthlogin(res.data.user, 'clerk');
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          const { response } = error;
          if (!response) {
            toast.error("Database connection error");
            return;
          }
          toast.error(response.data.message);
        }
      }
    };

    handleClerkAuth();
  }, [clerkUser, isSignedIn, useAuthlogin]);

  const [currentIndex, setCurrentIndex] = useState(0)
  const { isAuthenticated } = useAuth()

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
  ]

  const imageStyles = {
    "Field Reporting": "w-full sm:w-[80%] md:w-[90%] h-[260px] sm:h-[240px] object-cover shadow-lg  rounded-2xl",
    "Budget Management": "w-full sm:w-[80%] h-[260px] sm:h-[240px] object-cover shadow-lg rounded-2xl",
    "Schedule Management": "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    "Document Management": "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    "Communication Tools": "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
    Chatbot: "w-full sm:w-[80%] h-[240px] object-cover shadow-lg rounded-2xl",
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [items.length])

  const homeRef = useRef(null)
  const featuresRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const scrollTo = (id) => {
    let ref
    switch (id) {
      case "home":
        ref = homeRef
        break
      case "features":
        ref = featuresRef
        break
      case "about":
        ref = aboutRef
        break
      case "contact":
        ref = contactRef
        break
      default:
        return
    }
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className = "relative min-h-screen">
      <Navbar scrollTo={scrollTo} />
      <section  ref={homeRef} className="grid grid-cols-1 font-roboto-condensed pt-14 sm:pt-20">
     
      <div className="px-14 flex justify-between w-full">
        <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 mt-10 py-1 text-5xl md:text-7xl"
        >
          Building Dreams, Managing Reality
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 mt-5 text-2xl w-40 sm:w-80 "
        >
          <p>Next Generation Construction Management Tool</p>
          <p className="text-xl mt-5 text-gray-400 w-[300px] sm:w-[600px]">
            A construction management system integrates tools for efficient,
            accurate <br />
            project completion
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex gap-4"
        >
          {isAuthenticated ? (
            <Link to="/projectlist">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
          )}
          <Link to="/explore">
            <Button variant="outline">Explore</Button>
          </Link>
          <a href="https://drive.google.com/file/d/1zkIRAcWNzBAFg05EBBKo8f2RT-XZD-0p/view?usp=sharing">
            <Button variant="link">Watch Tutorial</Button>
          </a>
           
          <a href='/buildguild.apk' className="flex items-center gap-2">
          <img src={android} alt="" className="size-8" />
            <Button className="p-0" variant="link">Download App</Button>
          </a>
          
        </motion.div>
        </div>
        <div>
          <img src={app} alt="" className="absolute top-24 scale-[1.35] rotate-6 -right-12 w-[500px]"/>
        </div>
        
      </div>
    </section>
    <section   className="flex mt-10 mx-14 gap-8 sm:flex flex-wrap font-roboto-condensed">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-md bg-clip-border border-[0.5px] border-gray-200 rounded-xl w-80 p-4"
      >
        <p className="text-3xl">
          <FaUserCheck />
        </p>
        <h2 className="text-xl font-semibold">User Friendly Interface</h2>
        <p>User-friendly customizable dashboard for quick customization</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-md bg-clip-border border-[0.5px] border-gray-200 rounded-xl w-80 p-4"
      >
        <p className="text-3xl">
          <FaToolbox />
        </p>
        <h2 className="text-xl font-semibold">Comprehensive Feature Set</h2>
        <p>All-in-one solution with advanced collaboration tools</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-lg bg-clip-border border-[0.5px] border-gray-200 rounded-xl w-80 p-4"
      >
        <p className="text-3xl">
          <IoBarChart />
        </p>
        <h2 className="text-xl font-semibold">Scalability and Flexibility</h2>
        <p>Scalable for all projects with custom integrations</p>
      </motion.div>
    </section>
    <section ref={featuresRef}>
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
                    src={item.image || "/placeholder.svg"}
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
    </section>

    <section className="py-16 px-4 sm:px-6 lg:px-8 font-roboto-condensed">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
      {/* Individual Plan */}
      <div className="relative bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-medium">Free</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Starts at</p>
          <div className="flex items-baseline mt-2">
            <span className="text-5xl font-bold tracking-tight">₹0</span>
            <span className="ml-2 text-gray-600">per month/user</span>
          </div>
        </div>
        <p className="mt-6 text-gray-600">
          Good for individuals who are just starting out and simply want the essentials.
        </p>
        <Button className="mt-8 w-full" variant="outline">
          Get started
        </Button>
        <div className="mt-8">
          <h4 className="text-lg font-medium">Free, forever</h4>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">1 Project</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Unlimited Data</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Unlimited event types</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Workflows</span>
            </li>
            <li className="flex items-start">
              <Plus className="h-6 w-6 text-red-500 flex-shrink-0 rotate-45" />
              <span className="ml-3 text-gray-600">24/7 Email, Chat and Phone support</span>
            </li>
            <li className="flex items-start"> 
              <Plus className="h-6 w-6 text-red-500 flex-shrink-0 rotate-45" />
              <span className="ml-3 text-gray-600">Advanced Analysis</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Teams Plan */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 shadow-lg">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
            30 days free trial
          </span>
        </div>
        <h3 className="text-2xl font-medium">Premium</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Starts at</p>
          <div className="flex items-baseline mt-2">
            <span className="text-5xl font-bold tracking-tight">₹899</span>
            <span className="ml-2 text-gray-600">per month/user</span>
          </div>
        </div>
        <p className="mt-6 text-gray-600">
          Highly recommended for small teams who seek to upgrade their time & perform.
        </p>
        <Button className="mt-8 w-full">
          Get started
        </Button>
        <div className="mt-8">
          <h4 className="text-lg font-medium">Free plan features, plus:</h4>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">1 team</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Schedule meetings as a team</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Round-Robin, Fixed Round-Robin</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Collective Events</span>
            </li>
            <li className="flex items-start">
            <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
            <span className="ml-3 text-gray-600">24/7 Email, Chat and Phone support</span>
            </li>
            <li className="flex items-start">
            <Plus className="h-6 w-6 text-red-500 flex-shrink-0 rotate-45" />
            <span className="ml-3 text-gray-600">Advanced Analysis</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Enterprise Plan */}
      <div className="relative bg-gradient-to-b from-cyan-50 to-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-medium">Express</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Starts at</p>
          <div className="flex items-baseline mt-2">
            <span className="text-5xl font-bold tracking-tight">₹1799</span>
            <span className="ml-2 text-gray-600">per year</span>
          </div>
        </div>
        <p className="mt-6 text-gray-600">
          Robust scheduling for larger teams looking to have more control, privacy & security.
        </p>
        <Button className="mt-8 w-full" variant="outline">
          Contact us
        </Button>
        <div className="mt-8">
          <h4 className="text-lg font-medium">Organization plan features, plus:</h4>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">1 parent team and unlimited sub-teams</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Organization workflows</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Insights - analyze your booking data</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">Active directory sync</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-gray-600">24/7 Email, Chat and Phone support</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 " />
              <span className="ml-3 text-gray-600">Advanced Analysis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      <section ref={aboutRef} className="font-roboto-condensed">
      <div>
        <h1 className="font-bold text-center sm:text-left text-4xl p-6 sm:p-10">
          About Us
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-6 px-20 py-2 text-white mb-10 sm:mb-60 h-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full  shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Divya Bhavsar
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Passionate about tech and driven to create impactful solutions
              that make a difference.
            </p>

            <motion.img
              initial={{ y: -30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full sm:w-auto sm:translate-y-1/2 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              Ritesh Borse
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              A curious problem-solver, always focused on finding the next big
              solution.
            </p>

            <motion.img
              initial={{ y: -30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Ritesh}
              alt="Ritesh"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/ritesh-borse-293564223/"
                target="_blank" rel="noreferrer"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-700 transition-colors duration-200" />
              </a>
              <a href="https://github.com/riteshborse" target="_blank" rel="noreferrer">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full  shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Kanaad Bhat
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              A tech enthusiast, always exploring new frontiers in
              problem-solving and innovation.
            </p>

            <motion.img
              initial={{ y: -30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Kanaad}
              alt="Kanaad"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/bhatkanaad314/"
                target="_blank" rel="noreferrer"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="https://github.com/kanaadbhat" target="_blank" rel="noreferrer">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-gradient-to-r from-black via-gray-800 to-blue-900 flex flex-1 rounded-lg p-6 w-full sm:w-auto sm:translate-y-1/2 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 font-['Roboto Condensed']">
              Ankur Kumar
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Always learning and finding better ways to solve problems.
            </p>

            <motion.img
              initial={{ y: -30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 rounded-full w-36 h-36 sm:w-40 sm:h-40 object-cover border-4 border-gray-700 shadow-lg mx-auto"
              src={Ankur}
              alt="Ankur"
            />

            <div className="flex justify-center items-center mt-4 space-x-4">
              <a
                href="https://www.linkedin.com/in/ankur-kumar-5625a71b0/"
                target="_blank" rel="noreferrer"
              >
                <BiLogoLinkedinSquare className="w-8 h-8 text-blue-400 hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="https://github.com/Ankur1404" target="_blank" rel="noreferrer">
                <SiGithub className="w-8 h-8 text-blue-300 hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
      <motion.section ref={contactRef} 
      initial={{ scale: 0.9, y: -200 }}
      whileInView={{ scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between p-8 bg-gray-100 text-black"
    >
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-8 text-lg">
          Contact us for expert assistance with all your construction management
          needs.
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
    </motion.section>
    </div>
  )
}

export default Landing

