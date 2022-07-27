
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { useGetVehiclesFilterQuery } from '../../store/apis/vehicleApi';
import { CardVehicle } from '../components/CardVehicle';
import { FormFilter } from '../components/FormFilter';
import { Navbar } from '../components/Navbar';
export const VehicleModelsPage = () => {


  const {data }=useGetVehiclesFilterQuery({page:1,quantity:10,brandId:1,modelId:0})
  console.log(data)
  return (
    <>

      <Navbar />

      <div className='mx-auto container'>
        <h1 className='py-10 font-bold text-5xl'>Vehicle Models</h1>
        <div className='gridPageVehicles'>
          <div className='grid__part_a'>
            <Card>

            <FormFilter/>
            </Card>
          </div>


          <div className='grid__part_b'>

            <div className='grid__cards'>
              {
                data?.map(item=><CardVehicle 
                  key={item.id} 
                  id={item.id}
                  brand={item.brandVehicle.name}
                  model={item.modelVehicle.name}
                  price={item.price}
                  
                  />)
              }

            </div>
            <Paginator first={0} rows={10} onPageChange={() => { }}></Paginator>
          </div>
        </div>
      </div>

    </>
  )
}
