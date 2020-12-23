import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import { AuthService } from 'src/app/servicios/auth-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLogged(){
    return this.authService.isLogged();
  }

  ngOnInit(): void {
  }

}
