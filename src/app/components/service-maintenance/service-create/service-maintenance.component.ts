import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateMaintenanceService } from '../services/createMaintenanceService/create-maintenance.service';
import { ListAllBikeService } from '../../bike/services/listAllBikeService/list-all-bike.service';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { MUser } from '../../../models/MUser';
import { MSerrvice } from '../../../models/MService';
import { MBike } from '../../../models/MBike';
import { ListUsserByRolService } from '../../user/services/listUserByRolService/list-usser-by-rol.service';
declare var Datepicker: any;

@Component({
  selector: 'app-service-maintenance',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './service-maintenance.component.html',
  styleUrl: './service-maintenance.component.css',
})
export class ServiceMaintenanceComponent implements OnInit {

  mListUser: MUser[] = [];
  mService: MSerrvice = {} as MSerrvice;
  listBikes: MBike[] = [];

  constructor(
    private apiCreateMaintenance: CreateMaintenanceService,
    private apiListAllBike: ListAllBikeService,
    private apiListUserByMechanic: ListUsserByRolService
  ) {}

  dataServices = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dateAdmission: new FormControl('', Validators.required),
    payment: new FormControl(0, Validators.required),
    valueService: new FormControl(0, Validators.required),
    stade: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    bikeEntity: new FormControl(0, Validators.required),
    mechanic: new FormControl(0, Validators.required),
  });

  listAllBikes() {
    this.apiListAllBike.GetListBikes().subscribe((data) => {
      console.log(data.status);
      let list = data.data as unknown as [];
      this.listBikes = list;
    });
  }

  listUserByRoleMechanic() {
    this.apiListUserByMechanic
      .GetListUserByRol('MECHANIC')
      .subscribe((data) => {
        console.log(data.message);
        let list = data.data as unknown as [];
        this.mListUser = list;
      });
  }

  createService() {
    let mBikeEntity: MBike = {} as MBike;
    let mUserEntity: MUser = {} as MUser;

    this.mService.name = this.dataServices.value.name!;
    this.mService.description = this.dataServices.value.description!;
    this.mService.dateAdmission = new Date(this.dataServices.value.dateAdmission!);
    this.mService.payment = this.dataServices.value.payment!;
    this.mService.valueService = this.dataServices.value.valueService!;
    this.mService.stade = JSON.parse(this.dataServices.value.stade!);
    this.mService.departureDate = new Date(this.dataServices.value.departureDate!);
    mBikeEntity.id = this.dataServices.value.bikeEntity!;
    mUserEntity.id = this.dataServices.value.mechanic!;
    this.mService.bikeEntity = mBikeEntity;
    this.mService.userEntity = mUserEntity;

    console.log(this.mService);

    this.apiCreateMaintenance.PostCreateMaintenance(this.mService).subscribe( data=>{
      console.log(data.data);
    });
  }

  initDatePicker() {
    const dateAdmission = document.getElementById("fechaIngreso");
    const dateDeparture = document.getElementById("fechaSalida");

    new Datepicker(dateAdmission, {});
    new Datepicker(dateDeparture, {});
  }

  

  onDateChange(event: any, optionDate: string) {
    switch (optionDate) {
      case 'fechaIngreso': {
        this.dataServices.patchValue({ dateAdmission: event.target.value });
        return;
      }
      case 'fechaSalida': {
        this.dataServices.patchValue({ departureDate: event.target.value });
        return;
      }
      default:
        return;
    }
  }

  ngOnInit(): void {
    this.listAllBikes();
    this.listUserByRoleMechanic();
  }
}
