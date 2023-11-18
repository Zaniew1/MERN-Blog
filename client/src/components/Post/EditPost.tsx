import { ContainerCard } from "../Utilities/ContainerCard";
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Popup } from '../Utilities/Popup';
import {Editor} from '../Utilities/Editor'
import { useGetOnePost } from "../../customHooks/Posts/useGetOnePost";
import { useEditPost } from "../../customHooks/Posts/useEditPost";
export const EditPost:React.FC = ():JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [contentCategory, setContentCategory] = useState<string>('');
    const [mainPicture, setMainPicture] = useState<File | null>(null);
    const {id} = useParams();

    const {data, setError} = useGetOnePost(id as string);
    const {error, success, editPost} = useEditPost(id as string, {title, summary, content, contentCategory, mainPicture})
    console.log(data)
    useEffect(()=>{
        setTitle(data.title)
        setSummary(data.summary)
        setContent(data.content)
        setContentCategory(data.contentCategory)
        // setMainPicture(data.mainPicture)
    },[data])
    

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