import React, { useState } from "react";
import { UIContextType, ContextPropsType } from "../types/blogTypes";

export const UIContext = React.createContext<UIContextType>({
    mobileNav: false,
    setMobileNav: () => {},
    showMorePostsIndex: 6,
    setShowMorePostsIndex: ()=> {}
    
  });

export const UIContextProvider = (props: ContextPropsType) => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [showMorePostsIndex, setShowMorePostsIndex] = useState<number>(6);
 
  return (
    <UIContext.Provider
      value={{
        mobileNav: mobileNav,
        setMobileNav: setMobileNav,
        showMorePostsIndex: showMorePostsIndex,
        setShowMorePostsIndex
       
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};