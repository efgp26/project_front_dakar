import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../ux/sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTypeService } from './serivces/createTypeServices/create-type.service';
import { ModalDeleteComponent } from '../../ux/modal-delete/modal-delete.component';
import { MTypeServices } from '../../models/MTypeServices';
import { AllListService } from '../../services/allListServices/all-list.service';
import { PaginationService } from '../../services/paginationService/pagination.service';
import { ActivateModalDeleteService } from '../../services/activateModalDelete/activate-modal-delete.service';

@Component({
  selector: 'app-type-service',
  standalone: true,
  templateUrl: './type-service.component.html',
  styleUrl: './type-service.component.css',
  imports: [SidebarComponent, ReactiveFormsModule, ModalDeleteComponent],
})
export class TypeServiceComponent implements OnInit {
  currentPage = 1;
  totalPages: number = 0;
  itemsPerPage = 5;
  startPage: number = 1;
  endPage: number = 2;
  paginatedData: MTypeServices[] = [];

  mListTypeService: MTypeServices[] = [];
  mListTypeServicePersist: MTypeServices[] = [];
  mTypeService: MTypeServices = {} as MTypeServices;

  dataMaintenance = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
  });

  constructor(
    private apiCreateTypeService: CreateTypeService,
    private listAllServices: AllListService,
    private paginationService: PaginationService,
    private activateModalDelete: ActivateModalDeleteService
  ) {}

  async createTypeService() {
    this.mTypeService.name = this.dataMaintenance.value.name!;
    this.mTypeService.price = this.dataMaintenance.value.price!;
    let response = await this.apiCreateTypeService.PostCreateTypeServices(
      this.mTypeService
    );
    this.listAllServices.loadListAllTypeServices();
    console.log(response);
    if (response.status == 200) {
      alert('Type Service created successfully');
      this.dataMaintenance.reset();
    }
  }

  getListTypeServices() {
    this.listAllServices.loadListAllTypeServices();
    this.listAllServices.listAllTypeServices$.subscribe((data) => {
      this.mListTypeServicePersist = data;
      this.mListTypeService = data;
      this.updatePaginatedData();
    });
  }

  updatePaginatedData() {
    this.totalPages = this.mListTypeService.length / this.itemsPerPage;
    [this.paginatedData, this.startPage, this.endPage] =
      this.paginationService.updatePaginatedData(
        this.mListTypeService,
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
    this.mListTypeService = this.mListTypeServicePersist;
    if (event) {
      let searchTerm = event.toLowerCase();
      this.mListTypeService = this.mListTypeService.filter((service) =>
        service.name.toLowerCase().includes(searchTerm)
      );
      this.updatePaginatedData();
    }
  }

  async deleteTypeService(id: number) {
    let type = 'TypeService';
    this.activateModalDelete.activateModal(id, type);
  }

  ngOnInit(): void {
    this.getListTypeServices();
  }
}
