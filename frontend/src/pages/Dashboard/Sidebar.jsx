import {
    ArrowBigLeft,
    ArrowRightIcon,
    CodeSquare,
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
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
  import { Card } from "@/components/ui/card";
  import { FaMoneyBill } from "react-icons/fa";
  import { Navigate, useNavigate } from "react-router-dom";

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
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 rounded-sm" onClick={()=>{onClickMenuItems('administration')}}>
                  <User2 className="w-5 h-5 flex-shrink-0" />
                  <p>Administration</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 rounded-sm" onClick={()=>{onClickMenuItems('engineering')}}>
                  <Workflow className="w-5 h-5 flex-shrink-0" />
                  <p>Engineering</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 rounded-sm" onClick={()=>{onClickMenuItems('materials')}}>
                  <Package className="w-5 h-5 flex-shrink-0" />
                  <p>Materials</p>
                </div>
  
                <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-2 border border-gray-200 rounded-sm" onClick={()=>{onClickMenuItems('financials')}}>
                  <FaMoneyBill className="w-5 h-5 flex-shrink-0" />
                  <p>Financials</p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
  
        
  
        {/* <Tabs defaultValue="administration" className="w-full mx-auto">
          <TabsList className="flex justify-center gap-2 bg-gray-100 flex-col">
            <TabsTrigger value="administration">Administration</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="material">Material</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>
  
          <TabsContent value="administration">
            <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
              <User2 className="w-6 h-6 flex-shrink-0" />
              <p className="text-lg">Administration</p>
            </div>
          </TabsContent>
  
          <TabsContent value="engineering">
            <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
              <Workflow className="w-6 h-6 flex-shrink-0" />
              <p className="text-lg">Engineering</p>
            </div>
          </TabsContent>
  
          <TabsContent value="material">
            <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
              <Package className="w-6 h-6 flex-shrink-0" />
              <p className="text-lg">Material</p>
            </div>
          </TabsContent>
  
          <TabsContent value="financials">
            <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
              <FaMoneyBill className="w-6 h-6 flex-shrink-0" />
              <p className="text-lg">Financials</p>
            </div>
          </TabsContent>
        </Tabs> */}
      </div>
    );
}

export default Sidebar