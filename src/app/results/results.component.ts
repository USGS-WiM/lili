import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { ISample } from '../samples/sample';
import { SampleService } from '../samples/sample.service';
import { ITarget } from '../targets/target';
import { TargetService } from '../targets/target.service';
import { Wizard, WizardPage, BUTTON_GROUP_DIRECTIVES } from "clarity-angular";


import { APP_SETTINGS } from '../app.settings';
import { APP_UTILITIES } from '../app.utilities';

import { FinalSampleMeanConcentrationService } from './final-sample-mean-concentration.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @ViewChild("resultsQueryWizard") resultsQueryWizard: Wizard;
  allSamples: ISample[] = [];
  allTargets: ITarget[] = [];
  samplesLoading: boolean = false;
  errorMessage: string;

  resultsLoaded: boolean = false;

  resultsQueryWizardActive: boolean = false;

  sampleSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;

  selected = [];
  results = [];

  nucleicAcidTypes = [];


  resultsQuery = {
    samples: [],
    targets: []
  }

  columns = [
    { fieldName: 'sample', colName: "Sample" },
    { fieldName: 'collaborator_sample_id', colName: "Collaborator Sample ID" },
    { fieldName: 'collection_start_date', colName: "Collection Start Date" },
    { fieldName: 'target_string', colName: "Target" },
    { fieldName: 'final_sample_mean_concentration', colName: "Sample Mean Concentration" },
    { fieldName: 'final_sample_mean_concentration_sci', colName: "Sample Mean Concentration (Sci)" }
  ]

  constructor(private _sampleService: SampleService,
    private _targetService: TargetService,
    private _finalSampleMeanConcentrationService: FinalSampleMeanConcentrationService
  ) { }

  ngOnInit() {

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(
        (samples) => {
          this.allSamples = samples
          this.samplesLoading = false;
        },
        error => {
          this.errorMessage = <any>error
        }
      );

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
        error => this.errorMessage = <any>error);
  }

  deselectAll() {
    this.selected = [];
  }

  openResultsQueryWizard() {
    this.resultsQuery.samples = [];
    this.resultsQuery.targets = [];
    this.resultsQueryWizardActive = !this.resultsQueryWizardActive
  }

  exportToCSV() {
    const filename = 'LIDE_Results_' + APP_UTILITIES.TODAY + '.csv';
    APP_UTILITIES.downloadCSV({ filename: filename, data: this.results, headers: this.columns });
  }

  public doCustomClick(buttonType: string): void {

    this.sampleSelectErrorFlag = false;
    this.targetSelectErrorFlag = false;
    if ("custom-next-sampleSelect" === buttonType) {
      if (this.selected.length < 1) {
        this.sampleSelectErrorFlag = true;
      } else {
        this.sampleSelectErrorFlag = false;

        for (let sample of this.selected) {
          this.resultsQuery.samples.push(sample.id);
        }
        this.selected = [];
        this.resultsQueryWizard.next();
      }
    }


    if ("custom-next-targetSelect" === buttonType) {
      if (this.selected.length < 1) {
        this.targetSelectErrorFlag = true;
      } else {
        this.targetSelectErrorFlag = false;

        for (let target of this.selected) {
          this.resultsQuery.targets.push(target.id);
        }
        this.resultsQueryWizard.next();
      }
    }


    if ("custom-previous" === buttonType) {
      this.selected = [];
      this.resultsQueryWizard.previous();
    }

    if ("custom-cancel" === buttonType) {
      this.resultsQueryWizard.cancel();
      this.selected = [];
      this.resultsQuery.samples = [];
      this.resultsQuery.targets = [];
      this.resultsQueryWizard.reset();
    }

    if ("custom-finish" === buttonType) {

      this.resultsLoaded = false;

      this._finalSampleMeanConcentrationService.queryFinalSampleMeanConcentrations(this.resultsQuery)
        .subscribe(
          (results) => {
            console.log(results);
            this.results = results;
            this.resultsLoaded = true;
          },
          error => {
            this.errorMessage = <any>error
          }
        );

      this.resultsQueryWizard.cancel();
      this.selected = [];
      this.resultsQuery.samples = [];
      this.resultsQuery.targets = [];
      this.resultsQueryWizard.reset();
    }
  }





}
