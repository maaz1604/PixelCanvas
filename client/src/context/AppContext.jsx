import {  createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { data, useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin,setshowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem(data.token));
    let [credit, setcredit] = useState(5);
    
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    
    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get('http://localhost:4000' + '/api/user/credits', {
                headers:{token}
            });
            if (data.success) {
                setcredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
           console.log(error);
           toast.error(error.message) ;
        }
    }

    const generateImage = async (prompt) => {
        try {
          const {data} =  await axios.post( 'http://localhost:4000' + '/api/image/generate-image', {prompt}, {headers:{token} });
          if (data.success) {
              loadCreditsData();
              if (data.creditBalance===0) {
                  navigate('/buy');
                }
                return data.resultImage;
            }
            else{
                toast.error(data.message);
                loadCreditsData();
            }
            if (data.creditBalance!=0) {    
            setcredit(data.credits=credit-1);
            }

        } catch (error) {
            toast.error(error.message);  
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
        user,setUser,showLogin,setshowLogin,token,setToken,credit,setcredit,backendurl,loadCreditsData,logout,generateImage
    }
    return (
    
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    
    )
};

export default AppContextProvider;