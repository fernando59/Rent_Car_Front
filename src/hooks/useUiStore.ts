import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isModalOpen } = useSelector((state: RootState) => state.ui);


    const openModal = () => { dispatch(onOpenDateModal()) }

    const closeModal = () => { dispatch(onCloseDateModal()) }

    const toggleModal = () => {
        (isModalOpen)
            ? closeModal()
            : openModal();
    }

    return {
        //* Propiedades
        isModalOpen,

        //* Métodos
        closeModal,
        openModal,
        toggleModal,
    }

}