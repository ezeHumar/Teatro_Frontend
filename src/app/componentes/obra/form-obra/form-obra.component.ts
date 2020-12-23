import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObraService } from 'src/app/servicios/obra-service';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { TagService } from 'src/app/servicios/tag-service';
import { Obra } from 'src/app/modelos/obra';
import { Artista } from 'src/app/modelos/artista';
import { Tag } from 'src/app/modelos/tag';
import { timestamp } from 'rxjs/operators';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-obra',
  templateUrl: './form-obra.component.html',
  styleUrls: ['./form-obra.component.css']
})
export class FormObraComponent implements OnInit {

  constructor(private router: Router, private obraServicio: ObraService, private artistaServicio: ArtistaService, private tagServicio: TagService, private imagenServicio: ImagenService) { }

  obras: Obra[];
  obra =new Obra();
  artistas: Artista[];
  artistasSeleccionados: Artista[];
  tags: Tag[];
  tagsSeleccionados: Tag[];
  imagenesASubir: File[]=[];

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    artistasSeleccionados: new FormControl('', Validators.required),
    tagsSeleccionados: new FormControl('', Validators.required),
    file: new FormControl
  })

  onSubmit(){
    this.submited= true;
    for (let i = 0; i < this.imagenesASubir.length; i++) {
      this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => {
        console.log("nombre:"+res);
      });
    }
    // this.obra.setArtistaParticipante(this.artistasSeleccionados);
    // this.obra.setTags(this.tagsSeleccionados);
    this.obraServicio.post(this.obra).subscribe(data => {this.router.navigate(['/obras']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 
  
  get diagnostic(){return JSON.stringify(this.obra);}

  ngOnInit(): void {
    
    this.artistaServicio.getList().subscribe(artistas => this.artistas = artistas);
    this.tagServicio.getList().subscribe(tags => this.tags = tags);
  }

  fileEvent(fileInput: Event) {

    this.imagenesASubir = [];
    this.obra.nombreFotos = [];

    let fotos = (fileInput.target as HTMLInputElement).files;
    for (let i = 0; i < fotos.length; i++) {
      this.imagenesASubir[i] = (fileInput.target as HTMLInputElement).files[i];
      this.obra.nombreFotos[i] = fotos[i].name;
    }
  }
}
