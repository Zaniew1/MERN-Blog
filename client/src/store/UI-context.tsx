import React, { useState } from "react";

 type UIContextType = {
    mobileNav: boolean,
    setMobileNav: (logged: boolean) => void,
  }


 type ContextPropsType = {
    children: React.ReactNode
  }


export const UIContext = React.createContext<UIContextType>({
    mobileNav: false,
    setMobileNav: () => {},
    
  });



export const UIContextProvider = (props: ContextPropsType) => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
 
  return (
    <UIContext.Provider
      value={{
        mobileNav: mobileNav,
        setMobileNav: setMobileNav,
       
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};