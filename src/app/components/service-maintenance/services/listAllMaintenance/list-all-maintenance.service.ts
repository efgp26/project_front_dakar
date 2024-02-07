import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListAllMaintenanceService {

  private URLLOCAL = environment.urlApiLocal;
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }


  async GetLisServices():Promise<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/services/listAll";
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
      const response$ = this.http.get<ResponseEntity<1>>(direccion, httpOptions);
    const response = await firstValueFrom(response$);
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error list all bike:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
