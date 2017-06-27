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

    selectedStudyName;
    selectedStudyId;

    constructor(private _studyService: StudyService) {}

    ngOnInit(): void {
        //on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
        this._studyService.getStudies()
            .subscribe(studies => this.allStudies = studies,
                error => this.errorMessage = < any > error);
    }

    editStudy(selectedStudy) {
        //show the edit study form if not showing already
        if (this.showHideEdit === false) {
            this.showHideEdit = true;
        }

        this.selectedStudyName = selectedStudy.name;
        this.selectedStudyId = selectedStudy.id

        this.editStudyForm.setValue({
            id: selectedStudy.id,
            name: selectedStudy.name,
            description: selectedStudy.description
        })

    }

    private updateStudiesArray(newItem) {
        let updateItem = this.allStudies.find(this.findIndexToUpdate, newItem.id);

        let index = this.allStudies.indexOf(updateItem);

        this.allStudies[index] = newItem;
    }

    private findIndexToUpdate(newItem) {
        return newItem.id === this;
    }

    //add study form - declare a reactive form with appropriate study fields
    addStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
    });
    //edit study form - declare a reactive form
    editStudyForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        description: new FormControl('')
    });

    ///split these out
    submitted = false;
    onSubmit(formId, formValue) {
        switch (formId) {
            case 'edit':
                //update a record
                this._studyService.update(formValue)
                    .subscribe(study => study,
                        error => this.errorMessage = < any > error);
                this.editStudyForm.reset();
                this.updateStudiesArray(formValue);
                //this.updateStudiesArray( { "id": 4, "name": "Minnesota urban runoff study", "description": "Minnesota urban runoff study test" });
                this.showHideEdit = false;
                break;
            case 'add':
                //add a record
                this._studyService.create(formValue)
                    .subscribe(study => this.allStudies.push(formValue),
                        error => this.errorMessage = < any > error);
                this.addStudyForm.reset();
                break;
            default:
                //do something defaulty
        }


    }

}