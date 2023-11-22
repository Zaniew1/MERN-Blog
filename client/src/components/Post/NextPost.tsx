import { useContext } from 'react';
import { AuthContext } from '../../store/Auth-context';
import { UIContext } from '../../store/UI-context';
import { NextPostType } from '../../types/blogTypes';
import { EditDeleteIcons } from '../Utilities/EditDeleteIcons';

export const NextPost:React.FC<NextPostType> = (props):JSX.Element => {
    const date = new Date(props.creationDate).toLocaleDateString();
    const {showMorePostsIndex} = useContext(UIContext);
    const {loggedIn, userData} = useContext(AuthContext);
    return(
        <>
            <article className={`mt-[20px] mx-[15px] z-10 border-b border-solid border-slate-300 md:border-none md:mb-[60px] ${+props.index > 2 ? "md:w-[25%]" : "md:w-[45%]"} ${+props.index >= +showMorePostsIndex ? "hidden" : ""} md:flex-grow `}>
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
                           <EditDeleteIcons  id={`${props.id}`}/>
                        }
                    </div>
            </article>
        </>

    )
}