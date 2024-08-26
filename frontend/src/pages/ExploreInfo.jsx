import React from "react";
import { Button } from "@/components/ui/button";
const ExploreInfo = () => {
  return (
    <div>
      <div className="flex flex-col sm:gap-0 sm:flex-row w-full h-fit sm:h-screen mt-[70px]">
        <div className="w-full sm:w-1/2 flex items-center justify-center shadow-sm">
          <div className="size-[300px] my-10 sm:my-0 sm:size-[400px] bg-green-100"></div>
        </div>
        <div className="invisible sm:visible border-[1px] border-grey h-[70%] self-center"></div>
        <div className="w-full sm:w-1/2 flex flex-col gap-12 sm:justify-center sm:items-center p-5 px-10">
          <h1 className="self-start font-bold text-4xl">Title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, cumque perferendis beatae modi nihil obcaecati nesciunt
            voluptate magnam vitae! Unde, libero non! Quos natus a
            exercitationem, veritatis reiciendis qui accusantium!<br/><br/>
            <span className="text-xl">Contact Us : +91 8888046902</span>

          </p>
          <div className="flex gap-2 self-start">
          <Button>Pre Apply</Button>
          <Button variant='outline'>More Info</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreInfo;
