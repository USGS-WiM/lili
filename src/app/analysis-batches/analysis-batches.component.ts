import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms/";
import { Wizard } from "clarity-angular";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchDetail } from './analysis-batch-detail';
import { IAliquotSelection } from './aliquot-selection';

import { IStudy } from '../studies/study';
import { ISample } from '../samples/sample';
import { IExtraction } from '../extractions/extraction';
import { IExtractionBatch } from '../extractions/extraction-batch';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from '../extractions/extraction-method';
import { IUnit } from '../units/unit';
import { IExtractionBatchSubmission } from '../extractions/extraction-batch-submission';

import { StudyService } from '../studies/study.service';
import { SampleService } from '../samples/sample.service';
import { AnalysisBatchService } from './analysis-batch.service';
import { TargetService } from '../targets/target.service';
import { ExtractionMethodService } from '../extractions/extraction-method.service';
import { UnitService } from '../units/unit.service';

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

  extractWizardOpen: boolean = false;
  useExistingInhibition: boolean = false;

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];
  allTargets: ITarget[] = [];
  allExtractionMethods: IExtractionMethod[];

  studies: IStudy[];
  units: IUnit[];

  allSamples: ISample[] = [];

  focusAnalysisBatchID: number;
  focusAnalysisBatchData: IAnalysisBatchDetail;

  selectedAnalysisBatchID: number;
  selectedAnalysisBatchData: IAnalysisBatchDetail;

  abSampleList: ISample[] = [];

  extractionBatchArray: IExtractionBatch[];


  aliquotSelectionArray: IAliquotSelection[] = [];

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
  selectedSamples = [];
  selectedAB: IAnalysisBatchSummary;
  errorMessage: string;

  // booleans for edit AB tabs
  sampleListActive: boolean;
  detailsActive: boolean;

  extractionBatchSubmission: IExtractionBatchSubmission;

  // edit AB form
  editABForm = new FormGroup({
    id: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl('')
  });

  // extraction form
  addExtractionForm = new FormGroup({
    extraction_volume: new FormControl(''),
    // set the default units to microliters
    // extraction_volume_units: new FormControl('4'),
    elution_volume: new FormControl(''),
    // set the default units to microliters
    // elution_volume_units: new FormControl('4'),
    extraction_method: new FormControl(''),
    extraction_date: new FormControl(''),
    sample_dilution_factor: new FormControl(''),
    // set default value to 6
    qpcr_template_volume: new FormControl('6'),
    // set the default units to microliters
    // qpcr_template_volume_units: new FormControl(4),
    // set default value to 20
    qpcr_reaction_volume: new FormControl('20'),
    // set the default units to microliters
    // qpcr_reaction_volume_units: new FormControl(4),
    qpcr_date: new FormControl('')
  });

  addRTForm = new FormGroup({
    template_volume: new FormControl(''),
    // set the default units to microliters
    // template_volume_units: new FormControl('4'),
    reaction_volume: new FormControl(''),
    // set the default units to microliters
    // reaction_volume_units: new FormControl('4'),
    rt_date: new FormControl('')
  })

  // add inhibition form
  addInhibitionForm = new FormGroup({
    dna: new FormControl(''),
    rna: new FormControl(''),
    inhibition_date: new FormControl('')
  })

  applyInhibition_batchForm = new FormGroup({
    dnaInhibition: new FormControl(''),
    rnaInhibition: new FormControl(''),
    inhibition_date: new FormControl('')
  })


  onAliquotSelect(sampleID, selectedAliquot) {

    // for (let sample of this.aliquotSelectionArray) {
    //   if (sampleID === sample.id) {
    //     sample.aliquot = parseInt(selectedAliquot, 10);
    //   }
    // }

    // console.log(this.aliquotSelectionArray);
  }

  constructor(
    private formBuilder: FormBuilder,
    private _studyService: StudyService,
    private _sampleService: SampleService,
    private _analysisBatchService: AnalysisBatchService,
    private _targetService: TargetService,
    private _extractionMethodService: ExtractionMethodService,
    private _unitService: UnitService
  ) {
    // this.createForm();
  }

  ngOnInit() {

    // grab temporary hard-coded sample analysis batch summary data (until web service endpoint is up-to-date)
    // this.allAnalysisBatchSummaries = APP_UTILITIES.ANALYSIS_BATCH_SUMMARY_ENDPOINT;

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
      error => this.errorMessage = <any>error);

    // grab temporary hard-coded inhibitionsPerSample object (until web service endpoint is up-to-date)
    this.inhibitionsPerSample = APP_UTILITIES.INHIBITIONS_PER_SAMPLE_ENDPOINT;

    // on init, call getAnalysisBatchSummaries function of the AnalysisBatchService, set results to the allAnalysisBatches var
    this._analysisBatchService.getAnalysisBatchSummaries()
      .subscribe(analysisBatches => this.allAnalysisBatchSummaries = analysisBatches,
      error => this.errorMessage = <any>error);

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
      error => this.errorMessage = <any>error);


    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
      error => this.errorMessage = <any>error);

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(samples => this.allSamples = samples,
      error => this.errorMessage = <any>error);

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
      error => this.errorMessage = <any>error);
  }

  // wizard button handlers
  public handleDangerClick(): void {
    this.wizardExtract.finish();
  }

  public doCustomClick(buttonType: string): void {
    if ("custom-next" === buttonType) {

      // add the 'count' property to the selected (targets) object
      // set the default count to 2
      this.selected.map((target) => {
        target.count = 2;
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
    // return this._analysisBatchService.getAnalysisBatchData(abID);

    this._analysisBatchService.getAnalysisBatchDetail(abID)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        this.focusAnalysisBatchData = analysisBatchDetail;
        // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
      },
      error => {
        this.errorMessage = <any>error
      }
      );

    return this.focusAnalysisBatchData;


  }

  retrieveSampleData(sampleID) {
    // this._sampleService.read(sampleID)
    // .subscribe(sampleData =>  this.abSampleList = sampleData,
    // error => this.errorMessage = <any>error);
    // return
  }

  resetAB() {
    this.selected = [];
    this.abSampleList = [];
    this.abInhibitionCount = 0;
    this.abInhibitions = [];

    this.sampleListEditLocked = false;
  }


  extractAB(selectedAB) {

    this.resetAB();
    this.selectedAnalysisBatchID = selectedAB.id;

    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        this.selectedAnalysisBatchData = analysisBatchDetail;

        // get sample id for each sample in the AB
        // add those to abSampleList array
        for (let sampleSummary of this.selectedAnalysisBatchData.samples) {
          for (let sample of this.allSamples) {
            if (sampleSummary.id === sample.id) {
              this.abSampleList.push(sample);
              // DEPRECATED way of doing aliquots
              // this.aliquotSelectionArray.push({ "id": sample.id, "aliquot": sample.aliquots[0] });
            }
          }
        }

        // TODO: get inhibitions for each sample in this AB and build an array with all the inhibitions

        // check the this.inhibitionsPerSample for inhibitions(temporary hard-coded approach)
        for (let sample of this.inhibitionsPerSample) {
          // this.abInhibitionCount += sample.inhibitions.length;
          for (let inhibition of sample.inhibitions) {
            this.abInhibitions.push(inhibition);
          }
        }
        if (this.abInhibitions.length > 0) {
          this.inhibitionsExist = true;
        }

        this.extractWizardOpen = true;



      },
      error => {
        this.errorMessage = <any>error
      }
      );

    // call to retrieve AB detail data
    // this.selectedAnalysisBatchData = this.retrieveABData(selectedAB.id);
  }

  resetExtractWizard() {
    this.wizardExtract.reset();
  }

  finishExtractWizard(extractFormValue, rtFormValue, addInhibitionFormValue) {

    alert("extract wiz finuto!")

    // Needs: 

    // 1: Info for new Inhibition if being done that way, must await response

    // 2: Object for POST to the extraction batch endpoint with:
    // extraction data, replicates object (target and count),
    // and extractions object (sample id, inhibition, rt)

    // 3: Build an object for creating the Extract worksheet (including the Aliquot selections)

    // 4:

    // this.extractionBatchSubmission 






  }

  removeSample(samplesToRemove) {
    console.log(samplesToRemove);
  }

  showApplyExistingCard() {
    this.useExistingInhibition = true;
  }

  onUnitChange() {

  }

  onSubmit(formID, formValue) {

  }

  openTargetDetails(abID) {

    this.targetDetailArray = [];
    // check if AB ID matches the current focusAnalysisBatchID.
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID === this.focusAnalysisBatchID) {
      // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionBatchArray = this.focusAnalysisBatchData.extractionbatches;
    }

    // build the target list by looping through the AB extraction batch array and adding all targets to a local array
    for (let extractionbatch of this.extractionBatchArray) {
      for (let target of extractionbatch.targets) {
        this.targetDetailArray.push(target);
      }
    }
    // show the inhibition details modal if not showing already
    if (this.showHideTargetDetailModal === false) {
      this.showHideTargetDetailModal = true;
    }

  }

  updateABSampleList(abID, abSamples) {
    let abUpdateObject = [];
    for (let sample of abSamples) {
      abUpdateObject.push({ "sample": sample.id, "analysis_batch": abID });
    }
    //use this to make service call to update the AB sample list
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

    // get target if for each target in the AB
    // add

    // console.log(this.abSampleList);
    // this.selected = this.abSampleList;
    this.selected = this.abSampleList;

    // show the edit analysis batch modal if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }
}
