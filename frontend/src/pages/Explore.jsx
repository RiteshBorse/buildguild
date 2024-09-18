import { Button } from "@/components/ui/button";
import buildingImage from "@/images/mansion.webp"; 



const Explore = () => {
   return(
    <div className=" flex flex-col" >   
        <div className="mt-[70px] h-1/2 sm:h-1/3 flex flex-col items-center relative">
            <img className="object-cover w-full h-[300px] bg-red-200" src={buildingImage} alt="" />
        
            <div className="flex justify-between bg-white  w-2/3 absolute bottom-[-25px] rounded-xl drop-shadow py-2 px-4 ">
                  <input type="text" placeholder="Destination" className="outline-none w-full" />
                 <Button>Search</Button>
            </div>

        </div>
        <h1 className=" self-center text-3xl  lg:text-5xl font-bold p-4 mt-10">Build your dream house with Us.</h1>
 
        <div className="mx-5  snap-y "> 
            <div className="flex gap-4  items-center">
            <div className=" flex justify-center flex-col  w-full">
                  <div className=" min-h-64 bg-red-100 w-7/8 sm:mx-2 lg:mx-8  my-4 rounded-2xl " ></div>
                  <div className=" min-h-80 bg-red-100 w-7/8 sm:mx-2 lg:mx-8  my-4 rounded-2xl " ></div>
           </div>
           <div className=" flex justify-center flex-col w-full">
                  <div className=" min-h-80 bg-red-100 w-7/8 sm:mx-2 lg:mx-8 my-4 rounded-2xl" ></div>
                  <div className=" min-h-64 bg-red-100 w-7/8 sm:mx-2 lg:mx-8  my-4 rounded-2xl " >
                  </div>
           </div>
            </div>
            
            
        </div>
    </div>

    );
};

export default Explore;