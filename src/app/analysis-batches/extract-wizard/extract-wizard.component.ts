import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Wizard} from "clarity-angular";

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IExtraction } from '../../SHARED/extraction';
import { IInhibition } from '../../SHARED/inhibition';
import { IReverseTranscription } from '../../SHARED/reverse-transcription';
import { ITarget } from '../../targets/target';

import { TargetService } from '../../targets/target.service';

import { APP_UTILITIES } from '../../app.utilities';

@Component({
  selector: 'extract-wizard',
  templateUrl: './extract-wizard.component.html',
  styleUrls: ['./extract-wizard.component.scss']
})
export class ExtractWizardComponent implements OnInit { 
  @ViewChild("wizardextract") wizardExtract: Wizard;
  private _extractOpen: boolean = false;

  @Input() selectedABSummary: IAnalysisBatchSummary;
  @Input() selectedAnalysisBatchID;

  @Input()
  set extractOpen(value: boolean) {
    this._extractOpen = value;
  }
  get extractOpen () {
    return this._extractOpen;
  }


  allTargets: ITarget[];

  constructor() { }

  ngOnInit() {
     // grab temporary hard-coded sample target summary data (until web service endpoint is up-to-date)
     this.allTargets = APP_UTILITIES.TARGETS_ENDPOINT;
  }

}
