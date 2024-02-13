import { Injectable } from '@angular/core';
import { DeleteUserByIdService } from '../../components/user/services/deleteUserByIdServices/delete-user-by-id.service';
import { DeleteBikeByIdService } from '../../components/bike/services/deleteBikeById/delete-bike-by-id.service';
import { DeleteServiceByIdService } from '../../components/service-maintenance/services/deleteServiceById/delete-service-by-id.service';
import { DeleteTypeService } from '../../components/type-service/serivces/deleteTypeServices/delete-type.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteElementService {
  constructor(
    private apiDeleteUser: DeleteUserByIdService,
    private apiDeleteBike: DeleteBikeByIdService,
    private apiDeleteService: DeleteServiceByIdService,
    private apiDeleteMaintenance: DeleteTypeService
  ) {}

  async deleteUser(id: number): Promise<any> {
    let data = await this.apiDeleteUser.DeleteUserById(id);
    return data.success;
  }

  async deleteBike(id: number): Promise<any> {
    let data = await this.apiDeleteBike.DeleteBikeById(id);
    return data.success;
  }

  async deleteService(id: number): Promise<any> {
    let data = await this.apiDeleteService.DeleteServicesById(id);
    return data.success;
  }

  async deleteMaintenance(id: number): Promise<any> {
    let data = await this.apiDeleteMaintenance.DeleteTypeServiceById(id);
    return data.success;
  }
}
