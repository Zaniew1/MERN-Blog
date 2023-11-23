
type PopupType = {
    text:string,
    type: "success" | "error"
}
export const Popup:React.FC<PopupType> = (props):JSX.Element => {

    return (
        <div className={` absolute ${props.type == "success" ? "bg-green-400" :  "bg-red-400" } z-[150] top-[10%] l-[50%] transform translate-y-[-50%] rounded flex justify-center items-center max-w-[400px] `}>
            <p className="text-white text-center px-[15px] py-[15px]">{props.text}</p>
        </div>
    );
}