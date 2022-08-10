import { IBrand } from "./Brand"
import { IModelVehicle } from "./ModelVehicle"
import { ITypeVehicle } from "./TypeVehicle"


export interface IVehicleForm{
    id?:number
    plate:string  
    capacity?:number
    price?:number  
    state:number 
    year?:number  
    description?:string
    hasAir:boolean  
    brandVehicleId:number
    modelVehicleId:number
    typeVehicleId:number
    imagePath?: Blob
}


export interface IVehicle{
    plate:string | null
    capacity:number
    price:number | null
    state:number 
    year:number | null
    description:string | null
    hasAir:boolean | null
    modelVehicle:IModelVehicle | null
    brandVehicle:IBrand | null
    typeVehicle:ITypeVehicle | null
}