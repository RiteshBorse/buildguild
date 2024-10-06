import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  return (
    <div className="w-full h-screen pt-[100px] px-8 py-10">
      <Sidebar id={id}/>
    </div>
  );
};

export default Dashboard;
