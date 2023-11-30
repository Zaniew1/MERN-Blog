import { deleteCookie } from "../../utils/cookies";
import {blogData} from '../../../public/data/data.js'
import { useContext} from "react";
import {AuthContext} from '../../store/Auth-context';
import { useShowInfo } from '../useShowInfo';
export const useLogOut = () => {
    const {setloggedIn} = useContext(AuthContext);
    const {showError, showSuccess} = useShowInfo()
    const logOut = async () =>{
        const response = await fetch(blogData.serverDomain+"/logoutUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            setloggedIn(false);
            showSuccess("Wylogowano")
            deleteCookie('jwt')
        }
        else{
            showError('Nie udało się wylogować, dziwne')
        }
    }
    return {logOut}
}