import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
 
export const ListTypeVehicle = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
            fetchTypeVehicle()
    }, [])
    const fetchTypeVehicle =async()=>{
        try{
            const res = await fetch(`https://localhost:7077/api/typevehicle`)
            const data = await res.json()
            console.log(data)
            setProducts(data)
        }catch(e){

        }

    }
  return <>
    <DataTable value={products} stripedRows responsiveLayout="scroll">
            <Column field="id" header="Id"></Column>
            <Column field="name" header="Name"></Column>
        </DataTable>
  </>
}
