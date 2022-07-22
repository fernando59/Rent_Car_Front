import { useState } from "react"


export const useModal = () => {

    const [modalState, setModalState] = useState(false)


    const openModalState = () => { setModalState(true) }
    const closeModalState = () => { setModalState(false) }

    return {
        modalState,
        openModalState,
        closeModalState
    }



}