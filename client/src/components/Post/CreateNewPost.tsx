import { ContainerCard } from "../Utilities/ContainerCard";
import {useState} from 'react';
import {Editor} from '../Utilities/Editor'
import { useCreateNewPost} from "../../customHooks/Posts/useCreateNewPost";
export const CreateNewPost:React.FC = ():JSX.Element => {
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [contentCategory, setContentCategory] = useState<string>('');
    const [mainPicture, setMainPicture] = useState<File | null>(null);
    const {createNewPost} = useCreateNewPost({title, summary, content, mainPicture, contentCategory});
    return (
        <ContainerCard>
            <form className="mt-[20vh] flex flex-col w-[90%] mx-auto md:w-[60%] lg:w-[40%]" onSubmit={createNewPost}>
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="title">Tytuł</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" name="title" id="title" type="text" onChange={(e)=>{setTitle(e.target.value);}} value={title} placeholder="Tytuł artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="summary">Podsumowanie</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="summary" onChange={(e)=>{setSummary(e.target.value); }} value={summary} type="text" placeholder="Podsumowanie artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="category">Kategoria</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="category" onChange={(e)=>{setContentCategory(e.target.value); }} value={contentCategory} type="text" placeholder="Kategoria artykułu" />
                <label className="text-[1em] font-semibold py-[5px]" htmlFor="mainPicture">Główne zdjęcie</label>
                <input className="px-[10px] py-[10px] border-[1px] border-cyan-700" id="mainPicture" name="mainPicture" onChange={(e)=>{ e.target.files && e.target.files.length > 0 ? setMainPicture(e.target.files[0]) : '' }}  type="file" placeholder="Główne zdjęcie artykułu" />
                <label className="text-[1em] font-semibold py-[5px] pt-[20px]" htmlFor="content">Zawartość artykułu</label>
                <Editor value={content} onChange={setContent} />
                <button  type="submit" className="w-[80%] m-auto my-[2em] border border-cyan-700 text-[1.2em] font-semibold py-[0.5em] shadow-myShadow hover:bg-cyan-700 hover:text-white">Stwórz</button>
            </form>
        </ContainerCard>
    )
}