import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useUser } from "@clerk/clerk-react";

// Zustand Store
const useAuth = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      authType: null, // 'clerk' or 'custom'
      useAuthlogin: (newUser, type = 'custom') => {
        set({ user: newUser, isAuthenticated: true, authType: type });
        // Set cookie for custom auth
        if (type === 'custom') {
          Cookies.set('auth_type', 'custom', { expires: 7 }); // 7 days expiry
        }
      },
      useAuthlogout: () => {
        set({ user: null, isAuthenticated: false, authType: null });
        // Clear cookies
        Cookies.remove('token');
        Cookies.remove('auth_type');
      },
      syncClerkUser: (clerkUser) => {
        if (clerkUser) {
          const userData = {
            id: clerkUser.id,
            username: clerkUser.username,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            profileImage: clerkUser.imageUrl,
            verified: true
          };
          set({ user: userData, isAuthenticated: true, authType: 'clerk' });
          Cookies.set('auth_type', 'clerk', { expires: 7 });
        }
      }
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage, // Changed to localStorage for better persistence
    }
  )
);
export default useAuth;

export const useAuthSync = () => {
  const { useAuthlogout, syncClerkUser } = useAuth();
  const { user: clerkUser, isSignedIn } = useUser();

  useEffect(() => {
    // Sync Clerk user state
    if (isSignedIn && clerkUser) {
      syncClerkUser(clerkUser);
    } else if (!isSignedIn) {
      const authType = Cookies.get('auth_type');
      if (authType === 'clerk') {
        useAuthlogout();
      }
    }
  }, [clerkUser, isSignedIn, syncClerkUser, useAuthlogout]);

  // Monitor custom auth token
  useEffect(() => {
    const checkCookie = () => {
      const authType = Cookies.get('auth_type');
      const token = Cookies.get('token');
      
      if (authType === 'custom' && !token) {
        useAuthlogout();
      }
    };
    
    const interval = setInterval(checkCookie, 30000); // Reduced frequency to 30 seconds
    return () => clearInterval(interval);
  }, [useAuthlogout]);
};
