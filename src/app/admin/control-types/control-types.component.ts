import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IControlType } from 'app/control-types/control-type';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlTypeService } from 'app/control-types/control-types.service';

@Component({
  selector: 'controltypes',
  templateUrl: './control-types.component.html',
  styleUrls: ['./control-types.component.scss']
})
export class ControlTypesComponent implements OnInit {
  @Input() ControlTypes: Array<IControlType>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedCT: IControlType;
  public selectedCTAbbrev: string;
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

  // add ControlType form - declare a reactive form with appropriate ControlType fields
  addCTForm = new FormGroup({
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('')
  });
  // edit ControlType form - declare a reactive form
  editCTForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('')
  });

  constructor(private _route: ActivatedRoute, private _controlService: ControlTypeService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showCTCreateError = false; this.showCTEditError = false; this.showCTDeleteError = false;
    this.showCTCreateSuccess = false; this.showCTEditSuccess = false; this.showCTDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal(){
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Control Type is clicked more than once
    this.showCTCreateError = false;
    this.showCTCreateSuccess = false;
  }

  public editCT(selectedCT) {
    this.editCTForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showCTEditSuccess = false; //reset this 
    this.showCTEditError = false;//reset this 
    this.selectedCTAbbrev = selectedCT.abbreviation;
    this.selectedCTName = selectedCT.name;
    this.selectedCTId = selectedCT.id;

    this.editCTForm.setValue({
      id: this.selectedCTId,
      name: this.selectedCTName,
      abbreviation: this.selectedCTAbbrev
    });

    // show the edit Unit form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateCTArray(newItem) {
    let updateItem = this.ControlTypes.find(this.findIndexToUpdate, newItem.id);
    let index = this.ControlTypes.indexOf(updateItem);
    this.ControlTypes[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Unit submit
  public onSubmitCT(formId, formValue) {
    this.showCTCreateError = false;
    this.showCTEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._controlService.update(formValue)
          .subscribe(
          (updatedCT) => {
            this.selectedCTName = updatedCT.name;
            this.selectedCTAbbrev = updatedCT.abbreviation;
            this.updateCTArray(formValue);
            this.selectedCT = undefined; 
            this.submitLoading = false;
            this.showCTEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showCTEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._controlService.create(formValue)
          .subscribe(
          (newCT) => {
            this.ControlTypes.push(newCT);
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

  // show delete Control type modal
  public deleteCT(selectedCT){
    this.showCTDeleteSuccess = false; //reset this
    this.showCTDeleteError = false; //reset this too
    this.selectedCTName = selectedCT.name;
    this.selectedCTId = selectedCT.id;
    // show the delete ct form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.ControlTypes.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedCTId) ind = index;
      return pdh.id === this.selectedCTId;
    });
    this._controlService.delete(this.selectedCTId)
    .subscribe(
      () => {
      this.selectedCTName = ""; 
      this.ControlTypes.splice(ind,1);
      this.selectedCT = undefined; 
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
