
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { useState } from 'react';
import { FormFilter } from '../components/FormFilter';
import { ListCardVehicle } from '../components/ListCardVehicle';
import { Navbar } from '../components/Navbar';
export const VehicleModelsPage = () => {


  const [state, setState] = useState({
    brandId: 0,
    modelId: 0,
    typeVehicleId: 0
  })
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
  return (
    <>

      <Navbar />

      <div className='mx-auto container'>
        <h1 className='py-10 font-bold text-5xl'>Vehicle Models</h1>
        <div className='gridPageVehicles'>
          <div className='grid__part_a'>
            <Card>

              <FormFilter
                state={state}
                onChangeBrand={onChangeBrand}
                onChangeModel={onChangeModel}
                onChangeTypeVehicle={onChangeTypeVehicle}
              />
            </Card>
          </div>


          <div className='grid__part_b'>

            <div className='grid__cards'>

              <ListCardVehicle brandId={state.brandId} modelId={state.modelId} typeVehicleId={state.typeVehicleId} />

            </div>
            <Paginator first={0} rows={10} onPageChange={() => { }}></Paginator>
          </div>
        </div>
      </div>

    </>
  )
}
