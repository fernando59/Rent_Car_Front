import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAuth } from '../../store/slices';
// import classNames from 'classnames';

export const NavbarBackoffice = (props: any) => {
    const menu = useRef<any>(null);
    const dispatch = useDispatch()
    const items = [

        {
            label: 'Log out',
            icon: 'pi pi-power-off',
            command: () => {
                dispatch(logoutAuth())
            }
        },


    ]
    return (
        <div className="w-full shadow-md flex items-center justify-between fixed px-10 top-0 left-0 z-10 bg-white h-[5rem] ">
            <div className='flex w-full'>
                <div className='block md:hidden'>
                    <Button className="p-button-rounded p-button-text p-button-plain " aria-label="Bar" icon="pi pi-bars" onClick={props.onMobileTopbarMenuClick} />
                </div>
                <Link to="/backoffice" className="flex justify-center items-center grow md:grow-0 font-medium rounded-3xl text-2xl md:w-[300px] w-full">
                    <img className='w-[150px] object-cover' src={'https://res.cloudinary.com/testapicloudinaryfernando/image/upload/v1660069626/logo_car_oskbvq.png'} alt="logo" />
                    {/* <span>Rent</span> */}
                </Link>

                <div className='hidden md:block'>
                    <Button className="p-button-rounded p-button-text p-button-plain " aria-label="Bar" icon="pi pi-bars" onClick={props.onMobileTopbarMenuClick} />
                </div>
                <div className='md:hidden'>

                    <Button className="p-button-rounded p-button-text p-button-plain " aria-label="Bar" icon="pi pi-ellipsis-v" onClick={props.onMobileTopbarMenuClick} />
                </div>

            </div>

            {/* <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}> */}
            <ul className=' gap-2 hidden md:flex'>

                <li>
                    <Menu model={items} popup ref={menu} id="popup_menu" />
                    <Button className="p-button-rounded p-button-text p-button-plain" aria-label="Settings" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)} />
                </li>
            </ul>
        </div>
    );
}
