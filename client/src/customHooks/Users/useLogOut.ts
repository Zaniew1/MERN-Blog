import { deleteCookie } from "../../utils/cookies";
import { useContext, useState } from "react";
import {AuthContext} from '../../store/Auth-context';
export const useLogOut = () => {
    const {setloggedIn} = useContext(AuthContext);
    const [error, setError] = useState<string>('')
    const logOut = async () =>{
        const response = await fetch("http://localhost:3001/logoutUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            setloggedIn(false);
            deleteCookie('jwt')
        }
        else{
            setError('Nie udało się wylogować, dziwne')
        }
    }
    return {error, logOut}
}