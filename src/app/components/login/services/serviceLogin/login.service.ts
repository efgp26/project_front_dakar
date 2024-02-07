import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
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

  async Login(Mlogin:MLogin):Promise<MResponse>{

    let direccion = this.URLLOCAL + "/login";
    console.log(direccion);
    console.log(Mlogin);

    try {
      // Convert the Observable to a Promise and await its resolution
      const response$ = this.http.post<MResponse>(direccion, Mlogin);
    const response = await firstValueFrom(response$);
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error deleting bike:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
