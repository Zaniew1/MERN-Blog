import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Popup } from '../Utilities/Popup';
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
export const Create:React.FC = ():JSX.Element => {
    const navigate = useNavigate();
    const {setloggedIn} = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const Login = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); 
        if(email === ""){
            setError('Email jest wymagany');
            return;
          }
          if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            setError("Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny");
            return;
          }

            const response = await fetch("http://localhost:3001/createNewUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, confirmPassword}),
                credentials: 'include'
              })
              if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                setError(message);
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
    
    
    return (
      <>
        {success && <Popup type={'success'} text={success}/>}
        <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
            <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Stwórz użytkownika</p>
            <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={Login}>
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="email">Email</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="email" id="email" type="text" onChange={(e)=>{setEmail(e.target.value); setError('');}} value={email} placeholder="Podaj email" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Hasło</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setPassword(e.target.value);  setError('');}} value={password} type="password" placeholder="Podaj hasło" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmPassword">Potwierdź Hasło</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value);  setError('');}} value={confirmPassword} type="password" placeholder="Potwierdź hasło" />
                <div className="text-[red] text-[0.7em] mt-[15px] text-center">{error ? error : ''}</div>
                <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Stwórz</button>
            </form>
        </div>
      </>
    )
}