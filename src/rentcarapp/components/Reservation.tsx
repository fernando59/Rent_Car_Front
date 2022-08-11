import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useGetBrandsQuery } from '../../store/apis';
import { searchBrandVehicle } from '../../store/slices';


interface IReservation {
    brand: any
    startDate: Date
    endDate: Date
}



export const Reservation = () => {

    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        defaultValues: {
            brand: null,
            startDate: undefined,
            endDate: undefined,
        }
    });
    const dispatch = useDispatch()
    const startDate = useRef<any>({});
    startDate.current = watch("startDate");


    const { data } = useGetBrandsQuery()



    const onHandleSubmit = (data: any) => {

        data.startDate = data.startDate.toISOString()
        data.endDate = data.endDate.toISOString()
        dispatch(searchBrandVehicle(data))

        navigate("/vehicleModel", { replace: true });
    }


    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IReservation
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };


    const isMaxDate = (e: any) => {
        const endDate = e
        if (startDate.current !== undefined) {
            const res = endDate.getDate() - startDate.current.getDate()
            if (res < 0) {
                return false
            }
            return true
        }
        return true
    }

    return <>

        <h2 className='text-6xl font-bold text-center py-20'>Find Best Vehicles</h2>
        <div className='flex justify-center h-full items-start'>

            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className='flex items-end flex-col md:flex-row gap-2 h-full'>

                <div className='h-[85px]'>

                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="brand"
                            rules={{ required: "Brand is required", }}
                            render={({ field }
                            ) => (
                                <Dropdown
                                    filter
                                    showClear
                                    filterBy="name"
                                    className='w-full min-w-[250px] capitalize'
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    options={data}
                                    optionLabel="name" />
                            )}
                        />
                        <label className={classNames({ "p-error": errors.brand })}>Brand </label>
                    </span>
                    {getFormErrorMessage('brand')}

                </div>
                <div className='h-[85px]'>

                    <span className="p-float-label">
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start Date is required" }}
                            render={({ field }
                            ) => (
                                <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />
                            )}
                        />

                        <label className={classNames({ "p-error": errors.startDate })}>Start Date </label>
                    </span>
                    {getFormErrorMessage('startDate')}
                </div>
                <div className='h-[85px]'>

                    <span className="p-float-label">
                        <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: "End Date is required", validate: isMaxDate }}
                            render={({ field }
                            ) => (
                                <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />
                            )}
                        />
                        <label className={classNames({ "p-error": errors.endDate })}>End Date
                        </label>
                    </span>
                    {errors.endDate && errors.endDate.type === "validate" && (
                        <small className="p-error">Start date must be greater than end date</small>
                    )}
                    {getFormErrorMessage('endDate')}
                </div>
                <div className='h-[85px]' >

                    <Button label="Search" icon="pi pi-search" type='submit' />
                </div>
            </form>
        </div>
    </>
}
