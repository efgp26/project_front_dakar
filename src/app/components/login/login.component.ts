import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/serviceLogin/login.service';
import { StorageService } from '../../services/storage/storage.service';
import { MLogin } from '../../models/MLogin';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  mLogin: MLogin = {} as MLogin;

  datosLogin = new FormGroup({
    email: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required)
  })

  constructor(
      private serviceLogin: LoginService,
      private storageService: StorageService,
      private router: Router
    ){}

  async login(){
    this.mLogin.username = this.datosLogin.value.email!;
    this.mLogin.password = this.datosLogin.value.password!;
    let data = await this.serviceLogin.Login(this.mLogin)
      console.log(data)
      if(data.Message == "Autenticacion Correcta"){
        this.storageService.setItem("token", data.token)
        this.storageService.setItem("username",data.Username)
        let prueba = this.storageService.getItem("token");
        console.log(prueba);
        this.router.navigate(['create-user']);
      }
    
  }

}
