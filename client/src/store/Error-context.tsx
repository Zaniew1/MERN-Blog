import React, { useState } from "react";
import { ErrorContextType, ContextPropsType } from "../types/blogTypes";

export const ErrorContext = React.createContext<ErrorContextType>({
    error: '',
    setError: () => {},
    success: '',
    setSuccess: () => {},
    
  });

export const ErrorContextProvider = (props: ContextPropsType) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
 
  return (
    <ErrorContext.Provider
      value={{
        error: error,
        setError: setError,
        success:success,
        setSuccess: setSuccess,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};