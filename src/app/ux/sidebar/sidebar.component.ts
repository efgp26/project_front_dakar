import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ServiceLogoutService } from '../../components/login/services/serviceLogout/service-logout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private apiLogout: ServiceLogoutService){}

  ngOnInit(): void {
    initFlowbite();
  }

  async logout(){
    let response = await this.apiLogout.Logout();
    console.log(response);
  }
}
