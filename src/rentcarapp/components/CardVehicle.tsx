import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
export const CardVehicle = () => {
    return (
        <>

            <div className='  drop-shadow-md shadow  rounded-md' >
                <Image src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600" imageClassName="w-full h-[300px] object-cover" alt="Image Text" />
                <div>

                    <div className='flex justify-between items-center py-2 '>

                        <span className='font-bold text-3xl '>Audi A3</span>
                        <p className=" font-bold text-3xl "> 20$  </p>
                    </div>
                    <div className='flex justify-between items-center '>

                        <span className='font-bold text-1xl '></span>
                        <p className=" font-semibold text-sm text-gray-400 "> Per Days  </p>
                    </div>
                </div>
                <Link to='/vehicleDetail'>
                    <Button label='Details' className='w-full ' />
                </Link>
                <br />
            </div>
        </>
    )
}
