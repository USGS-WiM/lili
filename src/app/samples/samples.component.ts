import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISample } from './sample'
import { ISampleType } from '../SHARED/sample-type';
import { IMatrix } from '../SHARED/matrix';
import { IStudy } from '../studies/study';
import { IUnit } from '../SHARED/unit';

import { SampleService } from './sample.service';
import { SampleTypeService } from '../SHARED/sample-type.service';
import { MatrixService } from '../SHARED/matrix.service';
import { StudyService } from '../studies/study.service'
import { UnitService } from '../SHARED/unit.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  allSamples: ISample[];
  sampleTypes: ISampleType[];
  matrices: IMatrix[];
  studies: IStudy[];
  units: IUnit[];
  errorMessage: string;
  selectedSample: ISample;
  showHideAdd: boolean = false;
  showHideEdit: boolean = false;
  sampleSelected: boolean;
  displayConfig:Object = {};
  selectedSampleId;
  //following 3 vars hold the 'value' property for the corresponding html select dropdowns - needed to update dropdown for editSample form
  matrixStoredValue: String;
  sampleTypeStoredValue: number;
  studyStoredValue;
  //var to hold the currently selected matrix; used to determine which inputs to show
  matrixSelected: IMatrix;

  constructor(private _sampleService: SampleService,  private _studyService: StudyService, private _sampleTypeService: SampleTypeService, private _matrixService: MatrixService, private _unitService: UnitService ) { }

  ngOnInit():void {

    let self = this;

      //on init, call getSamples function of the SampleService, set results to the allSamples var
      this._sampleService.getSamples()
        .subscribe(samples => this.allSamples = samples,
                    error => this.errorMessage = <any>error);
      this.sampleSelected = false;
  
      //on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
      this._sampleTypeService.getSampleTypes()
        .subscribe(sampleTypes => self.sampleTypes = sampleTypes,
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

      this._sampleService.getSampleFormConfig()
        .subscribe(displayConfig => this.displayConfig = displayConfig,
                    error => this.errorMessage = <any>error);

      

  }

  lookupDropdownValue (control, displayValue) {
    switch (control){
      case ('study') : {
        for (var i = 0; i < this.studies.length; i++) {
            if (this.studies[i].study_name === displayValue) {
              console.log("inside switch case for study. study id:" + this.studies[i].study_id)
              return this.studies[i].study_id;
            }
        }
      }
      case ('matrix_type') : {
        for (var i = 0; i < this.matrices.length; i++) {
            if (this.matrices[i].name === displayValue) {
              console.log("inside switch case for matrix. matrix cd" + this.matrices[i].code)
              return this.matrices[i].code;
            }
        }
      }
      case ('sample_type') : {
        for (var i = 0; i < this.sampleTypes.length; i++) {
            if (this.sampleTypes[i].name === displayValue) {
              console.log("inside switch case for sample type. sample type id" + this.sampleTypes[i].id);
              return this.sampleTypes[i].id;
            }
        }
      }
      case ('meter_reading_unit') : {
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].name === displayValue) {
              console.log("inside switch case for units. unit id" + this.units[i].id);
              return this.units[i].id;
            }
        }
      }
      case ('total_volume_sampled_unit_initial') : {
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].name === displayValue) {
              console.log("inside switch case for units. unit id" + this.units[i].id);
              return this.units[i].id;
            }
        }
      }
    }
  }

  editSample(selectedSample) {

    //show the edit sample form if not showing already
    if (this.showHideEdit === false) {
        this.showHideEdit = true;
    }
    //sets the var selectedSampleId used for label display
    this.selectedSampleId = selectedSample.sample_id;

    this.editSampleForm.setValue({
      matrix_type: this.lookupDropdownValue('matrix_type', selectedSample.matrix_type),
      study: this.lookupDropdownValue('study', selectedSample.study),
      sample_type: this.lookupDropdownValue('sample_type', selectedSample.sample_type),
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
      collection_end_time: selectedSample.collection_end_date,
      sample_volume_filtered: selectedSample.sample_volume_filtered,
      pump_flow_rate: selectedSample.pump_flow_rate,
      meter_reading_initial: selectedSample.meter_reading_initial,
      meter_reading_final: selectedSample.meter_reading_final,
      meter_reading_unit: this.lookupDropdownValue('meter_reading_unit', selectedSample.meter_reading_unit),
      total_volume_sampled_initial:selectedSample.total_volume_sampled_initial,
      total_volume_sampled_unit_initial: this.lookupDropdownValue('total_volume_sampled_unit_initial', selectedSample.total_volume_sampled_unit_initial),
      post_dilution_volume: selectedSample.post_dilution_volume,
      filter_type: selectedSample.filter_type,
      filter_born_on_date: selectedSample.filter_born_on_date,
      air_subsample_volume: selectedSample.air_subsample_volume,
      elution_date: selectedSample.elution_date,
      elution_notes: selectedSample.elution_notes,
      technician_initials: selectedSample.technician_initials,
      sample_volume_initial: selectedSample.sample_volume_initial
    })

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
    pump_flow_rate: new FormControl(''),
    meter_reading_initial: new FormControl(''),
    meter_reading_final: new FormControl(''),
    meter_reading_unit: new FormControl(''), 
    tvs: new FormControl(''),
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

  ///split these out
  submitted = false;
  onSubmit (formId, formValue) {
    //this.submitted = true;

    alert("onsubmit clicked for " + formId + ". Form value: " + JSON.stringify(formValue));

  }

  createNewSample() {
        this.addSampleForm.reset();
        this.submitted = false;
  }

 


}
