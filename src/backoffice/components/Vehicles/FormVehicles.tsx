import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const FormVehicles = () => {
    const [city,setCity] = useState()
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <>


            <div className="field my-10">
                <span className="p-float-label p-input-icon-right">
                    <InputText onChange={() => { }} required autoFocus />
                    <label htmlFor="name">Quantity</label>
                    {/* <label htmlFor="name" className={classNames({ 'p-error': !!errors.name })}>Name</label> */}
                </span>
            </div>
            <Dropdown optionLabel="name" filterBy="name" filter showClear value={city} options={cities} onChange={(e) => setCity(e.value)} placeholder="Select a City" />
        </>
    )
}
