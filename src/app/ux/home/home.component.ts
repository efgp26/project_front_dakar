import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){}

  redirectTo(direccion: string){
    if(direccion == 'home'){
      this.router.navigate(['/'])
    }
    else if( direccion == 'donar'){
      this.router.navigate(['/donation'])
    }
    else if( direccion == 'certificado'){
      this.router.navigate(['/certificate'])
    }
    else if( direccion == 'login'){
      this.router.navigate(['/login'])
    }
    
  }

}
