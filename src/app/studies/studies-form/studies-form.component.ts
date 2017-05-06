import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Study } from '../../data-model'

@Component({
  selector: 'app-studies-form',
  templateUrl: './studies-form.component.html',
  styleUrls: ['./studies-form.component.scss']
})

export class StudiesFormComponent implements OnInit {
  //studyForm: FormGroup

  constructor(private fb: FormBuilder ) { 
    //this.createForm();
  }

  // createForm() {
  //   this.studyForm = this.fb.group({
  //     name: ['', Validators.required ],
  //     description: ['', Validators.required]
  //   })
  // }
  studyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
  });
  submitted = false;
  onSubmit () {

  }
  addNewStudy() {
        this.studyForm.reset();
        this.submitted = false;
    }

  ngOnInit() {

  }

}
