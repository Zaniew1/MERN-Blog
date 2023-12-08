import { UIContext } from '../../store/UI-context';
import { useContext } from 'react';
import {Subscription} from '../Subscription/Subscription'
import {Socials} from '../Socials/Socials'
import {Footer} from '../Footer/Footer'
import {SeeMoreButton} from '../Buttons/SeeMoreButton'
import { Suspense } from 'react';
import { Loading } from '../Utilities/Loading';
import { memo } from 'react';
import { Posts } from '../Post/Posts';
import {useGetAllPosts} from '../../customHooks/Posts/useGetAllPosts'

export const Home = memo( function Home(){
    const {showMorePostsIndex} = useContext(UIContext);
    const posts = useGetAllPosts();
    return (
        <>
            <Suspense fallback={<Loading />}>
               <Posts allPosts={posts}/>
            </Suspense>
            {showMorePostsIndex < posts.length && <SeeMoreButton/>}
            <Subscription/>
            <Socials/>
            <Footer/>
        </>
    );
} );