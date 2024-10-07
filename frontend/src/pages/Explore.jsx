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

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8 sm:px-5">
        {explore.map((explore) => (
          <div
            key={explore._id}
            className="flex flex-row sm:flex-col items-center w-[90%] sm:w-[400px] h-[150px] sm:h-fit self-center gap-4 shadow-md px-4 py-4 border-[0.5px] border-gray-300 rounded-sm"
          >
            <img
              src={explore.project.displayImage}
              className="w-[50%] sm:w-full rounded-sm"
            />
            <div className="flex flex-col sm:flex-row gap-2 justify-around w-full items-start sm:items-center">
              <div className="flex flex-col gap-2">
                <p className="text-xl sm:text-4xl font-bold">{explore.project.name}</p>
                <p>{explore.project.location}</p>
              </div>
              <Link to={`/explore-info/${explore._id}`}><Button className="bg-red-500">More Info</Button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
