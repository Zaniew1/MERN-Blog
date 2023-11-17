import { useState } from "react";
export const useResetPassword = (data:{password:string, confirmPassword:string}) => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const resetPassword = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        console.log(data, setSuccess, setError)
    }   
    return {error, success, resetPassword}
}