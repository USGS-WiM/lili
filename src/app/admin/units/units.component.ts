import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IUnit } from '../../units/unit';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../../units/unit.service';

@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
    @Input() Units: Array<IUnit>;
    public showHideAdd: boolean;
    public showHideEdit: boolean;
    public showHideDelete: boolean;
    public selectedUnit: IUnit;
    public selectedUnitDesc: string;
    public selectedUnitName: string;
    public selectedUnitId: number;
    public showUnitCreateError: boolean;
    public showUnitEditError: boolean;
    public showUnitDeleteError: boolean;
    public submitLoading: boolean;
    public showUnitDeleteSuccess: boolean;
    public showUnitEditSuccess: boolean;
    public showUnitCreateSuccess: boolean;
    public errorMessage: string;
  
    // add Unit form - declare a reactive form with appropriate Unit fields
    addUnitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    // edit Unit form - declare a reactive form
    editUnitForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  
    constructor(private _route: ActivatedRoute, private _unitService: UnitService, private _cdr: ChangeDetectorRef) { }
  
    ngOnInit() {
      this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
      this.showUnitCreateError = false; this.showUnitEditError = false; this.showUnitDeleteError = false;
      this.showUnitCreateSuccess = false; this.showUnitEditSuccess = false; this.showUnitDeleteSuccess = false;
      this.submitLoading = false;    
    }
  
    public showAddModal(){
      this.showHideAdd = !this.showHideAdd;
      //reset these to false in case Add Unit is clicked more than once
      this.showUnitCreateError = false;
      this.showUnitCreateSuccess = false;
    }
  
    public editUnit(selectedUnit) {
      this.editUnitForm.reset(); //reset here to ensure states are clean (instead of after update complete)
      this.showUnitEditSuccess = false; //reset this 
      this.showUnitEditError = false;//reset this 
      this.selectedUnitDesc = selectedUnit.description;
      this.selectedUnitName = selectedUnit.name;
      this.selectedUnitId = selectedUnit.id;
  
      this.editUnitForm.setValue({
        id: this.selectedUnitId,
        name: this.selectedUnitName,
        description: this.selectedUnitDesc
      });
  
      // show the edit Unit form if not showing already
      if (this.showHideEdit === false) {
        this.showHideEdit = true;
      }
    }
  
    private updateUnitArray(newItem) {
      let updateItem = this.Units.find(this.findIndexToUpdate, newItem.id);
      let index = this.Units.indexOf(updateItem);
      this.Units[index] = newItem;
    }
  
    private findIndexToUpdate(newItem) {
      return newItem.id === this;
    }
  
    // create or edit Unit submit
    public onSubmitUnit(formId, formValue) {
      this.showUnitCreateError = false;
      this.showUnitEditError = false;
      this.submitLoading = true;
      switch (formId) {
        case 'edit':
          // update a record
          this._unitService.update(formValue)
            .subscribe(
            (updatedUnit) => {
              this.selectedUnitName = updatedUnit.name;
              this.selectedUnitDesc = updatedUnit.description;
              this.updateUnitArray(formValue);
              this.selectedUnit = undefined; 
              this.submitLoading = false;
              this.showUnitEditSuccess = true;
              this._cdr.detectChanges(); //fix for ExpressionChangedAfterItHasBeenCheckedError (see https://github.com/angular/angular/issues/17572 )
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showUnitEditError = true;
            });
          break;
        case 'add':
          // add a record
          this._unitService.create(formValue)
            .subscribe(
            (newUnit) => {
              this.Units.push(newUnit);
              this.addUnitForm.reset();
              this.submitLoading = false;
              this.showUnitCreateSuccess = true;
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showUnitCreateError = true;
            }
            );
          break;
        default:
        // do something defaulty
      }
    }
  
    // show delete Unit type modal
    public deleteUnit(selectedUnit){
      this.showUnitDeleteSuccess = false; //reset this
      this.showUnitDeleteError = false; //reset this too
      this.selectedUnitName = selectedUnit.name;
      this.selectedUnitId = selectedUnit.id;
      // show the delete Unit form if not showing already
      if (this.showHideDelete === false) {
        this.showHideDelete = true;
      }    
    }
  
    public submitDelete(){
      //get the index to be deleted by the id
      let ind: number;
      this.Units.some((pdh, index, _ary) => {
        if (pdh.id === this.selectedUnitId) ind = index;
        return pdh.id === this.selectedUnitId;
      });
      this._unitService.delete(this.selectedUnitId)
      .subscribe(
        () => {
        this.selectedUnitName = ""; 
        this.Units.splice(ind,1);
        this.selectedUnit = undefined; // the radio button becomes unselected upon save, but Edit this One is still enabled. This disables the edit button        
        this.submitLoading = false;
        this.showUnitDeleteSuccess = true;
        this._cdr.detectChanges();
      },
      error => {
        this.errorMessage = <any>error;
        this.submitLoading = false;
        this.showUnitDeleteError = true;
      }
      );
    }
  
  }
  