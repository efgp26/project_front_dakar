import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from "../../../ux/sidebar/sidebar.component";
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MUser } from '../../../models/MUser';
import { FindBikeByIdService } from '../services/findBikeByid/find-bike-by-id.service';
import { MBike } from '../../../models/MBike';
import { MSerrvice } from '../../../models/MService';

@Component({
    selector: 'app-detail-bike',
    standalone: true,
    templateUrl: './detail-bike.component.html',
    styleUrl: './detail-bike.component.css',
    imports: [ReactiveFormsModule, SidebarComponent]
})
export class DetailBikeComponent implements OnInit{

  mBike: MBike = {} as MBike;
  mServices: MSerrvice[] = [];
  mListService: MSerrvice[] = [];
  listUsers: MUser[] = [];
  idBike: number = 0;

  dataBike = new FormGroup({
    licensePlate: new FormControl ('', Validators.required),
    displacement: new FormControl ('', Validators.required),
    dateModel: new FormControl ('', Validators.required),
    brand: new FormControl ('', Validators.required),
    reference: new FormControl ('', Validators.required),
    mileage: new FormControl ('', Validators.required),
    user: new FormControl ('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private getListUsers: AllListService,
    private allListService: AllListService
  
  ) {}

  listAllUsers(){
    this.getListUsers.loadListAllUsers();
    this.getListUsers.listAllUsers$.subscribe(data=>{
      this.listUsers = data;
    });
  }

  receptionId(){
    this.activatedRoute.params.subscribe((prm) => {
      this.idBike = prm['id'];
      console.log(prm);
    });
  }

  async getDataBike(){
    await this.allListService.loadBikeById(this.idBike);
    this.allListService.bikeById$.subscribe(async bike => {
      this.mBike = bike;
      await this.setDataBike();
    });
  }

  async getServiceByBike(){
    await this.allListService.loadServiceByIdbike(this.idBike);
    this.allListService.serviceByIdBike.subscribe(services => {
     this.mListService = services;
    });
  }

  async setDataBike(){
    this.dataBike.patchValue({
      licensePlate: this.mBike.licensePlate,
      brand: this.mBike.brand,
      reference: this.mBike.reference,
      dateModel: this.mBike.dateModel,
      displacement: this.mBike.displacement,
      mileage: this.mBike.mileage,
      user: this.mBike.userEntity.name +" "+ this.mBike.userEntity.lastName
    });
    
  }

  ngOnInit(): void {
    this.receptionId();
    this.listAllUsers();
    this.getDataBike();
    this.getServiceByBike();
  }
}
