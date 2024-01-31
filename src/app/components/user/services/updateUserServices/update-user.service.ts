import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Observable } from 'rxjs';
import { MUser } from '../../../../models/MUser';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  

  PutUpdateUser(MUser: MUser, id: number):Observable<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/user/udpate/"+id;
    console.log(direccion);
    console.log(MUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    console.log(httpOptions.headers, this.token)

    return this.http.put<ResponseEntity<1>>(direccion, MUser, httpOptions);

  }
}
