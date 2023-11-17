import {UserType,emptyUserType } from '../../types/blogTypes'
import {useEffect,useState  } from "react";
import { getCookie } from "../../utils/cookies";
export const useGetMe = () => {
    const [loggedIn, setloggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserType>(emptyUserType);
    useEffect(()=>{
        const fetchUserData = async ()=>{
          const jwt = getCookie("jwt");
          const response = await fetch("http://localhost:3001/profile", {
            method: "GET",
            headers: {Authorization: `Bearer ${jwt}`}
          })
          if (response.ok) {
            // console.log(response)
          }else{
             console.log(response)
          }
          const user = await response.json();
          if(user.status == 'success'){
            setloggedIn(true)
            const {id, email, name, surname, avatar} = user
            setUserData({id, email, name, surname, avatar} as UserType);
          }
        }
        fetchUserData();
      },[])

      return {loggedIn, setloggedIn, userData}
}