import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useGetBrandsQuery } from '../../store/apis';
import { searchBrandVehicle } from '../../store/slices';


interface IReservation {
    brand: any
    startDate: any
    endDate: any
}



export const Reservation = () => {

    const navigate = useNavigate();

    const { valueSearch } = useSelector((state: any) => state.vehicle)
    const dispatch = useDispatch()


    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            brand: null,
            startDate: undefined,
            endDate: undefined,
        }
    });



    //const {data:vehicles} = useGetVehiclesFilterQuery({brandId:get,modelId:0,page:1,quantity:10,typeVehicleId:0})
    const { data } = useGetBrandsQuery()



    useEffect(() => {

        if (localStorage.getItem('searchVehicle')) {
            console.log('exist')
        }
    }, [])




    const onHandleSubmit = (data: any) => {

        dispatch(searchBrandVehicle(data))

        navigate("/vehicleModel", { replace: true });
    }


    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IReservation
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };


    return <>

        <h2 className='text-6xl font-bold text-center py-10'>Find Best Vehicles</h2>
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
                            rules={{ required: "End Date is required" }}
                            render={({ field }
                            ) => (
                                <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon />
                            )}
                        />
                        <label className={classNames({ "p-error": errors.endDate })}>End Date
                        </label>
                    </span>
                    {getFormErrorMessage('endDate')}
                </div>
                <div className='h-[85px]'>

                    <Button label="Search" icon="pi pi-search" type='submit' />
                </div>
            </form>
        </div>
    </>
}
