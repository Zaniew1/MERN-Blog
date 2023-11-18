import React, { useState, useEffect } from "react";
import { getCookie } from "../utils/cookies";
import {UserType, AuthContextType,ContextPropsType, emptyUserType } from '../types/blogTypes'

export const AuthContext = React.createContext<AuthContextType>({
    loggedIn: false,
    setloggedIn: () => {false},
    userData: emptyUserType,
    setUserData: () => {}
  });


export const AuthContextProvider = (props: ContextPropsType) => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>(emptyUserType);

  useEffect(()=>{
    const fetchUserData = async ()=>{
      const jwt = getCookie("jwt");
      const response = await fetch("http://localhost:3001/profile", {
        method: "GET",
        headers: {Authorization: `Bearer ${jwt}`}
      })
      if (response.ok) {
        // console.log(response)
      }else{
         console.log(response)
      }
      const user = await response.json();
      if(user.status == 'success'){
        setloggedIn(true)
        const {id, email, name, surname, avatar} = user
        setUserData({id, email, name, surname, avatar} as UserType);
      }
    }
    fetchUserData();
  },[])

  
  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        setloggedIn: setloggedIn,
        userData:userData,
        setUserData: setUserData
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};