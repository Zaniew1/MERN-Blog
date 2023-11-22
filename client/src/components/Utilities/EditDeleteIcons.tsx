import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeletePost } from '../../customHooks/Posts/useDeletePost';

export const EditDeleteIcons:React.FC<{id:string,style?:string}> = (props):JSX.Element => {
    const {deletePost} = useDeletePost(`${props.id}`);

    return(
        <div className={`${props.style ? props.style : "w-[30%] flex text-[1.5em] text-[#2C3241]"}`}>
            <a className="cursor-pointer" href={`/editPost/${props.id}`} ><FontAwesomeIcon icon={faPenToSquare} className="px-[20px] hover:text-slate-600"/></a>
            <div className="cursor-pointer" onClick={deletePost} ><FontAwesomeIcon icon={faTrash} className="hover:text-slate-600"/></div>
        </div>


    )
}