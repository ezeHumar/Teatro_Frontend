import { Component, Input, OnInit } from '@angular/core';
import { Edicion } from 'src/app/modelos/edicion';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EdicionService } from 'src/app/servicios/edicion-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-edicion',
  templateUrl: './detalle-edicion.component.html',
  styleUrls: ['./detalle-edicion.component.css']
})
export class DetalleEdicionComponent implements OnInit {

  set: any;
  id: number;
  e: Edicion;
  url: string= `${environment.apiUrl}` + 'upload/';
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private edicionServicio: EdicionService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // this.edicionServicio.get(this.id).subscribe(e => this.e = e);
    this.e=this.elemento;
  }

}