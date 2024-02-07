import { Component, OnInit } from '@angular/core';
import { ActivateModalDeleteService } from '../../services/activateModalDelete/activate-modal-delete.service';
import { IDeleteModal } from '../../models/IDeleteModal';
import { DeleteElementService } from '../../services/deleteElements/delete-element.service';
import { AllListService } from '../../services/allListServices/all-list.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent implements OnInit {

  activate: boolean = false;
  iDeleteModal: IDeleteModal = {} as IDeleteModal;

  constructor(
    private activateModal: ActivateModalDeleteService,
    private apiDelete: DeleteElementService,
    private allListService: AllListService
    ){}

  changeStade(){
    this.activate = !this.activate;
  }

  async delete(){
    let type = this.iDeleteModal.type;
    if(type == "Bike"){
      let prueba = (await this.apiDelete.deleteBike(this.iDeleteModal.id));
      console.log(prueba);
      
      this.allListService.loadListAllBikes();
      
      
    }
    else if(type == "User"){
      (await this.apiDelete.deleteUser(this.iDeleteModal.id));
      this.allListService.loadListAllUsers();
    }
    else if(type == "Service"){
      console.log("eliminando servicio")
    }
    this.activateModal.deactivateModal();
    
  }

  ngOnInit(): void {
    this.activateModal.getModalState.subscribe(stade=>{
      this.iDeleteModal = stade;
      this.activate = this.iDeleteModal.activate;
    });
  }

}
