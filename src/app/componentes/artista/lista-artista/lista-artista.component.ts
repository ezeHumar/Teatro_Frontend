import { Component, OnInit } from '@angular/core';
import { Artista } from 'src/app/modelos/artista';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { Tag } from 'src/app/modelos/tag';
import { Obra } from 'src/app/modelos/obra';
import { TagService } from 'src/app/servicios/tag-service';
import { ObraService } from 'src/app/servicios/obra-service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleArtistaComponent } from '../detalle-artista/detalle-artista.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-artista',
  templateUrl: './lista-artista.component.html',
  styleUrls: ['./lista-artista.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListaArtistaComponent implements OnInit {
  isImageLoading: boolean;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private artistaServicio: ArtistaService, private obraServicio: ObraService, private tagServicio: TagService, private imagenServicio: ImagenService) {
  }

  artistas: Artista[] = [];

  nombreFiltro: string;
  apellidoFiltro: string;

  tags: Tag[];
  tagsSeleccionados: Tag[] = [];
  idTagsSeleccionados: string[] = [];

  obras: Obra[];
  obrasSeleccionadas: Obra[] = [];
  idObrasSeleccionadas: string[] = [];

  url: string = "http://localhost:8080/prototipoTeatro/rest/upload/";
  file: string = "a.png";

  noBorrables: number[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.artistaServicio.refreshNeeded$
      .subscribe(() => {
        this.getArtistas();
      });
    this.getArtistas();
    this.getObras();
    this.getTags();
    this.getArtistasNoBorrables();
  }

  getArtistas(): void {
    this.artistaServicio.getList().subscribe(artistas =>{
      this.artistas = artistas;
      this.listaCargada=true;
    });
  }

  getTags(): void {
    this.tagServicio.getList().subscribe(tags => this.tags = tags);
  }

  getObras(): void {
    this.obraServicio.getList().subscribe(obras => this.obras = obras);
  }

  getArtistasNoBorrables(): void {
    this.artistaServicio.getNoBorrables().subscribe(artistasNoBorrables => this.noBorrables = artistasNoBorrables);
  }

  deleteArtista(id: number) {
    this.artistaServicio.delete(id).subscribe();
  }

  irDetalle(id) {
    this.router.navigate(['/artistas/detalle/', id]);
    console.log(id);
  }

  busqueda() {

    if (this.obrasSeleccionadas != null) {
      for (let i = 0; i < this.obrasSeleccionadas.length; i++) {
        this.idObrasSeleccionadas.push(this.obrasSeleccionadas[i].id.toString());
      }
    }

    if (this.tagsSeleccionados != null) {
      for (let i = 0; i < this.tagsSeleccionados.length; i++) {
        this.idTagsSeleccionados.push(this.tagsSeleccionados[i].id.toString());
      }
    }

    if (this.nombreFiltro == "") {
      this.nombreFiltro = null;
    }

    if (this.apellidoFiltro == "") {
      this.apellidoFiltro = null;
    }

    this.artistaServicio.getListFiltered(this.nombreFiltro, this.apellidoFiltro, this.idObrasSeleccionadas, this.idTagsSeleccionados).subscribe(artistas => this.artistas = artistas)

    this.idObrasSeleccionadas = [];
    this.idTagsSeleccionados = [];
  }

  limpiarFiltro() {

    this.obrasSeleccionadas = [];
    this.tagsSeleccionados = [];
    this.idObrasSeleccionadas = [];
    this.idTagsSeleccionados = [];

    this.nombreFiltro = null;
    this.apellidoFiltro = null;
  }

  borrar() {
  }

  open(artista: Artista) {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(DetalleArtistaComponent, { backdrop: true });

    modalRef.componentInstance.elemento = artista;
  }

  checkDelete(id): boolean {//Sirve para checkear si el objeto se puede borrar
    if (this.noBorrables.includes(this.artistas[id].id)) {
      return false;
    } else {
      return true;
    }
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteArtista(id);
      }
    })
  }
}
