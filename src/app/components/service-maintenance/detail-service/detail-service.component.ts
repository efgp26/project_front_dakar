import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MSerrvice } from '../../../models/MService';

@Component({
  selector: 'app-detail-service',
  standalone: true,
  templateUrl: './detail-service.component.html',
  styleUrl: './detail-service.component.css',
  imports: [SidebarComponent, ReactiveFormsModule],
})
export class DetailServiceComponent implements OnInit {
  idService: number = 0;
  mService: MSerrvice = {} as MSerrvice;

  enableDateIn: boolean = true;
  enableDateOut: boolean = true;
  enableName: boolean = true;
  enableDescription: boolean = true;
  enablePayment: boolean = true;
  enableValueService: boolean = true;
  enableStade: boolean = true;
  enableMechanic: boolean = true;
  updatedChanges: boolean = false;

  dataServices = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dateAdmission: new FormControl('', Validators.required),
    payment: new FormControl(0, Validators.required),
    valueService: new FormControl(0, Validators.required),
    stade: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    bikeEntity: new FormControl('', Validators.required),
    mechanic: new FormControl(0, Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private allListService: AllListService
  ) {}

  toggleEnableIn() {
    this.enableDateIn = !this.enableDateIn;
    document.getElementById('fechaIngreso')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnableOut() {
    this.enableDateOut = !this.enableDateOut;
    document.getElementById('fechaSalida')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnableName() {
    this.enableName = !this.enableName;
    document.getElementById('name')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnabledDescription(){
    this.enableDescription = !this.enableDescription;
    document.getElementById('large-input')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnabledPayent(){
    this.enablePayment = !this.enablePayment;
    document.getElementById('payment')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnabledValueService(){
    this.enableValueService = !this.enableValueService;
    document.getElementById('valueService')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnabledStade(){ 
    this.enableStade = !this.enableStade;
    document.getElementById('stade')?.focus();
    this.enableUpdatedChanges();
  }

  toggleEnabledMechanic(){  
    this.enableMechanic = !this.enableMechanic;
    document.getElementById('mechanic')?.focus();
    this.enableUpdatedChanges();
  }

  enableUpdatedChanges() {
    this.updatedChanges =
      !this.enableDateIn ||
      !this.enableDateOut ||
      !this.enableDescription ||
      !this.enableName ||
      !this.enablePayment ||
      !this.enableStade ||
      !this.enableMechanic ||
      !this.enableValueService;
  }

  async updateService() {}

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

  async getService() {
    await this.allListService.loadServiceById(this.idService);
    this.allListService.serviceById$.subscribe(async (data) => {
      this.mService = data;
      console.log(data);
      await this.setDataService();
    });
  }

  async setDataService() {
    this.dataServices.patchValue({
      name: this.mService.name,
      description: this.mService.description,
      dateAdmission: this.mService.dateAdmission.toString(),
      payment: this.mService.payment,
      valueService: this.mService.valueService,
      stade: this.mService.stade.toString(),
      departureDate: this.mService.departureDate.toString(),
      bikeEntity: this.mService.bikeEntity.licensePlate,
    });
  }

  receptionId() {
    this.activatedRoute.params.subscribe((prm) => {
      this.idService = prm['id'];
    });
  }

  ngOnInit(): void {
    this.receptionId();
    this.getService();
  }
}
