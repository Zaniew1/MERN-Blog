import { useContext } from "react";
import { UIContext } from '../../store/UI-context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faX}  from "@fortawesome/free-solid-svg-icons";
export const Burger:React.FC = ():JSX.Element => {
    const {mobileNav, setMobileNav} = useContext(UIContext);
  console.log("Renderuję burger")

    return (
        <div className="flex items-center mx-[15px] md:hidden" onClick={()=>{setMobileNav(!mobileNav)}}>
            <div className="text-[1.4em]" >
                { !mobileNav && <FontAwesomeIcon icon={faBars} />}
                { mobileNav && <FontAwesomeIcon icon={faX} />}
            </div>
        </div>
    );
}