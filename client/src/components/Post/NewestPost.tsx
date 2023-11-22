
import {useContext} from 'react';
import { AuthContext } from '../../store/Auth-context';
import { PostType } from '../../types/blogTypes';
import { EditDeleteIcons } from '../Utilities/EditDeleteIcons';

export const NewestPost:React.FC<PostType> = (props):JSX.Element =>{
    const date = new Date(props.creationDate).toLocaleDateString();
    const {loggedIn, userData} = useContext(AuthContext);
    console.log(props.creator)
    return (
        <>
            <article className=" flex flex-col w-[95%] mx-auto   pb-[25px] mt-[100px] border-b border-solid border-slate-300 z-10 md:flex-row md:border-none lg:flex-grow lg:mx-[15px]">
                    <div className="w-full md:w-[50%] lg:flex-col lg:flex lg:justify-center mr-[15px]">
                        <p className="tracking-wide font-bold text-[1.2em] pb-[15px] text-[#2C3241] md:mb-[15px]">Newest Post</p>
                        <a href={`/${props.id}`} className="text-[2.3em] font-bold cursor-pointer transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[2.8em] md:leading-[1.1em] hover:text-sky-700 lg:text-[3.2em]">{props.title}</a>
                        <p className="text-[1.2em] text-gray-500 tracking-wider py-[10px] md:pr-[50px] md:font-medium">{props.summary}</p>
                        <div className="w-full  mb-[15px] flex justify-center items-center  ">
                            <div className="flex w-[70%] items-center">
                                <div className=" h-full flex justify-center items-center md:justify-start md:w-[100px] p-[10px]">
                                    <div className="w-[70px] h-[70px] rounded-[50%]">
                                        <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/users/${props.creator.avatar}`}/>
                                    </div>
                                </div>
                                <div className=" ">
                                    <p className="text-[1em] font-bold text-[#2C3241]">{props.creator.name+" "+props.creator.surname}</p>
                                    <p className="text-[1.2em] font-thin tracking-wider text-gray-400">{date}</p>
                                </div>
                            </div>

                        {userData.id == props.creator._id && loggedIn &&
                            <EditDeleteIcons  id={`${props.id}`}/>
                        }
                        </div>
                    </div>
                    <a href={`/${props.id}`} className="w-full aspect-square cursor-pointer border md:w-[50%] my-auto lg:ml-[15px] ">
                        <img className="w-full h-full " src={`http://localhost:3001/images/posts/${props.mainPicture}`}/>
                    </a>
            </article>
        </>

    )
}