import { EditUserType} from "../../types/blogTypes";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext,} from 'react';
import { AuthContext } from '../../store/Auth-context';
export const useEditUser = (dataUser:EditUserType) => {
    const navigate = useNavigate();
    const { userData} = useContext(AuthContext);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const editUser = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const data = new FormData();
        data.set('id', userData.id as string);
        data.set('name', dataUser.name);
        data.set('surname', dataUser.surname);
        data.set('avatar', dataUser.avatar ?? "");
        const response = await fetch("http://localhost:3001/editUser", {
                method: "POST",
                body: data,
              })
              if (!response.ok) {
                setError("Edycja nie udana, spróbuj ponownie później!");
              }else{
                setSuccess("Udało się edytować użytkownika!");
                setTimeout(()=>{
                  navigate('/');
                }, 1000)
                const user = await response.json()
                console.log(user)
              }
    }
    return {error, setError, success,editUser }
}