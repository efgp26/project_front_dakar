import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteTypeService {

  private URLLOCAL = environment.urlApiLocal;

  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async DeleteTypeServiceById(idBike: number): Promise<ResponseEntity<1>> {
    let direccion = this.URLLOCAL + "/api/typeService/delete/" + idBike;
    const token = this.storageService.getItem('token');
  
    console.log(token);
    console.log(direccion);
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  
    try {
      // Convert the Observable to a Promise and await its resolution
      const response$ = this.http.delete<ResponseEntity<1>>(direccion, httpOptions);
    const response = await firstValueFrom(response$);
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error deleting bike:', error);
      throw error; // Re-throw the error if needed
    }
  }
}
