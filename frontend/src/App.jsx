import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import ExploreInfo from "./pages/ExploreInfo";
import ProjectList from "./pages/ProjectList.jsx";
import axios from "axios";
import { toast } from "sonner";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthSync } from "./context/authContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Engineering from "./pages/Dashboard/Engineering/Engineering";
import Administration from "./pages/Dashboard/Administration";
import Materials from "./pages/Dashboard/Materials";
import Financials from "./pages/Dashboard/Financials";
import Logout from "./pages/Logout";
import Analysis from "./pages/Dashboard/Analysis";
import { Maintenaince } from "./components/Maintenaince";

// Configure axios
axios.defaults.withCredentials = true;

const App = () => {
  // Use the auth sync hook
  useAuthSync();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/explore" element={<Explore/>} />
            <Route path="/explore-info/:id" element={<ExploreInfo/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="*" element={<NotFound/>} />
            <Route path="/projectlist" element={<ProjectList/>}/>
            <Route path="/dashboard/:id" element={<Dashboard/>}/>
            <Route path="/administration/:id" element={<Administration/>}/>
            <Route path="/engineering/:id" element={<Engineering/>}/>
            <Route path="/materials/:id" element={<Materials/>}/>
            <Route path="/financials/:id" element={<Financials/>}/>
            <Route path="/analysis/:id" element={<Analysis/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
