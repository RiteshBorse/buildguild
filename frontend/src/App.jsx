<<<<<<< HEAD
import React from 'react'
import Navbar from './components/Navbar'
import ProjectList from './pages/ProjectList'

const App = () => {
  return (
    <div>
      <Navbar auth={false}/>
       <ProjectList/>
    </div>
  )
}
=======
import React, { useEffect , useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import ExploreInfo from "./pages/ExploreInfo";
import axios from "axios";
import { toast } from "sonner";
axios.defaults.withCredentials = true;
const App = () => {
  //Check Network Status
  const [isOnline, setIsOnline] = useState(navigator.onLine); 
  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      toast.success("You are online!");
      setIsOnline(true);
    } else {
      toast.error("You are offline");
      setIsOnline(false);
    }
  };
>>>>>>> c07fc39987ba67e360b0fee7d6471bebccacc492

  useEffect(() => {
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/explore/explore-info" element={<ExploreInfo/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
