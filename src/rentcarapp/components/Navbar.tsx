import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { FormLogin } from "./FormLogin";
import { FormRegister } from "./FormRegister";
export const Navbar = () => {

    const {
        closeModalState: closeModalRegisterState,
        modalState: modalRegister,
        openModalState: openModalRegisterState
    } = useModal()

    const {
        closeModalState: closeModalLoginState,
        modalState: modalLogin,
        openModalState: openModalLoginState
    } = useModal()



    //open
    const openModalLogin = () => openModalLoginState()
    const openModalRegister = () => openModalRegisterState()

    //close
    const closeModalLogin = () => { closeModalLoginState() }
    const closeModalRegister = () => { closeModalRegisterState() }
    return (
        <>
            <header className="w-full h-20">

                <div className="w-full px-6 mx-auto container flex justify-between items-center h-full">

                    <h1 className="font-bold uppercase">FernandoRent</h1>
                    <ul className="hidden md:flex gap-2 font-bold text-gray-400">

                        <li className="hover:text-purple-600 px-4"> <Link to='/'>
                            <span>Home</span>
                        </Link>
                        </li>
{/* 
                        <li className="hover:text-purple-600 px-4"> <Link to='/vehicleModel'>
                            <span>Vehicle Models</span>
                        </Link>
                        </li> */}
                        <li className="hover:text-purple-600 px-4">
                        <Link to='/vehicleDetail'> 
                            <span>Contact</span>
                            </Link>
                            </li>
                     
                        <li className="hover:text-purple-600 px-4"> 
                        <a href='#contact'>
                            <span>About Us</span>
                        </a>
                        </li>
                    </ul>
                    <div className="flex gap-2">
                        <Button label="Login" onClick={openModalLogin} />
                        <Button label="Register" onClick={openModalRegister} className="p-button-outlined" />
                    </div>
                </div>
            </header>

            <Dialog visible={modalLogin} onHide={closeModalLogin} breakpoints={{ '960px': '25vw', '640px': '100vw' }} style={{ width: '30vw' }} >
                <h1 className="text-center font-bold text-4xl">Login</h1>
                <FormLogin />
            </Dialog>

            <Dialog visible={modalRegister} onHide={closeModalRegister} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw' }} >
                <h1 className="text-center font-bold text-4xl">Register</h1>
                <FormRegister />
            </Dialog>
        </>
    )
}
