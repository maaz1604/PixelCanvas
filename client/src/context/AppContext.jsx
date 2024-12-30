import {  createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin,setshowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(5);
    
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendurl + '/api/user/credits', {
                headers:{token}
            });
            if (data.success) {
                setUser(data.user);
                setCredit(toString(data.credits));
            }
        } catch (error) {
           console.log(error);
           toast.error(error.message) ;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    useEffect(()=>{
        if (token) {
            loadCreditsData();
        }
    },[token])

    const value = {
        user,setUser,showLogin,setshowLogin,token,setToken,credit,setCredit,backendurl,loadCreditsData,logout
    }
    return (
    
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    
    )
};

export default AppContextProvider;