
import { PostType } from '../../types/blogTypes';
import { SinglePostImage } from './SinglePostImage';
import { SinglePostInformation } from './SinglePostInformation';

export const NewestPost:React.FC<PostType> = (props):JSX.Element =>{
    console.log("Renderuję newest post")
    return (
            <article className=" flex flex-col w-[95%] pb-[25px] mt-[100px] border-b border-solid border-slate-300 z-10 md:w-[100%]  md:flex-row md:border-none ">
                    <div className="w-full lg:flex-col lg:flex lg:justify-center mr-[15px] md:w-[45%] md:flex-grow md:mx-[15px]">
                        <p className="tracking-wide font-bold text-[1.2em] pb-[15px] text-[#2C3241] md:mb-[15px]">Newest Post</p>
                        <a href={`/${props.id}`} className="text-[2.3em] font-bold cursor-pointer transition ease-in-out text-[#2C3241] leading-tight md:mb-[25px] md:text-[2.8em] md:leading-[1.1em] hover:text-sky-700 lg:text-[3.2em]">{props.title}</a>
                        <p className="text-[1.2em] text-gray-500 tracking-wider py-[10px] md:pr-[50px] md:font-medium">{props.summary}</p>
                        <SinglePostInformation
                            id={`${props.id}`}
                            creator={props.creator}
                            creationDate={props.creationDate}
                            textStyle={"text-[1em] font-bold text-[#2C3241] lg:text-[1.3em]"}
                            imgStyle={"w-[60px] h-[60px] rounded-[50%] mr-[15px] md:w-[80px] md:h-[80px] "} />
                    </div>
                    <SinglePostImage id={`${props.id}`} mainPicture={props.mainPicture}/>
            </article>

    )
}