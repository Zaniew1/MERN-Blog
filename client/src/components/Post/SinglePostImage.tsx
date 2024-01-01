export const SinglePostImage:React.FC<{id?:string, mainPicture:string, style?:string}> = (props):JSX.Element =>{
    return( 
        <>
            {props.mainPicture && 
                <a href={`/${props.id ?? ""}`} className={props.style ?? 'w-full aspect-square cursor-pointer border md:w-[45%] md:flex-grow  md:mx-[15px] '}>
                    <img className="w-full h-full object-cover " src={`${import.meta.env.VITE_API_URL}/images/posts/${props.mainPicture}`}/>
                </a>
            }
        </>

    );

}