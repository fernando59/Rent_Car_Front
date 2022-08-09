
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export const useAuthStore =() =>{
    const { status, user } = useSelector( (state:RootState ) => state.auth );


    

    return{
        status,
        user
    }
}