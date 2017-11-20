import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ITarget } from '../../targets/target';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TargetService } from '../../targets/target.service';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {
  @Input() Targets: Array<ITarget>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;
  public selectedTarget: ITarget;
  public selectedTargetNote: string;
  public selectedTargetType: string;
  public selectedTargetCode: string;
  public selectedTargetName: string;
  public selectedTargetId: number;
  public showTargetCreateError: boolean;
  public showTargetEditError: boolean;
  public showTargetDeleteError: boolean;
  public submitLoading: boolean;
  public showTargetDeleteSuccess: boolean;
  public showTargetEditSuccess: boolean;
  public showTargetCreateSuccess: boolean;
  public errorMessage: string;

  // add Sample form - declare a reactive form with appropriate Sample fields
  addTargetForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl(''),
    nucleic_acid_type: new FormControl('', Validators.required),
    notes: new FormControl('')
  });
  // edit Sample form - declare a reactive form
  editTargetForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    code: new FormControl(''),
    nucleic_acid_type: new FormControl('', Validators.required),
    notes: new FormControl('')
  });

  constructor(private _route: ActivatedRoute, private _targetService: TargetService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showTargetCreateError = false; this.showTargetEditError = false; this.showTargetDeleteError = false;
    this.showTargetCreateSuccess = false; this.showTargetEditSuccess = false; this.showTargetDeleteSuccess = false;
    this.submitLoading = false;    
  }

  public showAddModal() {
    this.showHideAdd = !this.showHideAdd;
    //reset these to false in case Add Sample Type is clicked more than once
    this.showTargetCreateError = false;
    this.showTargetCreateSuccess = false;
  }

  public editTarget(selectedTarget) {
    this.editTargetForm.reset(); //reset here to ensure states are clean (instead of after update complete)
    this.showTargetEditSuccess = false; //reset this 
    this.showTargetEditError = false;//reset this 
    this.selectedTargetNote = selectedTarget.notes;
    this.selectedTargetType = selectedTarget.nucleic_acid_type;
    this.selectedTargetCode = selectedTarget.code;
    this.selectedTargetName = selectedTarget.name;
    this.selectedTargetId = selectedTarget.id;

    this.editTargetForm.setValue({
      id: this.selectedTargetId,
      name: this.selectedTargetName,
      code: this.selectedTargetCode,
      nucleic_acid_type: this.selectedTargetType,
      notes: this.selectedTargetNote
    });

    // show the edit Sample Type form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateTargetArray(newItem) {
    let updateItem = this.Targets.find(this.findIndexToUpdate, newItem.id);
    let index = this.Targets.indexOf(updateItem);
    this.Targets[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Filter submit
  public onSubmitTarget(formId, formValue) {
    this.showTargetCreateError = false;
    this.showTargetEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._targetService.update(formValue)
          .subscribe(
          (updatedTarget) => {
            this.selectedTargetName = updatedTarget.name;
            this.selectedTargetCode = updatedTarget.code;
            this.selectedTargetType = updatedTarget.nucleic_acid_type;
            this.selectedTargetNote = updatedTarget.notes;
            this.updateTargetArray(formValue);
            this.selectedTarget = undefined; 
            this.submitLoading = false;
            this.showTargetEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showTargetEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._targetService.create(formValue)
          .subscribe(
          (newST) => {
            this.Targets.push(newST);
            this.addTargetForm.reset();
            this.submitLoading = false;
            this.showTargetCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showTargetCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete sample type modal
  public deleteTarget(selectedST){
    this.showTargetDeleteSuccess = false; //reset this
    this.showTargetDeleteError = false; //reset this too
    this.selectedTargetName = selectedST.name;
    this.selectedTargetId = selectedST.id;
    // show the delete Filter form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.Targets.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedTargetId) ind = index;
      return pdh.id === this.selectedTargetId;
    });
    this._targetService.delete(this.selectedTargetId)
    .subscribe(
      () => {
      this.selectedTargetName = ""; 
      this.Targets.splice(ind,1);
      this.selectedTarget = undefined;
      this.submitLoading = false;
      this.showTargetDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showTargetDeleteError = true;
    }
    );
  }
}

