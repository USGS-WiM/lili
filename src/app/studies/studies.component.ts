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
  selectedStudy: IStudy;
  showHideAdd: boolean = false;
  showHideEdit: boolean = false;
  studySelected: boolean;

  constructor(private _studyService: StudyService) { }

  ngOnInit():void {
      //on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
      this.studySelected = false;
      console.log("studySelected var = " + this.studySelected)
  }

  //studies table
  //set the values of the edit study form on select of study in the table
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
  //clear the edit form values when study unselected from table
  onRowUnselect(event){
    console.log("study unselected")
    this.studySelected = false;
    this.editStudyForm.setValue({
          name: '',
          description:''
        })
  }
  
  //add study form - declare a reactive form with appropriate study fields
  addStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
  });

  ///split these out
  submitted = false;
  onSubmit () {

  }
  addNewStudy() {
        this.addStudyForm.reset();
        this.submitted = false;
  }

  //edit study form - decalre a reactive form
  editStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
  });
  

}
