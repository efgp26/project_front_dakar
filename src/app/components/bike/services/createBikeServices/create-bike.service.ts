import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { MBike } from '../../../../models/MBike';


@Injectable({
  providedIn: 'root'
})
export class CreateBikeService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  PostCreateBike(MUser: MBike):Observable<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/bike/save";
    console.log(direccion);
    console.log(MUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    console.log(this.token)

    return this.http.post<ResponseEntity<1>>(direccion, MUser, httpOptions);

  }
}
