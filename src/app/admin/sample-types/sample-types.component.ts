import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISampleType } from '../../SHARED/sample-type';
import { SampleTypeService } from '../../SHARED/sample-type.service';

@Component({
  selector: 'sampletypes',
  templateUrl: './sample-types.component.html',
  styleUrls: ['./sample-types.component.scss']
})
export class SampleTypesComponent implements OnInit {
  @Input() SampleTypes: Array<ISampleType>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedST: ISampleType;
  public selectedSTCode: string;
  public selectedSTName: string;
  public selectedSTId: number;
  public showSTCreateError: boolean;
  public showSTEditError: boolean;
  public showSTDeleteError: boolean;
  public submitLoading: boolean;
  public showSTDeleteSuccess: boolean;
  public showSTEditSuccess: boolean;
  public showSTCreateSuccess: boolean;
  public errorMessage: string;

  // add Sample form - declare a reactive form with appropriate Sample fields
  addSTForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  });
  // edit Sample form - declare a reactive form
  editSTForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required) 
  });

  constructor(private _route: ActivatedRoute, private _stService: SampleTypeService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showSTCreateError = false; this.showSTEditError = false; this.showSTDeleteError = false;
    this.showSTCreateSuccess = false; this.showSTEditSuccess = false; this.showSTDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal() {
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Sample Type is clicked more than once
    this.showSTCreateError = false;
    this.showSTCreateSuccess = false;
  }

  public editST(selectedST) {
    this.editSTForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showSTEditSuccess = false; //reset this 
    this.showSTEditError = false;//reset this 
    this.selectedSTCode = selectedST.code;
    this.selectedSTName = selectedST.name;
    this.selectedSTId = selectedST.id;

    this.editSTForm.setValue({
      id: this.selectedSTId,
      name: this.selectedSTName,
      code: this.selectedSTCode
    });

    // show the edit Sample Type form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateSTArray(newItem) {
    let updateItem = this.SampleTypes.find(this.findIndexToUpdate, newItem.id);
    let index = this.SampleTypes.indexOf(updateItem);
    this.SampleTypes[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Filter submit
  public onSubmitST(formId, formValue) {
    this.showSTCreateError = false;
    this.showSTEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._stService.update(formValue)
          .subscribe(
          (updatedST) => {
            this.selectedSTName = updatedST.name;
            this.selectedSTCode = updatedST.code;
            this.updateSTArray(formValue);
            this.selectedST = undefined; 
            this.submitLoading = false;
            this.showSTEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showSTEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._stService.create(formValue)
          .subscribe(
          (newST) => {
            this.SampleTypes.push(newST);
            this.addSTForm.reset();
            this.submitLoading = false;
            this.showSTCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showSTCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete sample type modal
  public deleteST(selectedST){
    this.showSTDeleteSuccess = false; //reset this
    this.showSTDeleteError = false; //reset this too
    this.selectedSTName = selectedST.name;
    this.selectedSTId = selectedST.id;
    // show the delete Filter form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.SampleTypes.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedSTId) ind = index;
      return pdh.id === this.selectedSTId;
    });
    this._stService.delete(this.selectedSTId)
    .subscribe(
      () => {
      this.selectedSTName = ""; 
      this.SampleTypes.splice(ind,1);
      this.selectedST = undefined;
      this.submitLoading = false;
      this.showSTDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showSTDeleteError = true;
    }
    );
  }
}

