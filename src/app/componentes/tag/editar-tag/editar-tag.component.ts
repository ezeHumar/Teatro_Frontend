import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TagService } from 'src/app/servicios/tag-service';
import { Tag } from 'src/app/modelos/tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-tag',
  templateUrl: './editar-tag.component.html',
  styleUrls: ['./editar-tag.component.css']
})
export class EditarTagComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private tagServicio: TagService) { }

  tag =new Tag();
  id: number;

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    tag: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.submited= true;
    this.tagServicio.put(this.tag).subscribe(data => {this.router.navigate(['/tags']);}, 
      error=>{
        this.submitError=error.error;
      });
    
  } 


  get diagnostic(){return JSON.stringify(this.tag);}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get("id"));
        console.log(params.get("id"));
      }
    )
    this.tagServicio.get(this.id).subscribe(u => this.tag = u);
  }

}
