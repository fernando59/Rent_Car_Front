import classNames from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    status: number
}
export const FormChangeStateOrder: FC<Props> = ({ status }) => {

    const { control, formState: { errors }, handleSubmit, reset, watch } = useForm({

        defaultValues: {
            status
        }
    });
    const onHandleSubmit = (data: any) => {
        console.log(data)
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
                <Button  label="Save" style={{width:'100%'}}/>
            </form>
        </>
    )
}
