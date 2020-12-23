import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActividadService } from 'src/app/servicios/actividad-service';
import { Actividad } from 'src/app/modelos/actividad';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {

  set: any;
  id: number;
  a: Actividad;
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private actividadServicio: ActividadService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // this.actividadServicio.get(this.id).subscribe(a => this.a = a);
    this.a=this.elemento;
  }

}