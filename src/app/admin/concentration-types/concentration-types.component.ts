import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IConcentrationType } from '../../concentration-types/concentration-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConcentrationTypeService } from '../../concentration-types/concentration-types.service';

@Component({
  selector: 'concentrationtypes',
  templateUrl: './concentration-types.component.html',
  styleUrls: ['./concentration-types.component.scss']
})
export class ConcentrationTypesComponent implements OnInit {
  @Input() ConcentrationTypes: Array<IConcentrationType>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedConcentration: IConcentrationType;
  public selectedCTName: string;
  public selectedCTId: number;
  public showCTCreateError: boolean;
  public showCTEditError: boolean;
  public showCTDeleteError: boolean;
  public submitLoading: boolean;
  public showCTDeleteSuccess: boolean;
  public showCTEditSuccess: boolean;
  public showCTCreateSuccess: boolean;
  public errorMessage: string;

  // add concentration form - declare a reactive form with appropriate concentration fields
  addCTForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  // edit concentration form - declare a reactive form
  editCTForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  constructor(private _route: ActivatedRoute, private _concentrationService: ConcentrationTypeService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showCTCreateError = false; this.showCTEditError = false; this.showCTDeleteError = false;
    this.showCTCreateSuccess = false; this.showCTEditSuccess = false; this.showCTDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal(){
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Concentration is clicked more than once
    this.showCTCreateError = false;
    this.showCTCreateSuccess = false;
  }

  public editCT(selectedConcentration) {
    this.editCTForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showCTEditSuccess = false; //reset this 
    this.showCTEditError = false;//reset this 
    this.selectedCTName = selectedConcentration.name;
    this.selectedCTId = selectedConcentration.id;

    this.editCTForm.setValue({
      id: this.selectedCTId,
      name: this.selectedCTName
    });

    // show the edit concentration form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateCTArray(newItem) {
    let updateItem = this.ConcentrationTypes.find(this.findIndexToUpdate, newItem.id);
    let index = this.ConcentrationTypes.indexOf(updateItem);
    this.ConcentrationTypes[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit concentration type submit
  public onSubmitCT(formId, formValue) {
    this.showCTCreateError = false;
    this.showCTEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._concentrationService.update(formValue)
          .subscribe(
          (updatedConcentrationT) => {
            this.selectedCTName = updatedConcentrationT.name;
            this.updateCTArray(formValue);
            this.selectedConcentration = undefined; // the radio button becomes unselected upon save, but Edit this One is still enabled. This disables the edit button
            //this.editCTForm.reset(); // don't want to reset it. keep the content they just saved in the inputs rather than empty inputs
            this.submitLoading = false;
            this.showCTEditSuccess = true;
            this._cdr.detectChanges(); //fix for ExpressionChangedAfterItHasBeenCheckedError (see https://github.com/angular/angular/issues/17572 )
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showCTEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._concentrationService.create(formValue)
          .subscribe(
          (newConcentration) => {
            this.ConcentrationTypes.push(newConcentration);
            this.addCTForm.reset();
            this.submitLoading = false;
            this.showCTCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showCTCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete concentration type modal
  public deleteCT(selectedConcentration){
    this.showCTDeleteSuccess = false; //reset this
    this.showCTDeleteError = false; //reset this too
    this.selectedCTName = selectedConcentration.name;
    this.selectedCTId = selectedConcentration.id;
    // show the delete concentration form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.ConcentrationTypes.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedCTId) ind = index;
      return pdh.id === this.selectedCTId;
    });
    this._concentrationService.delete(this.selectedCTId)
    .subscribe(
      () => {
      this.selectedCTName = ""; 
      this.ConcentrationTypes.splice(ind,1);
      this.selectedConcentration = undefined; // the radio button becomes unselected upon save, but Edit this One is still enabled. This disables the edit button
      //this.editCTForm.reset(); // don't want to reset it. keep the content they just saved in the inputs rather than empty inputs
      this.submitLoading = false;
      this.showCTDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showCTDeleteError = true;
    }
    );
  }

}
