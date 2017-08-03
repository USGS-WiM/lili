import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISample } from './sample'
import { ISampleType } from '../SHARED/sample-type';
import { IFilterType } from '../SHARED/filter-type'
import { IMatrix } from '../SHARED/matrix';
import { IStudy } from '../studies/study';
import { IUnit } from '../SHARED/unit';
import { IUser } from '../SHARED/user';

import { SampleService } from './sample.service';
import { SampleTypeService } from '../SHARED/sample-type.service';
import { FilterTypeService } from '../SHARED/filter-type.service'
import { MatrixService } from '../SHARED/matrix.service';
import { StudyService } from '../studies/study.service'
import { UnitService } from '../SHARED/unit.service';
import { UserService } from '../SHARED/user.service';

import { StudyFilter } from '../FILTERS/study-filter/study-filter.component'

import { APP_UTILITIES } from '../app.utilities'

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  allSamples: ISample[];
  sampleTypes: ISampleType[];
  filterTypes: IFilterType[];
  matrices: IMatrix[];
  studies: IStudy[];
  units: IUnit[];
  users: IUser[];
  errorMessage: string;
  selectedSample: ISample;
  showHideAdd: boolean = false;
  showHideEdit: boolean = false;
  showHideABModal: boolean = false;
  showHideFreezeModal: boolean = false;
  showHidePrintModal: boolean = false;
  sampleSelected: boolean = false;
  displayConfig:Object = {};
  selectedSampleId;
  //following 3 vars hold the 'value' property for the corresponding html select dropdowns - needed to update dropdown for editSample form
  matrixStoredValue: String;
  sampleTypeStoredValue: number;
  studyStoredValue;
  //var to hold the currently selected matrix; used to determine which inputs to show
  matrixSelected: IMatrix;
  unitValue;

  onlyOneStudySelected: boolean;

  selected: ISample[] = [];

  selectedStudy: number;

  constructor(private _sampleService: SampleService,  private _studyService: StudyService, private _sampleTypeService: SampleTypeService, private _filterTypeService: FilterTypeService, private _matrixService: MatrixService, private _unitService: UnitService, private _userService: UserService ) { }

  ngOnInit():void {

      //on init, get sample form config object from App Utilities and se to local displayConfig var
      this.displayConfig = APP_UTILITIES.SAMPLE_FORM_CONFIG;

      //on init, call getSamples function of the SampleService, set results to the allSamples var
      this._sampleService.getSamples()
        .subscribe(samples => this.allSamples = samples,
                    error => this.errorMessage = <any>error);
  
      //on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
      this._sampleTypeService.getSampleTypes()
        .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
                    error => this.errorMessage = <any>error);

       //on init, call getFilterTypes function of the SampleTypeService, set results to the sampleTypes var
      this._filterTypeService.getFilterTypes()
        .subscribe(filterTypes => this.filterTypes = filterTypes,
                    error => this.errorMessage = <any>error);

       //on init, call getMatrices function of the MatrixService, set results to the matrices var
      this._matrixService.getMatrices()
        .subscribe(matrices => this.matrices = matrices,
                    error => this.errorMessage = <any>error);

      //on init, call getStudies function of the StudyService, set results to the studies var
      this._studyService.getStudies()
        .subscribe(studies => this.studies = studies,
                    error => this.errorMessage = <any>error);

      //on init, call getUnits function of the UnitService, set results to the units var
      this._unitService.getUnits()
        .subscribe(units => this.units = units,
                    error => this.errorMessage = <any>error);

      //on init, call getUsers function of the UserService, set results to the units var
      this._userService.getUsers()
        .subscribe(users => this.users = users,
                    error => this.errorMessage = <any>error);

  }

  onUnitChange (unitValue) {
    //sets the var unitValue used for meter reading unit display
    this.unitValue = parseInt(unitValue);
  }

  addSampleToAB(selectedSampleArray) {
    //show the AB modal if not showing already
    if (this.showHideABModal === false) {
        this.showHideABModal = true;
    }
  
  }

  freezeSample(selectedSampleArray) {

    //assign the onlyOneStudySelected var to the output of an Array.prototype.every() function which checks if all the values for study are the same in the selected samples array
    this.onlyOneStudySelected = selectedSampleArray.every(
      function(value, _, array){
        return array[0].study === value.study;
    });

    //alert user they are attempting to select a set of studies for freezing that belong to more than one study (TODO: improve this)
    if (this.onlyOneStudySelected == false ) {
      alert("You have selected samples to freeze from more than one study. Do you wish to continue?")
    };

    //show the freeze modal if not showing already
    if (this.showHideFreezeModal === false) {
        this.showHideFreezeModal = true;
    }

    this.selectedStudy = this.selected[0].study
  }

   printLabel(selectedSampleArray) {
    //show the AB modal if not showing already
    if (this.showHidePrintModal === false) {
        this.showHidePrintModal = true;
    }
  
  }

  editSample(selectedSample) {

    //show the edit sample modal if not showing already
    if (this.showHideEdit === false) {
        this.showHideEdit = true;
    }
  
    //sets the var unitValue used for meter reading unit display
    this.unitValue = selectedSample.meter_reading_unit;

    this.editSampleForm.setValue({
      id: selectedSample.id,
      matrix_type:  selectedSample.matrix_type,
      study: selectedSample.study,
      sample_type: selectedSample.sample_type,
      collaborator_sample_id: selectedSample.collaborator_sample_id,
      filter_flag: selectedSample.filter_flag, 
      secondary_concentration_flag: selectedSample.secondary_concentration_flag, 
      study_site_name: selectedSample.study_site_name,
      sample_description: selectedSample.sample_description,
      sampler_name:  selectedSample.sampler_name,
      sample_notes: selectedSample.sample_notes,
      arrival_date: selectedSample.arrival_date,
      arrival_notes: selectedSample.arrival_notes,
      collection_start_date: selectedSample.collection_start_date,
      collection_start_time: selectedSample.collection_start_time,
      collection_end_date: selectedSample.collection_end_date,
      collection_end_time: selectedSample.collection_end_time,
      sample_volume_filtered: selectedSample.sample_volume_filtered,
      pump_flow_rate: selectedSample.pump_flow_rate,
      meter_reading_initial: selectedSample.meter_reading_initial,
      meter_reading_final: selectedSample.meter_reading_final,
      meter_reading_unit: selectedSample.meter_reading_unit,
      total_volume_sampled_initial:selectedSample.total_volume_sampled_initial,
      total_volume_sampled_unit_initial: selectedSample.total_volume_sampled_unit_initial,
      total_volume_sampled: selectedSample.total_volume_sampled,
      post_dilution_volume: selectedSample.post_dilution_volume,
      filter_type: selectedSample.filter_type,
      filter_born_on_date: selectedSample.filter_born_on_date,
      air_subsample_volume: selectedSample.air_subsample_volume,
      elution_date: selectedSample.elution_date,
      elution_notes: selectedSample.elution_notes,
      technician_initials: selectedSample.technician_initials,
      sample_volume_initial: selectedSample.sample_volume_initial
    })

    this.sampleSelected = true;

  }

  onMatrixSelect(selectedMatrix) {
    //value stored in dropdown is matrix_cd, i.e. abbreviation
    console.log("Matrix selected:" + selectedMatrix);
        //loop through displayConfig variables for the selected matrix, from the config JSON file (all boolean)
        for (var property in this.displayConfig[selectedMatrix]) {
            switch(this.displayConfig[selectedMatrix][property]) { 
            case (true): { 
              //if disabled == true, disable corresponding control
              this.addSampleForm.controls[property].disable();
                  break; 
              } 
              case (false): { 
                //if disabled == false, enable corresponding control
                  this.addSampleForm.controls[property].enable();
                  break; 
              } 
              default: { 
                  //default to enabled
                  this.addSampleForm.controls[property].enable();
                  break; 
              } 
            } 
        }   
  }

  private updateSamplesArray(newItem) {
        let updateItem = this.allSamples.find(this.findIndexToUpdate, newItem.id);

        let index = this.allSamples.indexOf(updateItem);

        this.allSamples[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
      return newItem.id === this;
  }


  //add sample form - declare reactive form with appropriate sample fields
  addSampleForm = new FormGroup({
    //the following controls apply to every sample record, regardless of matrix selected
    matrix_type: new FormControl('', Validators.required), 
    study: new FormControl('', Validators.required),  //study name, maps to study id
    sample_type: new FormControl('', Validators.required),
    collaborator_sample_id: new FormControl('', Validators.required),
    filter_flag: new FormControl(false, Validators.required), //radio button
    secondary_concentration_flag: new FormControl(false, Validators.required), //radio button
    study_site_name: new FormControl('', ),
    sample_description: new FormControl(''),
    sampler_name:  new FormControl(''),
    sample_notes: new FormControl(''),
    arrival_date: new FormControl(''),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl('',Validators.required),

    //the following controls have variable display needs based on the matrix selected
    collection_start_time: new FormControl(''),
    collection_end_date: new FormControl(''),
    collection_end_time: new FormControl(''),

    final_concentrated_sample_volume: new FormControl(''),
    final_concentrated_sample_volume_type: new FormControl(''),
    final_concentrated_sample_volume_notes: new FormControl(''),

    pump_flow_rate: new FormControl(''),
    meter_reading_initial: new FormControl(''),
    meter_reading_final: new FormControl(''),
    meter_reading_unit: new FormControl(''), 
    total_volume_sampled_initial: new FormControl(''),
    total_volume_sampled_unit_initial: new FormControl(''),
    post_dilution_volume: new FormControl(''), //required when not disabled
    filter_type: new FormControl(''), //required when not disabled
    filter_born_on_date: new FormControl(''),
    air_subsample_volume: new FormControl(''), //required when not disabled
    elution_date: new FormControl(''),
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    sample_volume_initial: new FormControl(''),
    
    //the following controls are for fields/inputs that do not appear in the current LIMS
    //they may be missing, or may be intended only for display in table, not for the form
    sample_volume_filtered: new FormControl(''),
    total_volume_sampled: new FormControl(''),
  });

   //edit sample form
  editSampleForm = new FormGroup({
    //the following controls apply to every sample record, regardless of matrix_type selected
    id:new FormControl(''),
    matrix_type: new FormControl('', Validators.required), 
    study: new FormControl('', Validators.required),  //study name, maps to study id
    sample_type: new FormControl('', Validators.required),
    collaborator_sample_id: new FormControl('', Validators.required),
    filter_flag: new FormControl(false, Validators.required), //radio button
    secondary_concentration_flag: new FormControl(false, Validators.required), //radio button
    study_site_name: new FormControl(''),
    sample_description: new FormControl(''),
    sampler_name:  new FormControl(''),
    sample_notes: new FormControl(''),
    arrival_date: new FormControl(''),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl('',Validators.required),

    //the following controls have variable display needs based on the matrix selected
    collection_start_time: new FormControl(''),
    collection_end_date: new FormControl(''),
    collection_end_time: new FormControl(''),

    final_concentrated_sample_volume: new FormControl(''),
    final_concentrated_sample_volume_type: new FormControl(''),
    final_concentrated_sample_volume_notes: new FormControl(''),

    pump_flow_rate: new FormControl(''),
    meter_reading_initial: new FormControl(''),
    meter_reading_final: new FormControl(''),
    meter_reading_unit: new FormControl(''), 
    total_volume_sampled_initial: new FormControl(''),
    total_volume_sampled_unit_initial: new FormControl(''),
    post_dilution_volume: new FormControl(''), //required when not disabled
    filter_type: new FormControl(''), //required when not disabled
    filter_born_on_date: new FormControl(''),
    air_subsample_volume: new FormControl(''), //required when not disabled
    elution_date: new FormControl(''),
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    sample_volume_initial: new FormControl(''),
    
    //the following controls are for fields/inputs that do not appear in the current LIMS
    //they may be missing, or may be intended only for display in table, not for the form
    sample_volume_filtered: new FormControl(''),
    total_volume_sampled: new FormControl(''),
  });

  freezeSampleForm = new FormGroup({
    number_of_aliquots: new FormControl('', Validators.required),
    rack: new FormControl('', Validators.required),
    box: new FormControl('', Validators.required),
    row: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    frozen:new FormControl(true, Validators.required) 
  })

  ///split these out
  submitted = false;
  onSubmit (formId, formValue) {
    switch (formId) {
        case 'edit':
            //update a record
            this._sampleService.update(formValue)
            .subscribe(sample => sample,
              error => this.errorMessage= <any> error);
            this.editSampleForm.reset();
            this.updateSamplesArray(formValue);
            this.showHideEdit = false;
            break;
        case 'add':
            //add a record
            this._sampleService.create(formValue)
              .subscribe(sample => this.allSamples.push(formValue),
              error => this.errorMessage = <any> error);
            this.addSampleForm.reset();
            break;
        default:
          //do something defaulty
    }
  }
}
