

import { Header } from './Header';
import { Burger } from './Burger';
import { NavMobile } from '../Navigation/NavMobile';
import { useContext } from "react";
import { UIContext } from '../../store/UI-context';
import {AuthContext} from '../../store/Auth-context';
import { NavDesktop } from './NavDesktop';
export const NavBar = () => {
    const {mobileNav} = useContext(UIContext);
    const {loggedIn} = useContext(AuthContext);
    return (
        <>
            <nav className=' flex w-full flex-col grow items-center justify-center top-0 left-0 fixed shadow-myShadow z-50 bg-slate-50 lg:h-[70px]'>
                <div className={`max-w-6xl flex w-full justify-between items-center h-full  ${mobileNav ? "border-b-2" : "border-b-0"} `}>
                   <Header/>
                   <Burger/>
                   <NavDesktop/>
                </div>
                <div className={`w-full transition-height ease-out duration-300 bg-slate-50 ${mobileNav ? `${loggedIn ? "h-[200px]" : "h-[100px]" }` : "h-0"} md:hidden`}>
                     <NavMobile/>
                </div>
            </nav>
     
        </>
    
    );
}