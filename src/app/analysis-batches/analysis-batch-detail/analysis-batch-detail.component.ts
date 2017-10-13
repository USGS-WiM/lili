import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms/";

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IAnalysisBatch } from '../analysis-batch';
import { IExtraction } from '../../extractions/extraction';
import { IInhibition } from '../../inhibitions/inhibition';
import { IReverseTranscription } from '../../reverse-transcriptions/reverse-transcription';
import { IExtractionMethod } from '../../extractions/extraction-method';

import { AnalysisBatchService } from '../analysis-batch.service';
import { ExtractionMethodService } from '../../extractions/extraction-method.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedABSummary: IAnalysisBatchSummary;

  loading: boolean;
  showHideEditExtractionDetail: boolean = false;
  showHideEditRTDetail: boolean = false;
  selectedABDetail: IAnalysisBatch;

  allExtractionMethods: IExtractionMethod[];

  extractionDetailArray: IExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray;

  errorMessage: string;

  submitted;

  editExtractionForm = new FormGroup({
    id: new FormControl(''),
    extraction_no: new FormControl(''),
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
    reverse_transcription_no: new FormControl(''),
    vol_in: new FormControl(''),
    vol_out: new FormControl(''),
    rt_cq: new FormControl('')

  })

  constructor(private _analysisBatchService: AnalysisBatchService, private _extractionMethodService: ExtractionMethodService) { }

  ngOnInit() {
    this.loading = true;

    this.selectedABDetail = this._analysisBatchService.getAnalysisBatchData(this.selectedABSummary.id);
    // console.log(this.selectedABDetail);

    this.extractionDetailArray = this.selectedABDetail.extractions;

     // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
     this._extractionMethodService.getExtractionMethods()
     .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
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

    this.loading = false;

  }

  editExtraction(extraction) {

    this.editExtractionForm.setValue({
      id: extraction.id,
      extraction_no: extraction.extraction_no,
      extraction_volume: extraction.extraction_volume,
      elution_volume: extraction.elution_volume,
      extraction_method: extraction.extraction_method,
      extraction_date: extraction.extraction_date
    });

    //show the edit detail modal if not showing already
    if (this.showHideEditExtractionDetail === false) {
      this.showHideEditExtractionDetail = true;
    }


  }

  editRT(rt) {

    this.editRTForm.setValue({
      id: rt.id,
      reverse_transcription_no: rt.reverse_transcription_no, 
      vol_in: rt.vol_in,
      vol_out: rt.vol_out,
      rt_date: rt.rt_date
    })
    //show the edit detail modal if not showing already
    if (this.showHideEditRTDetail === false) {
      this.showHideEditRTDetail = true;
    }

  }

  onSubmit(formID, formValue){

  }



}
