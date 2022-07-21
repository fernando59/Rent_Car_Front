
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';


export const useAuthStore =() =>{
    const { status, user, errorMessage } = useSelector( (state:RootState ) => state.auth );
    const dispatch = useDispatch();


    

    return{
        status
    }
}