export const Nav = () => {
    return (
            <nav className='w-full h-[60px] bg-slate-600 fixed '>
                <header className="m-2.5 flex flex-row justify-start items-end ">
                    <p className="text-[1.6em] ml-[0.7em] font-bold h-full "> Nazwa</p>
                    <span className=" self-center text-[1.4em] ml-[10px] text-black opacity-30 h-full">|</span>
                    <p className="text-[1.4em] ml-[10px] text-black opacity-40 h-full"> Blog</p>
                </header>
            </nav>
    );
}