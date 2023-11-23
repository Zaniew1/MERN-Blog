
import { useContext } from "react";
import { ErrorContext } from '../store/Error-context';
import { useNavigate } from 'react-router-dom'

export const useShowInfo  = () =>{
    const navigate = useNavigate();
    const {error, success, setError, setSuccess} = useContext(ErrorContext);
        const showError = (text:string) => {
            setError(`${text}`);
            setTimeout(()=>{
                setError('');
                navigate('/')
            }, 2000)
        }

        const showSuccess = (text:string)=>{
            setSuccess(`${text}`);
            setTimeout(()=>{
                setSuccess('');
                navigate('/')
            }, 2000)
        }
        return {showSuccess, showError,error, success }
}