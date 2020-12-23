import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsuariosMock } from 'src/app/servicios/usuarios-mock';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios-service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  set: any;
  id: number;
  u: Usuario;
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private usuariosServicio: UsuariosService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // // this.u = this.umock.get(this.id);
    // this.usuariosServicio.get(this.id).subscribe(u => this.u = u);
    this.u=this.elemento;
  }

}