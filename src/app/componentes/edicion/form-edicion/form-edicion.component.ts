import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadService } from 'src/app/servicios/actividad-service';
import { EdicionService } from 'src/app/servicios/edicion-service';
import { Actividad } from 'src/app/modelos/actividad';
import { Edicion } from 'src/app/modelos/edicion';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-edicion',
  templateUrl: './form-edicion.component.html',
  styleUrls: ['./form-edicion.component.css']
})
export class FormEdicionComponent implements OnInit {

  constructor(private router: Router, private actividadServicio: ActividadService, private edicionServicio: EdicionService, private imagenServicio: ImagenService) { }

  edicion=new Edicion();
  actividades: Actividad[];
  imagenesASubir: File[]=[];

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
    for (let i = 0; i < this.imagenesASubir.length; i++) {
      this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => {
        console.log("nombre:"+res);
      });
    }
    this.edicionServicio.post(this.edicion).subscribe(data => {this.router.navigate(['/ediciones']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 
  
  get diagnostic(){return JSON.stringify(this.edicion);}

  ngOnInit(): void {
    this.actividadServicio.getList().subscribe(actividades => this.actividades = actividades);
  }

  fileEvent(fileInput: Event) {

    this.imagenesASubir = [];
    this.edicion.nombreFotos = [];

    let fotos = (fileInput.target as HTMLInputElement).files;
    for (let i = 0; i < fotos.length; i++) {
      this.imagenesASubir[i] = (fileInput.target as HTMLInputElement).files[i];
      this.edicion.nombreFotos[i] = fotos[i].name;
    }
  }

}
