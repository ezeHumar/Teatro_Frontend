import { Component, Input, OnInit } from '@angular/core';
import { Participante } from 'src/app/modelos/participante';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ParticipanteService } from 'src/app/servicios/participante-service';

@Component({
  selector: 'app-detalle-participante',
  templateUrl: './detalle-participante.component.html',
  styleUrls: ['./detalle-participante.component.css']
})
export class DetalleParticipanteComponent implements OnInit {
  set: any;
  id: number;
  p: Participante;
  @Input() public elemento;

  constructor(private route: ActivatedRoute, private participanteServicio: ParticipanteService) { }


  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     this.id = Number(params.get("id"));
    //     console.log(params.get("id"));
    //   }
    // )
    // // this.u = this.umock.get(this.id);
    // this.participanteServicio.get(this.id).subscribe(p => this.p = p);
    this.p=this.elemento;
  }

}