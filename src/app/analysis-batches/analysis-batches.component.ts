import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms/";

import { IAnalysisBatch } from './analysis-batch';

import { AnalysisBatchService } from './analysis-batch.service';

import { APP_UTILITIES } from '../app.utilities'

@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {
  allAnalysisBatches: IAnalysisBatch[];
  showHideExtractionDetailModal: boolean = false;
  focusAnalysisBatchID: number;
  focusDetailObject: Object;

  selected: IAnalysisBatch[] = [];

  errorMessage: string;

  constructor(private _analysisBatchService: AnalysisBatchService) { }

  ngOnInit() {

    //grab temporary hard-coded sample analysis batch data (until web service endpoint is up-to-date)
    this.allAnalysisBatches = APP_UTILITIES.ANALYSIS_BATCH_SAMPLE_DATA;

    //on init, call getAnalysisBatches function of the AnalysisBatchService, set results to the allAnalysisBatches var
    // this._analysisBatchService.getAnalysisBatches()
    //   .subscribe(analysisBatches => this.allAnalysisBatches = analysisBatches,
    //   error => this.errorMessage = <any>error);
  }

  createABForm = new FormGroup({

  })

  openExtractionDetails(abID, detailObject){

    this.focusAnalysisBatchID = abID;
    this.focusDetailObject = detailObject;
    
    //show the extraction details modal if not showing already
    if (this.showHideExtractionDetailModal === false) {
      this.showHideExtractionDetailModal = true;
    }


  }

  openRTDetails() {

  }

  openInhibitionDetails() {

  }

  openTargetDetails(){

  }

  editAB(selectedAB) {
    alert("user has chosen to edit selected analysis batch")

  }

}
