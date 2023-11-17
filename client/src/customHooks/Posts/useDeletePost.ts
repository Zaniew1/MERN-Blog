import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const useDeletePost = (id:string) => {
    const navigator = useNavigate();
    const [error, setError] = useState<string>('');
    // const [loading, setLoading] = useState<boolean>(false);

    const deletePost = async () =>{
        try{
            const response = await fetch("http://localhost:3001/article/"+id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                  },
              })
              if(response.ok){
                  navigator('/')
              }else{
                setError("Nie udało się usunąć")
              }
        }catch(err){
            setError('Wystąpił błąd podczas usuwania posta')
        }
    }
    return {error, deletePost};
}
 
