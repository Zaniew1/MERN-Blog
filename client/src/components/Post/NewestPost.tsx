export const NewestPost:React.FC = ():JSX.Element =>{
    return (
        <article className="mt-[100px] mx-[15px] pb-[25px] border-b border-solid border-slate-300  z-10">
            <p className="tracking-wide font-bold text-[1.2em] pb-[15px] text-[#2C3241]">Newest Post</p>
            <h3 className="text-[2.3em] font-bold text-[#2C3241] leading-tight">Best easy Recipes for Breakfast Menus</h3>
            <p className="text-[1.2em] text-gray-500 tracking-wider py-[10px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus architecto nihil similique sed explicabo</p>
            <div className="w-full  my-[15px] flex">
                <div className="w-[30%] h-full flex justify-center items-center ">
                    <div className="w-[70px] h-[70px] rounded-[50%] border bg-me-picture bg-center bg-cover ">
                    </div>
                </div>
                <div className=" w-[70%]">
                    <p className="text-[1em] font-bold text-[#2C3241]">Mateusz Zaniewski</p>
                    <p className="text-[1.2em] font-thin tracking-wider text-gray-400">08-09-2023</p>
                </div>
            </div>
            <div className="w-full h-[350px] border bg-duck-picture bg-center bg-cover">
            </div>
        </article>
    )
}