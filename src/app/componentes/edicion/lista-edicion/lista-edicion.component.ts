import { Component, OnInit } from '@angular/core';
import { EdicionService } from 'src/app/servicios/edicion-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Edicion } from 'src/app/modelos/edicion';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleEdicionComponent } from '../detalle-edicion/detalle-edicion.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-edicion',
  templateUrl: './lista-edicion.component.html',
  styleUrls: ['./lista-edicion.component.css']
})
export class ListaEdicionComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private edicionServicio: EdicionService) { }

  ediciones: Edicion[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.edicionServicio.refreshNeeded$
      .subscribe(() => {
        this.getEdiciones();
      });
    this.getEdiciones();
  }

  getEdiciones(): void {
    this.edicionServicio.getList().subscribe(ediciones => {
      this.ediciones = ediciones;
      this.listaCargada=true;
    });
  }

  deleteEdicion(id: number) {
    this.edicionServicio.delete(id).subscribe();
  }

  irDetalle(id) {
    this.router.navigate(['/ediciones/detalle/', id]);
    console.log(id);
  }

  open(edicion: Edicion) {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(DetalleEdicionComponent);

    modalRef.componentInstance.elemento = edicion;
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteEdicion(id);
      }
    })
  }

}
