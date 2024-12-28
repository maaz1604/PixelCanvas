import {  createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin,setshowLogin] = useState(false);

    const value = {
        user,setUser,showLogin,setshowLogin
    }
    return (
    
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    
    )
};


export default AppContextProvider;
