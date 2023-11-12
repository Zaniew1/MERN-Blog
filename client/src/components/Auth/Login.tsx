import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Popup } from '../Utilities/Popup';
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context'
type UserDataType = {
  _id:string,
  email:string,
  creationDate:number,
  newsletter:boolean
}

type dataType = {
  data: UserDataType,
  status:string,
  token: string
}

export const Login:React.FC = ():JSX.Element => {

    const navigate = useNavigate();
    const {setloggedIn, setUserData} = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
            const response = await fetch("http://localhost:3001/loginUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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
            const user: dataType = await response.json();
            console.log(user)
            setUserData(user.data as UserDataType);
    }
    
    
    return (
      <>
            {success && <Popup type="success" text={success}/>}
            {error && <Popup type="error" text={error}/>}
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[70%] lg:w-[45%] xl:w-[35%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zaloguj się</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={Login}>
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="email">Email</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="email" id="email" type="text" onChange={(e)=>{setEmail(e.target.value); setError('');}} value={email} placeholder="Podaj email" />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setPassword(e.target.value);  setError('');}} value={password} type="password" placeholder="Podaj hasło" />
                    <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zaloguj</button>
                </form>
                <a href="/createUser" className="mt-[20px] text-[0.8em] underline ">Stwórz nowego użytkownika</a>
                <a href="/forgetPassword" className="mt-[20px] text-[0.8em] underline ">Nie pamiętam hasła</a>
            </div>
      </>
    )
}