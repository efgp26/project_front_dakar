import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { BikeComponent } from './components/bike/bike-create/bike.component';
import { ServiceMaintenanceComponent } from './components/service-maintenance/service-create/service-maintenance.component';
import { HomeComponent } from './ux/home/home.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { DetailUserComponent } from './components/user/detail-user/detail-user.component';
import { DetailBikeComponent } from './components/bike/detail-bike/detail-bike.component';

export const routes: Routes = [
    { path: 'create-user', component: CreateUserComponent},
    { path: 'bike', component: BikeComponent},
    { path: 'service', component: ServiceMaintenanceComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'list-user', component: ListUserComponent},
    { path: 'detail-user/:id', component: DetailUserComponent},
    { path: 'detail-bike/:id', component: DetailBikeComponent},
    
];
