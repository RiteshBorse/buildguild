import { Button } from "@/components/ui/button";
import buildingImage from "@/images/mansion.webp";
import { apiVerify } from "@/schema/apiSchema";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [explore, setexplore] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/explore`);
        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }
        setexplore(res.data.explore);
        toast.success(res.data.message);
      } catch (error) {
        const { response } = error;
        if (!response) {
          toast.error("Database connection error");
          return;
        }
        if (!apiVerify(response)) {
          toast.warning("API Error, Please contact admin");
          return;
        }
        toast.error(response.data.message);
      }
    };
    fetchProject();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-[70px] h-1/2 sm:h-1/3 flex flex-col items-center relative">
        <img
          className="object-cover w-full h-[200px] bg-red-200"
          src={buildingImage}
          alt="Building"
        />

        <div className="flex justify-between bg-white w-2/3 absolute bottom-[-25px] rounded-xl drop-shadow py-2 px-4">
          <input
            type="text"
            placeholder="Destination"
            className="outline-none w-full"
          />
          <Button>Search</Button>
        </div>
      </div>
      <h1 className="self-center text-3xl lg:text-5xl font-bold p-4 mt-10">
        Build your dream house with Us.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-5 pl-20">
        {explore.map((explore) => (
          <div
            key={explore._id}
            className="bg-gray-100 flex flex-col items-center w-[400px] h-[270px] gap-2 shadow-md px-4 py-3 border-[0.5px] border-gray-300 rounded-md transition-shadow hover:shadow-lg"
          >
            {/* Imaage */}
            <div className="w-full h-[200px]">
              <img
                src={explore.project.displayImage}
                alt={explore.project.name}
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>

            {/* Text */}
            <div className="flex items-center justify-between w-full min-h-[40px] pl-5 px-3 py-1 rounded-b-md">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-black truncate">
                  {explore.project.name}
                </p>
                <p className="text-xs text-gray-700 truncate">
                  {explore.project.location}
                </p>
              </div>
              <Link to={`/explore-info/${explore._id}`}>
                <Button className="bg-red-500 text-black text-xs px-3 py-1 rounded hover:bg-red-600">
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
