import { Component, OnInit, Input } from '@angular/core';

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IAnalysisBatch } from '../analysis-batch';
import { IExtraction } from '../../SHARED/extraction';
import { IInhibition } from '../../SHARED/inhibition';
import { IReverseTranscription } from '../../SHARED/reverse-transcription';

import { AnalysisBatchService } from '../analysis-batch.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedABSummary: IAnalysisBatchSummary;

  loading: boolean;
  selectedABDetail: IAnalysisBatch;

  extractionDetailArray: IExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray;

  constructor(private _analysisBatchService: AnalysisBatchService) { }

  ngOnInit() {
    this.loading = true;

    this.selectedABDetail = this._analysisBatchService.getAnalysisBatchData(this.selectedABSummary.id);
    //console.log(this.selectedABDetail);

    this.extractionDetailArray = this.selectedABDetail.extractions;

    //build the inhibition list by looping through the AB data and adding all inhibitions to a local array
    for (let extraction of this.extractionDetailArray) {
      for (let inhibition of extraction.inhibitions) {
        this.inhibitionDetailArray.push(inhibition)
      }
    }

     //build the inhibition list by looping through the AB data and adding all inhibitions to a local array
     for (let extraction of this.extractionDetailArray) {
      for (let rt of extraction.reverse_transcriptions) {
        this.rtDetailArray.push(rt)
      }
    }


    this.loading = false;

  }



}
