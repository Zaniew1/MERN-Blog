
import {NewestPost} from '../Post/NewestPost'
import {NextPost} from '../Post/NextPost'
import {Subscription} from '../Subscription/Subscription'
import {Socials} from '../Socials/Socials'
import {Footer} from '../Footer/Footer'
import {SeeMoreButton} from '../Buttons/SeeMoreButton'
import {useEffect, useState, } from 'react';
// import {AuthContext} from '../../store/Auth-context';

 type PostsType = {
    _id: number,
    title:string,
    summary: string,
    content: string,
    contentCategory: string,
    mainPicture:string,
    creationDate: number,
 }

export const Home = () => {
    // const {loggedIn, setLoggedIn } = useContext(AuthContext);

    const [posts , setPosts] = useState<PostsType[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:3001/article", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await  response.json();
              setPosts(data.posts)
        };
        fetchPosts();
      }, []);
    //   useEffect(() => {
    //     const fetchUserData = async () => {
    //         const response = await fetch("http://localhost:3001/profile", {
    //             method: "GET",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           });
    //           const data = await  response.json();
    //           setMe(data)
    //     };
    //     fetchUserData();
    //   }, []);
    return (
            <>
                {posts.map((el, index)=>{
                    const {_id, title, summary, content, contentCategory, mainPicture, creationDate} = el as PostsType;
                       return(
                           index === 0 
                            ?
                                <NewestPost key={_id} id={_id} title={title} summary={summary} content={content} creationDate={creationDate} mainPicture={mainPicture} contentCategory={contentCategory} creator={'Mateusz Zaniewski'} creatorAvatar={'ja'}/>
                            :
                                <NextPost key={_id} index={index} id={_id} title={title} summary={summary} content={content} contentCategory={contentCategory} creationDate={creationDate} mainPicture={mainPicture} creator={''} creatorAvatar={'ja'} />
                       )

                })}
                <SeeMoreButton/>
                <Subscription/>
                <Socials/>
                <Footer/>
            </>
    );
}  