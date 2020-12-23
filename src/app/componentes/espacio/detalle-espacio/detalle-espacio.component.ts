import { Component, Input, OnInit } from '@angular/core';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { DireccionService } from 'src/app/servicios/direccion-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Espacio } from 'src/app/modelos/espacio';
import { Direccion } from 'src/app/modelos/direccion';

@Component({
  selector: 'app-detalle-espacio',
  templateUrl: './detalle-espacio.component.html',
  styleUrls: ['./detalle-espacio.component.css']
})
export class DetalleEspacioComponent implements OnInit {

  center: google.maps.LatLngLiteral;
  position: google.maps.LatLng = new google.maps.LatLng(0,0);
  set: any;
  id: number;
  e: Espacio;
  u: Direccion;
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private espacioServicio: EspacioService, private direccionServicio: DireccionService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // this.espacioServicio.get(this.id).subscribe((e) => {
    //   this.e = e;
    //   this.center = {
    //     lat: this.e.ubicacion.latitud,
    //     lng: this.e.ubicacion.longitud,
    //   }
    //   this.position = new google.maps.LatLng(this.e.ubicacion.latitud, this.e.ubicacion.longitud);
    // });

    this.e=this.elemento;
    this.center = {
      lat: this.e.ubicacion.latitud,
      lng: this.e.ubicacion.longitud,
    }
    this.position = new google.maps.LatLng(this.e.ubicacion.latitud, this.e.ubicacion.longitud);


  }

}
