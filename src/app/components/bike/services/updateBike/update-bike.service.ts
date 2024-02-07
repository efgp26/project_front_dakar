import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { Observable, firstValueFrom } from 'rxjs';
import { MBike } from '../../../../models/MBike';

@Injectable({
  providedIn: 'root'
})
export class UpdateBikeService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async updateBike(MUser: MBike, id: number):Promise<Observable<ResponseEntity<1>>>{

    let direccion = this.URLLOCAL + "/api/bike/update/"+id;
    console.log(direccion);
    console.log(MUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    console.log(this.token)
    try {
      // Convert the Observable to a Promise and await its resolution
      return this.http.put<ResponseEntity<1>>(direccion, MUser, httpOptions);
    
    } catch (error) {
      // Handle any errors here
      console.error('Error deleting bike:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
