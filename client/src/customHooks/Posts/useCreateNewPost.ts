import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { CreatePostType } from "../../types/blogTypes";
import {useContext} from 'react';
import { AuthContext } from '../../store/Auth-context';
export const useCreateNewPost = (postData:CreatePostType) => {
    const navigate = useNavigate();
    const {userData } = useContext(AuthContext);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();
            if(postData.title.length < 8 || postData.title.length > 100 ) return setError("Długość tytułu powinna wynosić od 8 do 100 znaków")
            else if(postData.summary.length < 8 || postData.summary.length > 150 ) return setError("Długość podsumowania powinna wynosić od 8 do 100 znaków");
            else if(postData.content.length < 100 || postData.content.length > 10000 ) return setError("Długość zawartości artykułu powinna wynosić od 8 do 100 znaków");
            else if(postData.contentCategory.length < 4 || postData.contentCategory.length > 50 ) return setError("Długość kategorii tytułu powinna wynosić od 8 do 100 znaków");
            const data = new FormData();
            data.set('title', postData.title);
            data.set('summary', postData.summary);
            data.set('content', postData.content);
            data.set('contentCategory', postData.contentCategory);
            data.set('mainPicture', postData.mainPicture ?? "");
            data.set('creator', `${userData.id}`);
            const response = await fetch("http://localhost:3001/article", {
                method: "POST",
                body: data
            });
            if (!response.ok) {
                setError("Nie udało się dodać artykułu. Spróbuj ponownie później!");
            }else{
                setSuccess("Udało się stworzyć artykuł!");
                setTimeout(()=>{
                navigate('/');
                }, 2000)
            }
        }catch(err){
            setError('Wystąpił błąd podczas usuwania posta')
        }
    }
    return {success, error, setError, createNewPost}
}