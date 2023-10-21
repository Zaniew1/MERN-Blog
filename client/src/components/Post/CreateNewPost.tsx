import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Nav } from "../Main/Nav"
// import {useState} from 'react';
// const modules = {
//     toolbar: {
//         container: "#toolbar",
//     }
// }
// const formats = [
//     'font','size',
//     'bold','italic','underline','strike',
//     'color','background',
//     'script',
//     'header','blockquote','code-block',
//     'indent','list',
//     'direction','align',
//     'link','image','video','formula',
//   ]
export const CreateNewPost:React.FC = ():JSX.Element => {
    // const [title, setTitle] = useState<string>('');
    // const [summary, setSummary] = useState<string>('');
    // const [content, setContent] = useState<string>('');
    return (
        <>
        <Nav/>
        <form className="mt-[8vh] flex flex-col w-[90%]  mx-auto">
            {/* <input type='text' placeholder={"Tytuł"} value={title} className="my-[10px] border-solid p-[5px] border-black"/>
            <input type='text' placeholder={"Podsumowanie"} value={summary} className="my-[10px] border-solid p-[5px] border-black"/>
            <input type='file' className="my-[10px]" /> */}
            {/* <ReactQuill className="my-[10px]" modules={modules} formats={formats}/> */}
            <ReactQuill className="my-[10px]" />
            <button className="w-[90%] bg-cyan-700 mb-[10px] text-[1.4em] h-[50px] mx-auto mt-[40px] text-gray-50 font-semibold shadow-myShadow lg:w-[30%]" >Zapisz</button>
        </form>
        </>
    )
}