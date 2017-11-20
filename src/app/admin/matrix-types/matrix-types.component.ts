import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IMatrix } from '../../SHARED/matrix';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatrixService } from 'app/SHARED/matrix.service';

@Component({
  selector: 'matrices',
  templateUrl: './matrix-types.component.html',
  styleUrls: ['./matrix-types.component.scss']
})
export class MatrixTypesComponent implements OnInit {
  @Input() MatrixTypes: Array<IMatrix>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedMatrix: IMatrix;
  public selectedMatrixCode: string;
  public selectedMatrixName: string;
  public selectedMatrixId: number;
  public showMatrixCreateError: boolean;
  public showMatrixEditError: boolean;
  public showMatrixDeleteError: boolean;
  public submitLoading: boolean;
  public showMatrixDeleteSuccess: boolean;
  public showMatrixEditSuccess: boolean;
  public showMatrixCreateSuccess: boolean;
  public errorMessage: string;

  // add Matrix form - declare a reactive form with appropriate Matrix fields
  addMatrixForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  });
  // edit Matrix form - declare a reactive form
  editMatrixForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required) 
  });

  constructor(private _route: ActivatedRoute, private _matrixService: MatrixService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showMatrixCreateError = false; this.showMatrixEditError = false; this.showMatrixDeleteError = false;
    this.showMatrixCreateSuccess = false; this.showMatrixEditSuccess = false; this.showMatrixDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal() {
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Filter is clicked more than once
    this.showMatrixCreateError = false;
    this.showMatrixCreateSuccess = false;
  }

  public editMatrix(selectedMatrix) {
    this.editMatrixForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showMatrixEditSuccess = false; //reset this 
    this.showMatrixEditError = false;//reset this 
    this.selectedMatrixCode = selectedMatrix.code;
    this.selectedMatrixName = selectedMatrix.name;
    this.selectedMatrixId = selectedMatrix.id;

    this.editMatrixForm.setValue({
      id: this.selectedMatrixId,
      name: this.selectedMatrixName,
      code: this.selectedMatrixCode
    });

    // show the edit Filter form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateMatrixArray(newItem) {
    let updateItem = this.MatrixTypes.find(this.findIndexToUpdate, newItem.id);
    let index = this.MatrixTypes.indexOf(updateItem);
    this.MatrixTypes[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Filter submit
  public onSubmitMatrix(formId, formValue) {
    this.showMatrixCreateError = false;
    this.showMatrixEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._matrixService.update(formValue)
          .subscribe(
          (updatedMatrix) => {
            this.selectedMatrixName = updatedMatrix.name;
            this.selectedMatrixCode = updatedMatrix.code;
            this.updateMatrixArray(formValue);
            this.selectedMatrix = undefined; 
            this.submitLoading = false;
            this.showMatrixEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showMatrixEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._matrixService.create(formValue)
          .subscribe(
          (newMatrix) => {
            this.MatrixTypes.push(newMatrix);
            this.addMatrixForm.reset();
            this.submitLoading = false;
            this.showMatrixCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showMatrixCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete Matrix type modal
  public deleteMatrix(selectedMatrix){
    this.showMatrixDeleteSuccess = false; //reset this
    this.showMatrixDeleteError = false; //reset this too
    this.selectedMatrixName = selectedMatrix.name;
    this.selectedMatrixId = selectedMatrix.id;
    // show the delete Filter form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.MatrixTypes.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedMatrixId) ind = index;
      return pdh.id === this.selectedMatrixId;
    });
    this._matrixService.delete(this.selectedMatrixId)
    .subscribe(
      () => {
      this.selectedMatrixName = ""; 
      this.MatrixTypes.splice(ind,1);
      this.selectedMatrix = undefined;
      this.submitLoading = false;
      this.showMatrixDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showMatrixDeleteError = true;
    }
    );
  }

}

