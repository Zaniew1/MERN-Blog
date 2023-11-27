
import { PostType } from '../../types/blogTypes'
import {NextPost} from '../Post/NextPost'
import {NewestPost} from '../Post/NewestPost'
export const Posts:React.FC<{allPosts:PostType[]}> = (props):JSX.Element => {
    return(
        <div className="w-full flex flex-col min-h-[100vh] items-center md:flex-wrap md:flex-row md:justify-center">
        {(props.allPosts).map((singlePost, index)=>{
            const {_id, title, summary, content, contentCategory, mainPicture, creationDate, creator } = singlePost as PostType;
            return(
                index === 0 
                    ?
                        <NewestPost key={_id} id={_id} title={title} summary={summary} content={content} creationDate={creationDate} mainPicture={mainPicture} contentCategory={contentCategory} creator={creator} />
                    :
                        <NextPost key={_id} index={`${index}`} id={`${_id}`} title={title} summary={summary} content={content} contentCategory={contentCategory} creationDate={creationDate} mainPicture={mainPicture} creator={creator} />
            )
        })}
    </div>
    );
} 