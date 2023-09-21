
import { Nav } from "./Nav";
import {NewestPost} from '../Post/NewestPost'
import {NextPost} from '../Post/NextPost'
import {Subscription} from '../Subscription/Subscription'
import {Socials} from '../Socials/Socials'
import {Footer} from '../Footer/Footer'
import {SeeMoreButton} from '../Buttons/SeeMoreButton'
export const Home = () => {
    return (
        <main  className='w-full bg-slate-50  overflow-x-hidden flex justify-center '>
            <div className='w-full flex flex-col relative items-center lg:flex-wrap lg:flex-row lg:justify-center max-w-6xl '>
                <Nav/>
                <NewestPost/>
                <NextPost index={1} header={''} summary={''} content={''} creationDate={123} mainPicture={''} creator={''} creatorAvatar={''} />
                <NextPost index={2} header={''} summary={''} content={''} creationDate={123} mainPicture={''} creator={''} creatorAvatar={''}/>
                <NextPost index={3} header={''} summary={''} content={''} creationDate={123} mainPicture={''} creator={''} creatorAvatar={''}/>
                <NextPost index={4} header={''} summary={''} content={''} creationDate={123} mainPicture={''} creator={''} creatorAvatar={''}/>
                <NextPost index={5} header={''} summary={''} content={''} creationDate={123} mainPicture={''} creator={''} creatorAvatar={''}/>
                <SeeMoreButton/>
                <Subscription/>
                <Socials/>
                <Footer/>
            </div>
        </main>
    );
}  