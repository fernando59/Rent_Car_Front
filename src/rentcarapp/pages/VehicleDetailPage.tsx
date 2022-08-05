import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';
import { useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useModal } from '../../hooks/useModal';
import { useGetVehicleByIdQuery } from '../../store/apis/vehicleApi';
import { FormRentCar } from '../components/FormRentCar';
import { Navbar } from "../components/Navbar";

type Params = {
  id: string

}
export const VehicleDetailPage = () => {
  let { id } = useParams<Params>();
  const { status, user } = useAuthStore();
  const { data: vehicle, isSuccess, isLoading, isError } = useGetVehicleByIdQuery(id === undefined ? skipToken : id)
  const {
    openModalState,
    closeModalState,
    modalState
  } = useModal()

  const closeModal = () => {
    closeModalState()
  }
  const openModal = () => {

    if (status === 'authenticated') {
      openModalState()
    } else {
      console.log('debe aunthenticarse')
    }
  }




  const galleria1 = useRef<any>(null);
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  const itemTemplate = (item: any) => {
    return <Image src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${item.path}`} height="200px" preview alt="Image Text" width='200px' />
  }

  const thumbnailTemplate = (item: any) => {
    return <img src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${item.path}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{ height: '150px', objectFit: 'cover', width: "150px" }} alt={item.alt} />
    // return <Image src={item.thumbnailImageSrc} preview alt="Image Text" style={{ width: '100%',height:400,objectFit:'cover' }} />
  }


  return (
    <>
      {
        isError && <Navigate to="/vehicleModel" />
      }
      <Navbar />

      <div className="mx-auto container">
        <h1 className='py-10 font-bold text-5xl'>Detail Vehicle</h1>
        <div className='grid grid-cols-1 md:grid-cols-2'>

          <div className='rounded-md'>

            <Galleria ref={galleria1} value={vehicle?.photosVehicles} responsiveOptions={responsiveOptions} numVisible={3} style={{ maxWidth: '640px' }}
              item={itemTemplate} thumbnail={thumbnailTemplate} />
          </div>
          <div>

            <Card title="Detail Vehicle Price">
              <hr />
              <div className='py-4 flex flex-col'>
                <div className='flex justify-between py-2'>
                  <span className='font-bold'>Price by Day</span>
                  <span>{vehicle?.price} $</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='font-bold'>N° Days</span>
                  <span>5</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='font-bold'>Others</span>
                  <span>20$</span>
                </div>
              </div>
              <hr />
              <div className='flex justify-between py-2'>
                <span className='font-bold'>Total</span>
                <span>30$</span>
              </div>
              <div className='pt-3'>

                <Button label='Rent' className='w-full' onClick={openModal} />
              </div>
            </Card>


            <Dialog visible={modalState} style={{ width: '450px' }} header={'Rent Car'} modal className="p-fluid" onHide={closeModal}>
              <FormRentCar dailyRate={vehicle?.price} vehicleId={vehicle?.id} />

            </Dialog>

          </div>
        </div>
      </div>
    </>
  )
}
