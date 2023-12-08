import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faSquareFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export const Socials:React.FC<{customStyle?:string}> = (props):JSX.Element  =>{
    return(
        <div className={`${props.customStyle ? props.customStyle : "w-full flex justify-center items-center text-slate-400 py-[15px] text-[1.4em]"}`}>
            <a href="#" target="_blank"> <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-slate-600"/></a>
            <a href="#" target="_blank"><FontAwesomeIcon icon={faSquareFacebook} className="px-[20px] hover:text-slate-600"/></a>
            <a href="#" target="_blank"><FontAwesomeIcon icon={faXTwitter} className="hover:text-slate-600"/></a>
        </div>
    );
}