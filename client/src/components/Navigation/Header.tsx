export const Header:React.FC = ():JSX.Element =>{
    console.log("Renderuję header")
    return (
        <header className="m-2.5 w-60%">
            <a href="/" className="flex flex-row justify-start items-end h-full">
                <p className="text-[1.6em] ml-[0.7em] font-bold h-full text-[#2C3241]"> Nazwa</p>
                <span className=" self-center text-[1.4em] ml-[10px] text-black opacity-30 h-full">|</span>
                <p className="text-[1.4em] ml-[10px] text-black opacity-40 h-full"> Blog</p>
            </a>
        </header>
    );
}