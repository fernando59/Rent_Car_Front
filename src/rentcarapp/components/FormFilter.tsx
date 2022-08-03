import { Dropdown } from "primereact/dropdown";
import { FC } from "react";
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

    //RTK Query
    const { data: models } = useGetModelVehiclesQuery()
    const { data: typeVehicles } = useGetTypeVehiclesQuery()
    const { data: brands } = useGetBrandsQuery()
    // const { data: prices=[0,100] } = useGetVehiclePriceQuery()



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
              {/* <div className="field my-10">
                    <label className="py-2">Range Price {state?.price[0]} - {state?.price[1]} </label>
                    <Slider value={prices} onChange={onChangePrice}  range />

                </div> */}


        </>
    )
}
