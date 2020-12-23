import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  isLogged(){
    return this.authService.isLogged();
  }

  logout(){
    this.authService.logOut();
    console.log('logout');
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}