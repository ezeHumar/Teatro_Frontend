import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios-service';
import { ObraService } from 'src/app/servicios/obra-service';
import { Obra } from 'src/app/modelos/obra';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-obra',
  templateUrl: './detalle-obra.component.html',
  styleUrls: ['./detalle-obra.component.css']
})
export class DetalleObraComponent implements OnInit {

  set: any;
  id: number;
  o: Obra;
  url: string= `${environment.apiUrl}` + 'upload/';
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private obraServicio: ObraService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // // this.u = this.umock.get(this.id);
    // this.obraServicio.get(this.id).subscribe(o => this.o = o);
    this.o=this.elemento;
  }

}