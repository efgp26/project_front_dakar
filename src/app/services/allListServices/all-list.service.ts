import { Injectable } from '@angular/core';
import { ListAllBikeService } from '../../components/bike/services/listAllBikeService/list-all-bike.service';
import { ListUserService } from '../../components/user/services/listUserServices/list-user.service';
import { ListUsserByRolService } from '../../components/user/services/listUserByRolService/list-usser-by-rol.service';
import { Subject } from 'rxjs';
import { FinUserByIdService } from '../../components/user/services/findUserByIdServices/fin-user-by-id.service';

@Injectable({
  providedIn: 'root',
})
export class AllListService {

  private _listAllUsers$ = new Subject<any>();
  private _userById$ = new Subject<any>();

  constructor(
    private apiListAllBike: ListAllBikeService,
    private apiListAllUsers: ListUserService,
    private apiListUsersByRol: ListUsserByRolService,
    private apiFindUserById: FinUserByIdService
  ) {}

  loadListAllUsers(){
    this.apiListAllUsers.GetListUser().subscribe(data=>{
      this._listAllUsers$.next(data.data);
    });
  }

  get listAllUsers$(){
    return this._listAllUsers$.asObservable();
  }

  async loadUserById(id: number){
    (await this.apiFindUserById.GetUserById(id)).subscribe( data=>{
      this._userById$.next(data.data);
    });
  }

  get userById$(){
    return this._userById$.asObservable();
  }
}
