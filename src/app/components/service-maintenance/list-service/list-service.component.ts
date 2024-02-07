import { Component } from '@angular/core';
import { SidebarComponent } from "../../../ux/sidebar/sidebar.component";
import { ModalDeleteComponent } from "../../../ux/modal-delete/modal-delete.component";

@Component({
    selector: 'app-list-service',
    standalone: true,
    templateUrl: './list-service.component.html',
    styleUrl: './list-service.component.css',
    imports: [SidebarComponent, ModalDeleteComponent]
})
export class ListServiceComponent {

}
