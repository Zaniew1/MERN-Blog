import { ContainerCard } from "../Utilities/ContainerCard";
import { useEffect, useState } from "react";
import { Popup } from "../Utilities/Popup";
export const SinglePost:React.FC = ():JSX.Element =>{
    const [error, setError] = useState<string>('');
    const [content, setContent] = useState<string>('');
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
            setContent(post.post.content)
        }
        fetchPost();
    },[])
    return (
       <ContainerCard>
        {error && <Popup text={error} type={'error'}/>}
            <div>
                {content}
            </div>
       </ContainerCard>
    )
}