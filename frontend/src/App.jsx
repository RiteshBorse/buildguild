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
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
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
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/explore" element={<Explore/>} />
        <Route path="/explore/explore-info" element={<ExploreInfo/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
