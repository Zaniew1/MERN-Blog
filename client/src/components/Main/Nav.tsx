import {Socials} from '../Socials/Socials'
import { useContext } from "react";
import {AuthContext} from '../../store/Auth-context';
export const Nav = () => {
    const {loggedIn, setloggedIn} = useContext(AuthContext);
    return (
            <nav className=' flex w-full items-center justify-center top-0 left-0 h-[60px] fixed shadow-myShadow z-50 bg-slate-50  lg:h-[70px]'>
                <div className="max-w-6xl flex w-full items-center h-full lg:justify-between">
                    <header className="m-2.5">
                        <a href="/" className="flex flex-row justify-start items-end">
                            <p className="text-[1.6em] ml-[0.7em] font-bold h-full text-[#2C3241]"> Nazwa</p>
                            <span className=" self-center text-[1.4em] ml-[10px] text-black opacity-30 h-full">|</span>
                            <p className="text-[1.4em] ml-[10px] text-black opacity-40 h-full"> Blog</p>
                        </a>
                    </header>
                    {!loggedIn && <a  href="/login" className="flex justify-center items-center text-[1em] ml-[auto] mr-[20px] text-black opacity-40 h-full hover:text-neutral-500  ">Zaloguj</a>}
                    {loggedIn && <a className="flex justify-center items-center text-[1em] ml-[auto] mr-[20px] text-black opacity-40 h-full cursor-pointer hover:text-neutral-500" onClick={()=>{setloggedIn(false); } }>Wyloguj</a>}
                    {loggedIn && <a href="/me" className="w-[40px] h-[40px] rounded-[50%] cursor-pointer md:w-[30px] md:h-[30px] ">
                                    <img className="w-full h-full rounded-[50%]" src={`src/assets/${'ja'}.jpg`}/>
                                 </a>}
                    <Socials customStyle={" hidden w-[15%] justify-center items-center text-slate-400 py-[15px] text-[1.4em] lg:flex"}/>
                </div>
            </nav>
    );
}