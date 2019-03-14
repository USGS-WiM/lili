import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { ISample } from '../samples/sample';
import { SampleService } from '../samples/sample.service';
import { ITarget } from '../targets/target';
import { TargetService } from '../targets/target.service';
import { Wizard, WizardPage, BUTTON_GROUP_DIRECTIVES } from "clarity-angular";

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

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @ViewChild("resultsQueryWizard") resultsQueryWizard: Wizard;
  allSamples: ISample[] = [];
  allTargets: ITarget[] = [];
  sampleTypes: ISampleType[];
  matrices: IMatrix[];
  studies: IStudy[];
  samplesLoading: boolean = false;
  errorMessage: string;
  samplesCount: null;
  sampleQueryComplete: boolean = false;

  resultsLoading: boolean = false;

  resultsLoaded: boolean = false;

  resultsQueryWizardActive: boolean = false;

  submitLoading: boolean = false;

  sampleSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;

  selected = [];
  results = [];

  nucleicAcidTypes = [];

  sampleQueryForm: FormGroup;

  sampleQuerySizeErrorFlag = false;

  showReplicateDetailsModal: boolean = false;

  replicateDetailArray = [];
  missingInhibitions = [];

  replicateCategoryString;

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
      record_type: null
    })
  }

  constructor(private _sampleService: SampleService,
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
      .subscribe(targets => this.allTargets = targets,
        error => this.errorMessage = <any>error);

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
      .subscribe(studies => this.studies = studies,
        error => this.errorMessage = error);

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

  resetFlags() {
    this.sampleQuerySizeErrorFlag = false;
    this.sampleQueryComplete = false;
    this.errorMessage = '';
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
        this.replicateCategoryString = 'Replicates with Missing qPCR Values'
        break;
      case 'concentration_calc_values_missing':
        this.replicateCategoryString = 'Replicates with Concentration Calculation Values Missing'
        break;
      case 'invalid':
        this.replicateCategoryString = 'Replicates made invalid by non-compliant controls'
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

      this.resultsLoaded = false;
      this.resultsLoading = true;

      this._finalSampleMeanConcentrationService.queryFinalSampleMeanConcentrations(this.resultsQuery)
        .subscribe(
          (results) => {
            console.log(results);
            this.results = results;
            this.resultsLoaded = true;
            this.resultsLoading = false;
          },
          error => {
            this.errorMessage = <any>error
            this.resultsLoading = false;
          }
        );

      this.resultsQueryWizard.cancel();
      this.selected = [];
      this.resultsQuery.samples = [];
      this.resultsQuery.targets = [];
      this.resultsQueryWizard.reset();
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
                  this.resultsLoading = false;
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
