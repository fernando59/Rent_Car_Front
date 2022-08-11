import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { closeModalLogin, closeModalRegister, logoutAuth, openModalLogin, openModalRegister } from "../../store/slices";
import { FormLogin } from "./FormLogin";
import { FormRegister } from "./FormRegister";
export const Navbar = () => {

    const { user } = useSelector((state: any) => state.auth)
    const {isModalLoginOpen,isModalRegisterOpen} = useSelector((state: any) => state.ui)
    const dispatch = useDispatch()
    const toast = useRef<any>(null);
    const navigate = useNavigate()
    const menu = useRef<any>(null);
    const { status } = useAuthStore();

    //open
    const openModalLoginUI = () => dispatch(openModalLogin())
    const openModalRegisterUI = () => dispatch(openModalRegister())

    //close
    const closeModalLoginUi = () => { dispatch(closeModalLogin()) }
    const closeModalRegisterUi = () => { dispatch(closeModalRegister()) }


    const items = [
        {
            label: 'My Orders',
            icon: 'pi pi-book',
            command: () => {
                navigate('/history')
            }
        },
        {
            label: 'Log out',
            icon: 'pi pi-power-off',
            command: () => {
                dispatch(logoutAuth())
            }
        },


    ]
    return (
        <>
            <header className="w-full h-20">

                <div className="w-full px-6 mx-auto container flex justify-between items-center h-full">

                    <h1 className="font-bold uppercase">
                        <Link to='/'>
                            FernandoRent
                        </Link>
                    </h1>
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
                            <a href='#contact'>
                                <span>Contact</span>
                            </a>
                        </li>

                        <li className="hover:text-purple-600 px-4">
                            <a href='#about_us'>
                                <span>About Us</span>
                            </a>
                        </li>
                    </ul>
                    {

                        status === 'authenticated' && user.rols === 'Client' ? <div className="flex items-center justify-center">
                            {/* USER OPTIONS */}
                            <Menu model={items} popup ref={menu} id="popup_menu" />

                            <span className="px-2 font-semibold text-gray-500" > {user.email} </span>
                            <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-outlined" aria-label="User" onClick={(event) => menu.current.toggle(event)} />
                        </div>

                            : <div className="flex gap-2">
                                {/* LOGIN AND REGISTER */}
                                <Button label="Login" onClick={openModalLoginUI} />
                                <Button label="Register" onClick={openModalRegisterUI} className="p-button-outlined" /></div>
                    }
                </div>
            </header>

            <Dialog visible={isModalLoginOpen} onHide={closeModalLoginUi} breakpoints={{ '960px': '25vw', '640px': '100vw' }} style={{ width: '30vw' }} >
                <h1 className="text-center font-bold text-4xl">Login</h1>
                <FormLogin closeModal={closeModalLoginUi} isBackoffice={false} />
            </Dialog>

            <Dialog visible={isModalRegisterOpen} onHide={closeModalRegisterUi} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '30vw' }} >
                <h1 className="text-center font-bold text-4xl">Register</h1>
                <FormRegister toast={toast} closeModal={closeModalRegisterUi} />
            </Dialog>
            <Toast ref={toast} />
        </>
    )
}
