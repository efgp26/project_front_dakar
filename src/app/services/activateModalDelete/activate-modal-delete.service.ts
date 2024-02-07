import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDeleteModal } from '../../models/IDeleteModal'; 

@Injectable({
  providedIn: 'root'
})
export class ActivateModalDeleteService {

  private _stadeModal$ = new Subject<any>();
  typeComponents: IDeleteModal = {} as IDeleteModal;


  activateModal(id: number, type: string){
    this.typeComponents.id = id;
    this.typeComponents.type = type;
    this.typeComponents.activate = true;
    this._stadeModal$.next(this.typeComponents);
  }

  deactivateModal(){  
    this.typeComponents.activate = false;
    this.typeComponents.id = 0;
    this.typeComponents.type = "";
    this._stadeModal$.next(this.typeComponents);
  }

  get getModalState(){
    return this._stadeModal$.asObservable();
  }
}
