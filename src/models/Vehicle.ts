import { IBrand } from "./Brand"
import { IModelVehicle } from "./ModelVehicle"
import { ITypeVehice } from "./TypeVehicle"


export interface IVehicleForm{
    id?:number
    plate:string  
    capacity?:number
    price?:number  
    state:number 
    year?:number  
    hasAir:boolean  
    brandVehicle:number
    modelVehicle:number
    typeVehicle:number
}


export interface IVehicle{
    plate:string | null
    capacity:number
    price:number | null
    state:number 
    year:number | null
    hasAir:boolean | null
    modelVehicle:IModelVehicle
    brandVehicle:IBrand
    typeVehicle:ITypeVehice
}