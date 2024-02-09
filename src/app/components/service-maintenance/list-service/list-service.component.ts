import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { ModalDeleteComponent } from '../../../ux/modal-delete/modal-delete.component';
import { MSerrvice } from '../../../models/MService';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { Router } from '@angular/router';
import { ActivateModalDeleteService } from '../../../services/activateModalDelete/activate-modal-delete.service';
import { PaginationService } from '../../../services/paginationService/pagination.service';

@Component({
  selector: 'app-list-service',
  standalone: true,
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css',
  imports: [SidebarComponent, ModalDeleteComponent],
})
export class ListServiceComponent implements OnInit {
  currentPage = 1;
  totalPages: number = 0;
  itemsPerPage = 5;
  startPage: number = 1;
  endPage: number = 2;
  paginatedData: MSerrvice[] = [];

  mListServicesPersist: MSerrvice[] = [];
  mListServices: MSerrvice[] = [];

  constructor(
    private allListServices: AllListService,
    private router: Router,
    private activateModalDelete: ActivateModalDeleteService,
    private paginationService: PaginationService
  ) {}

  getAllServices() {
    this.allListServices.loadListAllServices();
    this.allListServices.listAllServices$.subscribe((data: MSerrvice[]) => {
      this.mListServices = data;
      this.mListServicesPersist = data;
      this.updatePaginatedData();
      console.log(data);
    });
  }

  updatePaginatedData() {
    this.totalPages = this.mListServices.length / this.itemsPerPage;
    [this.paginatedData, this.startPage, this.endPage] =
      this.paginationService.updatePaginatedData(
        this.mListServices,
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

  /*  updatePaginatedData() {
    this.totalPages = this.mListServices.length / this.itemsPerPage;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.startPage = start + 1;
    const end = Math.min(start + this.itemsPerPage, this.mListServices.length);
    this.endPage = end;
    this.paginatedData = this.mListServices.slice(start, end);
  }

  onPageChange(page: number) {
    if(page < 1) {
      page = 1;
    }
    if(page > this.totalPages+1) {
        return;
    }
    else{
        this.currentPage = page;
    this.updatePaginatedData();
    }
  } */

  filter(event: any) {
    event = event.target.value;
    this.mListServices = this.mListServicesPersist;
    if (event) {
      let searchTerm = event.toLowerCase();
      this.mListServices = this.mListServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm) ||
          service.bikeEntity.licensePlate.toLowerCase().includes(searchTerm) ||
          service.departureDate.toString().includes(searchTerm)
      );
      this.updatePaginatedData();
    }
  }

  redirection(id: number) {
    this.router.navigate(['/detail-service', id]);
  }

  async deleteService(id: number) {
    let type = 'Service';
    this.activateModalDelete.activateModal(id, type);
  }

  ngOnInit(): void {
    this.getAllServices();
  }
}
