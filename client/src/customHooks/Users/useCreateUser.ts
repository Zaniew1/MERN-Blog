import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'


export const useCreateUser = (data: { name:string, surname:string, email:string, password:string, confirmPassword:string}) => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();
    const {setloggedIn} = useContext(AuthContext);

    const createUser = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        try{
            if(data.email === "") return setError('Email jest wymagany'); 
            if(data.name === "") return setError('Imię jest wymagany'); 
            if(data.surname === "") return setError('Nazwisko jest wymagane'); 
            if(data.name.length > 12 || data.name.length<3 || data.surname.length > 15 || data.surname.length  < 3) return setError("Nazwisko i imię powinny mieć min 3 znaki i max 15 znaków ")
            if(!data.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) return setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
            const response = await fetch("http://localhost:3001/createNewUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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