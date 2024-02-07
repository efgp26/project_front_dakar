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

@Component({
    selector: 'app-list-user',
    standalone: true,
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.css',
    imports: [SidebarComponent, RouterLink, ModalDeleteComponent]
})
export class ListUserComponent implements OnInit {
  mListUsers: MUser[] = [];
  mListUsersPersist: MUser[] = [];

  constructor(
    private getLists: AllListService,
    private router: Router,
    private apiDeleteUser: DeleteUserByIdService,
    private activateModalDelete: ActivateModalDeleteService,
  ) {}

  listAllUsers() {
    this.getLists.loadListAllUsers();
    this.getLists.listAllUsers$.subscribe((data) => {
      this.mListUsersPersist = data;
      this.mListUsers = this.mListUsersPersist;
    });
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
      console.log(this.mListUsers);
    }
  }

  redirection(id: number) {
    console.log(id);
    this.router.navigate(['/detail-user', id]);
  }

  async deleteUser(id: number) {
  /*  let data = await this.apiDeleteUser.DeleteUserById(id);
    console.log(data.message);
    this.getLists.loadListAllUsers(); */

    let type = "User"
   this.activateModalDelete.activateModal(id, type);
  }
  

  ngOnInit(): void {
    this.listAllUsers();
  }
}
