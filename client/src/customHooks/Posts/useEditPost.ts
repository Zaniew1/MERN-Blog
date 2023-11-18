import {useState} from 'react';
import { useNavigate} from 'react-router-dom'
import { CreatePostType } from '../../types/blogTypes';
export const useEditPost = (id:string, postData: CreatePostType) =>{
    const navigate = useNavigate();
    const [success , setSuccess] = useState<string>('');
    const [error , setError] = useState<string>('');

    const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(postData.title.length < 8 || postData.title.length > 100 ) return setError("Długość tytułu powinna wynosić od 8 do 100 znaków");
        else if(postData.summary.length < 8 || postData.summary.length > 150 ) return setError("Długość podsumowania powinna wynosić od 8 do 100 znaków");
        else if(postData.content.length < 100 ) return setError("Minimalna długość zawartości artykułu powinna wynosić 100 znaków");
        else if(postData.contentCategory.length < 4 || postData.contentCategory.length > 50 ) return setError("Długość kategorii tytułu powinna wynosić od 8 do 100 znaków");
        const data = new FormData();
        data.set('title', postData.title);
        data.set('summary', postData.summary);
        data.set('content', postData.content);
        data.set('contentCategory', postData.contentCategory);
        data.set('mainPicture', postData.mainPicture ?? "");
        const response = await fetch("http://localhost:3001/article/"+id, {
            method: "PUT",
            body: data
          });
          console.log(response)
          console.log(await response.json())
          if (!response.ok) {
            setError("Nie udało się edytować artykułu. Spróbuj ponownie później!");
          }else{
            setSuccess("Udało się edytować artykuł!");
            setTimeout(()=>{
              navigate('/');
            }, 2000)
          }
    }

    return {error, success, editPost}
}