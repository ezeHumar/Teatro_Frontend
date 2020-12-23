import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from 'src/app/servicios/actividad-service';
import { Actividad } from 'src/app/modelos/actividad';
import { Obra } from 'src/app/modelos/obra';
import { Espacio } from 'src/app/modelos/espacio';
import { Edicion } from 'src/app/modelos/edicion';
import { EdicionService } from 'src/app/servicios/edicion-service';
import { ObraService } from 'src/app/servicios/obra-service';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleActividadComponent } from '../detalle-actividad/detalle-actividad.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';


@Component({
  selector: 'app-lista-actividad',
  templateUrl: './lista-actividad.component.html',
  styleUrls: ['./lista-actividad.component.css']
})
export class ListaActividadComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private actividadServicio: ActividadService, private obraServicio: ObraService, private edicionServicio: EdicionService, private espacioServicio: EspacioService) { }

  actividades: Actividad[] = [];

  obras: Obra[] = [];
  obrasSeleccionadas: Obra[] = [];
  idObrasSeleccionadas: string[] = [];

  espacios: Espacio[];
  espaciosSeleccionados: Espacio[] = [];
  idEspaciosSeleccionados: string[] = [];

  ediciones: Edicion[];
  idEdicionSeleccionada: string;
  edicionSeleccionada: Edicion;

  horaMin: string;
  horaMax: string;

  fechaMin: string;
  fechaMax: string;

  noBorrables: number[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.actividadServicio.refreshNeeded$
      .subscribe(() => {
        this.getActividades();
      });
    this.getActividades();
    this.getObras();
    this.getEdiciones();
    this.getEspacios();
    this.getActividadesNoBorrables();
  }

  getActividades(): void {
    this.actividadServicio.getList().subscribe(actividades =>{
      this.actividades = actividades;
      this.listaCargada=true;
    });
  }

  getObras(): void {
    this.obraServicio.getList().subscribe(obras => this.obras = obras);
  }

  getEdiciones(): void {
    this.edicionServicio.getList().subscribe(ediciones => this.ediciones = ediciones);
  }

  getEspacios(): void {
    this.espacioServicio.getList().subscribe(espacios => this.espacios = espacios);
  }

  getActividadesNoBorrables(): void {
    this.actividadServicio.getNoBorrables().subscribe(actividadesNoBorrables => this.noBorrables = actividadesNoBorrables);
  }

  deleteActividad(id: number) {
    this.actividadServicio.delete(id).subscribe();
  }
  irDetalle(id) {
    this.router.navigate(['/actividades/detalle/', id]);
    console.log(id);
  }

  checkDelete(id): boolean {//Sirve para checkear si el objeto se puede borrar
    if (this.noBorrables.includes(this.actividades[id].id)) {
      return false;
    } else {
      return true;
    }
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if(receivedEntry==true){
        this.deleteActividad(id);
      }
    })
  }

  busqueda() {

    if (this.fechaMin == "") {
      this.fechaMin = null;
    }

    if (this.fechaMax == "") {
      this.fechaMax = null;
    }

    if (this.horaMin == "") {
      this.horaMin = null;
    }

    if (this.horaMax == "") {
      this.horaMax = null;
    }

    if (this.obrasSeleccionadas != null) {
      for (let i = 0; i < this.obrasSeleccionadas.length; i++) {
        this.idObrasSeleccionadas.push(this.obrasSeleccionadas[i].id.toString());
        console.log(this.obrasSeleccionadas[i].id);

      }
    }

    if (this.espaciosSeleccionados != null) {
      for (let i = 0; i < this.espaciosSeleccionados.length; i++) {
        this.idEspaciosSeleccionados.push(this.espaciosSeleccionados[i].id.toString());
      }
    }

    if (this.edicionSeleccionada != null) {
      this.idEdicionSeleccionada = this.edicionSeleccionada.id;
    }

    this.actividadServicio.getListFiltered(this.idObrasSeleccionadas, this.idEspaciosSeleccionados, this.idEdicionSeleccionada, this.horaMin, this.horaMax, this.fechaMin, this.fechaMax).subscribe(actividades => this.actividades = actividades)

    // this.obrasSeleccionadas = [];
    // this.espaciosSeleccionados = [];
    this.idObrasSeleccionadas = [];
    this.idEspaciosSeleccionados = [];
    // this.edicionSeleccionada= null;
    this.idEdicionSeleccionada = null;

  }

  limpiarFiltro() {

    this.obrasSeleccionadas = [];
    this.espaciosSeleccionados = [];
    this.idObrasSeleccionadas = [];
    this.idEspaciosSeleccionados = [];
    this.edicionSeleccionada = null;
    this.idEdicionSeleccionada = null;

    this.fechaMin = null;
    this.fechaMax = null;
    this.horaMin = null;
    this.horaMax = null;

  }

  open(actividad: Actividad) {
    const modalRef = this.modalService.open(DetalleActividadComponent);
    modalRef.componentInstance.elemento = actividad;
  }

}
