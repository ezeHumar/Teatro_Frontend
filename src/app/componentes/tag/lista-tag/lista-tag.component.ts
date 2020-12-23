import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/servicios/tag-service';
import { Tag } from 'src/app/modelos/tag';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-tag',
  templateUrl: './lista-tag.component.html',
  styleUrls: ['./lista-tag.component.css']
})
export class ListaTagComponent implements OnInit {

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private tagServicio: TagService) { }

  submitError: string;

  tags: Tag[] = [];

  noBorrables: number[] = [];

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.tagServicio.refreshNeeded$
      .subscribe(() => {
        this.gettags();
      });
    this.gettags();
    this.getTagsNoBorrables();
  }

  gettags(): void {
    this.tagServicio.getList().subscribe(tags =>{
      this.tags = tags;
      this.listaCargada=true;
    });
  }

  getTagsNoBorrables(): void {
    this.tagServicio.getNoBorrables().subscribe(tagsNoBorrables => this.noBorrables = tagsNoBorrables);
  }

  checkDelete(id): boolean {//Sirve para checkear si el objeto se puede borrar
    if (this.noBorrables.includes(this.tags[id].id)) {
      return false;
    } else {
      return true;
    }
  }

  deleteTag(id: number) {
    this.tagServicio.delete(id).subscribe(data => this.submitError = null,
      error => {
        this.submitError = error.error;
      });
  }

  irDetalle(id) {
    this.router.navigate(['/tags/detalle/', id]);
    console.log(id);
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteTag(id);
      }
    })
  }


}
