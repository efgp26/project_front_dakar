import { Injectable } from '@angular/core';
import { DeleteUserByIdService } from '../../components/user/services/deleteUserByIdServices/delete-user-by-id.service';
import { DeleteBikeByIdService } from '../../components/bike/services/deleteBikeById/delete-bike-by-id.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteElementService {
  constructor(
    private apiDeleteUser: DeleteUserByIdService,
    private apiDeleteBike: DeleteBikeByIdService
  ) {}

  async deleteUser(id: number): Promise<any> {
    let data = await this.apiDeleteUser.DeleteUserById(id);
    return data.success;
  }

  async deleteBike(id: number): Promise<any> {
    let data = await this.apiDeleteBike.DeleteBikeById(id);
    return data.success;
  }
}
