import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { first } from 'rxjs';
import { UpdateUserService } from '../services/updateUserServices/update-user.service';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css',
  imports: [SidebarComponent, ReactiveFormsModule],
})
export class DetailUserComponent implements OnInit {
  enableChangePassword: boolean = false;
  enabledName: boolean = true;
  enabledLastname: boolean = true;
  enabledPhone: boolean = true;
  enabledEmail: boolean = true;
  enabledSaveChanges: boolean = false;

  mListBike: MBike[] = [];
  mUser: MUser = {} as MUser;
  idUser: number = 0;

  dataUser = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    numberPhone: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private getApis: AllListService,
    private apiUpdateUser: UpdateUserService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((prm) => {
      this.idUser = prm['id'];
      console.log(prm);
    });
  }

  //toggles para activar edicion de campos

  toggleEnbledName() {
    this.enabledName = !this.enabledName;
    document.getElementById('first_name')?.focus();
    this.funEnabledSaveChanges();
  }

  toggleEnabledLastname() {
    this.enabledLastname = !this.enabledLastname;
    document.getElementById('last_name')?.focus();
    this.funEnabledSaveChanges();
  }

  toggleEnabledPhone() {
    this.enabledPhone = !this.enabledPhone;
    document.getElementById('phone-input')?.focus();
    this.funEnabledSaveChanges();
  }

  toggleEnabledEmail() {
    this.enabledEmail = !this.enabledEmail;
    document.getElementById('email')?.focus();
    this.funEnabledSaveChanges();
  }

  funEnabledSaveChanges() {
    this.enabledSaveChanges =
      !this.enabledName ||
      !this.enabledLastname ||
      !this.enabledPhone ||
      !this.enabledEmail;
  }

  changePassword() {
    this.enableChangePassword = !this.enableChangePassword;
  }

  // metodo que asigna datos del usuario
  async getUser() {
    await this.getApis.loadUserById(this.idUser);
    this.getApis.userById$.subscribe(async (user) => {
      this.mUser = user;
      await this.setDataUser();
      console.log(this.mUser);
    });
  }

  //metodo que da los valores a los inputs
  async setDataUser() {
    console.log(this.mUser);
    this.dataUser.patchValue({
      name: this.mUser.name,
      lastName: this.mUser.lastName,
      email: this.mUser.email,
      numberPhone: this.mUser.numbrePhone,
    });
    this.mListBike = this.mUser.bikeEntityList;
  }

  // metodo que consume la api de actualizacion
  async updateUser() {
    let mUserUpdate: MUser = {} as MUser;
    mUserUpdate.name = this.dataUser.value.name!;
    mUserUpdate.lastName = this.dataUser.value.lastName!;
    mUserUpdate.numbrePhone = this.dataUser.value.numberPhone!;
    mUserUpdate.email = this.dataUser.value.email!;
    mUserUpdate.password = this.dataUser.value.email!;
    mUserUpdate.id = this.mUser.id;

    console.log(mUserUpdate);
    (
      await this.apiUpdateUser.PutUpdateUser(mUserUpdate, mUserUpdate.id)
    ).subscribe((data) => {
      console.log(data);
    });
  }

  redirection(id: number) {
    console.log(id);
    this.router.navigate(['/detail-bike', id]);
  }

  ngOnInit(): void {
    this.getUser();
  }
}
