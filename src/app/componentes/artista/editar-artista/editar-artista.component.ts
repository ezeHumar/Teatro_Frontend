import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { Artista } from 'src/app/modelos/artista';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { IfStmt } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-artista',
  templateUrl: './editar-artista.component.html',
  styleUrls: ['./editar-artista.component.css']
})
export class EditarArtistaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private artistaServicio: ArtistaService, private imagenServicio: ImagenService, private datePipe: DatePipe) { }

  artista =new Artista();
  id: number;
  url: string= `${environment.apiUrl}` + 'upload/';

  countAux: number;

  imagenesASubir: File[]=[];//Aca guardo los archivos que selecciono el usuario y se va a subir

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    nickname: new FormControl,
    file: new FormControl
  })

  fechaHoy: any;//Se usa para el maximo del datepicker, para que no se seleccione una fecha mayor que hoy

  onSubmit(){
    this.submited= true;
    
    if( this.imagenesASubir.length!=0){
      this.countAux=0;
      for (let i = 0; i < this.imagenesASubir.length; i++) {//Se suben las imagenes al backend y tambien se guarda en el artista el nombre de las fotos subidas
        
        
        this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => { // El subscribe es asincronico, entonces uso el countAux para que
          this.countAux++;                                                                               // cuente una unidad cada vez que se sube una imagen, cuando se hayan
          this.artista.nombreFotos.push(res);                                                            // subido todas las imagenes recien ahi se modifica el usuario en la BD.
          if(this.countAux==this.imagenesASubir.length){
            this.artistaServicio.put(this.artista).subscribe(data => {this.router.navigate(['/artistas']);}, 
              error=>{
                this.submitError=error.error;
              });
          }
        });
      }
      
    }else{
      this.artistaServicio.put(this.artista).subscribe(data => {this.router.navigate(['/artistas']);}, 
        error=>{
          this.submitError=error.error;
        });
    }
  } 


  get diagnostic(){return JSON.stringify(this.artista);}

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.artistaServicio.get(this.id).subscribe(u => this.artista = u);
  }

  borrar(nombreFoto:string){
    const index: number = this.artista.nombreFotos.indexOf(nombreFoto);
    if(index !== -1){//Se borra el nombre de la foto dentro del artista
      this.artista.nombreFotos.splice(index, 1);
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
