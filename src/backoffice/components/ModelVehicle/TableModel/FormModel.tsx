import classNames from "classnames";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { IModelVehicle } from "../../../../models";

interface Props {
    onHandleSubmitSaveModel: (data: IModelVehicle) => void
    closeModalUpdate: () => void
    defaultValues:IModelVehicle
}

export const FormModel:FC<Props> = ({ onHandleSubmitSaveModel, closeModalUpdate,defaultValues }) => {
    
    const { control, formState: { errors }, handleSubmit} = useForm({ defaultValues });

    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IModelVehicle
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };

    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmitSaveModel)} autoComplete='off' className="p-fluid">


                <div className="field">

                    <div className="field my-10">
                        <span className="p-float-label p-input-icon-right">
                            <Controller name="name" control={control}
                                rules={{ required: 'Name is required.' }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                )} />
                            <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>Name</label>
                        </span>
                        {getFormErrorMessage('name')}
                    </div>
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
