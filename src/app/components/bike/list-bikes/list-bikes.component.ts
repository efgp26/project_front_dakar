import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebarComponent } from "../../../ux/sidebar/sidebar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MBike } from '../../../models/MBike';
import { Router } from '@angular/router';
import { DeleteBikeByIdService } from '../services/deleteBikeById/delete-bike-by-id.service';
import { ModalDeleteComponent } from "../../../ux/modal-delete/modal-delete.component";
import { ActivateModalDeleteService } from '../../../services/activateModalDelete/activate-modal-delete.service';

@Component({
    selector: 'app-list-bikes',
    standalone: true,
    templateUrl: './list-bikes.component.html',
    styleUrl: './list-bikes.component.css',
    imports: [SidebarComponent, ReactiveFormsModule, ModalDeleteComponent]
})
export class ListBikesComponent {

  mListBikes: MBike[]= [];
  mListBikesPersist: MBike[]= [];

  constructor(
    private allListService: AllListService,
    private apiDeleteBikeById: DeleteBikeByIdService,
    private router: Router,
    private renderer: Renderer2, private el: ElementRef,
    private activateModalDelete: ActivateModalDeleteService
  ){}

  getBikes(){
    this.allListService.loadListAllBikes();
    console.log("estamos aca")
    this.allListService.listAllBikes$.subscribe(data=>{
      this.mListBikesPersist = data;
      this.mListBikes = data;
    });
  }

  filter(event: any) {
    event = event.target.value;
    this.mListBikes = this.mListBikesPersist;
    if (event) {
      let searchTerm = event.toLowerCase();
      this.mListBikes = this.mListBikes.filter(
        (bike) =>
          bike.licensePlate.toLowerCase().includes(searchTerm)        
      );
    }
  }

  redirection(id: number) {
    this.router.navigate(['/detail-bike', id]);
  }

  async deleteBike(id: number){
  /*  (await this.apiDeleteBikeById.DeleteBikeById(id)).subscribe(data=>{
     console.log(data);
   });*/
   let type = "Bike"
   this.activateModalDelete.activateModal(id, type);
  }

  ngOnInit(){ 
    this.getBikes();
  }



}
