
import { EditDeleteIcons } from '../Utilities/EditDeleteIcons';
import { AuthContext } from '../../store/Auth-context';
import {useContext} from 'react';
import { UserType  } from '../../types/blogTypes';
export const SinglePostInformation:React.FC<{creator:UserType, creationDate:number, id: string, textStyle:string, imgStyle:string}> = (props):JSX.Element =>{
    const {loggedIn, userData} = useContext(AuthContext);
    const date = new Date(props.creationDate).toLocaleDateString();

   
    return(
        <div className="w-full justify-start items-center md:justify-between  my-[15px] flex ">
            <div className="flex mr-[15px]">
                <div className={props.imgStyle}>
                    <img className="w-full h-full rounded-[50%]" src={`http://localhost:3001/images/users/${props.creator.avatar ?? "user.jpg"}`}/>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <p className={props.textStyle}>{props.creator.name+" "+props.creator.surname}</p>
                    <p className="text-[1.2em] font-thin tracking-wider text-gray-400">{date}</p>
                </div>
            </div>
            {userData.id == props.creator._id && loggedIn &&
                <EditDeleteIcons  id={`${props.id}`}/>
            }
        </div>

// 
    );

}