import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ListUsserByRolService {

  private URLLOCAL = environment.urlApiLocal;

 
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }


  GetListUserByRol(idRole: string):Observable<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/user/listUserByRole/" + idRole;
    const token = this.storageService.getItem('token');

    console.log(token)
    console.log(direccion);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    console.log(httpOptions.headers)

    return this.http.get<ResponseEntity<1>>(direccion, httpOptions);

  }
}