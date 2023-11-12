import { ContainerCard } from "../Utilities/ContainerCard";
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Popup } from '../Utilities/Popup';
import {Editor} from '../Utilities/Editor'
export const EditPost:React.FC = ():JSX.Element => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [contentCategory, setContentCategory] = useState<string>('');
    const [mainPicture, setMainPicture] = useState<File | null>(null);
    const [creatorAvatar, setCreatorAvatar] = useState<string>('');
    const [creator, setCreator] = useState<string>('');
    const [error , setError] = useState<string>('');
    const [success , setSuccess] = useState<string>('');
    const {id} = useParams();

    useEffect(()=>{
        const edit = async () =>{
            const response = await fetch("http://localhost:3001/article/"+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.post)
                setTitle(data.post.title);
                setSummary(data.post.summary);
                setContent(data.post.content);
                setContentCategory(data.post.contentCategory);
            }
        }
        edit();
    }, [id])


    const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title.length < 8 || title.length > 100 ){
            setError("Długość tytułu powinna wynosić od 8 do 100 znaków");
            return;
        }
        else if(summary.length < 8 || summary.length > 150 ){
            setError("Długość podsumowania powinna wynosić od 8 do 100 znaków");
            return;
        }
        else if(content.length < 100 || content.length > 10000 ){
            setError("Długość zawartości artykułu powinna wynosić od 8 do 100 znaków");
            return;
        }
        else if(contentCategory.length < 4 || contentCategory.length > 50 ){
            setError("Długość kategorii tytułu powinna wynosić od 8 do 100 znaków");
            return;
        }
        setCreatorAvatar('ja');
        setCreator('Mateusz Zaniewski');
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('contentCategory', contentCategory);
        data.set('mainPicture', mainPicture ?? "");
        data.set('creatorAvatar', creatorAvatar);
        data.set('creator', creator);
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

    return (
        <ContainerCard>
            {success && <Popup type="success" text={success}/>}
            {error && <Popup type="error" text={error}/>}
            <form className="mt-[20vh] flex flex-col w-[90%] mx-auto md:w-[60%] lg:w-[40%]" onSubmit={editPost}>
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="title">Tytuł</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="title" id="title" type="text" onChange={(e)=>{setTitle(e.target.value); setError('');}} value={title} placeholder="Tytuł artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="summary">Podsumowanie</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="summary" onChange={(e)=>{setSummary(e.target.value);  setError('');}} value={summary} type="text" placeholder="Podsumowanie artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="category">Kategoria</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="category" onChange={(e)=>{setContentCategory(e.target.value);  setError('');}} value={contentCategory} type="text" placeholder="Kategoria artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="mainPicture">Główne zdjęcie</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="mainPicture" name="mainPicture" onChange={(e)=>{ e.target.files && e.target.files.length > 0 ? setMainPicture(e.target.files[0]) : setError('Można załadować tylko jedno zdjęcie'); }}  type="file" placeholder="Główne zdjęcie artykułu" />
                <label className="text-[1em] font-semibold py-[5px] pt-[20px]" htmlFor="content">Zawartość artykułu</label>
                <Editor value={content} onChange={setContent} />
                <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Edytuj</button>
            </form>
        </ContainerCard>
    )
}