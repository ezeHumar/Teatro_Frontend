import { Component, OnInit } from '@angular/core';
import { ArtistaService } from 'src/app/servicios/artista-service';
import { Router } from '@angular/router';
import { Artista } from 'src/app/modelos/artista';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-artista',
  templateUrl: './form-artista.component.html',
  styleUrls: ['./form-artista.component.css']
})
export class FormArtistaComponent implements OnInit {

  constructor(private router: Router, private artistaServicio: ArtistaService, private imagenServicio: ImagenService, private datePipe: DatePipe) { }

  artista = new Artista();
  imagenesASubir: File[]=[];

  submited = false;
  submitError: string=null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    nickname: new FormControl,
    file: new FormControl
  })

  fechaHoy: any;//Se usa para el maximo del datepicker, para que no se seleccione una fecha mayor que hoy

  onSubmit() {
    this.submited = true;
    for (let i = 0; i < this.imagenesASubir.length; i++) {
      this.imagenServicio.post(this.imagenesASubir[i], this.imagenesASubir[i].name).subscribe(res => {
        console.log("nombre:"+res);
      });
    }
    this.artistaServicio.post(this.artista).subscribe(data => {this.router.navigate(['/artistas']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  }

  get diagnostic() { return JSON.stringify(this.artista); }

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  fileEvent(fileInput: Event) {

    this.imagenesASubir = [];
    this.artista.nombreFotos = [];

    let fotos = (fileInput.target as HTMLInputElement).files;
    for (let i = 0; i < fotos.length; i++) {
      this.imagenesASubir[i] = (fileInput.target as HTMLInputElement).files[i];
      this.artista.nombreFotos[i] = fotos[i].name;
    }
  }
}
