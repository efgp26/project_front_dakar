import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { MUser } from '../../../../models/MUser';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  

  PostCreateUser(MUser: MUser):Observable<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/user/save";
    console.log(direccion);
    console.log(MUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    console.log(httpOptions.headers, this.token)

    return this.http.post<ResponseEntity<1>>(direccion, MUser, httpOptions);

  }
}
