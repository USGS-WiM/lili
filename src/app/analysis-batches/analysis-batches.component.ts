import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms/";
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
  rnaTargetsSelected: boolean = false;
  sampleListEditLocked: boolean = false;

  inhibitionsExist: boolean = false;

  extractOpen: boolean = false;
  useExistingInhibition: boolean = false;

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];
  allTargets: ITarget[];
  allExtractionMethods: IExtractionMethod[];

  studies: IStudy[];

  allSamples: ISample[] = [];

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
    extraction_date: new FormControl(''),
    sample_dilution_factor: new FormControl(''),
    qpcr_template_volume: new FormControl(''),
    qpcr_date: new FormControl('')
  });

  addRTForm = new FormGroup({
    template_volume: new FormControl(''),
    reaction_volume: new FormControl(''),
    rt_date: new FormControl('')
  })

  // add inhibition form
  addInhibitionForm = new FormGroup({
    type: new FormControl(''),
    inhibition_date: new FormControl('')
  })

  applyInhibition_batchForm = new FormGroup({
    dnaInhibition: new FormControl(''),
    rnaInhibition: new FormControl(''),
    inhibition_date: new FormControl('')
  })

  abSampleListForm = new FormGroup({
    abSamples: new FormControl('')
  })

  aliquotsForm = new FormArray([]);

  setAliquots() {

  }

  get aliquots(): FormArray {
    return this.aliquotsForm.get('aliquots') as FormArray;
  };

  constructor(private fb: FormBuilder, private _studyService: StudyService, private _sampleService: SampleService, private _analysisBatchService: AnalysisBatchService, private _targetService: TargetService, private _extractionMethodService: ExtractionMethodService) { }

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
      // check for RNA targets, set rnaTargetsSelected var to true
      for (let target of this.selected) {
        if (target.type === "RNA") {
          this.rnaTargetsSelected = true;
          break;
        }
      }
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

  resetAB(){
    this.selected = [];
    this.abSampleList = [];
    this.abInhibitionCount = 0;
    this.abInhibitions = [];
    this.selected = [];

    this.sampleListEditLocked = false;
  }
  extractAB(selectedAB) {
    // open extract wizard and begin
    this.resetAB();
    this.extractOpen = true;
    this.selectedAnalysisBatchID = selectedAB.id;

    // call to retrieve AB detail data
    this.selectedAnalysisBatchData = this.retrieveABData(selectedAB.id);

    // get sample id for each sample in the AB
    // add those to selected array
    for (let sampleSummary of this.selectedAnalysisBatchData.samples) {
      for (let sample of this.allSamples) {
        if (sampleSummary.id === sample.id) {
          this.abSampleList.push(sample);
        }
      }
    }

    // TODO: need to get a list of aliquots for each sample (samples endpoint currently down; revisit)

    for (let sample of this.abSampleList) {
      this.aliquotsForm.push(
        new FormGroup({
          aliquot: new FormControl(sample.aliquots)
        })
      )
    }


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

  updateABSampleList(abID, abSamples) {
    let abUpdateObject = [];
    for (let sample of abSamples) {
      abUpdateObject.push({ "sample": sample.id, "analysis_batch": abID });
    }
    console.log(abUpdateObject);

  }

  editAB(selectedAB) {

    this.resetAB();
    if (selectedAB.extraction_count > 0) {
      this.sampleListEditLocked = true;
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
      for (let sample of this.allSamples) {
        if (sampleSummary.id === sample.id) {
          this.abSampleList.push(sample);
        }
      }
    }

    // console.log(this.abSampleList);
    this.selected = this.abSampleList;

    // show the edit analysis batch modal if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }
}
