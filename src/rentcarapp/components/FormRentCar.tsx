import classNames from "classnames";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../store/apis";

interface Props {
    dailyRate?: number
    vehicleId?:number
}
export const FormRentCar: FC<Props> = ({ dailyRate = 0,vehicleId=0 }) => {
    const { control, formState: { errors }, handleSubmit, setValue, getValues } = useForm({});
    const [createOrder]=useCreateOrderMutation()
    const navigate = useNavigate()
    const [state, setState] = useState({
        total: 0,
        days: 0,
        dailyRate
    })
    const onHandleSubmitRentCar = async (data: any) => {
        data.VehicleId =vehicleId
        const res =await createOrder(data).unwrap()
        const {success} = res
        console.log(res)
        if(success){
            navigate('/history')

        }else{

        }
        

    }

    // const getFormErrorMessage = (name: any) => {
    //     const key = name as keyof IBrand
    //     return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    // };
    useEffect(() => {
        const item = localStorage.getItem('startDate')
        let startDate = item ? JSON.parse(item) : null

        const item2 = localStorage.getItem('endDate')
        let endDate = item2 ? JSON.parse(item2) : null

        if (startDate != null && endDate != null) {

            startDate = new Date(startDate)
            endDate = new Date(endDate)
            let days = endDate.getDate() - startDate.getDate()
            setValue('startDate', startDate)
            setValue('endDate', endDate)
            setState({ ...state, days: days, total: days * state.dailyRate })
        }


    }, [setValue])

    const handleStartDate = (e: any) => {
        const value = e.value
        let endDate =getValues('endDate')

        let days = endDate.getDate() - value.getDate()
        if(days===0) days =1
        if(days<0) days =0 
        setValue('startDate', value)
        setState({ ...state, days: days, total: days * state.dailyRate })
    }
    const handleEndDate = (e: any) => {
        const value = e.value
        let startDate =getValues('startDate')

        let days = value.getDate() - startDate.getDate()
        if(days==0) days =1
        if(days<0) days =0 
        
        setValue('endDate', value)
        setState({ ...state, days: days, total: days * state.dailyRate })
    }

    return (
        <form onSubmit={handleSubmit(onHandleSubmitRentCar)} autoComplete='off' className="p-fluid">


            <div className='h-[85px]'>

                <span className="p-float-label">
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: "Start Date is required" }}
                        render={({ field }
                        ) => (
                            <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={handleStartDate} dateFormat="dd/mm/yy" showIcon />
                        )}
                    />

                    <label className={classNames({ "p-error": errors.startDate })}>Start Date </label>
                </span>
                {/* {getFormErrorMessage('startDate')} */}
            </div>

            <div className='h-[85px]'>

                <span className="p-float-label">
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: "End Date is required" }}
                        render={({ field }
                        ) => (
                            <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={handleEndDate} dateFormat="dd/mm/yy" showIcon />
                        )}
                    />
                    <label className={classNames({ "p-error": errors.endDate })}>End Date
                    </label>
                </span>
                {/* {getFormErrorMessage('endDate')} */}
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputText disabled value={state.days} style={{background:'#F8F8F8'}} />
                        <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>Days</label>
                    </span>
                    {/* {getFormErrorMessage('name')} */}
                </div>
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputText disabled value={state.dailyRate} style={{background:'#F8F8F8'}} />
                        <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>Daily Rate</label>
                    </span>
                    {/* {getFormErrorMessage('name')} */}
                </div>
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputText disabled value={state.total} style={{background:'#F8F8F8'}} />
                        <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>Total</label>
                    </span>
                    {/* {getFormErrorMessage('name')} */}
                </div>
            </div>

            <div className="flex gap-4 w-full justify-end ">
                <div className="grow-0">

                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" type="button" />
                </div>
                <div className="grow-0">

                    <Button label="Rent" icon="pi pi-check" className="p-button-text" type='submit' />
                </div>
            </div>

        </form>
    )
}
