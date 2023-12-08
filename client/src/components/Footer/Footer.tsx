export const Footer:React.FC = ():JSX.Element  =>{
    return(
        <div className="w-full flex justify-center items-center text-slate-400 text-[0.8em] pb-[25px]">
            <a href="#" target="_blank" className="hover:text-cyan-700">Terms</a>
            <a href="#" target="_blank" className="px-[20px] hover:text-cyan-700">Privacy Policy</a>
            <a href="#" target="_blank" className="hover:text-cyan-700">Support</a>
        </div>
    );
}