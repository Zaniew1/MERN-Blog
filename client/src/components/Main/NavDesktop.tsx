import {Socials} from '../Socials/Socials';
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context';
import { deleteCookie } from "../../utils/cookies";

export const NavDesktop:React.FC = ():JSX.Element => {
    const {loggedIn, setloggedIn} = useContext(AuthContext);
    const loggedOut = async () =>{
        const response = await fetch("http://localhost:3001/logoutUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        console.log(data)
        setloggedIn(false);
        deleteCookie('jwt')
    }

    return (
        <div className=" hidden items-center mx-[15px] md:flex">
            {!loggedIn && <a href="/login" className="flex justify-center items-center text-[1em] ml-[auto] mr-[20px] text-black opacity-40 h-full hover:text-neutral-500  ">Zaloguj</a>}
            {loggedIn && <a href="/CreateNewPost" className="flex justify-center items-center text-[1em] ml-[auto] mr-[20px] text-black opacity-40 h-full cursor-pointer hover:text-neutral-500">Dodaj post</a> }
            {loggedIn && <a className="flex justify-center items-center text-[1em] ml-[auto] mr-[20px] text-black opacity-40 h-full cursor-pointer hover:text-neutral-500" onClick={loggedOut}>Wyloguj</a>}
            {loggedIn && <a href="/me" className="w-[40px] h-[40px] mr-[20px] rounded-[50%] cursor-pointer md:w-[30px] md:h-[30px] ">
                            <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/ja.jpg`}/>
                        </a>}
            <Socials customStyle={" flex text-slate-400  text-[1.4em]"}/>
        </div>
    );
}