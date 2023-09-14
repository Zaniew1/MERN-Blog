
import { Nav } from "./Nav";
import {NewestPost} from '../Post/NewestPost'
import {NextPost} from '../Post/NextPost'
import {Subscription} from '../Subscription/Subscription'

export const Home = () => {
    return (
        <main  className='w-screen h-[1500px] bg-slate-50 relative overflow-x-hidden '>
            <Nav/>
            <NewestPost/>
            <NextPost/>
            <NextPost/>
            <NextPost/>
            <Subscription/>
        </main>
    );
}