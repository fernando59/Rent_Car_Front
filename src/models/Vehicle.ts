

export interface IVehicleForm{
    plate:string  
    capacity?:number
    price?:number  
    state:number 
    year?:number  
    hasAir:boolean  
}


export interface IVehicle{
    plate:string | null
    capacity:number
    price:number | null
    state:number 
    year:number | null
    hasAir:boolean | null
}