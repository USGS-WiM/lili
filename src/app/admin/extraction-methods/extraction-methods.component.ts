import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IExtractionMethod } from 'app/extraction-batches/extraction-method';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExtractionMethodService } from '../../extraction-batches/extraction-method.service';

@Component({
  selector: 'extractionmethods',
  templateUrl: './extraction-methods.component.html',
  styleUrls: ['./extraction-methods.component.scss']
})
export class ExtractionMethodsComponent implements OnInit {
  @Input() ExtractionMethods: Array<IExtractionMethod>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedExtractionMethod: IExtractionMethod;
  public selectedEMName: string;
  public selectedEMId: number;
  public showEMCreateError: boolean;
  public showEMEditError: boolean;
  public showEMDeleteError: boolean;
  public submitLoading: boolean;
  public showEMDeleteSuccess: boolean;
  public showEMEditSuccess: boolean;
  public showEMCreateSuccess: boolean;
  public errorMessage: string;

  // add Extraction form - declare a reactive form with appropriate Extraction fields
  addEMForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  // edit Extraction form - declare a reactive form
  editEMForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  constructor(private _route: ActivatedRoute,
    private _extractionMethodService: ExtractionMethodService,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showEMCreateError = false; this.showEMEditError = false; this.showEMDeleteError = false;
    this.showEMCreateSuccess = false; this.showEMEditSuccess = false; this.showEMDeleteSuccess = false;
    this.submitLoading = false;
  }

  public showAddModal() {
    this.showHideAdd = !this.showHideAdd;
    // reset these to false in case Add Extraction is clicked more than once
    this.showEMCreateError = false;
    this.showEMCreateSuccess = false;
  }

  public editEM(selectedExtractionMethod) {
    this.editEMForm.reset(); // reset here to ensure states are clean (instead of after update complete)
    this.showEMEditSuccess = false; // reset this
    this.showEMEditError = false; // reset this
    this.selectedEMName = selectedExtractionMethod.name;
    this.selectedEMId = selectedExtractionMethod.id;

    this.editEMForm.setValue({
      id: this.selectedEMId,
      name: this.selectedEMName
    });

    // show the edit Extraction form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateEMArray(newItem) {
    let updateItem = this.ExtractionMethods.find(this.findIndexToUpdate, newItem.id);
    let index = this.ExtractionMethods.indexOf(updateItem);
    this.ExtractionMethods[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Extraction type submit
  public onSubmitEM(formId, formValue) {
    this.showEMCreateError = false;
    this.showEMEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._extractionMethodService.update(formValue)
          .subscribe(
            (updatedExtraction) => {
              this.selectedEMName = updatedExtraction.name;
              this.updateEMArray(formValue);
              this.selectedExtractionMethod = undefined;
              this.submitLoading = false;
              this.showEMEditSuccess = true;
              this._cdr.detectChanges();
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showEMEditError = true;
            });
        break;
      case 'add':
        // add a record
        this._extractionMethodService.create(formValue)
          .subscribe(
            (newExtraction) => {
              this.ExtractionMethods.push(newExtraction);
              this.addEMForm.reset();
              this.submitLoading = false;
              this.showEMCreateSuccess = true;
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showEMCreateError = true;
            }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete concentration type modal
  public deleteEM(selectedConcentration) {
    this.showEMDeleteSuccess = false; // reset this
    this.showEMDeleteError = false; // reset this too
    this.selectedEMName = selectedConcentration.name;
    this.selectedEMId = selectedConcentration.id;
    // show the delete concentration form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }
  }

  public submitDelete() {
    // get the index to be deleted by the id
    let ind: number;
    this.ExtractionMethods.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedEMId) { ind = index; }
      return pdh.id === this.selectedEMId;
    });
    this._extractionMethodService.delete(this.selectedEMId)
      .subscribe(
        () => {
          this.selectedEMName = "";
          this.ExtractionMethods.splice(ind, 1);
          this._extractionMethodService = undefined;
          this.submitLoading = false;
          this.showEMDeleteSuccess = true;
          this._cdr.detectChanges();
        },
        error => {
          this.errorMessage = <any>error;
          this.submitLoading = false;
          this.showEMDeleteError = true;
        }
      );
  }

}
