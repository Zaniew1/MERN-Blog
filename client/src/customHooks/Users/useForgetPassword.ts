import { useState } from "react";
export const useForgetPassword = (email:string) => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const forgetPassword = (e: React.FormEvent<HTMLFormElement>): void =>{
            e.preventDefault();
            console.log(email, setSuccess, setError)
    }
    return {error, success, forgetPassword}
}