
import {NewestPost} from '../Post/NewestPost'
import {NextPost} from '../Post/NextPost'
import {Subscription} from '../Subscription/Subscription'
import {Socials} from '../Socials/Socials'
import {Footer} from '../Footer/Footer'
import {SeeMoreButton} from '../Buttons/SeeMoreButton'
import { PostType } from '../../types/blogTypes'
import {useGetAllPosts} from '../../customHooks/Posts/useGetAllPosts'
export const Home = () => {
    const posts = useGetAllPosts();
    return (
            <>
                {posts.map((el, index)=>{
                    const {_id, title, summary, content, contentCategory, mainPicture, creationDate, creator } = el as PostType;
                       return(
                           index === 0 
                            ?
                                <NewestPost key={_id} id={_id} title={title} summary={summary} content={content} creationDate={creationDate} mainPicture={mainPicture} contentCategory={contentCategory} creator={creator} />
                            :
                                <NextPost key={_id} index={`${index}`} id={`${_id}`} title={title} summary={summary} content={content} contentCategory={contentCategory} creationDate={creationDate} mainPicture={mainPicture} creator={creator} />
                       )
                })}
                <SeeMoreButton/>
                <Subscription/>
                <Socials/>
                <Footer/>
            </>
    );
}  