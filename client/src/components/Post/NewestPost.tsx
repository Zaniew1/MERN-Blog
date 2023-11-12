import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Auth-context';
type NewestPostType = {
    key:number,
    id: number,
    title: string,
    summary:string,
    content: string,
    mainPicture:string,
    contentCategory:string,
    creator: string,
    creationDate:number,
    creatorAvatar:string
}
export const NewestPost:React.FC<NewestPostType> = (props):JSX.Element =>{
    const navigator = useNavigate();
    const date = new Date(props.creationDate).toLocaleDateString();
    const {loggedIn, userData} = useContext(AuthContext);
    const deletePost = async () => {
        const response = await fetch("http://localhost:3001/article/"+props.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                  },
              })
              if(response.ok){
                  const data = await response.json();
                  console.log(data)
                  navigator('/');
              }
    }

    return (
        <article className=" flex flex-col w-[95%] mx-auto   pb-[25px] mt-[100px] border-b border-solid border-slate-300 z-10 md:flex-row md:border-none lg:flex-grow lg:mx-[15px]">
                <div className="w-full md:w-[50%] lg:flex-col lg:flex lg:justify-center mr-[15px]">
                    <p className="tracking-wide font-bold text-[1.2em] pb-[15px] text-[#2C3241] md:mb-[15px]">Newest Post</p>
                    <a href={`/${props.id}`} className="text-[2.3em] font-bold cursor-pointer transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[3.4em] md:leading-[1.1em] hover:text-sky-700">{props.title}</a>
                    <p className="text-[1.2em] text-gray-500 tracking-wider py-[10px] md:pr-[50px] md:font-medium">{props.summary}</p>
                    <div className="w-full  my-[15px] flex">
                        <div className="w-[30%] h-full flex justify-center items-center md:justify-start md:w-[100px]">
                            <div className="w-[70px] h-[70px] rounded-[50%]">
                                <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/ja.jpg`}/>
                            </div>
                        </div>
                        <div className=" w-[40%] ">
                            <p className="text-[1em] font-bold text-[#2C3241]">{props.creator ? props.creator : "Mateusz Zaniewski"}</p>
                            <p className="text-[1.2em] font-thin tracking-wider text-gray-400">{date}</p>
                        </div>
                    {userData.email == "m.zaniewski1995@gmail.com" && loggedIn &&
                        <div className=" w-[30%] flex text-[1.5em] text-[#2C3241]">
                            <a className="cursor-pointer" href={`/editPost/${props.id}`} ><FontAwesomeIcon icon={faPenToSquare} className="px-[20px] hover:text-slate-600"/></a>
                            <div className="cursor-pointer" onClick={deletePost} ><FontAwesomeIcon icon={faTrash} className="hover:text-slate-600"/></div>
                        </div>
}
                    </div>
                </div>
                <a href={`/${props.id}`} className="w-full aspect-square cursor-pointer border md:w-[50%] my-auto lg:ml-[15px] ">
                    <img className="w-full h-full " src={`http://localhost:3001/${props.mainPicture}`}/>
                </a>
        </article>
    )
}