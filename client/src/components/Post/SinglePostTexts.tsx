export const SinglePostTexts:React.FC<{id:string, title:string, contentCategory:string, summary:string}> = (props):JSX.Element =>{
    return(
        <>
            <p className="tracking-wide font-bold text-[1.2em] py-[15px] text-[#2C3241] md:text-[1em] ">{props.contentCategory}</p>
            <a href={`/${props.id}`} className="text-[1.6em] cursor-pointer font-bold text-[#2C3241] md:text-[1.8em] md:font-semibold hover:text-sky-700">{props.title}</a>
            <p className="text-[1em] text-gray-500 tracking-wider py-[10px] md:text-[1.1em] md:min-h-[100px]">{props.summary}</p>
        </>

    );

}