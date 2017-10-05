import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms/";
import { Wizard } from "clarity-angular";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';

import { IStudy } from '../studies/study';
import { ISample } from '../samples/sample';
import { IExtraction } from '../extractions/extraction';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from '../extractions/extraction-method';

import { StudyService } from '../studies/study.service';
import { SampleService } from '../samples/sample.service';
import { AnalysisBatchService } from './analysis-batch.service';
import { TargetService } from '../targets/target.service';
import { ExtractionMethodService } from '../extractions/extraction-method.service';

import { APP_UTILITIES } from '../app.utilities';

@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {
  @ViewChild("wizardExtract") wizardExtract: Wizard;

  public showWarning = false;

  inhibitionsExist: boolean = false;

  extractOpen: boolean = false;
  useExistingInhibition: boolean = false;

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];
  allTargets: ITarget[];
  allExtractionMethods: IExtractionMethod[];

  studies: IStudy[];

  allSamples: ISample[];

  focusAnalysisBatchID: number;
  focusAnalysisBatchData: IAnalysisBatch;

  selectedAnalysisBatchID: number;
  selectedAnalysisBatchData: IAnalysisBatch;

  abSampleList: ISample[] = [];

  inhibitionsPerSample = [];
  // may not need this abInhibitionCount var, consider removing
  abInhibitionCount = 0;
  abInhibitions: IInhibition[];

  showHideEdit: boolean = false;
  showHideExtractionDetailModal: boolean = false;
  showHideRTDetailModal: boolean = false;
  showHideInhibitionDetailModal: boolean = false;
  showHideTargetDetailModal: boolean = false;
  extractionDetailArray: IExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray;

  selected = [];
  errorMessage: string;

  // edit AB form
  editABForm = new FormGroup({
    id: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl('')
  });

  // extraction form
  addExtractionForm = new FormGroup({
    extraction_volume: new FormControl(''),
    elution_volume: new FormControl(''),
    extraction_method: new FormControl(''),
    extraction_date: new FormControl('')
  });

  // add inhibition form
  addInhibitionForm = new FormGroup({
    type: new FormControl('')
  })

  applyInhibition_batchForm = new FormGroup({
    dnaInhibition: new FormControl(''),
    rnaInhibition: new FormControl('')
  })

  abSampleListForm = new FormGroup({
    abSamples: new FormControl('')
  })

  constructor(private _studyService: StudyService, private _sampleService: SampleService, private _analysisBatchService: AnalysisBatchService, private _targetService: TargetService, private _extractionMethodService: ExtractionMethodService) { }

  ngOnInit() {

    // grab temporary hard-coded sample analysis batch summary data (until web service endpoint is up-to-date)
    this.allAnalysisBatchSummaries = APP_UTILITIES.ANALYSIS_BATCH_SUMMARY_ENDPOINT;

    // grab temporary hard-coded sample target summary data (until web service endpoint is up-to-date)
    this.allTargets = APP_UTILITIES.TARGETS_ENDPOINT;

    // grab temporary hard-coded inhibitionsPerSample object (until web service endpoint is up-to-date)
    this.inhibitionsPerSample = APP_UTILITIES.INHIBITIONS_PER_SAMPLE_ENDPOINT;

    // on init, call getAnalysisBatches function of the AnalysisBatchService, set results to the allAnalysisBatches var
    // this._analysisBatchService.getAnalysisBatches()
    //   .subscribe(analysisBatches => this.allAnalysisBatches = analysisBatches,
    //   error => this.errorMessage = <any>error);

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
      error => this.errorMessage = <any>error);


    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
      error => this.errorMessage = <any>error);

    //on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(samples => this.allSamples = samples,
      error => this.errorMessage = <any>error);
  }

  // wizard button handlers
  public handleDangerClick(): void {
    this.wizardExtract.finish();
  }

  public doCustomClick(buttonType: string): void {
    if ("custom-next" === buttonType) {

      // add the 'count' property to the selected (targets) object
      this.selected.map((target) => {
        target.count = 0;
        return target;
      });
      this.wizardExtract.next();
    }

    if ("custom-previous" === buttonType) {
      this.wizardExtract.previous();
    }

    if ("custom-danger" === buttonType) {
      this.showWarning = true;
    }

    if ("custom-cancel" === buttonType) {
      this.wizardExtract.cancel();
      this.wizardExtract.reset();
    }
  }

  retrieveABData(abID) {
    return this._analysisBatchService.getAnalysisBatchData(abID);
  }

  retrieveSampleData(sampleID) {
    // this._sampleService.read(sampleID)
    // .subscribe(sampleData =>  this.abSampleList = sampleData,
    // error => this.errorMessage = <any>error);
    // return 
  }
  extractAB(selectedAB) {
    // open extract wizard and begin

    this.abInhibitionCount = 0;
    this.abInhibitions = [];
    this.extractOpen = true;
    this.selectedAnalysisBatchID = selectedAB.id;

    // TODO: retrieve the inhibitons per sample list from web services


    // check the this.inhibitionsPerSample for inhibitions
    for (let sample of this.inhibitionsPerSample) {
      // this.abInhibitionCount += sample.inhibitions.length;
      for (let inhibition of sample.inhibitions) {
        this.abInhibitions.push(inhibition);
      }
    }
    if (this.abInhibitions.length > 0) {
      this.inhibitionsExist = true;
    }


  }

  removeSample(samplesToRemove) {
    console.log(samplesToRemove);
  }

  showApplyExistingCard() {
    this.useExistingInhibition = true;
  }

  openExtractionDetails(abID) {

    // check if AB ID matches the current focusAnalysisBatchID. 
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID == this.focusAnalysisBatchID) {
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    }
    // show the extraction details modal if not showing already
    if (this.showHideExtractionDetailModal === false) {
      this.showHideExtractionDetailModal = true;
    }

  }

  openInhibitionDetails(abID) {

    this.inhibitionDetailArray = [];

    // check if AB ID matches the current focusAnalysisBatchID. 
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID == this.focusAnalysisBatchID) {
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    }

    // build the inhibition list by looping through the AB data and adding all inhibitions to a local array
    for (let extraction of this.extractionDetailArray) {
      for (let inhibition of extraction.inhibitions) {
        this.inhibitionDetailArray.push(inhibition);
      }
    }
    // show the inhibition details modal if not showing already
    if (this.showHideInhibitionDetailModal === false) {
      this.showHideInhibitionDetailModal = true;
    }

  }

  openRTDetails(abID) {

    this.rtDetailArray = [];

    // check if AB ID matches the current focusAnalysisBatchID.
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID === this.focusAnalysisBatchID) {
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    }

    // build the inhibition list by looping through the AB data and adding all inhibitions to a local array
    for (let extraction of this.extractionDetailArray) {
      for (let rt of extraction.reverse_transcriptions) {
        this.rtDetailArray.push(rt);
      }
    }
    // show the inhibition details modal if not showing already
    if (this.showHideRTDetailModal === false) {
      this.showHideRTDetailModal = true;
    }

  }

  openTargetDetails() {

  }

  onAdd() {

    this.selected.push({ "id": 4, "sample_type": { "name": "Performance Evaluation", "id": 3 }, "matrix_type": { "name": "Forage or sediment", "id": 4 }, "filter_type": { "name": "NanoCeram", "id": 5 }, "study": { "name": "MDH Storm Water Irrigation", "id": 3 }, "study_site_name": "aute", "collaborator_sample_id": "5736", "sampler_name": { "name": "afirnstahl", "id": 3 }, "sample_notes": "Veniam est do magna ipsum nisi aliqua.", "sample_description": "Cupidatat ex adipisicing in est id amet tempor in enim voluptate est elit enim minim.", "arrival_date": "2015-02-27", "arrival_notes": "Irure et sunt laborum minim ullamco ad velit pariatur duis nostrud.", "collection_start_date": "2016-01-29", "collection_start_time": "20:58:00", "collection_end_date": "2014-09-23", "collection_end_time": "00:47:00", "meter_reading_initial": 86.2, "meter_reading_final": 543.5, "meter_reading_unit": 1, "total_volume_sampled_initial": 592.2753, "total_volume_sampled_unit_initial": 2, "total_volume_sampled": 617.5353, "sample_volume_initial": 255.0, "sample_volume_filtered": 2.63, "filter_born_on_date": "2015-04-13", "filter_flag": false, "secondary_concentration_flag": true, "elution_date": "2013-09-01", "elution_notes": "Nulla labore sint amet adipisicing ex eu occaecat consequat pariatur in.", "technician_initials": "sks", "air_subsample_volume": 578.62, "post_dilution_volume": 683.45, "pump_flow_rate": 997.11, "analysisbatches": [], "final_concentrated_sample_volume": null, "final_concentrated_sample_volume_type": null, "final_concentrated_sample_volume_notes": null, "created_date": "2017-06-27", "created_by": "admin", "modified_date": "2017-06-27", "modified_by": "admin" })

    console.log(this.selected);
  }

  updateABSampleList(abID, abSamples){
    let abUpdateObject = [];
    for(let sample of abSamples) {
      abUpdateObject.push({"sample": sample.id , "analysis_batch": abID });
    }
    console.log(abUpdateObject);

  }

  editAB(selectedAB) {

    // show the edit analysis batch modal if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }

    this.editABForm.setValue({
      id: selectedAB.id,
      analysis_batch_description: selectedAB.analysis_batch_description,
      analysis_batch_notes: selectedAB.analysis_batch_notes
    });


    // call to retrieve AB detail data
    this.selectedAnalysisBatchData = this.retrieveABData(selectedAB.id);

    // get sample id for each sample in the AB
    // add those to selected array
    for (let sampleSummary of this.selectedAnalysisBatchData.samples) {
        for (let sample of this.allSamples){
            if (sampleSummary.id === sample.id){
              this.abSampleList.push(sample);
            }
        }
      //TODO: insert proper service call/obseravble to fit inside iteration
      //this.abSampleList.push(this.retrieveSampleData(sample.id));
    }

    console.log(this.abSampleList);

    this.selected = this.abSampleList;



  }




}
