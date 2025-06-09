import useAuth from '@/context/authContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { apiVerify } from '@/schema/apiSchema';
import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie';

const Logout = () => {
    const { useAuthlogout } = useAuth();
    const { signOut } = useUser();
    const navigate = useNavigate();

    const logouttheUser = async () => {
        try {
            // First, sign out from Clerk if the user was using Clerk auth
            const authType = Cookies.get('auth_type');
            if (authType === 'clerk') {
                await signOut();
            }

            // Then, call our custom logout endpoint
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/logout`
            );

            if (!apiVerify(res)) {
                toast.warning("Api Error, Please contact admin");
                return;
            }

            // Clear local auth state
            useAuthlogout();
            
            // Show success message
            toast.success(res.data.message || "Logged out successfully");
            
            // Navigate to landing page after successful logout
            navigate('/', { replace: true });
        } catch (error) {
            const { response } = error;
            if (!response) {
                toast.error("Database connection error");
            } else if (!apiVerify(response)) {
                toast.warning("Api Error, Please contact admin");
            } else {
                toast.error(response.data.message);
            }
            // Even if there's an error, try to navigate to landing page
            navigate('/', { replace: true });
        }
    };

    useEffect(() => {
        logouttheUser();
    }, []);

    // Show a loading state while logging out
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Logging out...</h2>
                <p className="text-gray-600">Please wait while we log you out</p>
            </div>
        </div>
    );
};

export default Logout;