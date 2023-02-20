import { Crops } from "../farmer-dashboard/farmer-dashboard";

export class Farmer {
    farmerId:string = '';
	farmerName:string = '';
	farmeremail:string = '';
	farmerContactNo:string = '';
	farmerAddress:string = '';
	bankDetails:string = '';
	crops:Crops[] =[];
}