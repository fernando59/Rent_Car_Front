import { Dropdown } from "primereact/dropdown";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetBrandsQuery } from "../../store/apis";
import { useGetModelVehiclesQuery } from "../../store/apis/modelVehicleApi";
import { useGetTypeVehiclesQuery } from "../../store/apis/typeVehicleApi";

interface Props {
    onChangeBrand: (e: any) => void
    onChangeModel: (e: any) => void
    onChangeTypeVehicle: (e: any) => void
    onChangePrice: (e: any) => void
    state: any
}
export const FormFilter: FC<Props> = ({ onChangeBrand, onChangeModel, onChangeTypeVehicle, onChangePrice, state }) => {

    const selector = useSelector((state:any)=>state.vehicle)
    useEffect(()=>{

    },[])
    //RTK Query
    const { data: models } = useGetModelVehiclesQuery()
    const { data: typeVehicles } = useGetTypeVehiclesQuery()
    const { data: brands } = useGetBrandsQuery()



    return (
        <>
        

            <div className="field my-10">
                <span className="p-float-label">
                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.brandId} onChange={onChangeBrand} options={brands} optionLabel="name" optionValue="id" placeholder="Search a Brand" />
                    <label className="font-bold">Brand </label>
                </span>
            </div>

            <div className="field my-10">
                <span className="p-float-label">

                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.modelId} onChange={onChangeModel} options={models} optionLabel="name" optionValue="id" />
                    <label className="font-bold">Model</label>
                </span>
            </div>
            <div className="field my-10">
                <span className="p-float-label">
                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.typeVehicleId} onChange={onChangeTypeVehicle} options={typeVehicles} optionLabel="name" optionValue="id" />
                    <label className="font-bold">Type Vehicle</label>
                </span>
            </div>
          


        </>
    )
}
