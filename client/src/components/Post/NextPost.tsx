import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import { AuthContext } from '../../store/Auth-context';
import { UIContext } from '../../store/UI-context';
import {  faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NextPostType } from '../../types/blogTypes';
import { useDeletePost } from '../../customHooks/Posts/useDeletePost';
import { Popup } from '../Utilities/Popup';

export const NextPost:React.FC<NextPostType> = (props):JSX.Element => {
    const date = new Date(props.creationDate).toLocaleDateString();
    const {showMorePostsIndex} = useContext(UIContext);
    const {loggedIn, userData} = useContext(AuthContext);
    const {error, deletePost} = useDeletePost(`${props.id}`)
    return(
        <>
            {error && <Popup text={error} type={'error'}/>}
            <article className={`mt-[20px] mx-[15px] z-10 border-b border-solid border-slate-300 md:border-none md:mb-[60px] ${+props.index > 2 ? "lg:w-[25%]" : "lg:w-[45%]"} ${+props.index >= +showMorePostsIndex ? "hidden" : ""} lg:flex-grow `}>
                    <a href={`/${props.id}`} className={`w-full h-[100px] bg-center cursor-pointer bg-cover md:aspect-video md:h-auto ${+props.index > 2 ? "lg:aspect-video" : "lg:h-[200px]"}`}>
                        <img className="w-full " src={`http://localhost:3001/images/posts/${props.mainPicture}`}/>    
                    </a>
                    <p className="tracking-wide font-bold text-[1.2em] py-[15px] text-[#2C3241] md:text-[1em] ">{props.contentCategory}</p>
                    <a href={`/${props.id}`} className="text-[1.6em] cursor-pointer font-bold text-[#2C3241] md:text-[1.8em] md:font-semibold hover:text-sky-700">{props.title}</a>
                    <p className="text-[1em] text-gray-500 tracking-wider py-[10px] md:text-[1.1em] md:min-h-[100px]">{props.summary}</p>
                    <div className="w-full  my-[15px] flex ">
                        <div className="w-[20%] h-full flex justify-center items-center md:justify-start md:w-[60px]">
                            <div className="w-[40px] h-[40px] rounded-[50%] md:w-[50px] md:h-[50px] ">
                                <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/users/${props.creator.avatar}`}/>
                            </div>
                        </div>
                        <div className=" w-[40%]">
                            <p className="text-[1em] font-bold text-[#2C3241]">{props.creator.name+" "+props.creator.surname}</p>
                            <p className="text-[1.2em] font-thin tracking-wider text-gray-400">{date}</p>
                        </div>
                        {userData.id == props.creator._id && loggedIn &&
                            <div className=" w-[30%] flex">
                                    <a className="cursor-pointer" href={`/editPost/${props.id}`} ><FontAwesomeIcon icon={faPenToSquare} className="px-[20px] hover:text-slate-600"/></a>
                                    <div className="cursor-pointer" onClick={deletePost}><FontAwesomeIcon icon={faTrash} className="hover:text-slate-600"/></div>
                            </div>
                        }
                    </div>
            </article>
        </>

    )
}