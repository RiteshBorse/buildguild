import React from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
]);

const App = () => {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
