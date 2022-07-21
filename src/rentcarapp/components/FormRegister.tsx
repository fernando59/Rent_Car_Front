import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { Controller, useForm } from "react-hook-form";


export const FormRegister = () => {

    interface ILogin {
        name:string
        email: string
        password: string
        confirm_password:string
    }
    const defaultValues: ILogin = {
        name:'',
        email: '',
        password: '',
        confirm_password:''
    }

    const { control, formState: { errors }, handleSubmit, reset,watch } = useForm({ defaultValues });
    const password = useRef({});
    password.current = watch("password", "");

    const getFormErrorMessage = (name: any) => {
        const key = name as keyof ILogin
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };

    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    const passwordHeader = <h6>Pick a password</h6>;
    const onHandleSubmit = (data: any) => {
        console.log(data)

    }
    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off' className="p-fluid">

                <div className="field mt-10">
                    <span className="p-float-label">
                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name</label>
                    </span>
                    {getFormErrorMessage('name')}
                </div>
                <div className="field my-10">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <Controller name="email" control={control}
                            rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                            render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                        <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email</label>
                    </span>
                    {getFormErrorMessage('email')}
                </div>
                <div className="field my-4">
                    <span className="p-float-label">
                        <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                            <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.error })} header={passwordHeader} footer={passwordFooter} />
                        )} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password</label>
                    </span>
                    {getFormErrorMessage('password')}
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller name="confirm_password"   control={control} rules={{ validate:value=>value === password.current || "The passwords not match"  }} render={({ field, fieldState }) => (
                            <Password id={field.name} {...field} toggleMask feedback={false} className={classNames({ 'p-invalid': fieldState.error })}  />
                        )} />
                        <label htmlFor="confirm_password" className={classNames({ 'p-error': errors.confirm_password })}>Confirm Password</label>
                    </span>
                    {getFormErrorMessage('confirm_password')}
                </div>
                <Button label='Register' type='submit' />
            </form>
        </>
    )
}
