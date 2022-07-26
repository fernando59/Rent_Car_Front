import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { useGetBrandsQuery } from "../../store/apis";
import { useGetModelVehiclesQuery } from "../../store/apis/modelVehicleApi";
import { useGetTypeVehiclesQuery } from "../../store/apis/typeVehicleApi";

export const FormFilter = () => {
    const { control, formState: { errors }, handleSubmit } = useForm({ });
        //RTK Query
        const { data: models } = useGetModelVehiclesQuery()
        const { data: typeVehicles } = useGetTypeVehiclesQuery()
        const { data: brands } = useGetBrandsQuery()

    const onHandleSubmitFilter =(data:any)=>{
        console.log(data)
        

    }
    return (
        <>

            <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmitFilter)}>
            <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="brandVehicle"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                // let value = 0
                                // if (typeof (field.value) == "number") {
                                //     value = field.value

                                // } else {
                                //     const data = field.value as unknown as IBrand
                                //     value = data.id

                                // }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={brands} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Brand </label>
                    </span>
                    {/* {getFormErrorMessage('brand')} */}
                </div>

                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="modelVehicle"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                // let value = 0
                                // if (typeof (field.value) == "number") {
                                //     value = field.value

                                // } else {
                                //     const data = field.value as unknown as IModelVehicle
                                //     value = data.id

                                // }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={models} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Model</label>
                    </span>
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="typeVehicle"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                // let value = 0
                                // if (typeof (field.value) == "number") {
                                //     value = field.value

                                // } else {
                                //     const data = field.value as unknown as ITypeVehice
                                //     value = data.id

                                // }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={typeVehicles} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Type Vehicle</label>
                    </span>
                </div>

            </form>
        </>
    )
}
