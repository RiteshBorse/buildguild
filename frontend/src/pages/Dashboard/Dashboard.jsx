import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./Sidebar";

const Dashboard = () => {

  return (
    <div className="w-full h-screen pt-[100px] px-8 py-10">
      <Sidebar/>
    </div>
  );
};

export default Dashboard;
