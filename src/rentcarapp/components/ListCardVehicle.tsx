import { Skeleton } from 'primereact/skeleton';
import { FC, useState } from "react";
import { useGetVehiclesFilterQuery } from "../../store/apis/vehicleApi";
import { CardVehicle } from "./CardVehicle";

// import { Paginator } from 'primereact/paginator';
interface Props {
    brandId: number
    modelId: number
    typeVehicleId: number
}
export const ListCardVehicle: FC<Props> = ({ brandId, modelId, typeVehicleId }) => {
    const [state, setState] = useState({
        page: 0,
        quantity: 10
    })

    const { data = [], isLoading, isFetching } = useGetVehiclesFilterQuery({ page: state.page, quantity: state.quantity, brandId: brandId, modelId: modelId, typeVehicleId: typeVehicleId })

    if (isLoading) return <>
        <div className='grid__cards'>

            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
        </div>
    </>
    if (isFetching) return <>
        <div className='grid__cards'>

            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
            <Skeleton width="10rem" height='10rem'></Skeleton>
        </div>
    </>
    const onChangePage = (e: any) => {
        console.log(e)
        setState({...state,page:e.first})
    }
    console.log(data.length)
    return (
        <>
            <div className='grid__cards'>

                {
                    data?.map(item => <CardVehicle
                        key={item.id}
                        id={item.id}
                        year={item.year}
                        brand={item.brandVehicle.name}
                        model={item.modelVehicle.name}
                        price={item.price}
                        capacity={item.capacity}
                        hasAir={item.hasAir}
                        images={item.photosVehicles}

                    />)
                }

            </div>
            {/* <Paginator first={state.page} rows={2} totalRecords={data?.length} onPageChange={onChangePage}></Paginator> */}
            {
                data?.length == 0 && <>
                    <div className='flex flex-col items-center justify-center flex-1'>

                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100" height="120" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#888" d="M11.724 7.447a2.276 2.276 0 1 0 0 4.553a2.276 2.276 0 0 0 0-4.553ZM4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm10.819 7.295a3.724 3.724 0 1 0-1.024 1.024l2.476 2.475l.067.058l.008.006a.724.724 0 0 0 .942-1.093l-2.47-2.47Z" /></svg>
                        <h1 className='text-center font-bold text-3xl py-5'>Not <span className='text-purple-600'>Found</span> Vehicles</h1>

                    </div>
                </>
            }
        </>
    )
}
