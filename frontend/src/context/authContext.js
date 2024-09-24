import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuth = create(
  persist((set) => ({
    user: null,
    isAuthenticated: false,
    useAuthlogin: (newUser) => {
      set({ user: newUser, isAuthenticated: true });
    },
    useAuthlogout: () => {
      set({ user: null, isAuthenticated: false });
    },
  })),
  {
    name: "auth-storage",
    getStorage: () => sessionStorage,
  }
);
export default useAuth;
