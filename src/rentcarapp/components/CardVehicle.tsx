import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { FC } from 'react';
import { Link } from 'react-router-dom';


interface Props {
    id: number
    price: number
    model: string
    brand: string
    year: number
    hasAir:boolean
    capacity:number
}
export const CardVehicle: FC<Props> = ({ price, model, brand, id, year,capacity,hasAir }) => {

    return (
        <>

            <div className='  drop-shadow-md shadow  rounded-md' >
                <Image src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600" imageClassName="w-full h-[300px] object-cover" alt="Image Text" />
                <div>

                    <div className='flex justify-between items-center pt-2 '>

                        <span className='font-bold text-3xl px-3'>{model} {brand} {year} </span>
                        <p className=" font-bold text-3xl px-3"> {price} $  </p>
                    </div>
                    <div className='flex justify-between items-start'>

                        <span className='font-bold text-1xl px-3'></span>
                        <p className=" font-semibold text-sm text-gray-400 px-3"> Per Day  </p>
                    </div>
                    <div className='flex justify-between items-center '>

                        <div className='p-3'>
                            <span><i className="pi pi-cloud"></i> </span>
                            <span className='font-bold'>{hasAir?'Has':'Not '} Air</span>
                        </div>

                        <div className='p-3'>
                            <span><i className="pi pi-user"></i> </span>
                            <span className='font-bold'>{capacity} Seats</span>
                        </div>

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
