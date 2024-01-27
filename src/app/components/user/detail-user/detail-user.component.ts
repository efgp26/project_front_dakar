import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllListService } from '../../../services/allListServices/all-list.service';
import { MUser } from '../../../models/MUser';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MBike } from '../../../models/MBike';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css',
  imports: [SidebarComponent, ReactiveFormsModule],
})
export class DetailUserComponent implements OnInit {

  mListBike: MBike[] = [];
  mUser: MUser = {} as MUser;
  idUser: number = 0;

  variable = 'Hola mundo';

  dataUser = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    numberPhone: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private getApis: AllListService
  ) {
    activatedRoute.params.subscribe((prm) => {
      this.idUser = prm['id'];
      console.log(prm);
    });
  }

  async getUser() {
    await this.getApis.loadUserById(this.idUser);
    this.getApis.userById$.subscribe(async (user) => {
      this.mUser = user;
      await this.setDataUser();
      console.log(this.mUser);
    });
  }
  async setDataUser() {
    this.dataUser.patchValue({
      name: this.mUser.name,
      lastName: this.mUser.lastName,
      email: this.mUser.email,
      numberPhone: this.mUser.numbrePhone,
    });
    this.mListBike = this.mUser.bikeEntityList;
  }

  ngOnInit(): void {
    this.getUser();
  }
}
