import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './ux/sidebar/sidebar.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { BikeComponent } from './components/bike/bike-create/bike.component';
import { ServiceMaintenanceComponent } from './components/service-maintenance/service-create/service-maintenance.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    SidebarComponent,
    CreateUserComponent, 
    BikeComponent,
    ServiceMaintenanceComponent,
    LoginComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project_front_dakar';
}
