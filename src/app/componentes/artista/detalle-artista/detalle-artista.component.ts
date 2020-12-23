import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { Artista } from 'src/app/modelos/artista';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-artista',
  templateUrl: './detalle-artista.component.html',
  styleUrls: ['./detalle-artista.component.css']
})
export class DetalleArtistaComponent implements OnInit {

  set: any;
  id: number;
  a: Artista;
  url: string= `${environment.apiUrl}` + 'upload/';
  @Input() public elemento;

  constructor(public activeModal: NgbActiveModal, private route: ActivatedRoute, private artistaServicio: ArtistaService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // this.artistaServicio.get(this.id).subscribe(a => this.a = a);
    this.a=this.elemento;
  }

}