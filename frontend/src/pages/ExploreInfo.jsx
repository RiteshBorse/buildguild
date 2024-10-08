import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiVerify } from "@/schema/apiSchema";
import { toast } from "sonner";

const ExploreInfo = () => {
  const [explore, setExplore] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(id);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/explore/${id}`);
        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }
        console.log(res.data.explore);
        setExplore({ ...res.data.explore });
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
  }, [id]);

  useEffect(() => {
    console.log("Updated explore:", explore);
  }, [explore]);

  return (
    <div>
      <div className="flex flex-col sm:gap-0 sm:flex-row w-full h-fit sm:h-screen mt-[70px]">
        <div className="w-full sm:w-1/2 flex items-center justify-center shadow-sm">
          <img
            src={explore?.project?.displayImage || ""}
            className="h-[300px] my-10 sm:my-0 sm:h-[400px]"
            alt="Project"
          />
        </div>
        <div className="invisible sm:visible border-[1px] border-grey h-[70%] self-center"></div>
        <div className="w-full sm:w-1/2 flex flex-col gap-12 sm:justify-center sm:items-center p-5 px-10">
          <h1 className="self-start font-bold text-4xl">{explore?.project?.name || "Title"}</h1>
          <p>
            {explore?.project?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, cumque perferendis beatae modi nihil obcaecati nesciunt voluptate magnam vitae! Unde, libero non! Quos natus a exercitationem, veritatis reiciendis qui accusantium!"}
            <br />
            <br />
            <span className="text-xl">Contact Us : +91 8888046902</span>
          </p>
          <div className="flex gap-2 self-start">
            <Button>Pre Apply</Button>
            <Button variant="outline">More Info</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreInfo;
