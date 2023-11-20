import { useState} from 'react';
import { Popup } from '../Utilities/Popup';
import { useCreateUser } from '../../customHooks/Users/useCreateUser';
export const Create:React.FC = ():JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const {error, success, setError, createUser} = useCreateUser({email, name, surname, password, confirmPassword})
    return (
      <>
        {success && <Popup type={'success'} text={success}/>}
        {error && <Popup type={'error'} text={error}/>}
        <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[35%] xl:w-[25%]">
            <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Stwórz użytkownika</p>
            <form className="w-[70%] flex flex-col justify-center mt-[20px]" onSubmit={createUser}>
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="name">Imię</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="name" id="name" type="text" onChange={(e)=>{setName(e.target.value); setError('');}} value={name} placeholder="Podaj imię" />  
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="surname">Nazwisko</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="surname" id="surname" type="text" onChange={(e)=>{setSurname(e.target.value); setError('');}} value={surname} placeholder="Podaj Nazwisko" />
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