import React from "react";
import { IoIosAddCircle } from "react-icons/io";


const ProjectList = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start w-full h-screen mt-[70px]  ">
            {/*Card Begins*/}
            <div className="flex sm:flex-col w-[70%] sm:size-52 h-[20%] mt-5 sm:m-5  border-2 border-black rounded-lg shadow-[2px_3px_2px_grey] hover:scale-105 transition-transform hover:cursor-pointer">
                {/*Site Image*/}
                <img className="w-[75%] sm:w-full h-[100%] sm:h-[60%] overflow-hidden border-r-2 sm:border-b-2 sm:border-r-0 border-black rounded-l-lg sm:rounded-t-lg sm:rounded-b-none" src="https://picsum.photos/1100"></img>
                {/*Site Details begins*/}
                <div className="flex flex-col w-full sm:h-[40%] p-2 justify-center rounded-r-lg sm:rounded-b-lg overflow-hidden bg-[#d9d9d9]">
                    <div className="flex flex-wrap m-1  ">
                        <h3 className="font-bold text-lg sm:text-base">Name:</h3>
                        <h4 className="text-lg sm:text-base"> Siddhi Niwas</h4>
                    </div>
                    <div className="flex m-1 flex-wrap  ">
                        <h3 className="font-bold text-lg sm:text-base">Location:</h3>
                        <h4 className="text-lg sm:text-base"> Amrutdham </h4>
                    </div>
                </div>
            </div>
            {/*Card Ends*/}
            
            
            

            <IoIosAddCircle className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"/>
        </div>
    );

};

export default ProjectList;