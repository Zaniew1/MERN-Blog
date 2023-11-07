import {ContainerCard } from "../Utilities/ContainerCard";
import { useState} from 'react';
export const Me:React.FC = ():JSX.Element => {

    const [picture, setPicture] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [error, setError] = useState<string>('');
    console.log(error)
    return (
        <ContainerCard>
            <div className="flex items-center flex-col justify-center w-screen h-screen md:w-[60%] lg:w-[65%] xl:w-[55%]">
            <p className="text-[1.6em] ml-[0.7em] font-bold text-[#2C3241]">Edycja ustawień</p>
            <img className="mt-[15px] w-[100px] h-[100px] rounded-[50%] md:w-[120px] md:h-[120px]" src={`src/assets/${'ja'}.jpg`}/>
            <form className="w-[70%] flex flex-col justify-center itmes-center mt-[20px]" >
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="picture">Zdjęcie profilowe</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="picture" id="picture" type="file" onChange={(e)=>{setPicture(e.target.value); setError('');}} value={picture} placeholder="Wgraj zdjęcie" />

                <label className="text-[1em] font-semibold py-[5px]" htmlFor="password">Imię</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="password" onChange={(e)=>{setName(e.target.value);  setError('');}} value={name} type="text" placeholder="Twoje imię" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="confirmPassword">Nazwisko</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="confirmPassword" onChange={(e)=>{setSurname(e.target.value);  setError('');}} value={surname} type="text" placeholder="Twoje nazwisko" />
                <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] lg:w-[60%] shadow-myShadow hover:bg-cyan-700 hover:text-white">Zapisz</button>
                <a href="/changePassword" className="mt-[20px] text-[0.8em] underline text-center">Zmień hasło</a>
                <a href="/CreateNewPost" className="mt-[20px] text-[0.8em] underline text-center">Dodaj post</a>
            </form>
                <div>
                    {/* //posty */}
                </div>
            </div>
        </ContainerCard>
    )
}