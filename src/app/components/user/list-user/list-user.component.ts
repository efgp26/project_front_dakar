import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { ListUserService } from '../services/listUserServices/list-user.service';
import { MUser } from '../../../models/MUser';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { DeleteUserByIdService } from '../services/deleteUserByIdServices/delete-user-by-id.service';
import { DeleteElementService } from '../../../services/deleteElements/delete-element.service';
import { ActivateModalDeleteService } from '../../../services/activateModalDelete/activate-modal-delete.service';
import { ModalDeleteComponent } from "../../../ux/modal-delete/modal-delete.component";
import { PaginationService } from '../../../services/paginationService/pagination.service';

@Component({
    selector: 'app-list-user',
    standalone: true,
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.css',
    imports: [SidebarComponent, RouterLink, ModalDeleteComponent]
})
export class ListUserComponent implements OnInit {

  currentPage = 1;
  totalPages: number = 0;
  itemsPerPage = 5;
  startPage: number = 1;
  endPage: number = 2;
  paginatedData: MUser[] = [];

  mListUsers: MUser[] = [];
  mListUsersPersist: MUser[] = [];

  constructor(
    private getLists: AllListService,
    private router: Router,
    private apiDeleteUser: DeleteUserByIdService,
    private activateModalDelete: ActivateModalDeleteService,
    private paginationService: PaginationService,
  ) {}

  listAllUsers() {
    this.getLists.loadListAllUsers();
    this.getLists.listAllUsers$.subscribe((data) => {
      this.mListUsersPersist = data;
      this.mListUsers = this.mListUsersPersist;
      this.updatePaginatedData();
    });
  }

  updatePaginatedData() {
    this.totalPages = this.mListUsers.length / this.itemsPerPage;
    [this.paginatedData, this.startPage, this.endPage] =
      this.paginationService.updatePaginatedData(
        this.mListUsers,
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
    this.mListUsers = this.mListUsersPersist;
    if (event) {
      let searchTerm = event.toLowerCase();
      this.mListUsers = this.mListUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm)
      );
      this.updatePaginatedData();
      console.log(this.mListUsers);
    }
  }

  redirection(id: number) {
    console.log(id);
    this.router.navigate(['/detail-user', id]);
  }

  async deleteUser(id: number) {
    let type = "User"
   this.activateModalDelete.activateModal(id, type);
  }
  

  ngOnInit(): void {
    this.listAllUsers();
  }
}
