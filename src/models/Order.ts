export interface Order{
    days:number
    price:number
    status:number
    VehicleId:number
}

export interface OrderCreate{
    startDate:Date
    endDate:Date
    VehicleId:number
}