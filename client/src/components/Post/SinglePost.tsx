import { ContainerCard } from "../Utilities/ContainerCard";
import { useGetOnePost } from "../../customHooks/Posts/useGetOnePost";
import { PostType } from '../../types/blogTypes';
import { SinglePostImage } from "./SinglePostImage";
export const SinglePost:React.FC = ():JSX.Element =>{
  console.log(window.location.pathname)
  const {data} = useGetOnePost(window.location.pathname)
  const {title, mainPicture, creator, content, contentCategory, creationDate} = data as PostType
    return (
       <ContainerCard>
            <div   className="flex flex-col justify-center items-center  w-[90%] mt-[150px] ">
              <h3 className="text-[2em]  mt-[30px] text-center font-bold transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[3.4em] md:leading-[1.1em] ">{title}</h3>
              <div  className="text-center text-[1.3em] mb-[20px] text-zinc-500 py-[10px] font-bold">{contentCategory}</div>
              <SinglePostImage style={`w-full aspect-square cursor-pointer border md:w-[45%] md:flex-grow md:h-[300px] md:mx-[15px]`} mainPicture={mainPicture}/>
              <p className="mt-[10px] text-[0.9em] font-semibold text-slate-700">{`Created by: ${creator.name} ${creator.surname}`}</p>
              <p className="mt-[10px] text-[0.9em] font-semibold text-slate-700">{`${new Date(creationDate).toLocaleDateString()}`}</p>
              <div className=" flex justify-center items-center flex-col my-[40px] px-[15px] text-[0.9em] mb-[100px]  mx-auto md:w-[80%] font-normal text-slate-700 text-justify" dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
       </ContainerCard>
    )
}