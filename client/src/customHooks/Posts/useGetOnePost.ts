import { useEffect, useState } from "react";
import {PostType, emptyPostType} from '../../types/blogTypes'
export const useGetOnePost = (id:string) => {
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<PostType>(emptyPostType);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true)
            try{
                const response = await fetch("http://localhost:3001/article"+id, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    setError("Nie udało się pobrać tego artykułu. Spróbuj ponownie później");
                }
                const post = await response.json();
                console.log(post)
                setData(post.post as PostType)
                setLoading(false)
            }catch(err){
                setError('Wystąpił błąd podczas pobierania danych')
                setLoading(false)
            }
    }
    fetchData();
        },[id])
    return {data, error, loading};
}