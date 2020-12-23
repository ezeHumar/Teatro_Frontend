import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObraService } from 'src/app/servicios/obra-service';
import { Obra } from 'src/app/modelos/obra';
import { Artista } from 'src/app/modelos/artista';
import { Tag } from 'src/app/modelos/tag';
import { TagService } from 'src/app/servicios/tag-service';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-obra',
  templateUrl: './editar-obra.component.html',
  styleUrls: ['./editar-obra.component.css']
})
export class EditarObraComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private obraServicio: ObraService, private artistaServicio: ArtistaService, private tagServicio: TagService, private imagenServicio: ImagenService) { }

  id: number;

  obra =new Obra();
  artistas: Artista[];
  artistasSeleccionados: Artista[];
  tags: Tag[];
  tagsSeleccionados: Tag[];
  
  url: string= `${environment.apiUrl}` + 'upload/';
  imagenesASubir: File[]=[];//Aca guardo los archivos que selecciono el usuario y se va a subir
  countAux: number;

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
    // this.obra.artistaParticipante=this.artistasSeleccionados;
    // this.obra.tags=this.tagsSeleccionados
    if( this.imagenesASubir.length!=0){
      this.countAux=0;
      for (let i = 0; i < this.imagenesASubir.length; i++) {//Se suben las imagenes al backend y tambien se guarda en el artista el nombre de las fotos subidas
        

        this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => { // El subscribe es asincronico, entonces uso el countAux para que
          this.countAux++;                                                                               // cuente una unidad cada vez que se sube una imagen, cuando se hayan
          this.obra.nombreFotos.push(res);                                                            // subido todas las imagenes recien ahi se modifica el usuario en la BD.
          if(this.countAux==this.imagenesASubir.length){
            this.obraServicio.put(this.obra).subscribe(data => {this.router.navigate(['/obras']);}, 
              error=>{
                this.submitError=error.error;
              });
          }
        });
      }
      
    }else{
      this.obraServicio.put(this.obra).subscribe(data => {this.router.navigate(['/obras']);}, 
        error=>{
          this.submitError=error.error;
        });
    }
    this.obraServicio.put(this.obra).subscribe(data => {this.router.navigate(['/obras']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.obra);}

  ngOnInit(): void {
    this.artistaServicio.getList().subscribe(artistas => this.artistas = artistas);
    this.tagServicio.getList().subscribe(tags => this.tags = tags);

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    // this.u = this.umock.get(this.id);
    this.obraServicio.get(this.id).subscribe(obra => this.obra = obra);
    this.artistasSeleccionados=this.obra.artistaParticipante;
    this.tagsSeleccionados=this.obra.tags;
  }


  borrar(nombreFoto:string){
    const index: number = this.obra.nombreFotos.indexOf(nombreFoto);
    if(index !== -1){//Se borra el nombre de la foto dentro de la obra
      this.obra.nombreFotos.splice(index, 1);
      console.log("borrado:" + nombreFoto);
    }
    this.imagenServicio.delete(nombreFoto).subscribe();
  }

  fileEvent(fileInput: Event) {
    let fotos = (fileInput.target as HTMLInputElement).files;
    for (let i = 0; i < fotos.length; i++) {
      this.imagenesASubir[i] = (fileInput.target as HTMLInputElement).files[i];
    }
  }
}
