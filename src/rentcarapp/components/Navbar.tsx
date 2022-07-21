import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useUiStore } from "../../hooks/useUiStore";
import { FormLogin } from "./FormLogin";
export const Navbar = () => {

    const { isModalOpen, openModal, closeModal } = useUiStore()


    return (
        <>
            <header className="w-full h-20">

                <div className="mx-auto container flex justify-between items-center h-full">

                    <h1 className="font-bold uppercase">FernandoRent</h1>
                    <ul className="flex gap-2 font-bold text-gray-400">
                        <li><a href="#">Reservation</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                    <div>
                        <Button label="Login" onClick={openModal} />
                    </div>
                </div>
            </header>

            <Dialog  visible={isModalOpen} onHide={closeModal} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} >
                <FormLogin />
            </Dialog>
        </>
    )
}
