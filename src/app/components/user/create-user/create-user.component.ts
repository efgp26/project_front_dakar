import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../ux/sidebar/sidebar.component';
import { MUser } from '../../../models/MUser';
import { CreateUserService } from '../services/createUserServices/create-user.service';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  mUser: MUser = {} as MUser;

  dataUser = new FormGroup({
    email: new FormControl ('', Validators.required),
    name: new FormControl ('', Validators.required),
    lastName: new FormControl ('', Validators.required),
    numberPhone: new FormControl ('', Validators.required),
    roles: new FormControl ('', Validators.required),
  });

  constructor(private apiCreateUser: CreateUserService){}

  createUser(){
    this.mUser.email = this.dataUser.value.email!;
    this.mUser.name = this.dataUser.value.name!;
    this.mUser.lastName = this.dataUser.value.lastName!;
    this.mUser.numbrePhone = this.dataUser.value.numberPhone!;
    this.mUser.password = this.dataUser.value.numberPhone!;
    this.mUser.roles = [this.dataUser.value.roles!];

    this.apiCreateUser.PostCreateUser(this.mUser).subscribe(data =>{
      console.log(data.data);
    });
  }


  ngOnInit(): void {
    initFlowbite();
  }
}
