import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { FC } from 'react';
import { Link } from 'react-router-dom';



interface Props{
    id:number
    price:number
    model:string
    brand:string
}
export const CardVehicle:FC<Props> = ({price,model,brand,id}) => {
    return (
        <>

            <div className='  drop-shadow-md shadow  rounded-md' >
                <Image src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600" imageClassName="w-full h-[300px] object-cover" alt="Image Text" />
                <div>

                    <div className='flex justify-between items-center py-2 '>

                        <span className='font-bold text-3xl '>{model} {brand} </span>
                        <p className=" font-bold text-3xl "> {price} $  </p>
                    </div>
                    <div className='flex justify-between items-center '>

                        <span className='font-bold text-1xl '></span>
                        <p className=" font-semibold text-sm text-gray-400 "> Per Days  </p>
                    </div>
                </div>
                <Link to={`/vehicleDetail/${id}`}>
                    <Button label='Details' className='w-full ' />
                </Link>
                <br />
            </div>
        </>
    )
}
