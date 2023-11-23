import { useEffect, useState } from "react";
import {PostType, emptyPostType} from '../../types/blogTypes'
import { useShowInfo } from "../useShowInfo";
export const useGetOnePost = (id:string) => {
    const [data, setData] = useState<PostType>(emptyPostType);
    const {showError} = useShowInfo();
    useEffect(()=>{
        const fetchData = async () =>{
            console.log('Pobieram posta')
            try{
                const response = await fetch("http://localhost:3001/article/"+id, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    showError("Nie udało się pobrać tego artykułu. Spróbuj ponownie później");
                }
                const post = await response.json();
                setData(post.post as PostType)
            }catch(err){
                showError('Wystąpił błąd podczas pobierania danych')
            }
    }
    fetchData();
        },[])
    return {data};
}