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
      //on init, call getSamples function of the SampleService, set results to the allSamples var
      this._sampleService.getSamples()
        .subscribe(samples => this.allSamples = samples,
                    error => this.errorMessage = <any>error);
      this.sampleSelected = false;
  
      //on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
      this._sampleTypeService.getSampleTypes()
        .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
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
      case ('study_name') : {
        for (var i = 0; i < this.studies.length; i++) {
            if (this.studies[i].study_name === displayValue) {
              console.log("inside switch case for study_name. study id:" + this.studies[i].study_id)
              return this.studies[i].study_id;
            }
        }
      }
      case ('matrix') : {
        for (var i = 0; i < this.matrices.length; i++) {
            if (this.matrices[i].matrix === displayValue) {
              console.log("inside switch case for matrix. matrix cd" + this.matrices[i].matrix_cd)
              return this.matrices[i].matrix_cd;
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
      case ('units') : {
        for (var i = 0; i < this.units.length; i++) {
            if (this.units[i].name === displayValue) {
              console.log("inside switch case for units. unit id" + this.units[i].id);
              return this.units[i].id;
            }
        }
      }
      case ('tvs_units') : {
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
      matrix: this.lookupDropdownValue('matrix', selectedSample.matrix),
      study_name: this.lookupDropdownValue('study_name', selectedSample.study_name),
      sample_type: this.lookupDropdownValue('sample_type', selectedSample.sample_type),
      collab_sample_id: selectedSample.collab_sample_id,
      filter_flag: selectedSample.filter_flag, 
      secondary_conc_flag: selectedSample.secondary_conc_flag, 
      study_site_name: selectedSample.study_site_name,
      study_site_id: selectedSample.study_site_id,
      samp_desc: selectedSample.samp_desc,
      sampler_name:  selectedSample.sampler_name,
      sample_notes: selectedSample.sample_notes,
      arrive_date: selectedSample.arrive_date,
      arrive_notes: selectedSample.arrive_notes,
      collect_start_date: selectedSample.collect_start_date,

      collect_start_time: selectedSample.collect_start_time,
      collect_end_date: selectedSample.collect_end_date,
      collect_end_time: selectedSample.collect_end_date,
      pump_rate: selectedSample.pump_rate,
      imr: selectedSample.imr,
      fmr: selectedSample.fmr,
      tvs:selectedSample.tvs,
      vol_post_dilution_ul: selectedSample.vol_post_dilution_ul,
      filter_type: selectedSample.filter_type,
      filt_bornon_date: selectedSample.filt_bornon_date,
      air_subsample_vol_ml: selectedSample.air_subsample_vol_ml,
      elute_date: selectedSample.elute_date,
      elute_notes: selectedSample.elute_notes,
      tech_init: selectedSample.tech_init,
      init_vol: selectedSample.init_vol,
      units: this.lookupDropdownValue('units', selectedSample.units),
      tvs_units: this.lookupDropdownValue('tvs_units', selectedSample.tvs_units),
      samp_vol_filt: selectedSample.samp_vol_filt,

      sample_loc_type: '',
      samp_env_type: '',
      water_type: '',
      tvs_stage: '',
      tvs_liters: '',
      tvs_calc: '',
      tvs_stage_calc: '' 
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
    study_name: new FormControl('', Validators.required),  //study name, maps to study id
    sample_type: new FormControl('', Validators.required),
    collab_sample_id: new FormControl('', Validators.required),
    //orig_collab_samp_id: new FormControl(''),
    matrix: new FormControl('', Validators.required), 
    filter_flag: new FormControl(false, Validators.required), //radio button
    secondary_conc_flag: new FormControl(false, Validators.required), //radio button
    study_site_name: new FormControl('', ),
    study_site_id:new FormControl(''),
    samp_desc: new FormControl(''),
    sampler_name:  new FormControl(''),
    sample_notes: new FormControl(''),
    arrive_date: new FormControl(''),
    arrive_notes: new FormControl(''),
    collect_start_date: new FormControl('',Validators.required),

    //the following controls have variable display needs based on the matrix selected
    collect_start_time: new FormControl(''),
    collect_end_date: new FormControl(''),
    collect_end_time: new FormControl(''),
    pump_rate: new FormControl(''),
    imr: new FormControl(''),
    fmr: new FormControl(''),
    tvs: new FormControl(''),
    vol_post_dilution_ul: new FormControl(''), //required when not disabled
    filter_type: new FormControl(''), //required when not disabled
    filt_bornon_date: new FormControl(''),
    air_subsample_vol_ml: new FormControl(''), //required when not disabled
    elute_date: new FormControl(''),
    elute_notes: new FormControl(''),
    tech_init: new FormControl(''),
    init_vol: new FormControl(''),
    
    //the following controls arre for fields/inputs that do not appear in the current LIMS sample page form
    //they may be missing, or may be better only for display in table, not for the form
    samp_vol_filt: new FormControl(''),
    units: new FormControl(''), 
    tvs_units: new FormControl(''),
    tvs_liters: new FormControl(''),
  });

   //edit sample form
  editSampleForm = new FormGroup({
         //the following controls apply to every sample record, regardless of matrix selected
        study_name: new FormControl('', Validators.required),  //study name, maps to study id
        sample_type: new FormControl('', Validators.required),
        collab_sample_id: new FormControl('', Validators.required),
        //orig_collab_samp_id: new FormControl(''),
        matrix: new FormControl('', Validators.required), 
        filter_flag: new FormControl(false, Validators.required), //radio button
        secondary_conc_flag: new FormControl(false, Validators.required), //radio button
        study_site_name: new FormControl('', ),
        study_site_id:new FormControl(''),
        samp_desc: new FormControl(''),
        sampler_name:  new FormControl(''),
        sample_notes: new FormControl(''),
        arrive_date: new FormControl(''),
        arrive_notes: new FormControl(''),
        collect_start_date: new FormControl('',Validators.required),

        //the following controls have variable display needs based on the matrix selected
        collect_start_time: new FormControl(''),
        collect_end_date: new FormControl(''),
        collect_end_time: new FormControl(''),
        pump_rate: new FormControl(''),
        imr: new FormControl(''),
        fmr: new FormControl(''),
        tvs: new FormControl(''),
        vol_post_dilution_ul: new FormControl(''), //required when not disabled
        filter_type: new FormControl(''), //required when not disabled
        filt_bornon_date: new FormControl(''),
        air_subsample_vol_ml: new FormControl(''), //required when not disabled
        elute_date: new FormControl(''),
        elute_notes: new FormControl(''),
        tech_init: new FormControl(''),
        init_vol: new FormControl(''),
       
       //the following controls arre for fields/inputs that do not appear in the current LIMS
       //they may be missing, or may be better only for displaynin table, not for the form
        samp_vol_filt: new FormControl(''),
        units: new FormControl(''), 
        sample_loc_type: new FormControl(''),
        samp_env_type: new FormControl(''),
        water_type: new FormControl(''),
        tvs_units: new FormControl(''),
        tvs_stage: new FormControl(''),
        tvs_liters: new FormControl(''),
        tvs_calc: new FormControl(''),
        tvs_stage_calc: new FormControl('') 
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
