import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
import { UserType, LoginDataType } from '../../types/blogTypes';

export const useLoginUser = (data: {email:string, password:string}) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const {setloggedIn, setUserData} = useContext(AuthContext);
    const LoginUser = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault(); 
      if(data.email === "") return setError('Email jest wymagany');
      if(!data.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        return setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
      }
      const response = await fetch("http://localhost:3001/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( data ),
        credentials: 'include'
      })
      if (!response.ok) {
        setError("Logowanie nie udane!");
      }else{
        setloggedIn(true);
        setSuccess("Udało się zalogować!");
        setTimeout(()=>{
          navigate('/');
        }, 1000)
      }
      const user: LoginDataType = await response.json();
      document.cookie = user.token as string;
      setUserData(user.data as UserType);
    }
    return {error, setError, success, LoginUser}
}