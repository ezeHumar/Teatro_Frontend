import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/modelos/actividad';
import { Edicion } from 'src/app/modelos/edicion';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EdicionService } from 'src/app/servicios/edicion-service';
import { ActividadService } from 'src/app/servicios/actividad-service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-edicion',
  templateUrl: './editar-edicion.component.html',
  styleUrls: ['./editar-edicion.component.css']
})
export class EditarEdicionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private edicionServicio: EdicionService, private actividadServicio: ActividadService, private imagenServicio: ImagenService) { }

  id: number;

  edicion =new Edicion();
  actividades: Actividad[];
  actividadesSeleccionadas: Actividad[];

  countAux: number;
  url: string= `${environment.apiUrl}` + 'upload/';
  imagenesASubir: File[]=[];//Aca guardo los archivos que selecciono el usuario y se va a subir

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dateStart: new FormControl('', Validators.required),
    timeStart: new FormControl('', Validators.required),
    dateEnd: new FormControl('', Validators.required),
    timeEnd: new FormControl('', Validators.required),
    actividadesSeleccionadas: new FormControl('', Validators.required),
    file: new FormControl

  })


  onSubmit(){
    this.submited= true;

    if( this.imagenesASubir.length!=0){
      this.countAux=0;
      for (let i = 0; i < this.imagenesASubir.length; i++) {//Se suben las imagenes al backend y tambien se guarda en la edicion el nombre de las fotos subidas
        
        
        this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => { // El subscribe es asincronico, entonces uso el countAux para que
          this.countAux++;                                                                               // cuente una unidad cada vez que se sube una imagen, cuando se hayan
          this.edicion.nombreFotos.push(res);                                                            // subido todas las imagenes recien ahi se modifica el usuario en la BD.
          if(this.countAux==this.imagenesASubir.length){
            this.edicionServicio.put(this.edicion).subscribe(data => {this.router.navigate(['/ediciones'])}, 
              error=>{
                this.submitError=error.error;
              });
          }
        });
      }
      
    }else{
      this.edicionServicio.put(this.edicion).subscribe(data => {this.router.navigate(['/ediciones'])}, 
        error=>{
          this.submitError=error.error;
        });
    }
    this.edicionServicio.put(this.edicion).subscribe(data => {this.router.navigate(['/ediciones'])}, 
      error=>{
        this.submitError=error.error;
      });
  } 


  // get diagnostic(){return JSON.stringify(this.edicion);}

  ngOnInit(): void {
    this.actividadServicio.getList().subscribe(actividades => this.actividades = actividades);
    
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.edicionServicio.get(this.id).subscribe(edicion => this.edicion = edicion);
    this.actividadesSeleccionadas=this.edicion.actividades;
  }

  borrar(nombreFoto:string){
    const index: number = this.edicion.nombreFotos.indexOf(nombreFoto);
    if(index !== -1){//Se borra el nombre de la foto dentro del artista
      this.edicion.nombreFotos.splice(index, 1);
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
