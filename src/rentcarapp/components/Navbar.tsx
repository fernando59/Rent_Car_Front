import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useUiStore } from "../../hooks/useUiStore";
import { FormRegister } from "./FormRegister";
export const Navbar = () => {

    const { isModalOpen, openModal, closeModal } = useUiStore()


    return (
        <>
            <header className="w-full h-20">

                <div className="mx-auto container flex justify-between items-center h-full">

                    <h1 className="font-bold uppercase">FernandoRent</h1>
                    <ul className="hidden md:flex gap-2 font-bold text-gray-400">
                        <li><a href="#">Reservation</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                    <div className="flex gap-2">
                        <Button label="Login" onClick={openModal} />
                        <Button label="Register" onClick={openModal} className="p-button-outlined" />
                    </div>
                </div>
            </header>

            <Dialog  visible={isModalOpen} onHide={closeModal} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} >
                {/* <FormLogin /> */}
                <FormRegister/>
            </Dialog>
        </>
    )
}
