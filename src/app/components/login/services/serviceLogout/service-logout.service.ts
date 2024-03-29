import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MResponse } from '../../../../models/MResponse';
import { StorageService } from '../../../../services/storage/storage.service';
import { firstValueFrom } from 'rxjs';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogoutService {

  private URLLOCAL = environment.urlApiLocal;
  
  constructor(private http:HttpClient, private storageService: StorageService, private router: Router)
  { }

  async Logout():Promise<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/logout";
    console.log(direccion);
    const token = this.storageService.getItem('token');

    console.log(token)
    console.log(direccion);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    try {
      // Convert the Observable to a Promise and await its resolution
      const response$ = this.http.post<ResponseEntity<1>>(direccion,null,httpOptions);
    const response = await firstValueFrom(response$);
    console.log(response);
    if(response == null){
      this.router.navigate(['/login']);
    }
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error logout:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
