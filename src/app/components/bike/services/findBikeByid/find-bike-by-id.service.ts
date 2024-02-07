import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindBikeByIdService {

  private URLLOCAL = environment.urlApiLocal;

  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async GetBikeById(idBike: number):Promise<Observable<ResponseEntity<1>>>{

    let direccion = this.URLLOCAL + "/api/bike/findBikeId/" + idBike;
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
      return  this.http.get<ResponseEntity<1>>(direccion, httpOptions);
    
    } catch (error) {
      // Handle any errors here
      console.error('Error deleting bike:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
