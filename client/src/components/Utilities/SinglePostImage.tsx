export const SinglePostImage:React.FC<{id:string, mainPicture:string, style:string}> = (props):JSX.Element =>{
    return(
        <a href={`/${props.id}`} className={props.style}>
            <img className="w-full h-full object-cover " src={`http://localhost:3001/images/posts/${props.mainPicture}`}/>
        </a>
    );

}