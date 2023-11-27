import { useResetPassword } from "../../customHooks/Users/useResetPassword"
import { useState } from "react"

export const Reset:React.FC = ():JSX.Element => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const {resetPassword} = useResetPassword(password, confirmPassword);
    return (
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Zresetuj hasło</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={resetPassword}>
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Hasło</label>
                    <input className="px-[10px] py-[10px] mb-[15px] border-[1px] border-cyan-700" name="password" id="password" type="password" placeholder="Podaj nowe hasło"onChange={(e)=>{setPassword(e.target.value)}} value={password} />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmPassword">Powtórz hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" type="password" placeholder="Powtórz nowe hasło" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} />
                    <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zmień</button>
                </form>
            </div>
    )

}