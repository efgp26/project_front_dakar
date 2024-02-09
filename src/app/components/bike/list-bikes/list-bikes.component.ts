import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebarComponent } from "../../../ux/sidebar/sidebar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MBike } from '../../../models/MBike';
import { Router } from '@angular/router';
import { DeleteBikeByIdService } from '../services/deleteBikeById/delete-bike-by-id.service';
import { ModalDeleteComponent } from "../../../ux/modal-delete/modal-delete.component";
import { ActivateModalDeleteService } from '../../../services/activateModalDelete/activate-modal-delete.service';
import { PaginationService } from '../../../services/paginationService/pagination.service';

@Component({
    selector: 'app-list-bikes',
    standalone: true,
    templateUrl: './list-bikes.component.html',
    styleUrl: './list-bikes.component.css',
    imports: [SidebarComponent, ReactiveFormsModule, ModalDeleteComponent]
})
export class ListBikesComponent {

  currentPage = 1;
  totalPages: number = 0;
  itemsPerPage = 5;
  startPage: number = 1;
  endPage: number = 2;
  paginatedData: MBike[] = [];

  mListBikes: MBike[]= [];
  mListBikesPersist: MBike[]= [];

  constructor(
    private allListService: AllListService,
    private apiDeleteBikeById: DeleteBikeByIdService,
    private router: Router,
    private renderer: Renderer2, private el: ElementRef,
    private activateModalDelete: ActivateModalDeleteService,
    private paginationService: PaginationService,
  ){}

  getBikes(){
    this.allListService.loadListAllBikes();
    console.log("estamos aca")
    this.allListService.listAllBikes$.subscribe(data=>{
      this.mListBikesPersist = data;
      this.mListBikes = data;
      this.updatePaginatedData();
    });
  }

  updatePaginatedData() {
    this.totalPages = this.mListBikes.length / this.itemsPerPage;
    [this.paginatedData, this.startPage, this.endPage] =
      this.paginationService.updatePaginatedData(
        this.mListBikes,
        this.currentPage
      );
  }

  onPageChange(page: number) {
    this.currentPage = this.paginationService.onPageChange(
      page,
      this.totalPages
    );
    this.updatePaginatedData();
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
      this.updatePaginatedData();
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
