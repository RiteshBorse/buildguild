import {
    Menu,
    Package,
    User2,
    Workflow,
  } from "lucide-react";
  import React, { useState } from "react";
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";
  import { FaMoneyBill } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";

const Sidebar = ({id}) => {
    const Navigate = useNavigate();
    const [menuOpen, setmenuOpen] = useState(false);
    const [menuValue, setmenuValue] = useState("");
    const handleMenu = () => {
      setmenuOpen(!menuOpen);
    };
    const onClickMenuItems = (value) => {
      setmenuValue(value)
      handleMenu();
      Navigate(`/${value}/${id}`)
    }
    
    return (
      <div>
        <Menu onClick={handleMenu} />
        <Sheet open={menuOpen} onOpenChange={setmenuOpen}>
          <SheetContent side="left">
            <SheetHeader className="flex flex-col mx-auto items-center justify-center w-full my-10 gap-5">
              <SheetTitle className="text-3xl">Dashboard</SheetTitle>
              <SheetDescription className="w-2/3 flex flex-col gap-4">
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border hover:bg-gray-300 hover:text-black  border-gray-200 rounded-sm" onClick={()=>{onClickMenuItems('administration')}}>
                  <User2 className="w-5 h-5 flex-shrink-0" />
                  <p>Administration</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 hover:bg-gray-300 hover:text-black rounded-sm" onClick={()=>{onClickMenuItems('engineering')}}>
                  <Workflow className="w-5 h-5 flex-shrink-0" />
                  <p>Engineering</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 hover:bg-gray-300 hover:text-black rounded-sm" onClick={()=>{onClickMenuItems('materials')}}>
                  <Package className="w-5 h-5 flex-shrink-0" />
                  <p>Materials</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 hover:bg-gray-300 hover:text-black rounded-sm" onClick={()=>{onClickMenuItems('financials')}}>
                  <FaMoneyBill className="w-5 h-5 flex-shrink-0" />
                  <p>Financials</p>
                </div>
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 hover:bg-gray-300 hover:text-black rounded-sm" onClick={()=>{onClickMenuItems('analysis')}}>
                  <FaMoneyBill className="w-5 h-5 flex-shrink-0" />
                  <p>Analysis</p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>      
    </div>
    );
}



export default Sidebar