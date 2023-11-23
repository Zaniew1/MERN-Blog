import {Socials} from '../Socials/Socials';
import { useContext } from "react";
import {UIContext} from '../../store/UI-context';
import {AuthContext} from '../../store/Auth-context';
import { useLogOut } from '../../customHooks/Users/useLogOut';
export const NavMobile:React.FC = ():JSX.Element => {
    const {mobileNav} = useContext(UIContext);
    const {loggedIn, userData} = useContext(AuthContext);
    const {logOut} = useLogOut();

    return (
        <>
            <div className={`flex flex-col items-left justify-center transition-opacity ease-out delay-200 pl-[15px] ${mobileNav ? 'opacity-100' : "opacity-0"} md:hidden`}>
                {!loggedIn && <a  href="/login" className=" pt-[10px] text-[1em]   text-black opacity-40  hover:text-neutral-500  ">Zaloguj</a>}
                {loggedIn && <a href="/CreateNewPost" className=" py-[10px] text-[1em]   text-black opacity-40  hover:text-neutral-500">Dodaj post</a> }
                {loggedIn && <a className=" text-[1em] py-[10px]  text-black opacity-40  cursor-pointer hover:text-neutral-500" onClick={logOut}>Wyloguj</a>}
                {loggedIn && <a href="/me" className="cursor-pointer md:w-[30px] md:h-[30px] ">
                                <img className="w-[40px] h-[40px] rounded-[50%]" src={`http://localhost:3001/images/users/${userData.avatar}`}/>
                            </a>}
                <Socials customStyle={"items-left text-slate-400 py-[15px] text-[1.4em]"}/>
            </div>
        </>
    );
}


