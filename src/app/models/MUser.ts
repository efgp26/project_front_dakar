import { MBike } from "./MBike"

export interface MUser{
    id: number,
    email: string,
    password: string,
    name: string,
    lastName:string,
    numbrePhone: string,
    roles: string[],
    bikeEntityList: MBike[]
}