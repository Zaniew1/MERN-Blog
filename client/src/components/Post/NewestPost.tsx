
type NewestPostType = {
    key:number,
    id: number,
    title: string,
    summary:string,
    content: string,
    mainPicture:string,
    contentCategory:string,
    creator: string,
    creationDate:number,
    creatorAvatar:string
}
export const NewestPost:React.FC<NewestPostType> = (props):JSX.Element =>{
    const date = new Date(props.creationDate).toLocaleDateString()
    console.log(props)
    return (
        <article className=" flex flex-col w-[95%] mx-auto   pb-[25px] mt-[100px] border-b border-solid border-slate-300 z-10 md:flex-row md:border-none lg:flex-grow lg:mx-[15px]">
            <a href={`/${props.id}`} className="flex flex-col w-full h-full md:flex-row lg:flex-grow ">
                <div className="w-full md:w-[50%] lg:flex-col lg:flex lg:justify-center mr-[15px]">
                    <p className="tracking-wide font-bold text-[1.2em] pb-[15px] text-[#2C3241] md:mb-[15px]">Newest Post</p>
                    <h3 className="text-[2.3em] font-bold cursor-pointer transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[3.4em] md:leading-[1.1em] hover:text-sky-700">{props.title}</h3>
                    <p className="text-[1.2em] text-gray-500 tracking-wider py-[10px] md:pr-[50px] md:font-medium">{props.summary}</p>
                    <div className="w-full  my-[15px] flex">
                        <div className="w-[30%] h-full flex justify-center items-center md:justify-start md:w-[100px]">
                            <div className="w-[70px] h-[70px] rounded-[50%]">
                                <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/ja.jpg`}/>
                            </div>
                        </div>
                        <div className=" w-[70%] ">
                            <p className="text-[1em] font-bold text-[#2C3241]">{props.creator ? props.creator : "Mateusz Zaniewski"}</p>
                            <p className="text-[1.2em] font-thin tracking-wider text-gray-400">{date}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full aspect-square cursor-pointer border md:w-[50%] my-auto lg:ml-[15px] ">
                    <img className="w-full h-full " src={`http://localhost:3001/${props.mainPicture}`}/>
                </div>
            </a>
        </article>
    )
}