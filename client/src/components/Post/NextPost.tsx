import { useContext } from 'react';
import { UIContext } from '../../store/UI-context';
import { NextPostType } from '../../types/blogTypes';
import { SinglePostInformation } from './SinglePostInformation';
import { SinglePostImage } from './SinglePostImage';
// import { SinglePostTexts } from '../Utilities/SinglePostTexts';


export const NextPost:React.FC<NextPostType> = (props):JSX.Element => {
    const {showMorePostsIndex} = useContext(UIContext);
    console.log("Renderuję next post")
    return(
            <article className={`flex flex-col w-[95%]  z-10 border-b border-solid border-slate-300 md:mx-[15px] md:border-none md:mb-[40px] ${+props.index > 2 ? "md:w-[25%]  md:max-w-[33%]" : "md:w-[45%] md:max-w-[50%]"} ${+props.index >= +showMorePostsIndex ? "hidden" : ""} md:flex-grow `}>
                    <SinglePostImage id={props.id} style={`w-full h-1/2 cursor-pointer md:h-[250px]   ${+props.index > 2 ? "lg:h-[1/4]" : "lg:h-[300px]"}`} mainPicture={props.mainPicture}/>
                    <p className="tracking-wide font-bold text-[1.2em] py-[15px] text-[#2C3241] md:min-h-[20px] md:text-[1em] ">{props.contentCategory}</p>
                    <a href={`/${props.id}`} className="text-[1.6em] cursor-pointer font-bold text-[#2C3241] md:line-clamp-2 md:min-h-[90px] md:text-[1.5em] md:font-semibold lg:line-clamp-3 hover:text-sky-700">{props.title}</a>
                    <p className="text-[1em] text-gray-500 tracking-wider py-[10px] md:text-[1.1em] md:line-clamp-2 md:h-[65px] ">{props.summary}</p>
                    {/* <SinglePostTexts id={props.id} title={props.title} summary={props.summary} contentCategory={props.contentCategory} /> */}
                    <SinglePostInformation
                        id={props.id}
                        creator={props.creator} 
                        creationDate={props.creationDate}  
                        textStyle={"text-[1em] font-bold text-[#2C3241] lg:text-[1em]"}
                        imgStyle={"w-[60px] h-[60px] rounded-[50%] mr-[15px] md:w-[60px] md:h-[60px] "} />
            </article>

    )
}
