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

    showStudyCreateError: boolean = false;
    showStudyEditError: boolean = false;

    showStudyCreateSuccess: boolean = false;
    showStudyEditSuccess: boolean = false;

    studiesLoading: boolean = false;

    selectedStudyName;
    selectedStudyId;

    createdStudyID;

    submitLoading: boolean = false;

    // add study form - declare a reactive form with appropriate study fields
    addStudyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
    });
    // edit study form - declare a reactive form
    editStudyForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        description: new FormControl('')
    });

    constructor(private _studyService: StudyService) { }

    ngOnInit(): void {
        this.studiesLoading = true;
        // on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
        this._studyService.getStudies()
            .subscribe(
                (studies) => {
                    this.allStudies = studies;
                    this.studiesLoading = false;
                },
                (error) => {
                    this.errorMessage = <any>error
                }
            );
    }

    editStudy(selectedStudy) {

        this.showStudyEditSuccess = false;
        this.showStudyEditError = false;

        this.selectedStudyName = selectedStudy.name;
        this.selectedStudyId = selectedStudy.id;

        this.editStudyForm.setValue({
            id: selectedStudy.id,
            name: selectedStudy.name,
            description: selectedStudy.description
        });

        // show the edit study form if not showing already
        if (this.showHideEdit === false) {
            this.showHideEdit = true;
        }

    }

    private updateStudiesArray(newItem) {
        let updateItem = this.allStudies.find(this.findIndexToUpdate, newItem.id);

        let index = this.allStudies.indexOf(updateItem);

        this.allStudies[index] = newItem;
    }

    private findIndexToUpdate(newItem) {
        return newItem.id === this;
    }

    // split these out
    onSubmitStudy(formId, formValue) {
        this.createdStudyID = null;
        this.showStudyCreateError = false;
        this.showStudyEditError = false;
        this.submitLoading = true;
        switch (formId) {
            case 'edit':
                // update a record
                this._studyService.update(formValue)
                    .subscribe(
                        (study) => {
                            this.updateStudiesArray(formValue);
                            this.editStudyForm.reset();
                            this.submitLoading = false;
                            this.showStudyEditSuccess = true;
                        },
                        error => {
                            this.errorMessage = <any>error;
                            this.submitLoading = false;
                            this.showStudyEditError = true;
                        }
                    );
                break;
            case 'add':
                // add a record
                this._studyService.create(formValue)
                    .subscribe(
                        (study) => {
                            this.allStudies.push(study);
                            this.addStudyForm.reset();
                            this.submitLoading = false;
                            this.showStudyCreateSuccess = true;
                            this.createdStudyID = study.id;
                        },
                        error => {
                            this.errorMessage = <any>error;
                            this.submitLoading = false;
                            this.showStudyCreateError = true;
                        }
                    );
                break;
            default:
            // do something defaulty
        }


    }

}