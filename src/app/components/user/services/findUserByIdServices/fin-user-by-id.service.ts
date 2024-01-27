import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinUserByIdService {

  private URLLOCAL = environment.urlApiLocal;

  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async GetUserById(idUser: number):Promise<Observable<ResponseEntity<1>>>{

    let direccion = this.URLLOCAL + "/api/user/findUserId/" + idUser;
    const token = this.storageService.getItem('token');

    console.log(token)
    console.log(direccion);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<ResponseEntity<1>>(direccion, httpOptions);

  }
}
