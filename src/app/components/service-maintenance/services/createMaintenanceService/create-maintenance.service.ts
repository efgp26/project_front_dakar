import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { MSerrvice } from '../../../../models/MService';

@Injectable({
  providedIn: 'root'
})
export class CreateMaintenanceService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  PostCreateMaintenance(MSerrvice: MSerrvice):Observable<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/services/save";
    console.log(MSerrvice);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    console.log(httpOptions.headers, this.token)

    return this.http.post<ResponseEntity<1>>(direccion, MSerrvice, httpOptions);

  }
}
