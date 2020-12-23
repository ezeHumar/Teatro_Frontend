import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosMock } from 'src/app/servicios/usuarios-mock';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalleArtistaComponent } from '../../artista/detalle-artista/detalle-artista.component';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { DatePipe } from '@angular/common';

let currentDate=Date.now();

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})

export class FormUsuarioComponent implements OnInit {

  constructor(private router: Router, private usuariosServicio: UsuariosService, private datePipe: DatePipe) { }

  tipoUsuario: string;
  usuarios: Usuario[];
  usuario =new Usuario();

  submited= false;
  submitError: string=null;

  fechaHoy: any;//Se usa para el maximo del datepicker, para que no se seleccione una fecha mayor que hoy

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    birthdate: new FormControl('', Validators.required),
    UserType: new FormControl('', Validators.required)
  })
  
  onSubmit(){
    if(this.usuario.esAdmin){
      this.usuario.esOperador=false;
    }
    if(!this.usuario.esAdmin){
      this.usuario.esOperador=true;

    }
    this.submited= true;
    this.usuariosServicio.post(this.usuario).subscribe(data => {this.router.navigate(['/usuarios']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 
  
  
  get diagnostic(){return JSON.stringify(this.usuario);
  }

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

}
