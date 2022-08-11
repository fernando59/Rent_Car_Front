import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { FC } from 'react';
import { Link } from 'react-router-dom';


interface Images {
    path: string
    id: number
}
interface Props {
    id: number
    price: number
    model: string
    brand: string
    year: number
    hasAir: boolean
    capacity: number
    images: Images[]
}
export const CardVehicle: FC<Props> = ({ price, model, brand, id, year, capacity, hasAir, images }) => {



    return (
        <>

            <div className='  drop-shadow-md shadow  rounded-md' >
                {
                    images[0]?.path != undefined ?
                        <Image src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${images[0]?.path}`} imageClassName="w-full h-[300px] object-cover" alt="Image Text" /> : <Image src={'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='} imageClassName="w-full h-[300px] object-cover" alt="Image Text" />
                }
                <div>

                    <div className='inline-flex items-center pt-2 '>

                        <span className='inline font-bold text-2xl px-3 truncate w-[200px] capitalize'>{model} {brand} {year} </span>
                        <p className="inline font-bold text-right text-2xl px-3 w-[100px]"> {price} $  </p>
                    </div>
                    <div className='flex justify-between items-start'>

                        <span className='font-bold text-1xl px-3'></span>
                        <p className=" font-semibold text-sm text-gray-400 px-3"> Per Day  </p>
                    </div>
                    <div className='flex justify-between items-center '>

                        <div className='p-3'>
                            <span><i className="pi pi-cloud"></i> </span>
                            <span className='font-bold'>{hasAir ? 'Has' : 'Not '} Air</span>
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
