
type PopupType = {
    text:string,
    type: "success" | "error"
}
import { useContext } from "react";
import { ErrorContext } from "../../store/Error-context";
export const Popup:React.FC<PopupType> = (props):JSX.Element => {
    const {setError} = useContext(ErrorContext);
    const closePopUp= () => {
        setError('');
    }
    return (
        <div className={` fixed ${props.type == "success" ? "bg-green-400" :  "bg-red-400" } z-[150] top-[10%] l-[50%] transform translate-y-[-50%] m-auto rounded flex justify-center items-center max-w-[400px] `}>
            {props.type == "error" && <div onClick={closePopUp} className={'absolute cursor-pointer text-white top-[5%] right-[5%] w-[15px] h-[15px] m-auto'}>X</div>}
            <p className=" w-[85%] text-white text-center px-[15px] py-[15px]">{props.text}</p>
        </div>
    );
}