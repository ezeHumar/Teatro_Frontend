import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { ActividadService } from 'src/app/servicios/actividad-service';
import { Actividad } from 'src/app/modelos/actividad';
import { Tag } from 'src/app/modelos/tag';
import { Obra } from 'src/app/modelos/obra';
import { Espacio } from 'src/app/modelos/espacio';
import { EspacioService } from 'src/app/servicios/espacio-service';
import { TagService } from 'src/app/servicios/tag-service';
import { ObraService } from 'src/app/servicios/obra-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private actividadServicio: ActividadService, private obraServicio: ObraService, private espacioServicio: EspacioService, private tagServicio: TagService, private datePipe: DatePipe) { }

  actividad =new Actividad();
  id: number;
  tags: Tag[];
  tagsSeleccionados: Tag[];
  obras: Obra[];
  espacios: Espacio[];

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    obra: new FormControl('', Validators.required),
    espacio: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    tagsSeleccionados: new FormControl('', Validators.required)

  })

  fechaHoy: any;//Se usa para el minimo del datepicker, para que no se seleccione una fecha menor que hoy

  onSubmit(){
    this.submited= true;
    this.actividadServicio.put(this.actividad).subscribe(data => {this.router.navigate(['/actividades']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.actividad);}

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.obraServicio.getList().subscribe(obras => this.obras = obras);
    this.tagServicio.getList().subscribe(tags => this.tags = tags);
    this.espacioServicio.getList().subscribe(espacios => this.espacios = espacios);
    this.actividadServicio.get(this.id).subscribe(a => this.actividad = a);
  }

}
