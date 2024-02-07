import { Injectable } from '@angular/core';
import { ListAllBikeService } from '../../components/bike/services/listAllBikeService/list-all-bike.service';
import { ListUserService } from '../../components/user/services/listUserServices/list-user.service';
import { ListUsserByRolService } from '../../components/user/services/listUserByRolService/list-usser-by-rol.service';
import { Subject } from 'rxjs';
import { FinUserByIdService } from '../../components/user/services/findUserByIdServices/fin-user-by-id.service';
import { FindBikeByIdService } from '../../components/bike/services/findBikeByid/find-bike-by-id.service';
import { FindServicesByIdBikeService } from '../../components/service-maintenance/services/findServicesByIdBike/find-services-by-id-bike.service';
import { FindServiceByIdService } from '../../components/service-maintenance/services/findServiceById/find-service-by-id.service';
import { DeleteBikeByIdService } from '../../components/bike/services/deleteBikeById/delete-bike-by-id.service';

@Injectable({
  providedIn: 'root',
})
export class AllListService {
  private _listAllUsers$ = new Subject<any>();
  private _userById$ = new Subject<any>();
  private _bikeById$ = new Subject<any>();
  private _findServiceByIdBike$ = new Subject<any>();
  private _findServiceById$ = new Subject<any>();
  private _listAllBikes$ = new Subject<any>();

  constructor(
    private apiListAllUsers: ListUserService,
    private apiFindUserById: FinUserByIdService,
    private apiFindBikeById: FindBikeByIdService,
    private apiFindServiceByIdBike: FindServicesByIdBikeService,
    private apiFindServiceById: FindServiceByIdService,
    private apiListAllBikes: ListAllBikeService
  ) {}

  async loadListAllUsers() {
    let data = await this.apiListAllUsers.GetListUser();
    this._listAllUsers$.next(data.data);
  }

  get listAllUsers$() {
    return this._listAllUsers$.asObservable();
  }

  async loadUserById(id: number){
    (await this.apiFindUserById.GetUserById(id)).subscribe( data=>{
      this._userById$.next(data.data);
    });
  }

  get userById$() {
    return this._userById$.asObservable();
  }

  async loadBikeById(id: number){
    (await this.apiFindBikeById.GetBikeById(id)).subscribe(data=>{
      this._bikeById$.next(data.data);
    });
  }

  get bikeById$() {
    return this._bikeById$.asObservable();
  }

  async loadServiceByIdbike(id: number) {
    (await this.apiFindServiceByIdBike.getListServicesByIdBike(id)).subscribe(data =>{
      this._findServiceByIdBike$.next(data.data);
    });
  }

  get serviceByIdBike() {
    return this._findServiceByIdBike$.asObservable();
  }

  async loadServiceById(id: number) {
    (await this.apiFindServiceById.getServicesById(id)).subscribe(data =>{
      this._findServiceById$.next(data.data);
    });
  }

  get serviceById$() {
    return this._findServiceById$.asObservable();
  }

  async loadListAllBikes() {
    let data = await this.apiListAllBikes.GetListBikes();
    this._listAllBikes$.next(data.data);
    console.log(data.data);
  }

  get listAllBikes$() {
    return this._listAllBikes$.asObservable();
  }
}
