import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms/";

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IAnalysisBatchDetail } from '../analysis-batch-detail';
import { IAnalysisBatch } from '../analysis-batch';
import { IExtraction } from '../../extractions/extraction';
import { IExtractionBatch } from '../../extractions/extraction-batch';
import { IInhibition } from '../../inhibitions/inhibition';
import { IReverseTranscription } from '../../reverse-transcriptions/reverse-transcription';
import { IExtractionMethod } from '../../extractions/extraction-method';
import { ITarget } from '../../targets/target';
import { IUnit } from '../../units/unit';

import { APP_SETTINGS } from '../../app.settings';

import { ISampleSummary } from '../../samples/sample-summary';

import { AnalysisBatchService } from '../analysis-batch.service';
import { ExtractionMethodService } from '../../extractions/extraction-method.service';
import { TargetService } from '../../targets/target.service';
import { UnitService } from '../../units/unit.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedABSummary: IAnalysisBatchSummary;

  ABDetailsLoading: boolean = true;
  noExtractionsFlag: boolean = false;
  showHideEditExtractionDetail: boolean = false;
  showHideEditRTDetail: boolean = false;
  selectedABDetail: IAnalysisBatchDetail;

  allExtractionMethods: IExtractionMethod[];

  extractionDetailArray: IExtraction[] = [];
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

  targetListEditLocked: boolean = false;

  currentExtractionNo: number;
  expanded: boolean = false;

  submitted;

  selected = [];
  nucleicAcidTypes = [];

  editExtractionBatchForm = new FormGroup({
    id: new FormControl(''),
    extraction_number: new FormControl(''),
    extraction_volume: new FormControl(''),
    elution_volume: new FormControl(''),
    extraction_method: new FormControl(''),
    extraction_date: new FormControl('')
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
    rt_number: new FormControl(''),
    template_volume: new FormControl(''),
    reaction_volume: new FormControl(''),
    rt_date: new FormControl('')
  })

  constructor(private _analysisBatchService: AnalysisBatchService,
    private _extractionMethodService: ExtractionMethodService,
    private _targetService: TargetService,
    private _unitService: UnitService
  ) { }

  ngOnInit() {
    // this.ABDetailsLoading = true;
    console.log("on init loading val: ", this.ABDetailsLoading)

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

    // this.selectedABDetail = this._analysisBatchService.getAnalysisBatchData(this.selectedABSummary.id);
    // console.log(this.selectedABDetail);

    // on init, call the getAnalysisBatchDetail function of the AnalyisBatchService, set results to selectedABDetail var
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

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
      error => this.errorMessage = <any>error);

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
      error => this.errorMessage = <any>error);

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

  public buildABExtractionArray(extractionBatchArray) {
    let abExtractionArray: IExtraction[] = [];
    for (let extractionbatch of extractionBatchArray ) {
      for (let extraction of extractionbatch.extractions){
        abExtractionArray.push(extraction);
      }
    }
    console.log(abExtractionArray);
    return abExtractionArray;
  }

  editExtractionBatch(extractionbatch) {

    this.editExtractionBatchForm.setValue({
      id: extractionbatch.id,
      extraction_number: extractionbatch.extraction_number,
      extraction_volume: extractionbatch.extraction_volume,
      elution_volume: extractionbatch.elution_volume,
      extraction_method: extractionbatch.extraction_method.id,
      extraction_date: extractionbatch.extraction_date
    });

    // show the edit detail modal if not showing already
    if (this.showHideEditExtractionDetail === false) {
      this.showHideEditExtractionDetail = true;
    }


  }

  resetAB() {
    this.selected = [];
    this.extractionTargetArray = [];
  }

  editRT(rt) {

    this.editRTForm.setValue({
      id: rt.id,
      rt_number: rt.rt_number,
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

    this.currentExtractionNo = extraction.extraction_no;

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

  }



}
