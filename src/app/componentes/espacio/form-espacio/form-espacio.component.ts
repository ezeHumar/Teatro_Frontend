import { Component, OnInit } from '@angular/core';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { Router } from '@angular/router';
import { Espacio } from 'src/app/modelos/espacio';
import { Direccion } from 'src/app/modelos/direccion';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-espacio',
  templateUrl: './form-espacio.component.html',
  styleUrls: ['./form-espacio.component.css']
})
export class FormEspacioComponent implements OnInit {
  

  constructor(private router: Router, private espacioServicio: EspacioService) { 

  }

  center: google.maps.LatLngLiteral
  ubicacion = new Direccion();
  espacio = new Espacio();
  position: google.maps.LatLng = new google.maps.LatLng(0,0);

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    open: new FormControl

  })

  onSubmit(){
    this.submited= true;
    this.espacio.setUbicacion(this.ubicacion);
    this.espacioServicio.post(this.espacio).subscribe(data => {this.router.navigate(['/espacios']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 

  get diagnostic(){return JSON.stringify(this.espacio);}
  

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => { //Utiliza la ubicacion del usuario para central el mapa. Igual no anda, creo que es por la api
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  click(event: google.maps.MouseEvent) { //Se obtiene la latitud y longitud clickeada por el usuario u se la aigna a la variable ubicacion, y tambien a la variable posicion, que es el marker
    this.ubicacion.latitud=event.latLng.lat();
    this.ubicacion.longitud=event.latLng.lng();
    this.position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
  }  
}
