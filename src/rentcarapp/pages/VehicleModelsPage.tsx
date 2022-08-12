
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBrand } from '../../store/slices';
import { FormFilter } from '../components/FormFilter';
import { ListCardVehicle } from '../components/ListCardVehicle';
import { Navbar } from '../components/Navbar';
export const VehicleModelsPage = () => {

  const { brand } = useSelector((state: any) => state.vehicle)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    brandId: 0,
    modelId: 0,
    typeVehicleId: 0,
    price: [0, 100]
  })


  useEffect(() => {
    if (brand !== null) setState({ ...state, brandId: brand })

    return () => {
      dispatch(clearBrand())
    }

  }, [setState])

  const onChangeBrand = (e: any) => {
    const value = e.target.value
    setState({ ...state, brandId: value })

  }

  const onChangeModel = (e: any) => {
    const value = e.target.value
    setState({ ...state, modelId: value })

  }

  const onChangeTypeVehicle = (e: any) => {
    const value = e.target.value
    setState({ ...state, typeVehicleId: value })

  }

  const onChangePrice = (e: any) => {
    const value = e.value
    setState({ ...state, price: value })

  }

  return (
    <>

      <Navbar />

      <div className='mx-auto container px-6'>
        <h1 className='py-10 font-bold text-5xl'>Vehicle Models</h1>
        <div className='gridPageVehicles'>
          <div className='grid__part_a'>
            <Card>
              <h3 className='text-2xl font-semibold text-gray-400 flex items-center gap-2'> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="#999" d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" /></svg> Filter By</h3>

              <FormFilter
                state={state}
                onChangeBrand={onChangeBrand}
                onChangeModel={onChangeModel}
                onChangeTypeVehicle={onChangeTypeVehicle}
                onChangePrice={onChangePrice}
              />
            </Card>
          </div>


          <div className='grid__part_b'>



            <ListCardVehicle brandId={state.brandId} modelId={state.modelId} typeVehicleId={state.typeVehicleId} />

          </div>
        </div>
      </div>

    </>
  )
}
