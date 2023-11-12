
import {ReactNode} from 'react';
import { NavBar } from "../Main/NavBar";

type ChildrenType = {
    children: ReactNode
}

export const ContainerCard:React.FC<ChildrenType> = (props):JSX.Element => {
    return  (
        <main  className='w-full bg-slate-50  overflow-x-hidden flex justify-center '>
            <div className='w-full flex flex-col relative items-center lg:flex-wrap lg:flex-row lg:justify-center max-w-6xl '>
                <NavBar/>
                {props.children}
            </div>
        </main>
    );
}