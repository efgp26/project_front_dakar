import { MUser } from "./MUser"

export interface MBike{

    id: number;
    licensePlate: string;
    displacement: string ;
    dateModel: string;
    brand: string;
    reference: string;
    mileage: string;
    dataCreate: Date;
    userEntity: MUser;
}