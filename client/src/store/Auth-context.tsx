import React, { useState, useEffect } from "react";
import { getCookie } from "../utils/cookies";
 type AuthContextType = {
    loggedIn: boolean,
    setloggedIn: (logged: boolean) => void,
    userData: UserDataType,
    setUserData: (data: UserDataType) => void
  }
 type ContextPropsType = {
    children: React.ReactNode
  }
 type UserDataType = {
        id:string,
        email:string,
        name:string,
        surname:string,
        avatar?:string
  }

export const AuthContext = React.createContext<AuthContextType>({
    loggedIn: false,
    setloggedIn: () => {false},
    userData:{
      id:"",
      email:"",
      name:"",
      surname:"",
      avatar: "",
    },
    setUserData: () => {}
  });


export const AuthContextProvider = (props: ContextPropsType) => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>({
    id:"",
    email:"",
    name:"",
    surname:"",
    avatar: "",
  });

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
        setUserData({id, email, name, surname, avatar} as UserDataType);
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