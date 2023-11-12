import React, { useState } from "react";

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
        _id:string,
        email:string,
        creationDate:number,
        newsletter:boolean
  }

export const AuthContext = React.createContext<AuthContextType>({
    loggedIn: false,
    setloggedIn: () => {false},
    userData:{
      _id:"",
      email:"Mateusz Zaniewski",
      creationDate:0,
      newsletter:false
    },
    setUserData: () => {}
  });



export const AuthContextProvider = (props: ContextPropsType) => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>({
    _id: "",
    email: "",
    creationDate: 0,
    newsletter: false
  });
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