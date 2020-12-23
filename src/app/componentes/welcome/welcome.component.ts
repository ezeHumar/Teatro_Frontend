import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authServicio: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authServicio.isLogged()) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
  }
  }

}
