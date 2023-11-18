import { Popup } from "../Utilities/Popup";
import {useState} from 'react';
import { useChangePassword } from "../../customHooks/Users/useChangePassword";
export const ChangePassword:React.FC = ():JSX.Element => {
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmNewPass, setConfirmNewPass] = useState<string>('');
    const {error, success, changePassword} = useChangePassword(oldPass, newPass, confirmNewPass)
    
    return (
        <>
            {success && <Popup type={'success'} text={success}/>}
            {error && <Popup type={'error'} text={error}/>}
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] ">
                <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]" >Zmiana hasła</p>
                <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={changePassword} >
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="oldPass">Stare hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="oldPass" id="oldPass" type="password" onChange={(e)=>{setOldPass(e.target.value); }} value={oldPass} placeholder="Podaj stare hasło" />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="newPass">Nowe hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="newPass" id="newPass" type="password" onChange={(e)=>{setNewPass(e.target.value); }} value={newPass} placeholder="Podaj stare hasło" />
                    <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmNewPass">Potwierdź nowe hasło</label>
                    <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="confirmNewPass" id="confirmNewPass" type="password" onChange={(e)=>{setConfirmNewPass(e.target.value); }} value={confirmNewPass} placeholder="Podaj stare hasło" />
                
                    <button type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[0.8em] py-[12px] font-semibold shadow-myShadow hover:bg-cyan-700 hover:text-white">Zmień hasło</button>
                </form>
            </div>
        </>
    )
}