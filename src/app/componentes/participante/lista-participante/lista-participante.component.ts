import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participante } from 'src/app/modelos/participante';
import { ParticipanteService } from 'src/app/servicios/participante-service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleParticipanteComponent } from '../detalle-participante/detalle-participante.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-participante',
  templateUrl: './lista-participante.component.html',
  styleUrls: ['./lista-participante.component.css']
})
export class ListaParticipanteComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private participanteServicio: ParticipanteService) { }

  participantes: Participante[]=[];

  nombreFiltro: string;
  apellidoFiltro: string;
  emailFiltro: string;

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.participanteServicio.refreshNeeded$
      .subscribe(() => {
        this.getparticipantes();
      });
    this.getparticipantes();
  }

  getparticipantes(): void {
    this.participanteServicio.getList().subscribe(participantes =>{
      this.participantes = participantes;
      this.listaCargada=true;
    });
  }

  deleteParticipante(id: number) {
    this.participanteServicio.delete(id).subscribe();
  }

  irDetalle(id) {
    this.router.navigate(['/participantes/detalle/', id]);
    console.log(id);
  }

  busqueda() {
    if (this.nombreFiltro == "") {
      this.nombreFiltro = null;
    }

    if (this.apellidoFiltro == "") {
      this.apellidoFiltro = null;
    }

    if (this.emailFiltro == "") {
      this.emailFiltro = null;
    }

    this.participanteServicio.getListFiltered(this.nombreFiltro, this.apellidoFiltro, this.emailFiltro).subscribe(participantes => this.participantes = participantes)

  }

  limpiarFiltro() {

    this.nombreFiltro = null;
    this.apellidoFiltro = null;
    this.emailFiltro = null;
  }

  open(participante: Participante) {
    const modalRef = this.modalService.open(DetalleParticipanteComponent);
    modalRef.componentInstance.elemento = participante;
    modalRef.componentInstance.titulo = "Detalle";
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if(receivedEntry==true){
        this.deleteParticipante(id);
      }
    })
  }
}
