import { useState} from 'react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/Auth-context';
import { useEditUser } from '../../customHooks/Users/useEditUser';
export const Me:React.FC = ():JSX.Element => {
    const {loggedIn, userData} = useContext(AuthContext);
    const [id, setId] = useState<string>(`${userData.id}`);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState<string>(userData.name);
    const [surname, setSurname] = useState<string>(userData.surname);
    console.log("Renderuję ME")
    useEffect(()=>{
        setId(`${userData.id}`);
        setName(userData.name)
        setSurname(userData.surname)
    },[userData])
    
    const {editUser} = useEditUser({id, name, surname, avatar})
    return (
        <>
            { loggedIn && 
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[65%] xl:w-[55%]">
                    <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Edycja ustawień</p>
                    <img className="mt-[15px] w-[100px] h-[100px] rounded-[50%] md:w-[120px] md:h-[120px]" src={`http://localhost:3001/images/users/${userData.avatar ?? "user.jpg"}`}/>
                    <form className="w-[70%] flex flex-col justify-center itmes-center mt-[20px]" onSubmit={editUser} >
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="picture">Zdjęcie profilowe</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="avatar" id="picture" type="file" onChange={(e)=>{e.target.files && e.target.files.length > 0 ? setAvatar(e.target.files[0]) : ""}} placeholder="Wgraj zdjęcie" />
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Imię</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setName(e.target.value);}} value={name} type="text" placeholder="Twoje imię" />
                        <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmPassword">Nazwisko</label>
                        <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" onChange={(e)=>{setSurname(e.target.value);}} value={surname} type="text" placeholder="Twoje nazwisko" />
                        <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] lg:w-[60%] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zapisz</button>
                        <a href="/changePassword" className="mt-[20px] text-[0.8em] underline text-center">Zmień hasło</a>
                    </form>
                </div>
            }
        </>
    )
}