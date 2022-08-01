import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
export const Banner = () => {
    const navigation = useNavigate()
    const onRentNow =()=>{
        navigation('/vehicleModel')

    }
    return (
        <>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 w-full">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Rent a <span className='text-[#4F46E5] font-bold'>Car</span></span>
                        <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>

                        <p className="my-10 text-gray-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='flex w-full justify-center items-center md:justify-start gap-1 py-6'>

                        <Button label="Learn More" type="button" className="p-button-raised" />
                        <Button label="Rent Now" type="button" className="p-button-outlined" onClick={onRentNow} />
                        </div>
                    </section>
                </div>
                <div className="hidden md:block text-right ">
                    <img src="assets/images/car.jpg" alt="Vehicle Banner" className=" block h-96 w-full object-cover" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                </div>
            </div>
        </>
    )
}
