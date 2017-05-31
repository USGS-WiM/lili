import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISample } from './sample'
import { ISampleType } from './sample-type';
import { IMatrix } from './matrix';
import { IStudy } from '../studies/study';

import { SampleService } from './sample.service';
import { SampleTypeService } from './sample-type.service';
import { MatrixService } from './matrix.service';
import { StudyService } from '../studies/study.service'

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  allSamples: ISample[];
  sampleTypes: ISampleType[];
  matrices: IMatrix[];
  allStudies: IStudy[];
  errorMessage: string;
  selectedSample: ISample;
  showHideAdd: boolean = false;
  showHideEdit: boolean = false;
  sampleSelected: boolean;

  //var to hold the currently selected matrix; used to determine which inputs to show
  matrixSelected: IMatrix;

  constructor(private _sampleService: SampleService,  private _studyService: StudyService, private _sampleTypeService: SampleTypeService, private _matrixService: MatrixService ) { }

  ngOnInit():void {
      //on init, call getSamples function of the SampleService, set results to the allSamples var
      this._sampleService.getSamples()
        .subscribe(samples => this.allSamples = samples,
                    error => this.errorMessage = <any>error);
      this.sampleSelected = false;
      //temporary console log statement
      console.log("sampleSelected var = " + this.sampleSelected)

      //on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
      this._sampleTypeService.getSampleTypes()
        .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
                    error => this.errorMessage = <any>error);

       //on init, call getMatrices function of the MatrixService, set results to the matrices var
      this._matrixService.getMatrices()
        .subscribe(matrices => this.matrices = matrices,
                    error => this.errorMessage = <any>error);

      //on init, call getStudies function of the StudyService, set results to the allStudies var
      this._studyService.getStudies()
        .subscribe(studies => this.allStudies = studies,
                    error => this.errorMessage = <any>error);
  }

//sample table
//set the values of the edit sample form on select of sample in the table
  onRowSelect(event) {
        this.sampleSelected = true;
        console.log(event.data.study_name)
        console.log(this.selectedSample)
        console.log("samplesSelected var = " + this.sampleSelected)
        this.editSampleForm.setValue({
          name: event.data.study_name,
          description: event.data.study_desc
        })
  }
  //clear the edit form values when study unselected from table
  onRowUnselect(event){
    console.log("sample unselected")
    this.sampleSelected = false;
    this.editSampleForm.setValue({
          name: '',
          description:''
        })
  }

//   getSampleFormConfig(selectedMatrix) {
//     return this.http.get('./sampleFormConfig.json').map(res => {
//         this.result = res.json();
//         return this.result[key];
//     });
// }

  onMatrixSelect(selectedMatrix) {
    //value stored in dropdown is matrix_cd, i.e. abbreviation
    console.log("Matrix selected:" + selectedMatrix);
    console.log("init vol formcontrol disabled:" + this.addSampleForm.controls.imr.disabled)

    var displayConfig;

    this._sampleService.getSampleFormConfig(selectedMatrix)
        .subscribe(config => displayConfig = config,
                    error => this.errorMessage = <any>error);

      console.log("display config: " + displayConfig);

    //if (selectedMatrix == 'A' || selectedMatrix == 'WW' || selectedMatrix == "W")

    switch(selectedMatrix) { 
      case (selectedMatrix == 'A'): { 

          // this.addSampleForm.controls.imr.disabled == true;
          // this.addSampleForm.controls.fmr.disabled == true;
          // this.addSampleForm.controls.vol_post_dilution_ul.disabled == true;
          // this.addSampleForm.controls.filt_bornon_date.disabled == true;
          // this.addSampleForm.controls.elute_date.disabled == true;
          // this.addSampleForm.controls.elute_notes.disabled == true;
          // this.addSampleForm.controls.tech_init.disabled == true;
          // this.addSampleForm.controls.init_vol.disabled == true;
          break; 
      } 
      case (selectedMatrix == 'F'): { 
          //statements; 
          break; 
      } 
      default: { 
          //statements; 
          break; 
      } 
    } 

  }

  //add sample form - declare reactive form with appropriate sample fields
  addSampleForm = new FormGroup({
        //name: new FormControl('', Validators.required), //naw
        study_name: new FormControl('', Validators.required),  //study name, maps to study id
        collab_sample_id: new FormControl('', Validators.required),
        orig_collab_samp_id: new FormControl(''),
        collect_start_date: new FormControl('',Validators.required),
        collect_end_date: new FormControl(''),
        samp_desc: new FormControl(''),
        samp_vol_filt: new FormControl(''),
        filter_type: new FormControl('', Validators.required),
        collect_start_time: new FormControl({value:'', disabled:true }),
        collect_end_time: new FormControl(''),
        filt_bornon_date: new FormControl(''),
        study_site_name: new FormControl('', ),
        study_site_id:new FormControl(''),
        sampler_name:  new FormControl(''),
        sample_notes: new FormControl(''),
        imr: new FormControl({value:'', disabled:false }),
        fmr: new FormControl({value:'', disabled:false }),
        units: new FormControl(''),
        sample_type: new FormControl('', Validators.required),
        sample_loc_type: new FormControl(''),
        samp_env_type: new FormControl(''),
        water_type: new FormControl(''),
        init_vol: new FormControl(''),
        tvs_units: new FormControl(''),
        tvs_stage: new FormControl(''),
        tvs: new FormControl(''),
        tvs_liters: new FormControl(''),
        tvs_calc: new FormControl(''),
        tvs_stage_calc: new FormControl(''),
        matrix: new FormControl('', Validators.required), 
        filter_flag: new FormControl('', Validators.required), //radio button
        secondary_conc_flag: new FormControl('', Validators.required), //radio button
        arrive_date: new FormControl(''),
        arrive_notes: new FormControl(''),
        elute_date: new FormControl(''),
        elute_notes: new FormControl(''),
        tech_init: new FormControl(''),
        air_subsample_vol_ml: new FormControl('', Validators.required),
        vol_post_dilution_ul: new FormControl('', Validators.required),
        pump_rate: new FormControl('')
  });

  ///split these out
  submitted = false;
  onSubmit () {

  }
  addNewStudy() {
        this.addSampleForm.reset();
        this.submitted = false;
  }

  //edit study form
  editSampleForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
  });


}
