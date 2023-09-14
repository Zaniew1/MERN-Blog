export const NextPost:React.FC = ():JSX.Element => {
    return(
        <article className="mt-[20px] mx-[15px] z-10 border-b border-solid border-slate-300">
            <div className="w-full h-[200px] border bg-duck-picture bg-center bg-cover"> </div>
            <p className="tracking-wide font-bold text-[1.2em] py-[15px] text-[#2C3241]">Dziedzina</p>
            <h3 className="text-[1.6em] font-bold text-[#2C3241]">Lorem ipsum some headerasdasd aslkdj lksd</h3>
            <p className="text-[1em] text-gray-500 tracking-wider py-[10px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus architecto nihil similique sed explicabo, dolor</p>
            <div className="w-full  my-[15px] flex">
                <div className="w-[20%] h-full flex justify-center items-center ">
                    <div className="w-[40px] h-[40px] rounded-[50%] border bg-me-picture bg-center bg-cover ">
                    </div>
                </div>
                <div className=" w-[70%]">
                    <p className="text-[1em] font-bold text-[#2C3241]">Mateusz Zaniewski</p>
                    <p className="text-[1.2em] font-thin tracking-wider text-gray-400">08-09-2023</p>
                </div>
            </div>
        </article>
    )
}