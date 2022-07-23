
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { CardVehicle } from '../components/CardVehicle';
import { Navbar } from '../components/Navbar';
export const VehicleModelsPage = () => {
  return (
    <>

      <Navbar />

      <div className='mx-auto container'>
        <h1 className='py-10 font-bold text-5xl'>Vehicle Models</h1>
        <div className='gridPageVehicles'>
          <div className='grid__part_a'>
            <Card>

              filter
            </Card>
          </div>


          <div className='grid__part_b'>

            <div className='grid__cards'>

              <CardVehicle />
              <CardVehicle />
              <CardVehicle />
              <CardVehicle />
            </div>
            <Paginator first={0} rows={10} onPageChange={() => { }}></Paginator>
          </div>
        </div>
      </div>

    </>
  )
}
