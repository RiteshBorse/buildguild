import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
