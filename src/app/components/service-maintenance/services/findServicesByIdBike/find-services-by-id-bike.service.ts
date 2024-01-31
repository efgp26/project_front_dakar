import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Observable } from 'rxjs';
import { MSerrvice } from '../../../../models/MService';

@Injectable({
  providedIn: 'root'
})
export class FindServicesByIdBikeService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async getListServicesByIdBike(id: number):Promise<Observable<ResponseEntity<1>>>{

    let direccion = this.URLLOCAL + "/api/services/listServiceByIdBike/"+id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    return this.http.get<ResponseEntity<1>>(direccion,  httpOptions);

  }
}
