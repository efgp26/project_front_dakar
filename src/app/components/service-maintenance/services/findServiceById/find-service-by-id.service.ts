import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../services/storage/storage.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseEntity } from '../../../../models/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class FindServiceByIdService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async getServicesById(id: number):Promise<Observable<ResponseEntity<1>>>{

    let direccion = this.URLLOCAL + "/api/services/findServiceId/"+id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    try {
      // Convert the Observable to a Promise and await its resolution
      return this.http.get<ResponseEntity<1>>(direccion,  httpOptions);
    
    } catch (error) {
      // Handle any errors here
      console.error('Error findin services By id bike:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
