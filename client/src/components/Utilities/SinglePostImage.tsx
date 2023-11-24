export const SinglePostImage:React.FC<{id?:string, mainPicture:string, style?:string}> = (props):JSX.Element =>{
    return(
        <a href={`/${props.id ?? ""}`} className={props.style ?? 'w-full aspect-square cursor-pointer border md:w-[45%] md:flex-grow  md:mx-[15px] '}>
            <img className="w-full h-full object-cover " src={`http://localhost:3001/images/posts/${props.mainPicture}`}/>
        </a>
    );

}