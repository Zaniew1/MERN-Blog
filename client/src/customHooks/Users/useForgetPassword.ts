import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useForgetPassword = (email:string) => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate  = useNavigate()
    const forgetPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> =>{
            e.preventDefault();
            const response = await fetch("http://localhost:3001/forgetPassword", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify( {email} ),
              })
              if (!response.ok) {
                setError("Nie udało się wysłać maila, spróbuj ponownie później!");
              }else{
                setSuccess("Wysłano maila resetującego, sprawdz pocztę!");
                setTimeout(()=>{
                  navigate('/');
                }, 1000)
              }
    }
    return {error, success, forgetPassword}
}