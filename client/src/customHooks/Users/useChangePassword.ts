import { useNavigate } from 'react-router-dom'
import {useState, useContext} from 'react';
import { AuthContext } from '../../store/Auth-context';
export const useChangePassword  = (oldPass:string, newPass:string, confirmNewPass:string) =>{
    const {userData} = useContext(AuthContext)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const navigate = useNavigate();
    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newPass.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
            return;
          }
        if(newPass !== confirmNewPass){
            setError("Nowe hasło i potwierdzenie nowego hasła muszą być te same");
            return;
        }
        const response = await fetch("http://localhost:3001/changePassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({oldPass, newPass, confirmNewPass, email:userData.email }),
            credentials: 'include'
          })
          const data = await response.json();
          console.log(data)
        if(response.status  === 200){
            setSuccess("Udało się zmienić hasło");
            setTimeout(()=>{
                navigate('/me');
            },1000)
        }
    }
     return {success, error, changePassword}
}