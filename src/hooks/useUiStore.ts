import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);


    const openDateModal = () => { dispatch(onOpenDateModal()) }

    const closeDateModal = () => { dispatch(onCloseDateModal()) }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? closeDateModal()
            : openDateModal();
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,
    }

}