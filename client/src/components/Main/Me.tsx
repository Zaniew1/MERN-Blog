import { useState} from 'react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/Auth-context';
import { Popup } from '../Utilities/Popup';
import { useNavigate } from 'react-router-dom';
export const Me:React.FC = ():JSX.Element => {
    const {loggedIn, userData} = useContext(AuthContext);
    const [id, setId] = useState<string>(userData.id);
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>(userData.name);
    const [surname, setSurname] = useState<string>(userData.surname);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    useEffect(()=>{
        setId(userData.id);
        // setAvatar(userData.avatar)
        setName(userData.name)
        setSurname(userData.surname)
    },[userData])
    const sendNewUserInfo = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:3001/editUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({id, name, surname, avatar }),
              })
              if (!response.ok) {
                setError("Edycja nie udana, spróbuj ponownie później!");
              }else{
                setSuccess("Udało się edytować użytkownika!");
                setTimeout(()=>{
                  navigate('/');
                }, 1000)
              }
            const user = await response.json();
              
        console.log(user)
        console.log(error)
    }
    return (
        <>
            {success && <Popup type="success" text={success}/>}
            {error && <Popup type="error" text={error}/>}
            { loggedIn && 
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[65%] xl:w-[55%]">
                    <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Edycja ustawień</p>
                    <img className="mt-[15px] w-[100px] h-[100px] rounded-[50%] md:w-[120px] md:h-[120px]" src={`http://localhost:3001/images/ja.jpg`}/>
                    <form className="w-[70%] flex flex-col justify-center itmes-center mt-[20px]" onSubmit={sendNewUserInfo} >
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="picture">Zdjęcie profilowe</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="picture" id="picture" type="file" onChange={(e)=>{setAvatar(e.target.value); setError('');}} value={avatar} placeholder="Wgraj zdjęcie" />
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Imię</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setName(e.target.value);  setError('');}} value={name} type="text" placeholder="Twoje imię" />
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmPassword">Nazwisko</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" onChange={(e)=>{setSurname(e.target.value);  setError('');}} value={surname} type="text" placeholder="Twoje nazwisko" />
                        <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] lg:w-[60%] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zapisz</button>
                        <a href="/changePassword" className="mt-[20px] text-[0.8em] underline text-center">Zmień hasło</a>
                    </form>
                </div>
            }
        </>
    )
}