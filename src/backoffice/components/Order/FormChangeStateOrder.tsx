import classNames from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateOrderMutation } from "../../../store/apis";

interface Props {
    status: number
    idOrder?:number
    closeSideBar:()=>void
}
export const FormChangeStateOrder: FC<Props> = ({ status,idOrder=0,closeSideBar }) => {

    const [updateOrder] = useUpdateOrderMutation()
    const { control, formState: { errors }, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            status,
            id:idOrder
        }
    });
    const onHandleSubmit = async (data: any) => {
        try{
        const res = await updateOrder(data).unwrap()
        const {success} = res
        if(success){
            closeSideBar()

        }

        }catch(e){
            console.error(e)
        }

    }
    const data = [
        {
            id: 0,
            name: 'Canceled'
        },
        {
            id: 1,
            name: 'Pending'
        },
        {
            id: 2,
            name: 'Confirmed'
        },
        {
            id: 3,
            name: 'Finished'
        },
    ]
    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className="mt-20" >

                <span className="p-float-label mb-4">
                    <Controller
                        control={control}
                        name="status"
                        rules={{ required: "Brand is required", }}
                        render={({ field }
                        ) => (
                            <Dropdown
                                className='w-full min-w-[250px] capitalize'
                                disabled={status !=1 && status !=2}
                                id={field.name}
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                options={data}
                                optionValue="id"
                                optionLabel="name" />
                        )}
                    />
                    <label className={classNames({ "p-error": errors.status})}>Status </label>
                </span>
                <Button  label="Save" style={{width:'100%'}} disabled={status !=1 && status !=2}/>
            </form>
        </>
    )
}
