import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private usuariosServicio: UsuariosService, private datePipe: DatePipe) { }

  tipoUsuario: string;
  usuarios: Usuario[];
  usuario =new Usuario();
  id: number;

  submited= false;
  submitError: string=null;

  fechaHoy: any;//Se usa para el maximo del datepicker, para que no se seleccione una fecha mayor que hoy

  onSubmit(){
    if(this.usuario.esAdmin){
      this.usuario.esOperador=false;
    }
    if(this.usuario.esAdmin==false){
      this.usuario.esOperador=true;
    }
    this.submited= true;
    this.usuariosServicio.put(this.usuario).subscribe(data => {this.router.navigate(['/usuarios']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.usuario);}

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.usuariosServicio.get(this.id).subscribe(u => this.usuario = u);
    if(this.usuario.esOperador){
      this.tipoUsuario="operador";
    }
    if(this.usuario.esAdmin){
      this.tipoUsuario="admin";
    }
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    birthdate: new FormControl('', Validators.required),
    UserType: new FormControl

  })

}
