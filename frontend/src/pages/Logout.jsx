import useAuth from '@/context/authContext';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {useAuthlogout} = useAuth();
    const navigate = useNavigate();
    const logouttheUser = async () => {
      useAuthlogout();
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/logout`,
        );
        if (!apiVerify(res)) {
          toast.warning("Api Error , Please contact admin");
          return;
        }
        toast.success(res.data.message);
      } catch (error) {
        const { response } = error;
        if (!response) {
          toast.error("Database connection error");
          return;
        }
        if (!apiVerify(response)) {
          toast.warning("Api Error , Please contact admin");
          return;
        }
        toast.error(response.data.message);
      }
    }
    useEffect(() => {
      logouttheUser();
      navigate('/')
    }, [])
    
  return (
    <div>Logout</div>
  )
}

export default Logout