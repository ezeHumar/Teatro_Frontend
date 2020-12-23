import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { Espacio } from 'src/app/modelos/espacio';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-espacio',
  templateUrl: './editar-espacio.component.html',
  styleUrls: ['./editar-espacio.component.css']
})
export class EditarEspacioComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private espacioServicio: EspacioService) { }

  espacios: Espacio[];
  espacio =new Espacio();
  center: google.maps.LatLngLiteral;
  position: google.maps.LatLng = new google.maps.LatLng(0,0);
  id: number;

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
    this.espacioServicio.put(this.espacio).subscribe(data => {this.router.navigate(['/espacios']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.espacio);}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.espacioServicio.get(this.id).subscribe((e) => {
      this.espacio = e;
      this.center = {
        lat: this.espacio.ubicacion.latitud,
        lng: this.espacio.ubicacion.longitud,
      }
      this.position = new google.maps.LatLng(this.espacio.ubicacion.latitud, this.espacio.ubicacion.longitud);
    });
    
  }

  click(event: google.maps.MouseEvent) { //Se obtiene la latitud y longitud clickeada por el usuario u se la aigna a la variable ubicacion, y tambien a la variable posicion, que es el marker
    this.espacio.ubicacion.latitud=event.latLng.lat();
    this.espacio.ubicacion.longitud=event.latLng.lng();
    this.position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
  }  

}