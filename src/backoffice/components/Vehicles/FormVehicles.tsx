import classNames from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FC, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ITypeVehicle } from "../../../models";
import { IBrand } from "../../../models/Brand";
import { IModelVehicle } from "../../../models/ModelVehicle";
import { IVehicleForm } from "../../../models/Vehicle";
import { useGetBrandsQuery } from "../../../store/apis";
import { useGetModelVehiclesQuery } from "../../../store/apis/modelVehicleApi";
import { useGetTypeVehiclesQuery } from "../../../store/apis/typeVehicleApi";

interface Props {
    onHandleSubmitSaveVehicle: (data: IVehicleForm) => void
    defaultValues: IVehicleForm
    closeModalUpdate: () => void
}



export const FormVehicles: FC<Props> = ({ onHandleSubmitSaveVehicle, defaultValues, closeModalUpdate }) => {
    const { control,setValue, formState: { errors }, handleSubmit,register,getValues } = useForm({ defaultValues });
    const [url, setUrl] = useState<any>(null)
    //RTK Query
    const { data: models } = useGetModelVehiclesQuery()
    const { data: typeVehicles } = useGetTypeVehiclesQuery()
    const { data: brands } = useGetBrandsQuery()
    const imagePath = register('imagePath', { required: true })

    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IVehicleForm
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };
    const fileChange = (e: any) => {
        // const file = e.target.files[0];
        //setValue("imagePath",file)
        console.log(getValues('imagePath'))
        // const urlValue = URL.createObjectURL(file);
        // setUrl(urlValue)

    };
    return (
        <>

            <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmitSaveVehicle)}>

                <div className="flex items-center justify-center w-full">

                    {
                        url != null ? <>
                            <img src={url} alt="Image" className="w-48 h-48 rounded-lg object-cover" />

                        </> : <img src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" alt="Image" className="w-48 h-48 rounded-lg" />
                    }

                </div>
                <Button type="button" icon="pi pi-camera" className="p-button-rounded p-button-primary" aria-label="Image" onClick={() => document.getElementById("image")?.click()} />
                <input type="file" id="image" className="hidden" accept="image/*" {...imagePath} onChange={fileChange} />
                <div className="flex gap-4">

                    <div className="field pt-10 mb-2">
                        <span className="p-float-label">
                            <Controller name="plate" control={control}
                                rules={{ required: 'Plate is required.' }}
                                render={({ field, fieldState }) => (
                                    <InputText style={{ width: '100%' }} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                )} />
                            <label htmlFor="plate" className={classNames({ 'p-error': !!errors.plate })}>Plate</label>
                        </span>
                        {getFormErrorMessage('plate')}
                    </div>
                    <div className="field pt-10 mb-2">
                        <span className="p-float-label">
                            <Controller name="capacity" control={control}
                                rules={{ required: 'Capacity is required.', max: { value: 10, message: 'The value max is 10' } }}
                                render={({ field, fieldState }) => (
                                    <InputText keyfilter="int" style={{ width: '100%' }} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                )} />
                            <label htmlFor="capacity" className={classNames({ 'p-error': !!errors.capacity })}>Capacity</label>
                        </span>
                        {getFormErrorMessage('capacity')}
                    </div>

                </div>
                <div className="field mt-5 mb-5 ">
                    <span className="p-float-label">
                        <Controller name="year" control={control}
                            rules={{ required: 'Year is required.', maxLength: { value: 4, message: 'The max Length is 4' } }}
                            render={({ field, fieldState }) => (
                                <InputText keyfilter="int" style={{ width: '100%' }} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                        <label htmlFor="year" className={classNames({ 'p-error': !!errors.capacity })}>Year</label>
                    </span>
                    {getFormErrorMessage('year')}
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller name="price" control={control}
                            rules={{ required: 'Price is required.' }}
                            render={({ field, fieldState }) => (
                                <InputNumber id={field.name} onChange={(e) => field.onChange(e.value)} value={field.value} style={{ width: '100%' }} className={classNames({ 'p-invalid': fieldState.error })} mode="currency" currency="BOB" locale="es-EN" />
                                // <InputText/>
                            )} />
                        <label htmlFor="name" className={classNames({ 'p-error': !!errors.price })}>Price</label>
                    </span>
                    {getFormErrorMessage('price')}
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="brandVehicleId"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                let value = 0
                                if (typeof (field.value) == "number") {
                                    value = field.value

                                } else {
                                    const data = field.value as unknown as IBrand
                                    value = data.id

                                }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={value} onChange={(e) => field.onChange(e.value)} options={brands} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Brand </label>
                    </span>
                    {getFormErrorMessage('brand')}
                </div>

                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="modelVehicleId"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                let value = 0
                                if (typeof (field.value) == "number") {
                                    value = field.value

                                } else {
                                    const data = field.value as unknown as IModelVehicle
                                    value = data.id

                                }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={value} onChange={(e) => field.onChange(e.value)} options={models} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Model</label>
                    </span>
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="typeVehicleId"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                let value = 0
                                if (typeof (field.value) == "number") {
                                    value = field.value

                                } else {
                                    const data = field.value as unknown as ITypeVehicle
                                    value = data.id

                                }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={value} onChange={(e) => field.onChange(e.value)} options={typeVehicles} optionLabel="name" optionValue="id" />
                            }}
                        />
                        <label>Type Vehicle</label>
                    </span>
                </div>
                <div className="field mt-5 mb-5 ">
                    <span className="p-float-label">
                        <Controller name="description" control={control}
                            render={({ field, fieldState }) => (
                                <InputTextarea rows={5} cols={30} {...field} style={{ width: '100%' }} />

                            )} />
                        <label htmlFor="description" >Description</label>
                    </span>
                </div>

                <div className="flex gap-4 w-full justify-end ">

                    <div className="grow-0">

                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" type="button" onClick={closeModalUpdate} />
                    </div>

                    <div className="grow-0">

                        <Button label="Save" icon="pi pi-check" className="p-button-text" type='submit' />
                    </div>
                </div>
            </form>
        </>
    )
}
