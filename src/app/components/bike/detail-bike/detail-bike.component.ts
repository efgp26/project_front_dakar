import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MUser } from '../../../models/MUser';
import { FindBikeByIdService } from '../services/findBikeByid/find-bike-by-id.service';
import { MBike } from '../../../models/MBike';
import { MSerrvice } from '../../../models/MService';
import { UpdateBikeService } from '../services/updateBike/update-bike.service';

@Component({
  selector: 'app-detail-bike',
  standalone: true,
  templateUrl: './detail-bike.component.html',
  styleUrl: './detail-bike.component.css',
  imports: [ReactiveFormsModule, SidebarComponent],
})
export class DetailBikeComponent implements OnInit {
  enabledLicenseplate: boolean = true;
  enabledDisplacement: boolean = true;
  enabledDateModel: boolean = true;
  enabledBrand: boolean = true;
  enabledReference: boolean = true;
  enabledMileage: boolean = true;
  enabledUser: boolean = true;
  enableSaveChanges: boolean = false;
  mBike: MBike = {} as MBike;
  mServices: MSerrvice[] = [];
  mListService: MSerrvice[] = [];
  listUsers: MUser[] = [];
  idBike: number = 0;

  dataBike = new FormGroup({
    licensePlate: new FormControl('', Validators.required),
    displacement: new FormControl('', Validators.required),
    dateModel: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    reference: new FormControl('', Validators.required),
    mileage: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private getListUsers: AllListService,
    private allListService: AllListService,
    private apiUpdateBike: UpdateBikeService,
    private router: Router
  ) {}

  toggleEnableLicenseplate() {
    this.enabledLicenseplate = !this.enabledLicenseplate;
    document.getElementById('licensePlate')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableDisplacement() {
    this.enabledDisplacement = !this.enabledDisplacement;
    document.getElementById('displacement')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableDateModel() {
    this.enabledDateModel = !this.enabledDateModel;
    document.getElementById('dateModel')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableBrand() {
    this.enabledBrand = !this.enabledBrand;
    document.getElementById('brand')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableReference() {
    this.enabledReference = !this.enabledReference;
    document.getElementById('reference')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableMileage() {
    this.enabledMileage = !this.enabledMileage;
    document.getElementById('mileage')?.focus();
    this.enableUpdateChanges();
  }

  toggleEnableUser() {
    this.enabledUser = !this.enabledUser;
    document.getElementById('user')?.focus();
    this.enableUpdateChanges();
  }

  enableUpdateChanges() {
    this.enableSaveChanges =
      !this.enabledLicenseplate ||
      !this.enabledDisplacement ||
      !this.enabledDateModel ||
      !this.enabledBrand ||
      !this.enabledMileage ||
      !this.enabledReference ||
      !this.enabledUser;
  }

  listAllUsers() {
    this.getListUsers.loadListAllUsers();
    this.getListUsers.listAllUsers$.subscribe((data) => {
      this.listUsers = data;
    });
  }

  receptionId() {
    this.activatedRoute.params.subscribe((prm) => {
      this.idBike = prm['id'];
      console.log(prm);
    });
  }

  redirection(id: number) {
    console.log(id);
    this.router.navigate(['/detail-service', id]);
  }

  async updateServices(){
    let bike: MBike = {} as MBike;
    let user: MUser = {} as MUser;

    bike.licensePlate = this.dataBike.value.licensePlate!;
    bike.brand = this.dataBike.value.brand!;
    bike.reference = this.dataBike.value.reference!;
    bike.mileage = this.dataBike.value.mileage!;
    bike.dateModel = this.dataBike.value.dateModel!;
    bike.displacement = this.dataBike.value.displacement!;
    console.log(this.enabledUser);
    if (!this.enabledUser){
      user.id = Number(this.dataBike.value.user!);
      console.log(user);
    }else{
      user.id = this.mBike.userEntity.id;
    }
    bike.userEntity = user;
    console.log(bike);
    (await this.apiUpdateBike.updateBike(bike,this.idBike)).subscribe(data => {
      console.log(data.data);
    });
    

    
  }

  async getDataBike() {
    await this.allListService.loadBikeById(this.idBike);
    this.allListService.bikeById$.subscribe(async (bike) => {
      this.mBike = bike;
      await this.setDataBike();
    });
  }

  async getServiceByBike() {
    await this.allListService.loadServiceByIdbike(this.idBike);
    this.allListService.serviceByIdBike.subscribe((services) => {
      this.mListService = services;
    });
  }

  async setDataBike() {
    this.dataBike.patchValue({
      licensePlate: this.mBike.licensePlate,
      brand: this.mBike.brand,
      reference: this.mBike.reference,
      dateModel: this.mBike.dateModel,
      displacement: this.mBike.displacement,
      mileage: this.mBike.mileage,
      user: this.mBike.userEntity.name + ' ' + this.mBike.userEntity.lastName,
    });
  }

  ngOnInit(): void {
    this.receptionId();
    this.listAllUsers();
    this.getDataBike();
    this.getServiceByBike();
  }
}
