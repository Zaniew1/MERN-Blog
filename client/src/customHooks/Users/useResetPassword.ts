// import { useShowInfo } from '../useShowInfo';
export const useResetPassword = (data:{password:string, confirmPassword:string}) => {
    // const {showError, showSuccess} = useShowInfo()

    const resetPassword = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        console.log(data)
    }   
    return { resetPassword}
}