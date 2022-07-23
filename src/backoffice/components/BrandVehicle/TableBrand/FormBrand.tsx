import classNames from "classnames";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { IBrand } from "../../../../models/Brand";


interface Props {
    onHandleSubmitSaveBrand: (data: IBrand) => void
    closeModalUpdate: () => void
    defaultValues:IBrand
}


export const FormBrand: FC<Props> = ({ onHandleSubmitSaveBrand, closeModalUpdate,defaultValues }) => {

    const { control, formState: { errors }, handleSubmit} = useForm({ defaultValues });

    const getFormErrorMessage = (name: any) => {
        const key = name as keyof IBrand
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };

    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmitSaveBrand)} autoComplete='off' className="p-fluid">


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
