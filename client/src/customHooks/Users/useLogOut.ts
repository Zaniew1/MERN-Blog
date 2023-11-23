import { deleteCookie } from "../../utils/cookies";
import { useContext} from "react";
import {AuthContext} from '../../store/Auth-context';
import { useShowInfo } from '../useShowInfo';
export const useLogOut = () => {
    const {setloggedIn} = useContext(AuthContext);
    const {showError, showSuccess} = useShowInfo()
    const logOut = async () =>{
        const response = await fetch("http://localhost:3001/logoutUser", {
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