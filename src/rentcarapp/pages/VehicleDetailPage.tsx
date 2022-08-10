import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useModal } from '../../hooks/useModal';
import { useGetVehicleByIdQuery } from '../../store/apis/vehicleApi';
import { openModalLogin } from '../../store/slices';
import { FormRentCar } from '../components/FormRentCar';
import { Navbar } from "../components/Navbar";

type Params = {
  id: string

}
export const VehicleDetailPage = () => {
  let { id } = useParams<Params>();
  const { status } = useAuthStore();
  const dispatch = useDispatch()
  const toast = useRef<any>(null);

  const { data: vehicle, isError } = useGetVehicleByIdQuery(id === undefined ? skipToken : id)
  const {
    openModalState,
    closeModalState,
    modalState
  } = useModal()

  const closeModal = () => {
    closeModalState()
  }
  const openModalLoginUI = () => dispatch(openModalLogin())
  const openModal = () => {

    if (status === 'authenticated') {
      openModalState()
    } else {
      openModalLoginUI()
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
    console.log(item.path)
    // if(item.path)
    return <img src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${item.path}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{ height: '150px', objectFit: 'cover', width: "150px" }} alt={item.alt} />
    // return <Image src={item.thumbnailImageSrc} preview alt="Image Text" style={{ width: '100%',height:400,objectFit:'cover' }} />
  }


  return (
    <>
      {
        isError && <Navigate to="/vehicleModel" />
      }
      <Navbar />

      <div className="mx-auto container px-6">
        <h1 className='py-10 font-bold text-4xl text-gray-500'>{vehicle?.brandVehicle.name} {vehicle?.modelVehicle.name} {vehicle?.year}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2'>

          <div className='rounded-md px-10'>

            {
              vehicle?.photosVehicles.length === 0 ?
                <img style={{ width: 400, objectFit: 'cover' }} src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' />
                : <img className='object-cover rounded-md' src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${vehicle?.photosVehicles[0].path}`} />
            }
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
                  <span className='font-bold'>Has Air</span>
                  <span>{vehicle?.hasAir ? 'Has Air' : 'No has air'}</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='font-bold'>Year</span>
                  <span>{vehicle?.year}</span>
                </div>

                <div className='flex justify-between py-2'>
                  <span className='font-bold'>Brand</span>
                  <span>{vehicle?.brandVehicle.name}</span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='font-bold'>Model</span>
                  <span>{vehicle?.modelVehicle.name}</span>
                </div>
              </div>
              <hr />
              {/* <div className='flex justify-between py-2'>
                <span className='font-bold'>Total</span>
                <span>30$</span>
              </div> */}
              <div className='pt-3'>

                <Button label='Rent' className='w-full' onClick={openModal} />
              </div>
            </Card>
            <h1 className='font-bold text-left pt-10'>Description</h1>
            <p>
              {vehicle?.description}
            </p>


            <Dialog visible={modalState} style={{ width: '450px' }} header={'Rent Car'} modal className="p-fluid" onHide={closeModal}>
              <FormRentCar closeModal={closeModal} dailyRate={vehicle?.price} vehicleId={vehicle?.id} toast={toast} />

            </Dialog>

          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  )
}
