import { Skeleton } from 'primereact/skeleton';
import { FC } from "react";
import { useGetVehiclesFilterQuery } from "../../store/apis/vehicleApi";
import { CardVehicle } from "./CardVehicle";
interface Props {
    brandId: number
    modelId: number
    typeVehicleId: number
}
export const ListCardVehicle: FC<Props> = ({ brandId, modelId, typeVehicleId }) => {

    const { data, isLoading,isFetching } = useGetVehiclesFilterQuery({ page: 1, quantity: 10, brandId: brandId, modelId: modelId, typeVehicleId: typeVehicleId })

    console.log(isLoading)
    console.log(isFetching)
    if(isLoading) return <>
        <Skeleton width="10rem" height='10rem'></Skeleton>
        <Skeleton width="10rem" height='10rem'></Skeleton>
        <Skeleton width="10rem" height='10rem'></Skeleton>
        <Skeleton width="10rem" height='10rem'></Skeleton>
    </>
      if(isFetching) return <>
      <Skeleton width="10rem" height='10rem'></Skeleton>
      <Skeleton width="10rem" height='10rem'></Skeleton>
      <Skeleton width="10rem" height='10rem'></Skeleton>
      <Skeleton width="10rem" height='10rem'></Skeleton>
  </>
    return (
        <>

            {
                data?.map(item => <CardVehicle
                    key={item.id}
                    id={item.id}
                    brand={item.brandVehicle.name}
                    model={item.modelVehicle.name}
                    price={item.price}

                />)
            }
        </>
    )
}
