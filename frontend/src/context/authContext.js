import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";
import Cookies from "js-cookie";

// Zustand Store
const useAuth = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      useAuthlogin: (newUser) => {
        set({ user: newUser, isAuthenticated: true });
      },
      useAuthlogout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    }
  )
);
export default useAuth;

export const useCookieMonitor = () => {
  const useAuthlogout = useAuth((state) => state.useAuthlogout);

  useEffect(() => {
    const checkCookie = () => {
      const token = Cookies.get("token");
      if (!token) {
        useAuthlogout();
      }
    };
    const interval = setInterval(checkCookie, 5000);
    return () => clearInterval(interval);
  }, [useAuthlogout]);
};
