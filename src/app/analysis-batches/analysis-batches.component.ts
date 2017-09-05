import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms/";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';

import { IExtraction } from '../SHARED/extraction'

import { AnalysisBatchService } from './analysis-batch.service';

import { APP_UTILITIES } from '../app.utilities'

@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];

  focusAnalysisBatchID: number;
  focusAnalysisBatchData: IAnalysisBatch;

  showHideExtractionDetailModal: boolean = false;
  showHideRTDetailModal: boolean = false;
  showHideInhibitionDetailModal: boolean = false;
  showHideTargetDetailModal: boolean = false;

  extractionDetailArray;
  rtDetailArray;
  inhibitionDetailArray;
  targetDetailArray;

  selected: IAnalysisBatch[] = [];

  errorMessage: string;

  constructor(private _analysisBatchService: AnalysisBatchService) { }

  ngOnInit() {

    //grab temporary hard-coded sample analysis batch summary data (until web service endpoint is up-to-date)
    this.allAnalysisBatchSummaries = APP_UTILITIES.ANALYSIS_BATCH_SUMMARY_ENDPOINT;

    //on init, call getAnalysisBatches function of the AnalysisBatchService, set results to the allAnalysisBatches var
    // this._analysisBatchService.getAnalysisBatches()
    //   .subscribe(analysisBatches => this.allAnalysisBatches = analysisBatches,
    //   error => this.errorMessage = <any>error);
  }

  createABForm = new FormGroup({

  })

  retrieveABData(abID) {
    return this._analysisBatchService.getAnalysisBatchData(abID);
  }

  openExtractionDetails(abID) {

    //check if AB ID matches the current focusAnalysisBatchID. 
    //This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID == this.focusAnalysisBatchID) {
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      //set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      //call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    }
    //show the extraction details modal if not showing already
    if (this.showHideExtractionDetailModal === false) {
      this.showHideExtractionDetailModal = true;
    }

  }

  openRTDetails() {

  }

  openInhibitionDetails(abID) {
    //check if AB ID matches the current focusAnalysisBatchID. 
    //This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID == this.focusAnalysisBatchID) {
      this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      //set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      //call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.inhibitionDetailArray = this.focusAnalysisBatchData.extractions;
    }
    //show the extraction details modal if not showing already
    if (this.showHideInhibitionDetailModal === false) {
      this.showHideInhibitionDetailModal = true;
    }

  }

  openTargetDetails() {

  }

  editAB(selectedAB) {
    alert("user has chosen to edit selected analysis batch")

  }

}
