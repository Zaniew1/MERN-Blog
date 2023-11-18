import { ContainerCard } from "../Utilities/ContainerCard";
import { Popup } from "../Utilities/Popup";
import { useGetOnePost } from "../../customHooks/Posts/useGetOnePost";
import { PostType } from '../../types/blogTypes';
export const SinglePost:React.FC = ():JSX.Element =>{
  const {data, error, loading} = useGetOnePost(window.location.pathname)
  const {title, mainPicture, creator, content, contentCategory, creationDate} = data as PostType
    return (
       <ContainerCard>
        {error && <Popup text={error} type={'error'}/>}
          {!loading &&  
            <div className="flex flex-col justify-center items-center  w-full mt-[150px] ">
              <div className="text-center text-[1.8em] mb-[20px] text-[#2C3241] font-bold">{contentCategory}</div>
              <div className="">
                <img src={`http://localhost:3001/images/posts/${mainPicture}`}  alt="Główne zdjęcie" />
              </div>
              <p className="mt-[10px] text-[0.9em] text-slate-700">{`Created by: ${creator.name} ${creator.surname}`}</p>
              <p className="mt-[10px] text-[0.9em] text-slate-700">{`${new Date(creationDate).toLocaleDateString()}`}</p>
              <h3 className="text-[2.3em] mt-[30px] text-center font-bold transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[3.4em] md:leading-[1.1em] ">{title}</h3>
              <div className="my-[40px] w-full px-[15px] text-[0.9em] text-slate-700 text-justify" dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
          }
       </ContainerCard>
    )
}