
import {ReactNode} from 'react';
import { NavBar } from "../Navigation/NavBar";
import { Popup } from './Popup';
import { ErrorContext } from '../../store/Error-context';
import {useContext} from 'react';
type ChildrenType = {
    children: ReactNode
}

export const ContainerCard:React.FC<ChildrenType> = (props):JSX.Element => {
    const {error, success} = useContext(ErrorContext);
    return  (
        <main  className='w-full bg-slate-50 relative overflow-x-hidden flex justify-center '>
            {success && <Popup type="success" text={success}/>}
            {error && <Popup type="error" text={error}/>}
            <div className='w-full flex flex-col relative items-center md:flex-wrap md:flex-row md:justify-center max-w-6xl '>
                <NavBar/>
                {props.children}
            </div>
        </main>
    );
}

  