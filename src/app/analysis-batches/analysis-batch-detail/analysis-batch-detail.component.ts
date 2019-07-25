import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IAnalysisBatchDetail } from '../analysis-batch-detail';
import { IAnalysisBatch } from '../analysis-batch';
import { ISampleExtraction } from '../../sample-extractions/sample-extraction';
import { IExtractionBatch } from '../../extraction-batches/extraction-batch';
import { IInhibition } from '../../inhibitions/inhibition';
import { IReverseTranscription } from '../../reverse-transcriptions/reverse-transcription';
import { IExtractionMethod } from '../../extraction-batches/extraction-method';
import { ITarget } from '../../targets/target';
import { IUnit } from '../../units/unit';

import { APP_SETTINGS } from '../../app.settings';

import { ISampleSummary } from '../../samples/sample-summary';

import { AnalysisBatchService } from '../analysis-batch.service';
import { ExtractionMethodService } from '../../extraction-batches/extraction-method.service';
import { TargetService } from '../../targets/target.service';
import { UnitService } from '../../units/unit.service';
import { ExtractionBatchService } from 'app/extraction-batches/extraction-batch.service';
import { ReverseTranscriptionService } from 'app/SHARED/reverse-transcription.service';
import { PcrReplicateBatchService } from '../../pcr-replicates/pcr-replicate-batch.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedABSummary: IAnalysisBatchSummary;

  ABDetailsLoading: boolean = false;
  noExtractionsFlag: boolean = false;
  showHideEditExtractionDetail: boolean = false;
  showHideEditRTDetail: boolean = false;
  selectedABDetail: IAnalysisBatchDetail;

  allExtractionMethods: IExtractionMethod[];

  extractionDetailArray: ISampleExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];

  extractionBatchArray: IExtractionBatch[];

  units: IUnit[];
  allTargets: ITarget[] = [];
  errorMessage: string;

  extractionTargetArray: ITarget[] = [];
  samplesArray: ISampleSummary[] = [];

  selectedABID: number;

  showHideEditTargetList: boolean = false;
  showHideEBDeleteConfirm: boolean = false;

  showEBDeleteSuccess: boolean = false;
  showEBDeleteError: boolean = false;

  showBulkSubmitNegResults: boolean = false;

  targetListEditLocked: boolean = false;

  currentExtractionNo: number;
  expanded: boolean = false;

  submitLoading: boolean = false;
  extractionEditErrorFlag: boolean = false;
  extractionEditSuccessFlag: boolean = false;
  batchSubmitNegResultsErrorFlag: boolean = false;
  batchSubmitNegResultsSuccessFlag: boolean = false;

  rtEditErrorFlag: boolean = false;
  rtEditSuccessFlag: boolean = false;

  bulkSubmitNegResultsForm: FormGroup;
  pcrreplicatebatch_array: FormArray;

  replicateColumnCount;

  submitted;

  selected = [];
  nucleicAcidTypes = [];



  editExtractionBatchForm = new FormGroup({
    id: new FormControl(''),
    analysis_batch: new FormControl(''),
    extraction_method: new FormControl(''),
    extraction_number: new FormControl(''),
    extraction_volume: new FormControl(''),
    extraction_date: new FormControl(''),
    elution_volume: new FormControl(''),
    re_extraction: new FormControl(null),
    sample_dilution_factor: new FormControl(null)
  });

  // editInhibitionForm = new FormGroup({
  //   id: new FormControl(''),
  //   inhibition_no: new FormControl(''),
  //   dilution_factor:new FormControl(''),
  //   type: new FormControl(''),
  //   inhibition_date: new FormControl('')
  // });

  editRTForm = new FormGroup({
    id: new FormControl(''),
    // rt_number: new FormControl(''),
    template_volume: new FormControl(''),
    reaction_volume: new FormControl(''),
    rt_date: new FormControl('')
  })

  buildBulkSubmitNegResultsForm() {
    this.bulkSubmitNegResultsForm = this.formBuilder.group({
      pcr_batches: this.formBuilder.array([
        this.formBuilder.group({
          extraction_batch: null,
          target: null,
          replicate_number: null,
          pcr_pos_cq_value: null,
          include: false
        })
      ])
    })
    this.pcrreplicatebatch_array = this.bulkSubmitNegResultsForm.get("pcr_batches") as FormArray;
  }

  constructor(
    private _analysisBatchService: AnalysisBatchService,
    private _extractionMethodService: ExtractionMethodService,
    private _extractionBatchService: ExtractionBatchService,
    private _reverseTranscriptionService: ReverseTranscriptionService,
    private _targetService: TargetService,
    private _unitService: UnitService,
    private pcrReplicateBatchService: PcrReplicateBatchService,
    private formBuilder: FormBuilder,
  ) {
    this.buildBulkSubmitNegResultsForm();
  }

  ngOnInit() {
    // this.ABDetailsLoading = true;
    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;
    this.retrieveABData();

    // call the getAnalysisBatchDetail function of the AnalyisBatchService, set results to selectedABDetail var
    // this._analysisBatchService.getAnalysisBatchDetail(this.selectedABSummary.id)
    //   .subscribe(
    //     (analysisBatchDetail) => {
    //       this.selectedABDetail = analysisBatchDetail;
    //       this.extractionBatchArray = analysisBatchDetail.extractionbatches
    //       this.samplesArray = analysisBatchDetail.samples;
    //       this.selectedABID = analysisBatchDetail.id;
    //       // this.extractionDetailArray = this.buildABExtractionArray(analysisBatchDetail.extractionbatches);
    //       this.ABDetailsLoading = false;
    //       if (analysisBatchDetail.extractionbatches.length < 1) {
    //         this.noExtractionsFlag = true;
    //       }
    //     },
    //     error => {
    //       this.ABDetailsLoading = false;
    //       this.errorMessage = <any>error
    //     }
    //   );

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
        error => this.errorMessage = <any>error);

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(
        (targets) => {
          this.allTargets = targets;
          this.allTargets.sort(function (a, b) {
            if (a.name < b.name) { return -1 };
            if (a.name > b.name) { return 1 };
            return 0;
          });
        },
        error => { this.errorMessage = <any>error });

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
        error => this.errorMessage = <any>error);

    // build the inhibition list by looping through the AB data and adding all inhibitions to a local array
    // for (let extraction of this.extractionDetailArray) {
    //   for (let inhibition of extraction.inhibitions) {
    //     this.inhibitionDetailArray.push(inhibition)
    //   }
    // }

    // build the rt list by looping through the AB data and adding all rts to a local array
    //  for (let extraction of this.extractionDetailArray) {
    //   for (let rt of extraction.reverse_transcriptions) {
    //     this.rtDetailArray.push(rt)
    //   }
    // }
  }

  retrieveABData() {
    this.ABDetailsLoading = true;

    // call the getAnalysisBatchDetail function of the AnalyisBatchService, set results to selectedABDetail var
    this._analysisBatchService.getAnalysisBatchDetail(this.selectedABSummary.id)
      .subscribe(
        (analysisBatchDetail) => {
          this.selectedABDetail = analysisBatchDetail;
          this.extractionBatchArray = analysisBatchDetail.extractionbatches
          this.samplesArray = analysisBatchDetail.samples;
          this.selectedABID = analysisBatchDetail.id;
          // this.extractionDetailArray = this.buildABExtractionArray(analysisBatchDetail.extractionbatches);
          this.ABDetailsLoading = false;
          if (analysisBatchDetail.extractionbatches.length < 1) {
            this.noExtractionsFlag = true;
          }
        },
        error => {
          this.ABDetailsLoading = false;
          this.errorMessage = <any>error
        }
      );


  }

  deselectAll() {
    this.selected = [];
  }

  public deleteExtractionBatch(extractionBatchID) {

    this.showEBDeleteSuccess = false;
    this.showEBDeleteError = false;

    this._extractionBatchService.delete(extractionBatchID)
      .subscribe(
        () => {
          this.showEBDeleteSuccess = true;
          this.retrieveABData();
        },
        error => {
          this.showEBDeleteError = true;
          this.errorMessage = <any>error;
        });

  }

  public buildABExtractionArray(extractionBatchArray) {
    let abExtractionArray: ISampleExtraction[] = [];
    for (let extractionbatch of extractionBatchArray) {
      for (let extraction of extractionbatch.extractions) {
        abExtractionArray.push(extraction);
      }
    }
    console.log(abExtractionArray);
    return abExtractionArray;
  }

  editExtractionBatch(extractionbatch) {

    this.editExtractionBatchForm.setValue({
      id: extractionbatch.id,
      analysis_batch: extractionbatch.analysis_batch,
      extraction_method: extractionbatch.extraction_method.id,
      extraction_number: extractionbatch.extraction_number,
      extraction_volume: extractionbatch.extraction_volume,
      extraction_date: extractionbatch.extraction_date,
      elution_volume: extractionbatch.elution_volume,
      sample_dilution_factor: extractionbatch.sample_dilution_factor,
      re_extraction: null
    });

    // show the edit detail modal if not showing already
    if (this.showHideEditExtractionDetail === false) {
      this.showHideEditExtractionDetail = true;
    }


  }

  openBulkSubmitNegResults(extractionbatch) {

    this.currentExtractionNo = extractionbatch.extraction_number;
    // reset the pcrreplicate batch form array controls to a blank array
    this.pcrreplicatebatch_array.controls = [];
    // for (let target of extractionbatch.targets) {

    //   for (let i = 0; i < target.replicates; i++) {

    //     let pcrRepBatchFormGroup: FormGroup = this.formBuilder.group({
    //       extraction_batch: this.formBuilder.control(extractionbatch.id),
    //       target: this.formBuilder.control(target.id),
    //       replicate_number: this.formBuilder.control(i + 1),
    //       pcr_pos_cq_value: this.formBuilder.control(null),
    //     });
    //     this.pcrreplicatebatch_array.push(pcrRepBatchFormGroup);

    //   }


    //   // these lines are for creating a replicate columns, but not used in current design
    //   // instantiate a blank array to store a list of replicate counts for all the targets
    //   // let replicateCountArray = [];
    //   // add the replicate count for each target to the replicateCountArray
    //   // replicateCountArray.push(target.replicates);
    //   //this.replicateColumnCount = Math.max.apply(null, replicateCountArray);

    // }

    for (let replicate of extractionbatch.pcrreplicatebatches) {
      let pcrRepBatchFormGroup: FormGroup = this.formBuilder.group({
        extraction_batch: this.formBuilder.control(replicate.extraction_batch),
        target: this.formBuilder.control(replicate.target),
        replicate_number: this.formBuilder.control(replicate.replicate_number),
        pcr_pos_cq_value: this.formBuilder.control({ value: replicate.pcr_pos_cq_value, disabled: replicate.pcr_pos_cq_value === null ? false : true }),
        include: this.formBuilder.control({ value: false, disabled: replicate.pcr_pos_cq_value === null ? false : true })
      });
      this.pcrreplicatebatch_array.push(pcrRepBatchFormGroup);
    }

    // show the bulk submit neg results modal if not showing already
    if (this.showBulkSubmitNegResults === false) {
      this.showBulkSubmitNegResults = true;
    }

  }

  resetAB() {
    this.selected = [];
    this.extractionTargetArray = [];
  }

  editRT(rt) {

    this.editRTForm.setValue({
      id: rt.id,
      // rt_number: rt.rt_number,
      template_volume: rt.template_volume,
      reaction_volume: rt.reaction_volume,
      rt_date: rt.rt_date
    })
    // show the edit rt detail modal if not showing already
    if (this.showHideEditRTDetail === false) {
      this.showHideEditRTDetail = true;
    }

  }

  editExtractionTargets(extraction) {

    this.resetAB();

    this.currentExtractionNo = extraction.extraction_number;

    // build the target list by looping through the AB data and adding all targets to a local array
    for (let extTarget of extraction.targets) {
      for (let target of this.allTargets) {
        if (extTarget.id === target.id) {
          this.extractionTargetArray.push(target);
        }
      }
    }
    this.selected = this.extractionTargetArray;
    // show the edit edit target list modal if not showing already
    if (this.showHideEditTargetList === false) {
      this.showHideEditTargetList = true;
    }

  }

  updateABTargetList() {

  }

  onSubmit(formID, formValue) {

    this.submitLoading = true;

    if (formID === "editEB") {
      this._extractionBatchService.update(formValue)
        .subscribe(
          (updatedExtractionBatch) => {
            this.extractionEditSuccessFlag = true;
            this.extractionEditErrorFlag = false;
            this.submitLoading = false;
            this.retrieveABData();
          },
          error => {
            this.errorMessage = <any>error
            this.extractionEditSuccessFlag = false;
            this.extractionEditErrorFlag = true;
            this.submitLoading = false;
          }
        );
    } else if (formID === 'editRT') {
      this._reverseTranscriptionService.update(formValue)
        .subscribe(
          (updatedRT) => {
            this.rtEditSuccessFlag = true;
            this.rtEditErrorFlag = false;
            this.submitLoading = false;
            this.retrieveABData();
          },
          error => {
            this.errorMessage = <any>error
            this.rtEditSuccessFlag = false;
            this.rtEditErrorFlag = true;
            this.submitLoading = false;
          }
        );
    } else if (formID === 'bulkSubmitNegResults') {

      // remove the include = false replicates and then remove the include field
      const pcrBatchArray = [];
      for (let rep of formValue.pcr_batches) {
        if (rep.include) {
          if (rep.include) {
            delete rep.include;
            pcrBatchArray.push(rep);
          }
        }
      }

      this.pcrReplicateBatchService.postBulkNegativeResults(pcrBatchArray)
        .subscribe(
          (response) => {
            this.batchSubmitNegResultsSuccessFlag = true;
            this.batchSubmitNegResultsErrorFlag = false;
            this.submitLoading = false;
            this.retrieveABData();
          },
          error => {
            this.errorMessage = <any>error
            this.batchSubmitNegResultsSuccessFlag = false;
            this.batchSubmitNegResultsErrorFlag = true;
            this.submitLoading = false;
          }
        );
    }

  }



}
