import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/modelos/participante';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ParticipanteService } from 'src/app/servicios/participante-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-participante',
  templateUrl: './editar-participante.component.html',
  styleUrls: ['./editar-participante.component.css']
})
export class EditarParticipanteComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private participanteServicio: ParticipanteService , private datePipe: DatePipe) { }

  participante =new Participante();
  id: number;

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
    this.participanteServicio.put(this.participante).subscribe(data => {this.router.navigate(['/participantes']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.participante);}

  ngOnInit(): void {
    this.fechaHoy = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    // this.u = this.umock.get(this.id);
    this.participanteServicio.get(this.id).subscribe(p => this.participante = p);
  }

}
