import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateBikeService } from '../services/createBikeServices/create-bike.service';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { MBike } from '../../../models/MBike';
import { MUser } from '../../../models/MUser';
import { ListUserService } from '../../user/services/listUserServices/list-user.service';
import { AllListService } from '../../../services/allListServices/all-list.service';

@Component({
    selector: 'app-bike',
    standalone: true,
    templateUrl: './bike.component.html',
    styleUrl: './bike.component.css',
    imports: [ReactiveFormsModule, SidebarComponent]
})
export class BikeComponent implements OnInit{

  mBike: MBike = {} as MBike;
  listUsers: MUser[] = [];
  mUser: MUser = {} as MUser;

  dataBike = new FormGroup({
    licensePlate: new FormControl ('', Validators.required),
    displacement: new FormControl ('', Validators.required),
    dateModel: new FormControl ('', Validators.required),
    brand: new FormControl ('', Validators.required),
    reference: new FormControl ('', Validators.required),
    mileage: new FormControl ('', Validators.required),
    user: new FormControl ('', Validators.required),
  });


  constructor(private getListUsers: AllListService, private apiCreateBike: CreateBikeService){}

  listAllUsers(){
    this.getListUsers.loadListAllUsers();
    this.getListUsers.listAllUsers$.subscribe(data=>{
      this.listUsers = data;
    });
  }

  ngOnInit(): void {
    this.listAllUsers();
  }

  createBike(){
    this.mBike.licensePlate = this.dataBike.value.licensePlate!;
    this.mBike.displacement = this.dataBike.value.displacement!;
    this.mBike.dateModel = this.dataBike.value.dateModel!;
    this.mBike.brand = this.dataBike.value.brand!;
    this.mBike.reference = this.dataBike.value.reference!;
    this.mBike.mileage = this.dataBike.value.mileage!;
    this.mUser.id = Number(this.dataBike.value.user!);
    this.mBike.userEntity = this.mUser;
    console.log(this.mBike)

    this.apiCreateBike.PostCreateBike(this.mBike).subscribe(data => {
      console.log(data.data);
    });

  }


}
