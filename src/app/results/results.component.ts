import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { ISample } from '../samples/sample';
import { SampleService } from '../samples/sample.service';
import { ITarget } from '../targets/target';
import { TargetService } from '../targets/target.service';
import { Wizard, WizardPage, BUTTON_GROUP_DIRECTIVES, Datagrid } from "clarity-angular";

import { IMatrix } from '../SHARED/matrix';
import { ISampleType } from '../SHARED/sample-type';
import { IStudy } from '../studies/study';

import { MatrixService } from '../SHARED/matrix.service';
import { StudyService } from '../studies/study.service';
import { SampleTypeService } from '../SHARED/sample-type.service';
import { PcrReplicateService } from '../pcr-replicates/pcr-replicate.service';

import { APP_SETTINGS } from '../app.settings';
import { APP_UTILITIES } from '../app.utilities';

import { FinalSampleMeanConcentrationService } from './final-sample-mean-concentration.service';
// import { sample } from 'rxjs/operators';
// import { sampleTime } from 'rxjs/operator/sampleTime';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterViewInit {
  @ViewChild("resultsQueryWizard") resultsQueryWizard: Wizard;
  @ViewChild("sampleRowDataGrid") sampleRowDataGrid: Datagrid;
  @ViewChild("targetRowDataGrid") targetRowDataGrid: Datagrid;
  allSamples: ISample[] = [];
  allTargets: ITarget[] = [];
  sampleTypes: ISampleType[];
  matrices: IMatrix[];
  studies: IStudy[];
  samplesLoading: boolean = false;
  errorMessage: string;
  samplesCount: null;
  sampleQueryComplete: boolean = false;

  fsmcResultsLoading: boolean = false;
  fsmcResultsLoaded: boolean = false;

  sampleResultsLoading: boolean = false;
  sampleResultsLoaded: boolean = false;

  resultsQueryWizardActive: boolean = false;

  submitLoading: boolean = false;

  sampleSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;

  selected = [];
  fsmcResults = [];
  //sampleResults:ISample[] = [];

  sampleResults = [];

  nucleicAcidTypes = [];

  sampleQueryForm: FormGroup;

  sampleQuerySizeErrorFlag = false;

  showReplicateDetailsModal: boolean = false;
  showBusinessRulesModal: boolean = false;

  replicateDetailArray = [];
  missingInhibitions = [];

  replicateCategoryString;

  resultsQuery = {
    samples: [],
    targets: []
  }

  fsmcColumns = [
    { fieldName: 'sample', colName: "Sample" },
    { fieldName: 'collaborator_sample_id', colName: "Collaborator Sample ID" },
    { fieldName: 'collection_start_date', colName: "Collection Start Date" },
    { fieldName: 'target_string', colName: "Target" },
    { fieldName: 'final_sample_mean_concentration', colName: "Sample Mean Concentration" },
    { fieldName: 'final_sample_mean_concentration_sci', colName: "Sample Mean Concentration (Sci)" }
  ]

  sampleRowColumns = [
    { fieldName: 'id', colName: "Sample" },
    { fieldName: 'collaborator_sample_id', colName: "Collaborator Sample ID" },
    { fieldName: 'collection_start_date', colName: "Collection Start Date" }
    // array.push the target columns to this array
  ]

  targetRowColumns = [
    { fieldName: 'target_string', colName: "Target" },
    // array.push the sample columns to this array
  ]

  buildSampleQueryForm() {
    this.sampleQueryForm = this.formBuilder.group({
      study: null,
      from_id: null,
      to_id: null,
      from_collection_start_date: null,
      to_collection_start_date: null,
      collaborator_sample_id: null,
      sample_type: null,
      matrix: null,
      record_type: null,
      peg_neg: null
    })
  }

  constructor(
    private _sampleService: SampleService,
    private _targetService: TargetService,
    private _finalSampleMeanConcentrationService: FinalSampleMeanConcentrationService,
    private _studyService: StudyService,
    private _sampleTypeService: SampleTypeService,
    private _matrixService: MatrixService,
    private _pcrReplicateService: PcrReplicateService,
    private formBuilder: FormBuilder
  ) {
    this.buildSampleQueryForm();
  }

  ngOnInit() {

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

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


    // on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
    this._sampleTypeService.getSampleTypes()
      .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
        error => this.errorMessage = error);

    // on init, call getMatrices function of the MatrixService, set results to the matrices var
    this._matrixService.getMatrices()
      .subscribe(matrices => this.matrices = matrices,
        error => this.errorMessage = error);

    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(
        studies => {
          this.studies = studies
          this.studies.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
        },
        error => this.errorMessage = error);

  }

  ngAfterViewInit() {



  }

  deselectAll() {
    this.selected = [];
  }

  selectAll() {
    this.selected = this.allSamples;
  }

  openResultsQueryWizard() {
    this.resultsQuery.samples = [];
    this.resultsQuery.targets = [];
    this.resultsQueryWizardActive = !this.resultsQueryWizardActive
  }

  exportToCSV(tableType) {
    const filename = 'LIDE_Results_Report' + APP_UTILITIES.TODAY + '.csv';

    switch (tableType) {
      case 'fsmc':
        APP_UTILITIES.generateCSV({ filename: filename, data: this.fsmcResults, headers: this.fsmcColumns });
        break;
      case 'sampleRows':

        // add the target name rows to the sampleRowColumns array using one of the FSMC arrays
        for (let fsmc of this.sampleResults[0].final_sample_mean_concentrations) {
          this.sampleRowColumns.push({ fieldName: fsmc.target_string, colName: fsmc.target_string })
        }
        // flatten fsmc values into the sample record for export purposes
        for (let sample of this.sampleResults) {
          for (let fsmc of sample.final_sample_mean_concentrations) {
            sample[fsmc.target_string] = fsmc.final_sample_mean_concentration
          }
        }
        APP_UTILITIES.generateCSV({ filename: filename, data: this.sampleResults, headers: this.sampleRowColumns });
        break;
      case 'targetRows':

        this.targetRowColumns = [
          { fieldName: 'target_string', colName: "" }]

        for (let sample of this.sampleResults) {
          this.targetRowColumns.push({ fieldName: sample.id.toString(), colName: sample.id.toString() })
        }
        // tslint:disable-next-line:max-line-length
        let targetRowArray = [{ 'target': 'collaborator_sample_id', 'target_string': 'Collaborator Sample ID' }, { 'target': 'collection_start_date', 'target_string': 'Collection Start Date' }];
        for (let fsmc of this.sampleResults[0].final_sample_mean_concentrations) {
          // initiate the targetRowArray
          targetRowArray.push({ 'target': fsmc.target, 'target_string': fsmc.target_string })
        }

        for (let target of targetRowArray) {
          for (let sample of this.sampleResults) {

            let sampleID = sample.id.toString();
            if (target.target === 'collaborator_sample_id') {
              target[sampleID] = sample.collaborator_sample_id;
            }
            if (target.target === 'collection_start_date') {
              target[sampleID] = sample.collection_start_date;
            }

            for (let fsmc of sample.final_sample_mean_concentrations) {
              if (fsmc.target === target.target) {
                target[sampleID] = fsmc.final_sample_mean_concentration;
              }
            }
          }
          delete target.target;
        }
        console.log(targetRowArray);
        APP_UTILITIES.generateCSV({ filename: filename, data: targetRowArray, headers: this.targetRowColumns });
        break;
      default:
        this.replicateCategoryString = 'Replicates'
    }


  }

  resetFlags() {
    this.sampleQuerySizeErrorFlag = false;
    this.sampleQueryComplete = false;
    this.errorMessage = '';
  }

  resizeTable() {
    this.sampleRowDataGrid.resize();
    this.targetRowDataGrid.resize();
  }

  openReplicateDetails(category, fsmc) {
    switch (category) {
      case 'positive_concentrations':
        this.replicateCategoryString = 'Replicates with Positive Concentrations'
        break;
      case 'negative_concentrations':
        this.replicateCategoryString = 'Replicates with Negative Concentrations'
        break;
      case 'qpcr_results_missing':
        this.replicateCategoryString = 'Missing qPCR Values'
        break;
      case 'concentration_calc_values_missing':
        this.replicateCategoryString = 'Concentration Calculation Values Missing'
        break;
      case 'controls_invalids':
        this.replicateCategoryString = 'Made invalid by non-compliant controls'
        break;
      case 'invalid_override_invalids':
        this.replicateCategoryString = 'Made invalid by manual override'
        break;
      default:
        this.replicateCategoryString = 'Replicates'
    }

    this.replicateDetailArray = [];
    let replicateIDArray = [];

    for (let rep of fsmc.sample_target_replicates[category]) {
      replicateIDArray.push(rep.id);
    }

    this._pcrReplicateService.getPCRReplicates(replicateIDArray)
      .subscribe(
        (replicates) => {
          this.replicateDetailArray = replicates;
          // attach the AB and Extraction info to the complete PCR replicate record for display purposes
          for (let replicate of this.replicateDetailArray) {
            for (let rep of fsmc.sample_target_replicates[category]) {
              if (rep.id === replicate.id) {
                replicate.analysis_batch = rep.analysis_batch;
                replicate.extraction_number = rep.extraction_number;
                replicate.replicate_number = rep.replicate_number;
              }
            }
          }
          this.showReplicateDetailsModal = true;
        },
        error => {
          this.errorMessage = error;
          this.submitLoading = false;
        }
      );

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

      this.fsmcResultsLoaded = false;
      this.fsmcResultsLoading = true;
      this.sampleResultsLoaded = false;
      this.sampleResultsLoading = true;

      this.resultsQueryWizard.cancel();

      this._finalSampleMeanConcentrationService.queryFinalSampleMeanConcentrations(this.resultsQuery)
        .subscribe(
          (fsmcResults) => {
            this.fsmcResults = fsmcResults;
            this.fsmcResultsLoaded = true;
            this.fsmcResultsLoading = false;

            // sample-based FSMC query
            this._sampleService.queryFinalSampleMeanConcentrations(this.resultsQuery)
              .subscribe(
                (sampleResults) => {
                  this.sampleResults = sampleResults;
                  for (let samp of this.sampleResults) {
                    samp.final_sample_mean_concentrations.sort(function (a, b) {
                      if (a.target_string < b.target_string) { return -1; }
                      if (a.target_string > b.target_string) { return 1; }
                      return 0;
                    });
                  }
                  this.sampleResultsLoaded = true;
                  this.sampleResultsLoading = false;
                },
                error => {
                  this.errorMessage = <any>error
                  this.sampleResultsLoading = false;
                }
              );


            this.selected = [];
            this.resultsQuery.samples = [];
            this.resultsQuery.targets = [];
            this.resultsQueryWizard.reset();


          },
          error => {
            this.errorMessage = <any>error
            this.fsmcResultsLoading = false;
          }
        );


    }
  }

  onSubmitSampleQuery(formValue) {

    this.resetFlags();

    this.submitLoading = true;

    // set functional limit for amount of samples to display in the table at once
    const countLimit = 2000;

    this._sampleService.querySamplesCount(formValue)
      .subscribe(
        (count) => {

          // if count exceeds limit, show error message
          if (count.count >= countLimit) {
            this.sampleQuerySizeErrorFlag = true;
          } else if (count.count < countLimit) {

            this.samplesLoading = true;

            formValue.slim = null;

            // if sample query count does not exceed functional limit, query for actual results, and set results to the allSamples var
            this._sampleService.querySamples(formValue)
              .subscribe(
                (samples) => {
                  this.samplesCount = count.count;
                  this.sampleQueryComplete = true;
                  this.allSamples = samples
                  this.samplesLoading = false;
                  this.submitLoading = false;
                },
                error => {
                  this.errorMessage = error;
                  this.submitLoading = false;
                  this.samplesLoading = false;
                }
              );
          }
        },
        error => {
          this.errorMessage = error;
          this.submitLoading = false;
        }
      );

  }


}
