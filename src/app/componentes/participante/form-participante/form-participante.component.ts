import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipanteService } from 'src/app/servicios/participante-service';
import { Participante } from 'src/app/modelos/participante';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-participante',
  templateUrl: './form-participante.component.html',
  styleUrls: ['./form-participante.component.css']
})
export class FormParticipanteComponent implements OnInit {

  constructor(private router: Router, private participantesServicio: ParticipanteService, private datePipe: DatePipe) { }

  participante =new Participante();

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    birthdate: new FormControl('', Validators.required)
  })

  fechaHoy: any;//Se usa para el maximo del datepicker, para que no se seleccione una fecha mayor que hoy

  onSubmit(){
    this.submited= true;
    this.participantesServicio.post(this.participante).subscribe(data => {this.router.navigate(['/participantes']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 
  
  get diagnostic(){return JSON.stringify(this.participante);}

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }
}
