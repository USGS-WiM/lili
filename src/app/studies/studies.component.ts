import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IStudy } from './study';
import { StudyService } from './study.service';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit { 
  allStudies: IStudy[];
  errorMessage: string;
  // selectedStudies: IStudy[];
  selectedStudy: IStudy;
  showHideAdd;
  showHideEdit;
  studySelected: boolean;

  constructor(private _studyService: StudyService) { 

  }

  ngOnInit():void {
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
      this.studySelected = false;
      console.log("studySelected var = " + this.studySelected)
  }

//study table
  onRowSelect(event) {
        this.studySelected = true;
        console.log(event.data.study_name)
        console.log(this.selectedStudy)
        console.log("studySelected var = " + this.studySelected)
        this.editStudyForm.setValue({
          name: event.data.study_name,
          description: event.data.study_desc
        })
  }
  onRowUnselect(event){
    console.log("study unselected")
    this.studySelected = false;
    this.editStudyForm.setValue({
          name: '',
          description:''
        })
  }

  
//add study form
  addStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
  });

  ///split these out
  submitted = false;
  onSubmit () {

  }
  addNewStudy() {
        this.addStudyForm.reset();
        this.submitted = false;
  }

  //edit study form
  editStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
  });
  

}
