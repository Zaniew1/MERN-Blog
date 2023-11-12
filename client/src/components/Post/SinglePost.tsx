import { ContainerCard } from "../Utilities/ContainerCard";
import { useEffect, useState } from "react";
import { Popup } from "../Utilities/Popup";
export const SinglePost:React.FC = ():JSX.Element =>{
    const [error, setError] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [mainPicture, setMainPicture] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [creator, setCreator] = useState<string>('');
    const [creatorAvatar, setCreatorAvatar] = useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');

    useEffect(()=>{
        const fetchPost = async () => {
            const response = await fetch("http://localhost:3001/article"+window.location.pathname, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
              if (!response.ok) {
                setError("Nie udało się pobrać tego artykułu. Spróbuj ponownie później");
              }
            const post = await response.json();
            setTitle(post.post.title)
            setSummary(post.post.summary)
            setCategory(post.post.contentCategory)
            setContent(post.post.content)
            setMainPicture(post.post.mainPicture)
            setCreator(post.post.creator)
            setCreatorAvatar(post.post.creatorAvatar)
            setCreationDate(post.post.creationDate)
        }
        fetchPost();
    },[])
    return (
       <ContainerCard>
        {error && <Popup text={error} type={'error'}/>}
            <div className="flex flex-col justify-center items-center  w-full mt-[150px] ">
                <div className="text-center text-[1.8em] mb-[20px] text-[#2C3241] font-bold">{category}</div>
                <div className="">
                  <img src={`http://localhost:3001/${mainPicture}`}  alt="Główne zdjęcie" />
                </div>
                <p className="mt-[10px] text-[0.9em] text-slate-700">{`Created by: ${creator}`}</p>
                <p className="mt-[10px] text-[0.9em] text-slate-700">{`${new Date(creationDate).toLocaleDateString()}`}</p>
                <h3 className="text-[2.3em] mt-[30px] text-center font-bold transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[3.4em] md:leading-[1.1em] ">{title}</h3>
                <div className="my-[40px] w-full px-[15px] text-[0.9em] text-slate-700 text-justify" dangerouslySetInnerHTML={{__html:content}}>
                  
                </div>
            </div>
       </ContainerCard>
    )
}