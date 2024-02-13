import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../services/storage/storage.service';
import { ResponseEntity } from '../../../../models/ResponseEntity';
import { MTypeServices } from '../../../../models/MTypeServices';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTypeService {

  private URLLOCAL = environment.urlApiLocal;

  private token = this.storageService.getItem('token');
  
  constructor(private http:HttpClient, private storageService: StorageService)
  { }

  async PostCreateTypeServices(MUser: MTypeServices):Promise<ResponseEntity<1>>{

    let direccion = this.URLLOCAL + "/api/typeService/save";
    console.log(direccion);
    console.log(MUser);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    try {
      // Convert the Observable to a Promise and await its resolution
      const response$ = this.http.post<ResponseEntity<1>>(direccion, MUser, httpOptions);
    const response = await firstValueFrom(response$);
      return response;
    } catch (error) {
      // Handle any errors here
      console.error('Error saving type Services:', error);
      throw error; // Re-throw the error if needed
    }

  }
}
