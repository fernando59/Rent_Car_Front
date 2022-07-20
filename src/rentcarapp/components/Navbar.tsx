import { Button } from "primereact/button"

export const Navbar = () => {
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
                        <Button label="Login"/>
                    </div>
                </div>
            </header>
        </>
    )
}
