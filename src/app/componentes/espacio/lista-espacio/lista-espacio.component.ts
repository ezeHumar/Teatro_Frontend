import { Component, OnInit, NgModule } from '@angular/core';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Espacio } from 'src/app/modelos/espacio';
import { DetalleEspacioComponent } from '../detalle-espacio/detalle-espacio.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-espacio',
  templateUrl: './lista-espacio.component.html',
  styleUrls: ['./lista-espacio.component.css']
})
export class ListaEspacioComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private espacioServicio: EspacioService) { }

  espacios: Espacio[] = [];

  nombreFiltro: string = null;
  capacidadMinFiltro: string = null;
  capacidadMaxFiltro: string = null;
  ciudadFiltro: string = null;
  condicionFiltro: string = "";

  noBorrables: number[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.espacioServicio.refreshNeeded$
      .subscribe(() => {
        this.getEspacios();
      });
    this.getEspacios();
    this.getEspaciosNoBorrables();
  }

  getEspacios(): void {
    this.espacioServicio.getList().subscribe(espacios =>{
      this.espacios = espacios;
      this.listaCargada=true;
    });
  }

  getEspaciosNoBorrables(): void {
    this.espacioServicio.getNoBorrables().subscribe(espacioNoBorrables => this.noBorrables = espacioNoBorrables);
  }

  deleteEspacio(id: number) {
    this.espacioServicio.delete(id).subscribe();
  }
  irDetalle(id) {
    this.router.navigate(['/espacios/detalle/', id]);
    console.log(id);
  }

  busqueda() {
    this.espacioServicio.getListFiltered(this.nombreFiltro, this.capacidadMinFiltro, this.capacidadMaxFiltro, this.ciudadFiltro, this.condicionFiltro).subscribe(espacios => this.espacios = espacios);
  }

  limpiarFiltro() {
    this.nombreFiltro = null;
    this.capacidadMinFiltro = null;
    this.capacidadMaxFiltro = null;
    this.ciudadFiltro = null;
    this.condicionFiltro = "";
  }

  open(espacio: Espacio) {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(DetalleEspacioComponent);

    modalRef.componentInstance.elemento = espacio;
  }

  checkDelete(id): boolean {//Sirve para checkear si el objeto se puede borrar
    if (this.noBorrables.includes(this.espacios[id].id)) {
      return false;
    } else {
      return true;
    }
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteEspacio(id);
      }
    })
  }


}
