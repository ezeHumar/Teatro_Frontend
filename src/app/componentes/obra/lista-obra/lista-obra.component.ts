import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObraService } from 'src/app/servicios/obra-service';
import { Obra } from 'src/app/modelos/obra';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { TagService } from 'src/app/servicios/tag-service';
import { Artista } from 'src/app/modelos/artista';
import { Tag } from 'src/app/modelos/tag';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleObraComponent } from '../detalle-obra/detalle-obra.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';


@Component({
  selector: 'app-lista-obra',
  templateUrl: './lista-obra.component.html',
  styleUrls: ['./lista-obra.component.css']
})
export class ListaObraComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private obraServicio: ObraService, private artistaServicio: ArtistaService, private tagServicio: TagService) { }

  obras: Obra[] = [];
  artistas: Artista[];
  artistasSeleccionados: Artista[] = [];
  idArtistasSeleccionados: string[] = [];
  tags: Tag[];
  tagsSeleccionados: Artista[] = [];
  idTagsSeleccionados: string[] = [];
  nombreFiltro: string = null;

  noBorrables: number[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.obraServicio.refreshNeeded$
      .subscribe(() => {
        this.getObras();
      });
    this.getObras();
    this.getTags();
    this.getArtistas();
    this.getObrasNoBorrables();
  }

  getObras(): void {
    this.obraServicio.getList().subscribe(obras =>{
      this.obras = obras;
      this.listaCargada=true;
    });
  }

  getArtistas(): void {
    this.artistaServicio.getList().subscribe(artistas => this.artistas = artistas);
  }

  getTags(): void {
    this.tagServicio.getList().subscribe(tags => this.tags = tags);
  }

  getObrasNoBorrables(): void {
    this.obraServicio.getNoBorrables().subscribe(obrasNoBorrables => this.noBorrables = obrasNoBorrables);
  }

  deleteObra(id: number) {
    this.obraServicio.delete(id).subscribe();
  }

  irDetalle(id) {
    this.router.navigate(['/obras/detalle/', id]);
    console.log(id);
  }

  busqueda() {
    if (this.tagsSeleccionados != null) {
      for (let i = 0; i < this.tagsSeleccionados.length; i++) {
        this.idTagsSeleccionados.push(this.tagsSeleccionados[i].id.toString());
      }
    }

    if (this.artistasSeleccionados != null) {
      for (let i = 0; i < this.artistasSeleccionados.length; i++) {
        this.idArtistasSeleccionados.push(this.artistasSeleccionados[i].id.toString());
      }
    }

    this.obraServicio.getListFiltered(this.idArtistasSeleccionados, this.idTagsSeleccionados, this.nombreFiltro).subscribe(obras => this.obras = obras);

    this.idTagsSeleccionados = [];
    this.idArtistasSeleccionados = [];
  }

  limpiarFiltro() {
    this.nombreFiltro = null;


    this.artistasSeleccionados = [];
    this.idArtistasSeleccionados = [];
    this.tagsSeleccionados = [];
    this.idTagsSeleccionados = [];
  }

  open(obra: Obra) {
    const modalRef = this.modalService.open(DetalleObraComponent, { backdrop: true });

    modalRef.componentInstance.elemento = obra;
  }

  checkDelete(id): boolean {//Sirve para checkear si el objeto se puede borrar
    if (this.noBorrables.includes(this.obras[id].id)) {
      return false;
    } else {
      return true;
    }
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteObra(id);
      }
    })
  }

}
