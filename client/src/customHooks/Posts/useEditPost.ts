import { CreatePostType } from '../../types/blogTypes';
import { useShowInfo } from '../useShowInfo';
export const useEditPost = (id:string, postData: CreatePostType) =>{
    const {showError, showSuccess} = useShowInfo()
    const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(postData.title.length < 8 || postData.title.length > 100 ) return showError("Długość tytułu powinna wynosić od 8 do 100 znaków");
        else if(postData.summary.length < 8 || postData.summary.length > 150 ) return showError("Długość podsumowania powinna wynosić od 8 do 100 znaków");
        else if(postData.content.length < 100 ) return showError("Minimalna długość zawartości artykułu powinna wynosić 100 znaków");
        else if(postData.contentCategory.length < 4 || postData.contentCategory.length > 50 ) return showError("Długość kategorii tytułu powinna wynosić od 8 do 100 znaków");
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
          if (!response.ok) {
            showError("Nie udało się edytować artykułu. Spróbuj ponownie później!");
          }else{
            showSuccess("Udało się edytować artykuł!");
          }
    }

    return {editPost}
}