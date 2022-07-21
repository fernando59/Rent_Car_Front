import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { activeMobileMenu, desactiveMobileMenu, onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isModalOpen,mobileMenuActive } = useSelector((state: RootState) => state.ui);


    const openModal = () => { dispatch(onOpenDateModal()) }

    const closeModal = () => { dispatch(onCloseDateModal()) }

    //menu layout mobile
    const activeMobile  = () => { dispatch(activeMobileMenu()) }
    const desactiveMobile = () => { dispatch(desactiveMobileMenu()) }


    const toggleModal = () => {
        (isModalOpen)
            ? closeModal()
            : openModal();
    }

    return {
        //* Propiedades
        isModalOpen,
        mobileMenuActive,


        //* Métodos
        closeModal,
        openModal,
        toggleModal,
        activeMobile,
        desactiveMobile

    }

}