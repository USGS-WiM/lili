import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-studies-form',
  templateUrl: './studies-form.component.html',
  styleUrls: ['./studies-form.component.scss']
})

export class StudiesFormComponent implements OnInit {

  constructor(private fb: FormBuilder ) { 
  }

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
