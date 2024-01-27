import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { MResponse } from '../../../../models/MResponse';
import { MLogin } from '../../../../models/MLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URLLOCAL = environment.urlApiLocal;
  
  constructor(private http:HttpClient)
  { }

  Login(Mlogin:MLogin):Observable<MResponse>{

    let direccion = this.URLLOCAL + "/login";
    console.log(direccion);
    console.log(Mlogin);

    return this.http.post<MResponse>(direccion, Mlogin);

  }

  async prueba():Promise<Observable<any>>{

    let direccion = this.URLLOCAL + "/api/user/listAllUsers";
    console.log(direccion);
    
    return this.http.get<any>(direccion);


  }
}
