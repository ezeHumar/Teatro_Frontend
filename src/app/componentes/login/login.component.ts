import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import { AuthService } from 'src/app/servicios/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  
  usuarios: Usuario[];
  usuario =new Usuario();

  submited= false;

  error: string=null;
  mostrarError: boolean=false;

  onSubmit(){
    this.submited= true;
    this.authService.login(this.usuario).subscribe();

  } 

  logout(){
    this.authService.logOut();
    console.log('logout');
    this.router.navigate(['/login']);
  }

  login() {
    const user = { email: this.usuario.getEmail(), password: this.usuario.getContrasenia() };
    this.authService.login(this.usuario).subscribe(data => {
      this.authService.setToken(data["JWT"]);
      this.authService.setIsUserLoggedIn(true);      
      this.router.navigate(['/welcome']);
      
    },
    error => {
      console.log(error);
      this.error=error.error;
      if(error.status==0){
        this.error="Problema con la API";
      }
      
    });
  }
  
  // get diagnostic(){return JSON.stringify(this.usuario);}

  ngOnInit(): void {
    if(this.authService.isLogged()){
      this.router.navigate(['/welcome']);
    }
  }

}