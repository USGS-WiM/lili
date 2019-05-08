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
import { FinalSampleMeanConcentrationService } from '../results/final-sample-mean-concentration.service';

import { APP_SETTINGS } from '../app.settings';
import { APP_UTILITIES } from '../app.utilities';
import { InhibitionService } from 'app/inhibitions/inhibition.service';

// import { FinalSampleMeanConcentrationService } from '../final-sample-mean-concentration.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild("reportsQueryWizard") reportsQueryWizard: Wizard;
  @ViewChild("inhibitionReportDataGrid") inhibitionReportDataGrid: Datagrid;

  allSamples: ISample[] = [];
  allTargets: ITarget[] = [];
  sampleTypes: ISampleType[];
  matrices: IMatrix[];
  studies: IStudy[];
  samplesLoading: boolean = false;
  errorMessage: string;
  samplesCount: null;
  sampleQueryComplete: boolean = false;

  selected = [];
  reportsQueryWizardActive: boolean = false;

  reportsQuery = {
    samples: [],
    targets: [],
    summary_stats: []
  }

  submitLoading: boolean = false;

  sampleSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;

  nucleicAcidTypes = [];

  sampleQueryForm: FormGroup;
  reportSelectForm: FormGroup;

  sampleQuerySizeErrorFlag = false;
  reportsLoading = false;

  // loading variables for each report type
  inhibitionReportLoading = false;
  controlsResultReportLoading = false;
  individualSampleReportLoading = false;
  qualityControlReportLoading = false;
  resultsReportSummaryLoading = false;

  inhibitionReportLoaded = false;
  controlsResultReportLoaded = false;
  individualSampleReportLoaded = false;
  qualityControlReportLoaded = false;
  resultsReportSummaryLoaded = false;

  // arrays to contain each report's results
  inhibitionReportResults = [];
  controlsResultReportResults = [];
  individualSampleReportResults = [];
  qualityControlReportResults = [];
  resultsReportSummaryResults = [];

  inhibitionColumns = [
    { fieldName: 'sample', colName: "Sample" },
    { fieldName: 'collaborator_sample_id', colName: "Collaborator Sample ID" },
    { fieldName: 'study', colName: "Study" },
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" },
    { fieldName: 'inhibition_dna_cq_value', colName: "DNA Inhibtion Sample Cq" },
    { fieldName: 'inhibition_dna_control_cq_value', colName: "DNA Inhibtion Control Cq" },
    { fieldName: 'inhibition_dna_dilution_factor', colName: "DNA Inhibtion Dilution Factor" },
    { fieldName: 'inhibition_rna_cq_value', colName: "RNA Inhibtion Sample Cq" },
    { fieldName: 'inhibition_rna_control_cq_value', colName: "RNA Inhibtion Control Cq" },
    { fieldName: 'inhibition_rna_dilution_factor', colName: "RNA Inhibtion Dilution Factor" },
  ]

  resultsReportSummaryColumns = [
    { fieldName: 'target_string', colName: "Target" },
    { fieldName: 'replicate_count', colName: "Replicate Count" },
    { fieldName: 'positive_count', colName: "Positive Replicate Count" },
    { fieldName: 'percent_positive', colName: "Percent Positive" },
    { fieldName: 'max_concentration', colName: "Maximum Concentration" },
    { fieldName: 'min_concentration', colName: "Minimum Concentration" },
    { fieldName: 'median_concentration', colName: "Median Concentration" },
    { fieldName: 'average_concentration', colName: "Average Concentration" },
    { fieldName: 'min_concentration_positive', colName: "Minimum concentration of positive replicates" },
    { fieldName: 'median_concentration_positive', colName: "Median concentration of positive replicates" },
    { fieldName: 'average_concentration_positive', colName: "Average concentration of positive replicates" },
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

  buildReportSelectForm() {
    this.reportSelectForm = this.formBuilder.group({
      inhibition_report: false,
      results_report_summary: false,
      results_report_summary_options: this.formBuilder.group({
        replicate_count: false,
        positive_count: false,
        percent_positive: false,
        max_concentration: false,
        min_concentration: false,
        median_concentration: false,
        average_concentration: false,
        min_concentration_positive: false,
        median_concentration_positive: false,
        average_concentration_positive: false
      }),
      individual_sample_report: false,
      quality_control_report: false,
      controls_result_report: false
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
    private _inhibitionService: InhibitionService,
    private formBuilder: FormBuilder
  ) {
    this.buildSampleQueryForm();
    this.buildReportSelectForm();
  }

  openReportsQueryWizard() {
    this.reportsQuery.samples = [];
    this.reportsQuery.targets = [];
    this.reportsQueryWizardActive = !this.reportsQueryWizardActive
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

  resetFlags() {
    this.sampleQuerySizeErrorFlag = false;
    this.sampleQueryComplete = false;
    this.errorMessage = '';
  }

  resizeTable() {
    this.inhibitionReportDataGrid.resize();
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
          this.reportsQuery.samples.push(sample.id);
        }
        this.selected = [];
        this.reportsQueryWizard.next();
      }
    }


    if ("custom-next-targetSelect" === buttonType) {
      // if (this.selected.length < 1) {
      //   this.targetSelectErrorFlag = true;
      // } else {
      //   this.targetSelectErrorFlag = false;

      //   for (let target of this.selected) {
      //     this.reportsQuery.targets.push(target.id);
      //   }
      //   this.reportsQueryWizard.next();
      // }

      for (let target of this.selected) {
        this.reportsQuery.targets.push(target.id);
      }
      this.reportsQueryWizard.next();
    }


    if ("custom-previous" === buttonType) {
      this.selected = [];
      this.reportsQueryWizard.previous();
    }

    if ("custom-cancel" === buttonType) {
      this.reportsQueryWizard.cancel();
      this.selected = [];
      this.reportsQuery.samples = [];
      this.reportsQuery.targets = [];
      this.reportsQueryWizard.reset();
    }

    if ("custom-finish" === buttonType) {

      this.reportsQueryWizard.cancel();
      this.selected = [];
      this.reportsQueryWizard.reset();
    }
  }


  exportToCSV(tableType) {
    let filename;

    switch (tableType) {
      case 'inhibitionReport':
        filename = 'LIDE_InhibitonReport' + APP_UTILITIES.TODAY + '.csv';
        APP_UTILITIES.generateCSV({ filename: filename, data: this.inhibitionReportResults, headers: this.inhibitionColumns });
        break;
      case 'controlsResultReport':
        break;
      case 'individualSampleReport':
        break;
      case 'qualityControlReport':
        break;
      case 'resultsReportSummary':
        break;
      default:
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

  generateReports(reportSelectFormValue) {
    // this.reportsLoading = true;

    // here is where up to 4 reports are generated (which could be even more individual HTTP requests, depending on how we build them)
    // must do a check for which reports were selected, make request for each selected one. 4 independent 'if' blocks
    // put these into the success blocks of the report requests
    // this.controlsResultReportLoaded = true;
    // this.individualSampleReportLoaded = true;
    // this.qualityControlReportLoaded = true;
    // this.resultsReportSummaryLoaded = true;

    if (reportSelectFormValue.inhibition_report) {
      this.inhibitionReportLoading = true;
      // begin call for inhibition report
      this._inhibitionService.getInhibitionReport(this.reportsQuery)
        .subscribe(
          (results) => {
            this.inhibitionReportResults = results;
            this.inhibitionReportLoading = false;
            this.inhibitionReportLoaded = true;
          },
          error => {
            this.errorMessage = error;
            this.inhibitionReportLoading = false;
            this.inhibitionReportLoaded = false;
          }
        );

    }
    if (reportSelectFormValue.controls_result_report) {
      this.controlsResultReportLoading = true;

    }
    if (reportSelectFormValue.individual_sample_report) {
      this.individualSampleReportLoading = true;

    }
    if (reportSelectFormValue.quality_control_report) {
      this.qualityControlReportLoading = true;

    }
    if (reportSelectFormValue.results_report_summary) {
      this.resultsReportSummaryLoading = true;

      // this.reportsQuery.summary_stats = [];

      let options = this.reportSelectForm.get('results_report_summary_options').value;

      Object.keys(options).forEach(item => {
        console.log(item);
        if (options[item]) {
          this.reportsQuery.summary_stats.push(item);
        }
      });

      this._pcrReplicateService.getSummaryStatistics(this.reportsQuery)
        .subscribe(
          (results) => {
            this.resultsReportSummaryResults = results;
            this.resultsReportSummaryLoading = false;
            this.resultsReportSummaryLoaded = true;
          },
          error => {
            this.errorMessage = error;
            this.resultsReportSummaryLoading = false;
            this.resultsReportSummaryLoaded = false;
          }
        );

    }
  }

}
