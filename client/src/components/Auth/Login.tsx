import {Nav} from '../Main/Nav';
import { useState} from 'react';
export const Login:React.FC = ():JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
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
              })
              if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                setError(message);
              }
            const user = await response.json();
            console.log(user)
    }
    
    
    return (
        <div className="flex justify-center">
            <Nav/>
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zaloguj się</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={Login}>
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="email">Email</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="email" id="email" type="text" onChange={(e)=>{setEmail(e.target.value); setError('');}} value={email} placeholder="Podaj email" />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setPassword(e.target.value);  setError('');}} value={password} type="password" placeholder="Podaj hasło" />
                    <div className="text-[red] text-[0.7em] mt-[15px] text-center">{error ? error : ''}</div>
                    <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zaloguj</button>
                </form>
                <a href="/forget" className="mt-[20px] text-[0.8em] underline ">Nie pamiętam hasła</a>
            </div>
        </div>
    )
}