import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
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

  async PostCreateMaintenance(MSerrvice: MSerrvice):Promise<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/services/save";
    console.log(MSerrvice);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    try {
      // Convert the Observable to a Promise and await its resolution
      const response$ = this.http.post<ResponseEntity<1>>(direccion, MSerrvice, httpOptions);
    const response = await firstValueFrom(response$);
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error creating service:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
