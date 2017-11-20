import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IFilterType } from '../../SHARED/filter-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilterTypeService } from '../../SHARED/filter-type.service';
import { IMatrix } from 'app/SHARED/matrix';

@Component({
  selector: 'filtertypes',
  templateUrl: './filter-types.component.html',
  styleUrls: ['./filter-types.component.scss']
})
export class FilterTypesComponent implements OnInit {
  @Input() FilterTypes: Array<IFilterType>;
  @Input() Matrices: Array<IMatrix>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedFilter: IFilterType;
  public selectedFilterMatrix: number;
  public selectedFilterName: string;
  public selectedFilterId: number;
  public showFilterCreateError: boolean;
  public showFilterEditError: boolean;
  public showFilterDeleteError: boolean;
  public submitLoading: boolean;
  public showFilterDeleteSuccess: boolean;
  public showFilterEditSuccess: boolean;
  public showFilterCreateSuccess: boolean;
  public errorMessage: string;

  // add Filter form - declare a reactive form with appropriate Filter fields
  addFilterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    matrix: new FormControl('', Validators.required)
  });
  // edit Filter form - declare a reactive form
  editFilterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    matrix: new FormControl('', Validators.required) // add validator for number only here
  });

  constructor(private _route: ActivatedRoute, private _filterService: FilterTypeService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showFilterCreateError = false; this.showFilterEditError = false; this.showFilterDeleteError = false;
    this.showFilterCreateSuccess = false; this.showFilterEditSuccess = false; this.showFilterDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal(){
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Filter is clicked more than once
    
    this.showFilterCreateError = false;
    this.showFilterCreateSuccess = false;
  }

  public editFilter(selectedFilter) {
    this.editFilterForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showFilterEditSuccess = false; //reset this 
    this.showFilterEditError = false;//reset this 
    this.selectedFilterMatrix = selectedFilter.matrix;
    this.selectedFilterName = selectedFilter.name;
    this.selectedFilterId = selectedFilter.id;

    this.editFilterForm.setValue({
      id: this.selectedFilterId,
      name: this.selectedFilterName,
      matrix: this.selectedFilterMatrix
    });

    // show the edit Filter form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateFilterArray(newItem) {
    let updateItem = this.FilterTypes.find(this.findIndexToUpdate, newItem.id);
    let index = this.FilterTypes.indexOf(updateItem);
    this.FilterTypes[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Filter submit
  public onSubmitFilter(formId, formValue) {
    this.showFilterCreateError = false;
    this.showFilterEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._filterService.update(formValue)
          .subscribe(
          (updatedFilter) => {
            this.selectedFilterName = updatedFilter.name;
            this.selectedFilterMatrix = updatedFilter.matrix;
            this.updateFilterArray(formValue);
            this.selectedFilter = undefined; 
            this.submitLoading = false;
            this.showFilterEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showFilterEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._filterService.create(formValue)
          .subscribe(
          (newFilter) => {
            this.FilterTypes.push(newFilter);
            this.addFilterForm.reset();
            this.submitLoading = false;
            this.showFilterCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showFilterCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete Filter type modal
  public deleteFilter(selectedFilter){
    this.showFilterDeleteSuccess = false; //reset this
    this.showFilterDeleteError = false; //reset this too
    this.selectedFilterName = selectedFilter.name;
    this.selectedFilterId = selectedFilter.id;
    // show the delete Filter form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.FilterTypes.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedFilterId) ind = index;
      return pdh.id === this.selectedFilterId;
    });
    this._filterService.delete(this.selectedFilterId)
    .subscribe(
      () => {
      this.selectedFilterName = ""; 
      this.FilterTypes.splice(ind,1);
      this.selectedFilter = undefined;
      this.submitLoading = false;
      this.showFilterDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showFilterDeleteError = true;
    }
    );
  }
}

