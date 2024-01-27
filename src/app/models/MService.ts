import { MBike } from "./MBike";
import { MUser } from "./MUser";

export interface MSerrvice {

    id: number;
    name: string;
    description: string;
    dateAdmission: Date;
    payment: number;
    valueService: number;
    stade: boolean;
    departureDate: Date; 
    bikeEntity: MBike;
    userEntity: MUser;
}