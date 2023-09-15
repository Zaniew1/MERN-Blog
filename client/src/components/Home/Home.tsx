
import { Nav } from "./Nav";
import {NewestPost} from '../Post/NewestPost'
import {NextPost} from '../Post/NextPost'
import {Subscription} from '../Subscription/Subscription'
import {Socials} from '../Socials/Socials'
import {Footer} from '../Footer/Footer'

export const Home = () => {
    return (
        <main  className='w-full bg-slate-50 relative overflow-x-hidden '>
            <Nav/>
            <NewestPost/>
            <NextPost/>
            <NextPost/>
            <NextPost/>
            <Subscription/>
            <Socials/>
            <Footer/>
        </main>
    );
}