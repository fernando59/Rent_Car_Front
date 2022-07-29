import { Dropdown } from "primereact/dropdown";
import { Slider } from 'primereact/slider';
import { FC } from "react";
import { useGetBrandsQuery } from "../../store/apis";
import { useGetModelVehiclesQuery } from "../../store/apis/modelVehicleApi";
import { useGetTypeVehiclesQuery } from "../../store/apis/typeVehicleApi";

interface Props {
    onChangeBrand: (e: any) => void
    onChangeModel: (e: any) => void
    onChangeTypeVehicle: (e: any) => void
    state: any
}
export const FormFilter: FC<Props> = ({ onChangeBrand, onChangeModel, onChangeTypeVehicle, state }) => {

    //RTK Query
    const { data: models } = useGetModelVehiclesQuery()
    const { data: typeVehicles } = useGetTypeVehiclesQuery()
    const { data: brands } = useGetBrandsQuery()





    return (
        <>

            <div className="field my-10">
                <span className="p-float-label">
                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.brandId} onChange={onChangeBrand} options={brands} optionLabel="name" optionValue="id" />
                    <label>Brand </label>
                </span>
            </div>

            <div className="field my-10">
                <span className="p-float-label">

                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.modelId} onChange={onChangeModel} options={models} optionLabel="name" optionValue="id" />
                    <label>Model</label>
                </span>
            </div>
            <div className="field my-10">
                <span className="p-float-label">
                    <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' value={state.typeVehicleId} onChange={onChangeTypeVehicle} options={typeVehicles} optionLabel="name" optionValue="id" />
                    <label>Type Vehicle</label>
                </span>
            </div>
            <div className="field my-10">
                <label className="py-3">Range Price</label>
                    <Slider />

            </div>


        </>
    )
}
