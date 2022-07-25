import classNames from "classnames";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { Controller, useForm } from 'react-hook-form';
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
    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });
    //RTK Query
    const { data: models } = useGetModelVehiclesQuery()
    const { data: typeVehicles } = useGetTypeVehiclesQuery()
    const { data: brands } = useGetBrandsQuery()
    console.log({ models })
    console.log({ typeVehicles })
    console.log({ brands })


    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IVehicleForm
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };
    return (
        <>

            <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmitSaveVehicle)}>
                <div className="field my-10">
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
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller name="capacity" control={control}
                            rules={{ required: 'Capacity is required.', max: { value: 10, message: 'The value max is 10' } }}
                            render={({ field, fieldState }) => (
                                <InputNumber min={0} id={field.name} onChange={(e) => field.onChange(e.value)} value={field.value} style={{ width: '100%' }} className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                        <label htmlFor="capacity" className={classNames({ 'p-error': !!errors.capacity })}>Capacity</label>
                    </span>
                    {getFormErrorMessage('capacity')}
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller name="year" control={control}
                            rules={{ required: 'Year is required.', maxLength: { value: 4, message: 'The max Length is 4' } }}
                            render={({ field, fieldState }) => (
                                <InputText style={{ width: '100%' }} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                // <InputNumber maxFractionDigits={4} useGrouping={false} id={field.name} min={0}  onChange={(e) => field.onChange(e.value)} value={field.value} style={{ width: '100%' }} className={classNames({ 'p-invalid': fieldState.error })} />
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
                                // <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                <InputNumber id={field.name} onChange={(e) => field.onChange(e.value)} value={field.value} style={{ width: '100%' }} className={classNames({ 'p-invalid': fieldState.error })} mode="currency" currency="BOB" locale="es-EN" />
                            )} />
                        <label htmlFor="name" className={classNames({ 'p-error': !!errors.price })}>Price</label>
                    </span>
                    {getFormErrorMessage('price')}
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
