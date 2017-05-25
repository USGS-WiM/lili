import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISample } from './sample'
import { SampleService } from './sample.service'

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  allSamples: ISample[];
  errorMessage: string;
  selectedSample: ISample;
  showHideAdd: boolean = false;
  showHideEdit;
  sampleSelected: boolean;

  constructor(private _sampleService: SampleService ) { }

  ngOnInit():void {
      this._sampleService.getSamples()
        .subscribe(samples => this.allSamples = samples,
                    error => this.errorMessage = <any>error);
      this.sampleSelected = false;
      console.log("sampleSelected var = " + this.sampleSelected)
  }


//sample table
  onRowSelect(event) {
        this.sampleSelected = true;
        console.log(event.data.study_name)
        console.log(this.selectedSample)
        console.log("studySelected var = " + this.sampleSelected)
        this.editSampleForm.setValue({
          name: event.data.study_name,
          description: event.data.study_desc
        })
  }
  onRowUnselect(event){
    console.log("study unselected")
    this.sampleSelected = false;
    this.editSampleForm.setValue({
          name: '',
          description:''
        })
  }


  //add sample form
  addSampleForm = new FormGroup({
        //name: new FormControl('', Validators.required), //naw
        study_name: new FormControl(''),  //study name, maps to study id
        collab_sample_id: new FormControl(''),
        orig_collab_samp_id: new FormControl(''),
        collect_start_date: new FormControl(''),
        collect_end_date: new FormControl(''),
        samp_desc: new FormControl(''),
        samp_vol_filt: new FormControl(''),
        filter_type: new FormControl(''),
        collect_start_time: new FormControl(''),
        collect_end_time: new FormControl(''),
        filt_bornon_date: new FormControl(''),
        study_site_name: new FormControl(''),
        study_site_id:new FormControl(''),
        sampler_name:  new FormControl(''),
        sample_notes: new FormControl(''),
        imr: new FormControl(''),
        fmr: new FormControl(''),
        units: new FormControl(''),
        sample_type: new FormControl(''),
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
        matrix: new FormControl(''), 
        filter_flag: new FormControl(''), //radio button
        secondary_conc_flag: new FormControl(''), //radio button
        arrive_date: new FormControl(''),
        arrive_notes: new FormControl(''),
        elute_date: new FormControl(''),
        elute_notes: new FormControl(''),
        tech_init: new FormControl(''),
        air_subsample_vol_ml: new FormControl(''),
        vol_post_dilution_ul: new FormControl(''),
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
