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
import { QualityControlReportService } from 'app/reports/quality-control-report.service';
import { ControlResultsReportService } from './control-results-report.service';
import { ReportFileService } from './report-file.service';
import { ReportTypesService } from './report-types.service';
import { ReportStatusService } from './report-status.service';

// import { FinalSampleMeanConcentrationService } from '../final-sample-mean-concentration.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild("reportsQueryWizard") reportsQueryWizard: Wizard;
  @ViewChild("inhibitionReportDataGrid") inhibitionReportDataGrid: Datagrid;
  @ViewChild("resultsReportSummaryDataGrid") resultsReportSummaryDataGrid: Datagrid;
  @ViewChild("individualSampleReportDataGrid") individualSampleReportDataGrid: Datagrid;
  @ViewChild("qualityControlReport_sampleQC_DataGrid") qualityControlReport_sampleQC_DataGrid: Datagrid;
  @ViewChild("qualityControlReport_EB_Raw_DataGrid") qualityControlReport_EB_Raw_DataGrid: Datagrid;
  @ViewChild("qualityControlReport_EB_QC_DataGrid") qualityControlReport_EB_QC_DataGrid: Datagrid;
  @ViewChild("controlsResultReport_extNeg_DataGrid") controlsResultReport_extNeg_DataGrid: Datagrid;
  @ViewChild("controlsResultReport_extPos_DataGrid") controlsResultReport_extPos_DataGrid: Datagrid;
  @ViewChild("controlsResultReport_pcrNeg_DataGrid") controlsResultReport_pcrNeg_DataGrid: Datagrid;
  @ViewChild("controlsResultReport_pcrPos_DataGrid") controlsResultReport_pcrPos_DataGrid: Datagrid;
  @ViewChild("controlsResultReport_pegneg_DataGrid") controlsResultReport_pegneg_DataGrid: Datagrid;

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

  reportTypes = [];
  reportStatuses = [];

  submitLoading: boolean = false;

  sampleSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;

  nucleicAcidTypes = [];

  sampleQueryForm: FormGroup;
  reportSelectForm: FormGroup;

  sampleQuerySizeErrorFlag = false;
  reportsLoading = false;

  // request success flag each report type
  inhibitionReportSuccessFlag = false;
  resultsReportSummarySuccessFlag = false;
  individualSampleReportSuccessFlag = false;
  qualityControlReportSuccessFlag = false;
  controlsResultReportSuccessFlag = false;

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

  // arrays to contain each report list
  inhibitionReportsList = [];
  resultsReportSummaryReportsList = [];
  individualSampleReportsList = [];
  qualityControlReportsList = [];
  controlsResultReportsList = [];

  // columns list for report lists
  reportListColumns = [
    { fieldName: 'created_date', colName: "Created Date" },
    { fieldName: 'created_by', colName: "Created By" },
    { fieldName: 'status', colName: "Status" },
    { fieldName: 'name', colName: "Name" },
    { fieldName: 'link', colName: "Link" },
  ]

  // arrays to contain each report's results
  inhibitionReportResults = [];
  resultsReportSummaryResults = [];
  individualSampleReportResults = [];
  qualityControlReportResults = { "sample_quality_control": [], "extraction_raw_data": [], "extraction_quality_control": [] };
  controlsResultReportResults = { "ext_neg": [], "ext_pos": [], "pcr_neg": [], "pcr_pos": [], "peg_neg": [], "targets": [] };

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
    { fieldName: 'target_name', colName: "Target" },
    { fieldName: 'sample_count', colName: "Sample Count" },
    { fieldName: 'positive_count', colName: "Positive Sample Count" },
    { fieldName: 'percent_positive', colName: "Percent Positive" },
    { fieldName: 'max_concentration', colName: "Maximum Concentration" },
    { fieldName: 'min_concentration', colName: "Minimum Concentration" },
    { fieldName: 'median_concentration', colName: "Median Concentration" },
    { fieldName: 'average_concentration', colName: "Average Concentration" },
    { fieldName: 'min_concentration_positive', colName: "Minimum concentration of positive samples" },
    { fieldName: 'median_concentration_positive', colName: "Median concentration of positive samples" },
    { fieldName: 'average_concentration_positive', colName: "Average concentration of positive samples" },
  ]

  individualSampleReportColumns = [
    { fieldName: 'sample', colName: "Sample" },
    { fieldName: 'target_string', colName: "Target" },
    { fieldName: 'result', colName: "Result" },
    { fieldName: 'final_sample_mean_concentration_sci', colName: "Sample Mean Concentration (Sci)" },
  ]

  qualityControlReport_sampleQC_Columns = [
    { fieldName: 'metric', colName: "Metric" },
    { fieldName: 'value', colName: "Value" },
    { fieldName: 'count', colName: "Count" },
    { fieldName: 'min', colName: "Min" },
    { fieldName: 'max', colName: "Max" },
  ]

  qualityControlReport_EB_Raw_Columns = [
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" },
    { fieldName: 'extraction_volume', colName: "Extraction Volume" },
    { fieldName: 'elution_volume', colName: "Elution Volume" },
    { fieldName: 'rt_template_volume', colName: "RT Template Volume" },
    { fieldName: 'rt_reaction_volume', colName: "RT Reaction Volume" },
    { fieldName: 'qpcr_template_volume', colName: "qPCR Template Volume" },
    { fieldName: 'qpcr_reaction_volume', colName: "qPCR Reaction Volume" },
  ]

  qualityControlReport_EB_QC_Columns = [
    { fieldName: 'metric', colName: "Metric" },
    { fieldName: 'value', colName: "Value" },
    { fieldName: 'count', colName: "Count" }
  ]

  controlsResultReport_extNeg_Columns = [
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" }
    // array.push the target columns to this array
  ]
  controlsResultReport_extPos_Columns = [
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" }
    // array.push the target columns to this array
  ]
  controlsResultReport_pcrNeg_Columns = [
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" },
    { fieldName: 'pcrreplicate_batch', colName: "PCR Replicate Batch" }
    // array.push the target columns to this array
  ]
  controlsResultReport_pcrPos_Columns = [
    { fieldName: 'analysis_batch', colName: "Analysis Batch" },
    { fieldName: 'extraction_number', colName: "Extraction Number" },
    { fieldName: 'pcrreplicate_batch', colName: "PCR Replicate Batch" }
    // array.push the target columns to this array
  ]
  controlsResultReport_pegNeg_Columns = [
    { fieldName: 'id', colName: "Sample (PegNeg) ID" },
    { fieldName: 'collection_start_date', colName: "Collection Start Date" }
    // array.push the target columns to this array
  ]


  resultsReportSummary_options = [
    'sample_count',
    'positive_count',
    'percent_positive',
    'max_concentration',
    'min_concentration',
    'median_concentration',
    'average_concentration',
    'min_concentration_positive',
    'median_concentration_positive',
    'average_concentration_positive'
  ]

  resultsReportSummary_columns = {
    sample_count: false,
    positive_count: false,
    percent_positive: false,
    max_concentration: false,
    min_concentration: false,
    median_concentration: false,
    average_concentration: false,
    min_concentration_positive: false,
    median_concentration_positive: false,
    average_concentration_positive: false
  }


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
      inhibition_report_filename: 'LIDE_InhibitionReport' + APP_UTILITIES.TODAY + '.csv',
      results_report_summary: false,
      results_report_summary_filename: 'LIDE_ResultsReportSummary' + APP_UTILITIES.TODAY + '.csv',
      results_report_summary_options: this.formBuilder.group({
        sample_count: false,
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
      individual_sample_report_filename: 'LIDE_IndividualSampleReport' + APP_UTILITIES.TODAY + '.csv',
      quality_control_report: false,
      quality_control_report_sampleQC_filename: 'LIDE_SampleQCReport' + APP_UTILITIES.TODAY + '.csv',
      quality_control_report_EB_Raw_filename: 'LIDE_RawExtractionBatchQCReport' + APP_UTILITIES.TODAY + '.csv',
      quality_control_report_EB_QC_filename: 'LIDE_ExtractionBatchQCReport' + APP_UTILITIES.TODAY + '.csv',
      controls_result_report: false,
      controls_result_report_extNeg_filename: 'LIDE_ControlsReport_ExtNeg' + APP_UTILITIES.TODAY + '.csv',
      controls_result_report_extPos_filename: 'LIDE_ControlsReport_ExtPos' + APP_UTILITIES.TODAY + '.csv',
      controls_result_report_pcrNeg_filename: 'LIDE_ControlsReport_PCRNeg' + APP_UTILITIES.TODAY + '.csv',
      controls_result_report_pcrPos_filename: 'LIDE_ControlsReport_PCRPos' + APP_UTILITIES.TODAY + '.csv',
      controls_result_report_pegneg_filename: 'LIDE_ControlsReport_PegNeg' + APP_UTILITIES.TODAY + '.csv'
    })
  }

  constructor(
    private _sampleService: SampleService,
    private _targetService: TargetService,
    private _finalSampleMeanConcentrationService: FinalSampleMeanConcentrationService,
    private _qualityControlReportService: QualityControlReportService,
    private _controlResultsReportService: ControlResultsReportService,
    private _reportFileService: ReportFileService,
    private _reportTypesService: ReportTypesService,
    private _reportStatusService: ReportStatusService,
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
      .subscribe(targets => {
        this.allTargets = targets
        this.allTargets.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      },
        error => this.errorMessage = <any>error);

    // on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
    this._sampleTypeService.getSampleTypes()
      .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
        error => this.errorMessage = error);

    // on init, call getMatrices function of the MatrixService, set results to the matrices var
    this._matrixService.getMatrices()
      .subscribe(matrices => this.matrices = matrices,
        error => this.errorMessage = error);

    // on init, call getReportTypes function of the ReportTypesService, set results to the reportTypes var
    this._reportTypesService.getReportTypes()
      .subscribe(reportTypes => this.reportTypes = reportTypes,
        error => this.errorMessage = error);

    // on init, call getReportStatuses function of the ReportStatusService, set results to the reportStatuses var
    this._reportStatusService.getReportStatuses()
      .subscribe(reportStatuses => this.reportStatuses = reportStatuses,
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


    // retrieve all the currently available reports from the report files endpoint
    this._reportFileService.getReportFiles()
      .subscribe(
        reportfiles => {
          // split the reponse into the respective report lists
          for (let reportfile of reportfiles) {
            switch (reportfile.report_type) {
              case 1:
                this.inhibitionReportsList.push(reportfile);
                break;
              case 2:
                this.resultsReportSummaryReportsList.push(reportfile);
                break;
              case 3:
                this.individualSampleReportsList.push(reportfile);
                break;
              case 4:
                this.qualityControlReportsList.push(reportfile);
                break;
              case 5:
                this.controlsResultReportsList.push(reportfile);
                break;
              default:
            }

          }
        },
        error => this.errorMessage = error);
  }


  resetFlags() {
    this.sampleQuerySizeErrorFlag = false;
    this.sampleQueryComplete = false;
    this.errorMessage = '';
  }

  deselectAll() {
    this.selected = [];
  }

  selectAll() {
    this.selected = this.allSamples;
  }

  resizeTable(tab) {

    switch (tab) {
      case 'inhibitionReport':
        this.inhibitionReportDataGrid.resize();
        break;
      case 'resultsReportSummary':
        this.resultsReportSummaryDataGrid.resize();
        break;
      case 'individualSampleReport':
        this.individualSampleReportDataGrid.resize();
        break;
      case 'qualityControlReport':
        this.qualityControlReport_sampleQC_DataGrid.resize();
        this.qualityControlReport_EB_Raw_DataGrid.resize();
        this.qualityControlReport_EB_QC_DataGrid.resize();
        break;
      case 'controlsResultReport':
        this.controlsResultReport_extNeg_DataGrid.resize();
        this.controlsResultReport_extPos_DataGrid.resize();
        this.controlsResultReport_pcrNeg_DataGrid.resize();
        this.controlsResultReport_pcrPos_DataGrid.resize();
        this.controlsResultReport_pegneg_DataGrid.resize();
        break;
      default:
    }
  }

  resizeTableByID(tab) {

    switch (tab) {
      case 1:
        this.inhibitionReportDataGrid.resize();
        break;
      case 2:
        this.resultsReportSummaryDataGrid.resize();
        break;
      case 3:
        this.individualSampleReportDataGrid.resize();
        break;
      case 4:
        this.qualityControlReport_sampleQC_DataGrid.resize();
        this.qualityControlReport_EB_Raw_DataGrid.resize();
        this.qualityControlReport_EB_QC_DataGrid.resize();
        break;
      case 5:
        this.controlsResultReport_extNeg_DataGrid.resize();
        this.controlsResultReport_extPos_DataGrid.resize();
        this.controlsResultReport_pcrNeg_DataGrid.resize();
        this.controlsResultReport_pcrPos_DataGrid.resize();
        this.controlsResultReport_pegneg_DataGrid.resize();
        break;
      default:
    }
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

    switch (tableType) {
      case 'inhibitionReport':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('inhibition_report_filename').value,
          data: this.inhibitionReportResults,
          headers: this.inhibitionColumns
        });
        break;
      case 'resultsReportSummary':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('results_report_summary_filename').value,
          data: this.resultsReportSummaryResults,
          headers: this.resultsReportSummaryColumns
        });
        break;
      case 'individualSampleReport':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('individual_sample_report_filename').value,
          data: this.individualSampleReportResults,
          headers: this.individualSampleReportColumns
        });
        break;
      case 'qualityControlReport_sampleQC':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('quality_control_report_sampleQC_filename').value,
          data: this.qualityControlReportResults.sample_quality_control,
          headers: this.qualityControlReport_sampleQC_Columns
        });
        break;
      case 'qualityControlReport_EB_Raw':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('quality_control_report_EB_Raw_filename').value,
          data: this.qualityControlReportResults.extraction_raw_data,
          headers: this.qualityControlReport_EB_Raw_Columns
        });
        break;
      case 'qualityControlReport_EB_QC':
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('quality_control_report_EB_QC_filename').value,
          data: this.qualityControlReportResults.extraction_quality_control,
          headers: this.qualityControlReport_EB_QC_Columns
        });
        break;
      case 'controlsResultReport_extNeg':
        // add the target name rows to the controlsResultReport_extNeg_Columns array using the target array
        for (let target of this.controlsResultReportResults.targets) {
          this.controlsResultReport_extNeg_Columns.push({ fieldName: target, colName: target })
        }
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('controls_result_report_extNeg_filename').value,
          data: this.controlsResultReportResults.ext_neg,
          headers: this.controlsResultReport_extNeg_Columns
        });
        break;
      case 'controlsResultReport_extPos':
        // add the target name rows to the controlsResultReport_extPos_Columns array using the target array
        for (let target of this.controlsResultReportResults.targets) {
          this.controlsResultReport_extPos_Columns.push({ fieldName: target, colName: target })
        }
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('controls_result_report_extPos_filename').value,
          data: this.controlsResultReportResults.ext_pos,
          headers: this.controlsResultReport_extPos_Columns
        });
        break;
      case 'controlsResultReport_pcrNeg':
        // add the target name rows to the controlsResultReport_pcrNeg_Columns array using the target array
        for (let target of this.controlsResultReportResults.targets) {
          this.controlsResultReport_pcrNeg_Columns.push({ fieldName: target, colName: target })
        }
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('controls_result_report_pcrNeg_filename').value,
          data: this.controlsResultReportResults.pcr_neg,
          headers: this.controlsResultReport_pcrNeg_Columns
        });
        break;
      case 'controlsResultReport_pcrPos':
        // add the target name rows to the controlsResultReport_pcrPos_Columns array using the target array
        for (let target of this.controlsResultReportResults.targets) {
          this.controlsResultReport_pcrPos_Columns.push({ fieldName: target, colName: target })
        }
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('controls_result_report_pcrPos_filename').value,
          data: this.controlsResultReportResults.pcr_pos,
          headers: this.controlsResultReport_pcrPos_Columns
        });
        break;
      case 'controlsResultReport_pegneg':
        // add the target name rows to the controlsResultReport_pegNeg_Columns array using the target array
        for (let target of this.controlsResultReportResults.targets) {
          this.controlsResultReport_pegNeg_Columns.push({ fieldName: target, colName: target })
        }
        APP_UTILITIES.generateCSV({
          filename: this.reportSelectForm.get('controls_result_report_pegneg_filename').value,
          data: this.controlsResultReportResults.peg_neg,
          headers: this.controlsResultReport_pegNeg_Columns
        });
        break;
      default:
    }
  }

  loadReport(fileURL, fileName, report_type) {

    let trimmedFileName = fileName.replace(".json", "");

    switch (report_type) {
      case 1:
        this.inhibitionReportLoading = true;
        this.reportSelectForm.get('inhibition_report_filename').setValue(trimmedFileName);
        break;
      case 2:
        this.resultsReportSummaryLoading = true;
        this.reportSelectForm.get('results_report_summary_filename').setValue(trimmedFileName);
        break;
      case 3:
        this.individualSampleReportLoading = true;
        this.reportSelectForm.get('individual_sample_report_filename').setValue(trimmedFileName);
        break;
      case 4:
        this.qualityControlReportLoading = true;
        this.reportSelectForm.get('quality_control_report_sampleQC_filename').setValue(trimmedFileName + '(Sample)');
        this.reportSelectForm.get('quality_control_report_EB_Raw_filename').setValue(trimmedFileName + '(RawExtractionBatch)');
        this.reportSelectForm.get('quality_control_report_EB_QC_filename').setValue(trimmedFileName + '(ExtractionBatch)');
        break;
      case 5:
        this.controlsResultReportLoading = true;
        this.reportSelectForm.get('controls_result_report_extNeg_filename').setValue(trimmedFileName + '(ExtNeg)');
        this.reportSelectForm.get('controls_result_report_extPos_filename').setValue(trimmedFileName + '(ExtPos)');
        this.reportSelectForm.get('controls_result_report_pcrNeg_filename').setValue(trimmedFileName + '(PCRNeg)');
        this.reportSelectForm.get('controls_result_report_pcrPos_filename').setValue(trimmedFileName + '(PCRPos)');
        this.reportSelectForm.get('controls_result_report_pegneg_filename').setValue(trimmedFileName + '(PegNeg)');
        break;
      default:
    }

    this._reportFileService.retrieveReport(fileURL)
      .subscribe(
        (reportResults) => {

          switch (report_type) {
            case 1:
              this.inhibitionReportResults = reportResults;
              this.inhibitionReportLoading = false;
              this.inhibitionReportLoaded = true;
              break;
            case 2:

              for (let option of this.resultsReportSummary_options) {
                this.resultsReportSummary_columns[option] = false;
              }
              // special treatment for the resultsReportSummary: determine which columns to show on table
              // based on the structure of the first item in the response array
              for (let option of this.resultsReportSummary_options) {
                if (reportResults[0].hasOwnProperty(option)) {
                  this.resultsReportSummary_columns[option] = true;
                }
              }
              // alternative method for detecting presence/non-presence of the field (less safe)
              // for (let option of this.resultsReportSummary_options) {
              //   if (reportResults[0][option] !== undefined) {
              //     this.resultsReportSummary_columns[option] = true;
              //   }
              // }

              this.resultsReportSummaryResults = reportResults;
              this.resultsReportSummaryLoading = false;
              this.resultsReportSummaryLoaded = true;
              break;
            case 3:
              this.individualSampleReportResults = reportResults;
              this.individualSampleReportLoading = false;
              this.individualSampleReportLoaded = true;
              break;
            case 4:
              this.qualityControlReportResults = reportResults;
              this.qualityControlReportLoading = false;
              this.qualityControlReportLoaded = true;
              break;
            case 5:
              this.controlsResultReportResults = reportResults;
              this.controlsResultReportLoading = false;
              this.controlsResultReportLoaded = true;
              break;
            default:
          }
          this.submitLoading = false;
          this.resizeTableByID(report_type);
        },
        error => {
          this.errorMessage = error;
          this.submitLoading = false;
        }
      );
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

  generateReports(reportSelectFormValue) {

    if (reportSelectFormValue.inhibition_report) {
      this.submitLoading = true;
      this.inhibitionReportLoading = true;
      // begin call for inhibition report
      this._inhibitionService.getInhibitionReport(this.reportsQuery)
        .subscribe(
          (results) => {
            // this.inhibitionReportResults = results;
            // this.inhibitionReportLoading = false;
            // this.inhibitionReportLoaded = true;
            this.submitLoading = false;
            this.inhibitionReportSuccessFlag = true;
          },
          error => {
            this.errorMessage = error;
            this.inhibitionReportLoading = false;
            this.inhibitionReportLoaded = false;
            this.submitLoading = false;
          }
        );

    }
    if (reportSelectFormValue.controls_result_report) {
      this.submitLoading = true;
      this.controlsResultReportLoading = true;

      this._controlResultsReportService.getControlResultsReport(this.reportsQuery)
        .subscribe(
          (results) => {
            // this.controlsResultReportResults = results;
            // this.controlsResultReportLoading = false;
            // this.controlsResultReportLoaded = true;
            this.controlsResultReportSuccessFlag = true;
            this.submitLoading = false;
          },
          error => {
            this.errorMessage = error;
            this.controlsResultReportLoading = false;
            this.controlsResultReportLoaded = false;
            this.submitLoading = false;
          }
        );

    }
    if (reportSelectFormValue.individual_sample_report) {
      this.submitLoading = true;
      this.individualSampleReportLoading = true;

      this._finalSampleMeanConcentrationService.queryFinalSampleMeanConcentrationsResults(this.reportsQuery)
        .subscribe(
          (fsmcResults) => {
            // this.individualSampleReportResults = fsmcResults;
            // this.individualSampleReportLoading = false;
            // this.individualSampleReportLoaded = true;
            this.individualSampleReportSuccessFlag = true;
            this.submitLoading = false;
          },
          error => {
            this.errorMessage = <any>error
            this.individualSampleReportLoading = false;
            this.submitLoading = false;
          }
        );

    }
    if (reportSelectFormValue.quality_control_report) {
      this.submitLoading = true;
      this.qualityControlReportLoading = true;

      let sampleArray = {
        "samples": this.reportsQuery.samples
      }

      this._qualityControlReportService.getQualityControlReport(sampleArray)
        .subscribe(
          (qcReport) => {
            // this.qualityControlReportResults = qcReport;
            // this.qualityControlReportLoading = false;
            // this.qualityControlReportLoaded = true;
            this.qualityControlReportSuccessFlag = true;
            this.submitLoading = false;
          },
          error => {
            this.errorMessage = <any>error
            this.qualityControlReportLoading = false;
            this.submitLoading = false;
          }
        );

    }
    if (reportSelectFormValue.results_report_summary) {
      this.submitLoading = true;
      this.resultsReportSummaryLoading = true;

      this.reportsQuery.summary_stats = [];

      let options = this.reportSelectForm.get('results_report_summary_options').value;

      Object.keys(options).forEach(item => {
        console.log(item);
        if (options[item]) {
          this.reportsQuery.summary_stats.push(item);
        }
      });

      // just updated 6/11/19 - not yet available on backend
      this._finalSampleMeanConcentrationService.getSummaryStatistics(this.reportsQuery)
        .subscribe(
          (results) => {
            // this.resultsReportSummaryResults = results;
            // this.resultsReportSummaryLoading = false;
            // this.resultsReportSummaryLoaded = true;
            this.resultsReportSummarySuccessFlag = true;
            this.submitLoading = false;
          },
          error => {
            this.errorMessage = error;
            this.resultsReportSummaryLoading = false;
            this.resultsReportSummaryLoaded = false;
            this.submitLoading = false;
          }
        );

    }
  }

}
