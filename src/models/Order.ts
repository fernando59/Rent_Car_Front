import { IVehicle } from "./Vehicle"

export interface Order{
    id?:number
    days:number
    price:number
    status:number
    VehicleId:number
    startDate?:string
    endDate?:string
    vehicle?:IVehicle
}

export interface OrderCreate{
    startDate:Date
    endDate:Date
    VehicleId:number
}