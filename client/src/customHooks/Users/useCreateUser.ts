import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
import { CreateUserType } from '../../types/blogTypes';

export const useCreateUser = (userData: CreateUserType) => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();
    const {setloggedIn} = useContext(AuthContext);

    const createUser = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        try{
            if(userData.email === "") return setError('Email jest wymagany'); 
            if(userData.name === "") return setError('Imię jest wymagany'); 
            if(userData.surname === "") return setError('Nazwisko jest wymagane'); 
            if(userData.name.length > 12 || userData.name.length<3 || userData.surname.length > 15 || userData.surname.length  < 3) return setError("Nazwisko i imię powinny mieć min 3 znaki i max 15 znaków ")
            if(!userData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) return setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
            const response = await fetch("http://localhost:3001/createNewUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            })
            if (!response.ok) {
              setError("Nie udało się stworzyć użytkownika");
            }
            else{
              setloggedIn(true);
              setSuccess('Udało się stworzyć użytkownika!');
              setTimeout(()=>{
                navigate('/');
              },1000)
            }
            const user = await response.json();
            console.log(user)
        }
        catch(err){
            setError("Nie udało się stworzyć użytkownika")
        }
    }
    return {error, setError, success, createUser}
}