import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/servicios/tag-service';
import { Tag } from 'src/app/modelos/tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.css']
})
export class FormTagComponent implements OnInit {

  constructor(private router: Router, private tagServicio: TagService) { }

  tag =new Tag();

  submited= false;
  submitError: string=null;

  form = new FormGroup({
    tag: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.submited= true;
    this.tagServicio.post(this.tag).subscribe(data => {this.router.navigate(['/tags'])}, 
      error=>{
        this.submitError=error.error;
      });
  } 
  
  get diagnostic(){return JSON.stringify(this.tag);}

  ngOnInit(): void {
  }


}
