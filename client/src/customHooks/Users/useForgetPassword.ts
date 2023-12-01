import { useShowInfo } from '../useShowInfo';
import {blogData} from '../../../public/data/data.js'
export const useForgetPassword = (email:string) => {
    const {showError, showSuccess} = useShowInfo()
    const forgetPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> =>{
            e.preventDefault();
            const response = await fetch(blogData.serverDomain+"/forgetPassword", {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify( {email} ),
              })
              if (!response.ok) {
                showError("Nie udało się wysłać maila, spróbuj ponownie później!");
              }else{
                showSuccess("Wysłano maila resetującego, sprawdz pocztę!");
        
              }
    }
    return {forgetPassword}
}