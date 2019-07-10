import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";
import { Wizard, WizardPage, BUTTON_GROUP_DIRECTIVES } from "clarity-angular";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchDetail } from './analysis-batch-detail';

import { IStudy } from '../studies/study';
import { ISample } from '../samples/sample';
import { ISampleExtraction } from '../sample-extractions/sample-extraction';
import { IExtractionBatch } from '../extraction-batches/extraction-batch';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from '../extraction-batches/extraction-method';
import { IUnit } from '../units/unit';
import { IAliquot } from '../aliquots/aliquot';
import { IFreezerLocation } from '../aliquots/freezer-location';
import { IExtractionBatchSubmission } from '../extraction-batches/extraction-batch-submission';
import { IABWorksheet } from '../analysis-batches/analysis-batch-worksheet/ab-worksheet';

import { StudyService } from '../studies/study.service';
import { SampleService } from '../samples/sample.service';
import { AnalysisBatchService } from './analysis-batch.service';
import { TargetService } from '../targets/target.service';
import { InhibitionService } from '../inhibitions/inhibition.service';
import { ExtractionMethodService } from '../extraction-batches/extraction-method.service';
import { ExtractionBatchService } from '../extraction-batches/extraction-batch.service';
import { UnitService } from '../units/unit.service';
import { APP_UTILITIES } from '../app.utilities';
import { AnalysisBatchWorksheetComponent } from '../analysis-batches/analysis-batch-worksheet/analysis-batch-worksheet.component';
import { APP_SETTINGS } from '../app.settings';
import { RegExp } from 'core-js/library/web/timers';
import { ISampleExtractionSubmission } from 'app/sample-extractions/sample-extraction-submission';


@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {
  @ViewChild("wizardExtract") wizardExtract: Wizard;
  public showWorksheet: boolean = false;
  @ViewChild("inhibitionPage") inhibitionPage: WizardPage;

  // testing
  loadingFlag: boolean = false;
  inhibitionErrorFlag: boolean = false;
  extractionErrorFlag: boolean = false;
  checked = false;
  inhibitionFinished = false;
  extractionFinished = false;
  // testing

  analysisBatchesLoading: boolean = false;

  public showWarning = false;
  public nativeWindow: any;
  rnaTargetsSelected: boolean = false;
  sampleListEditLocked: boolean = false;

  inhibitionsExist: boolean = false;
  submitLoading: boolean = false;
  targetDetailLoading: boolean = false;

  // for print modal
  printSubmitLoading: boolean = false;
  noExtractionsFlag: boolean = false;
  oneExtractionFlag: boolean = false;
  multipleExtractionsFlag: boolean = false;

  extractWizardOpen: boolean = false;
  useExistingInhibition: boolean = false;

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];
  allTargets: ITarget[] = [];
  allExtractionMethods: IExtractionMethod[];

  studies: IStudy[];
  units: IUnit[];

  allSamples: ISample[] = [];

  abSampleInhibitions;

  focusAnalysisBatchID: number;
  focusAnalysisBatchData: IAnalysisBatchDetail;

  selectedAnalysisBatchID: number;
  selectedAnalysisBatchData: IAnalysisBatchDetail;

  abSampleList: ISample[] = [];
  abSampleIDList: number[] = [];

  showABEditError: boolean = false;
  showABEditSuccess: boolean = false;

  nucleicAcidTypes = [];

  extractionBatchArray: IExtractionBatch[];

  rePrintWorksheetData: IExtractionBatch;
  extractWizWorksheetData: IExtractionBatchSubmission;

  showHidePrintModal: boolean = false;

  aliquotSelectErrorFlag: boolean = false;
  targetSelectErrorFlag: boolean = false;
  showHideNoTargetErrorModal: boolean = false;



  // aliquotSelectionArray: IAliquotSelection[] = [];

  inhibitionsPerSample = [];
  // may not need this abInhibitionCount var, consider removing
  abInhibitionCount = 0;
  abInhibitions: IInhibition[];
  sampleInhibitions: IInhibition[];

  showHideEdit: boolean = false;
  showHideExtractionDetailModal: boolean = false;
  showHideRTDetailModal: boolean = false;
  showHideInhibitionDetailModal: boolean = false;
  showHideTargetDetailModal: boolean = false;
  extractionDetailArray: ISampleExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray = [];

  selected = [];
  selectedSamples = [];
  selectedAB: IAnalysisBatchSummary;
  errorMessage: string;

  abQueryComplete: boolean = false;
  abQuerySizeErrorFlag: boolean = false;
  abCount;

  queryCountLimit;
  // booleans for edit AB tabs
  sampleListActive: boolean;
  detailsActive: boolean;

  extractionBatchSubmission: IExtractionBatchSubmission;

  extractForm: FormGroup;
  replicateArray: FormArray;
  extractionArray: FormArray;
  aliquotsArray: FormArray;

  x: boolean = false;

  rnaApplyList = [];
  dnaApplyList = [];

  rtValuesExist: boolean = false;

  inhibitionError: string = "";

  batchExtPosForm: FormGroup;
  EB_array: FormArray;
  batchExtPosModalActive: boolean = false;
  showBatchExtPosError: boolean = false;
  showBatchExtPosSuccess: boolean = false;
  batchExtPosLoading: boolean = false;

  inhibitionErrors = {
    "dnaInhibitionSelection": "Missing one or more inhibition selections. Please make a DNA inhibition selection for each sample.",
    "rnaInhibitionSelection": "Missing one or more inhibition selections. Please make a RNA inhibition selection for each sample.",
    "dnaInhibitionDate": "Please select a date for new DNA inhibitions.",
    "rnaInhibitionDate": "Please select a date for new RNA inhibitions."
  }

  isNumberPattern: RegExp = (/^[0-9]*$/);

  abQueryForm: FormGroup;

  // edit AB form
  editABForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl(''),
    new_samples: new FormControl('')
  });

  // add inhibition form
  createInhibitionForm = new FormGroup({
    dna: new FormControl(false),
    rna: new FormControl(false),
    inhibition_date_dna: new FormControl(''),
    inhibition_date_rna: new FormControl('')
  })

  // extractionBatch select form
  extractionBatchSelectForm = new FormGroup({
    extraction_batch: new FormControl('', Validators.required)
  })



  static nonZero(control: AbstractControl): { [key: string]: any; } {
    if (Number(control.value) < 0) {
      return { nonZero: true };
    } else {
      return null;
    }
  }

  buildABQueryForm() {
    this.abQueryForm = this.formBuilder.group({
      study: null,
      from_id: null,
      to_id: null
    })
  }

  buildBatchExtPosForm() {
    this.batchExtPosForm = this.formBuilder.group({
      extraction_batches: this.formBuilder.array([
        this.formBuilder.group({
          id: null,
          number: null,
          ext_pos_dna_cq_value: null,
          ext_pos_rna_rt_cq_value: null
        })
      ])
    })
    this.EB_array = this.batchExtPosForm.get("extraction_batches") as FormArray;
  }

  buildExtractForm() {
    this.extractForm = this.formBuilder.group({
      analysis_batch: '',
      extraction_volume: ['', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      elution_volume: ['', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      extraction_method: ['', Validators.required],
      extraction_date: [null, Validators.required],
      re_extraction: null,
      re_extraction_notes: '',
      sample_dilution_factor: ['', Validators.required],
      qpcr_template_volume: ['6', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      qpcr_reaction_volume: ['20', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      qpcr_date: [null, Validators.required],
      new_rt: this.formBuilder.group({
        template_volume: ['8.6', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
        reaction_volume: ['50', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
        rt_date: [null, [Validators.required]],
        re_rt: null,
        re_rt_notes: ''
      }),
      new_replicates: this.formBuilder.array([
        this.formBuilder.group({
          target: '',
          count: ['2', [Validators.required, Validators.min(1)]]
          //count: ['2', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
          // count: '2'
        })
      ]),
      new_sample_extractions: this.formBuilder.array([
        this.formBuilder.group({
          sample: ['', Validators.required],
          inhibition_dna: [null, Validators.required],
          inhibition_rna: [{ value: null, disabled: true }, Validators.required],
          aliquot_string: '',
          rack: '',
          box: '',
          row: '',
          spot: '',
          aliquots: this.formBuilder.array([])
        })
      ])
    });
    this.replicateArray = this.extractForm.get('new_replicates') as FormArray;
    this.extractionArray = this.extractForm.get('new_sample_extractions') as FormArray;
  }

  onAliquotSelect(sampleID, aliquotID) {
    for (let extraction of this.extractionArray.controls) {
      if (sampleID === extraction.get('sample').value) {
        for (let sample of this.abSampleList) {
          if (sampleID === sample.id) {
            for (let aliquot of sample.aliquots) {
              if (aliquot.id === (parseInt(aliquotID, 10))) {
                extraction.get('aliquot_string').setValue(aliquot.aliquot_string);
                extraction.get('rack').setValue(aliquot.freezer_location.rack);
                extraction.get('box').setValue(aliquot.freezer_location.box);
                extraction.get('row').setValue(aliquot.freezer_location.row);
                extraction.get('spot').setValue(aliquot.freezer_location.spot);
              }
            }
          }
        }
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private _studyService: StudyService,
    private _sampleService: SampleService,
    private _analysisBatchService: AnalysisBatchService,
    private _targetService: TargetService,
    private _inhibitionService: InhibitionService,
    private _extractionMethodService: ExtractionMethodService,
    private _extractionBatchService: ExtractionBatchService,
    private _unitService: UnitService
  ) {
    this.buildABQueryForm();
    this.buildExtractForm();
    this.buildBatchExtPosForm();
  }

  ngOnInit() {

    // this.analysisBatchesLoading = true;

    this.queryCountLimit = APP_SETTINGS.QUERY_COUNT_LIMIT;

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
        error => this.errorMessage = <any>error);

    // on init, call getAnalysisBatchSummaries function of the AnalysisBatchService, set results to the allAnalysisBatches var
    // this._analysisBatchService.getAnalysisBatchSummaries()
    //   .subscribe(
    //     (analysisBatches) => {
    //       this.allAnalysisBatchSummaries = analysisBatches;
    //       this.analysisBatchesLoading = false;
    //     },
    //     error => { this.errorMessage = <any>error }
    //   );

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
        error => this.errorMessage = <any>error);


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

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(samples => this.allSamples = samples,
        error => this.errorMessage = <any>error);

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
        error => this.errorMessage = <any>error);
  }

  public doCustomClick(buttonType: string): void {

    if ("custom-next-aliquotPage" === buttonType) {

      this.aliquotSelectErrorFlag = false;

      // boolean for missingAliquotSelection
      let missingAliquotSelection = false;
      // loop through extractions and check that an aliquot is selected for each one
      for (let extraction of this.extractionArray.controls) {
        if (extraction.get('aliquot_string').value === null && extraction.get('rack').value === null) {
          missingAliquotSelection = true;
        }
      }
      // throw error if aliquot selection missiing, else advance the wizard
      if (missingAliquotSelection === true) {
        this.aliquotSelectErrorFlag = true;
      } else {
        this.wizardExtract.next();
      }

    }

    if ("custom-next-targetPage" === buttonType) {
      this.targetSelectErrorFlag = false;
      if (this.selected.length < 1) {
        this.targetSelectErrorFlag = true;
      } else {

        // add the 'count' property to the selected (targets) object
        // set the default count to 2
        this.selected.map((target) => {
          target.count = 2;
          return target;
        });
        // reset rnaTargetsSelected to false to ensure its value does not carry over from previous use of the extract wizard
        this.rnaTargetsSelected = false;
        this.extractForm.controls.new_rt.disable();
        for (let extraction of this.extractionArray.controls) {
          extraction.get('inhibition_rna').disable()
        }
        // check for RNA targets in current selection, set rnaTargetsSelected var to true if any exist
        for (let target of this.selected) {
          if (target.nucleic_acid_type === 2) {
            this.rnaTargetsSelected = true;
            this.extractForm.controls.new_rt.enable();
            for (let extraction of this.extractionArray.controls) {
              extraction.get('inhibition_rna').enable()
            }
            break;
          }
        }

        // reset the replicate form array controls to a blank array so it doesnt get populated twice
        this.replicateArray.controls = [];
        // loop through selected to create replicates form
        for (let target of this.selected) {
          let formGroup: FormGroup = this.formBuilder.group({
            target: this.formBuilder.control(target.id),
            count: this.formBuilder.control(target.count)
          });
          this.replicateArray.push(formGroup);
        }
        this.x = true;
        this.wizardExtract.next();
      }
    }

    if ("custom-next-inhPage" === buttonType) {

      this.inhibitionErrorFlag = false;
      this.inhibitionError = '';
      // if the user has opted to apply existing inhibitions for both DNA and RNA targets
      if (this.createInhibitionForm.value.dna === false && this.createInhibitionForm.value.rna === false) {
        // if create new inhibitions for DNA targets is not selected, loop through the new_sample_extractions object.
        // if any are null, alert user to select an inhibition for each sample extraction.
        if (this.createInhibitionForm.value.dna === false) {
          for (let extraction of this.extractForm.value.new_sample_extractions) {
            if (extraction.inhibition_dna === null) {
              this.inhibitionError = this.inhibitionErrors.dnaInhibitionSelection;
              this.inhibitionErrorFlag = true;
              // alert("Missing one or more inhibition selections. Please make a DNA inhibition selection for each sample.")
              return;
            }
          }
        }
        // if create new inhibitions for RNA targets is not selected and there are RNA targets selected,
        // loop through the new_sample_extractions object. if any are null, alert user to select an inhibition for each sample extraction.
        if (this.createInhibitionForm.value.rna === false && this.rnaTargetsSelected) {
          for (let extraction of this.extractForm.value.new_sample_extractions) {
            if (extraction.inhibition_rna === null) {
              this.inhibitionError = this.inhibitionErrors.rnaInhibitionSelection;
              this.inhibitionErrorFlag = true;
              // alert("Missing one or more inhibition selections. Please make a RNA inhibition selection for each sample.")
              return;
            }
          }
        }
        // if the user has opted to apply existing inhibitions for one target type but not the other
      } else if (this.createInhibitionForm.value.dna === true || this.createInhibitionForm.value.rna === true) {

        // if user has opted to create new inhibitions for all DNA targets but has not chosen a date for them
        if (this.createInhibitionForm.value.dna === true && this.createInhibitionForm.value.inhibition_date_dna === '') {
          this.inhibitionError = this.inhibitionErrors.dnaInhibitionDate;
          this.inhibitionErrorFlag = true;
          // alert("Please select a date for DNA inhibitions");
          return;
        }
        // if user has opted to create new inhibitions for all RNA targets but has not chosen a date for them
        if (this.createInhibitionForm.value.rna === true && this.createInhibitionForm.value.inhibition_date_rna === '') {
          this.inhibitionError = this.inhibitionErrors.rnaInhibitionDate;
          this.inhibitionErrorFlag = true;
          // alert("Please select a date for RNA inhibitions");
          return;
        }
        // if create new inhibitions for DNA targets is not selected, loop through the new_sample_extractions object.
        // if any are null, alert user to select an inhibition for each sample extraction.
        if (this.createInhibitionForm.value.dna === false) {
          for (let extraction of this.extractForm.value.new_sample_extractions) {
            if (extraction.inhibition_dna === null) {
              this.inhibitionError = this.inhibitionErrors.dnaInhibitionSelection;
              this.inhibitionErrorFlag = true;
              // alert("Missing one or more inhibition selections. Please make a DNA inhibition selection for each sample.")
              return;
            }
          }
        }
        // if create new inhibitions for RNA targets is not selected and there are RNA targets selected,
        // loop through the new_sample_extractions object. if any are null, alert user to select an inhibition for each sample extraction.
        if (this.createInhibitionForm.value.rna === false && this.rnaTargetsSelected) {
          for (let extraction of this.extractForm.value.new_sample_extractions) {
            if (extraction.inhibition_rna === null) {
              this.inhibitionError = this.inhibitionErrors.rnaInhibitionSelection;
              this.inhibitionErrorFlag = true;
              // alert("Missing one or more inhibition selections. Please make a RNA inhibition selection for each sample.")
              return;
            }
          }
        }

      }
      this.populateInhibitions();
    }

    if ("custom-finish-confirmPage" === buttonType) {
      if (this.extractionFinished) {
        this.wizardExtract.finish();
        this.resetExtractWizard();
        return;
      }
      this.submitExtractionBatch();
    }

    if ("custom-previous" === buttonType) {
      this.wizardExtract.previous();
    }

    if ("custom-cancel" === buttonType) {
      this.wizardExtract.cancel();
      this.resetExtractWizard();
    }
  }

  reloadAnalysisBatchesTable() {

    this.allAnalysisBatchSummaries = [];
    // set sample loading to true to put spinner over table while it updates.
    this.analysisBatchesLoading = true;

    // set functional limit for amount of samples to display in the table at once
    const countLimit = APP_SETTINGS.QUERY_COUNT_LIMIT;

    this._analysisBatchService.queryAnalysisBatchesCount(this.abQueryForm.value)
      .subscribe(
        (count) => {

          this.submitLoading = false;
          // if count exceeds limit, show error message
          if (count.count >= countLimit) {
            this.abQuerySizeErrorFlag = true;
          } else if (count.count < countLimit) {

            this.analysisBatchesLoading = true;

            // if AB query count does not exceed functional limit, query for actual results, and set results to the allSamples var
            this._analysisBatchService.queryAnalysisBatches(this.abQueryForm.value)
              .subscribe(
                (analysisBatches) => {
                  this.abCount = count.count;
                  this.abQueryComplete = true;
                  this.allAnalysisBatchSummaries = analysisBatches;
                  this.analysisBatchesLoading = false;
                },
                error => {
                  this.errorMessage = error;
                  this.submitLoading = false;
                  this.analysisBatchesLoading = false;
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

  resetExtractWizard() {
    // reset extract form, specifying default values for neccesary fields
    this.extractForm.reset({ qpcr_template_volume: 6, qpcr_reaction_volume: 20, new_rt: { template_volume: 6, reaction_volume: 20 } });
    // reset createInhibition form
    this.createInhibitionForm.reset({ dna: false, rna: false });
    // set the extractionFinished var back to false
    this.extractionFinished = false;
    // set the inhibitionFinished var back to false
    this.inhibitionFinished = false;
    // reset the extract wizard
    this.wizardExtract.reset();
  }

  deselectAll() {
    this.selected = [];
  }

  resetFlags() {
    this.submitLoading = false;
    this.showBatchExtPosError = false;
    this.showBatchExtPosSuccess = false;
    this.abQuerySizeErrorFlag = false;
    this.abQueryComplete = false;
  }

  retrieveABData(abID) {
    // return this._analysisBatchService.getAnalysisBatchData(abID);

    this._analysisBatchService.getAnalysisBatchDetail(abID)
      .subscribe(
        (analysisBatchDetail) => {
          console.log(analysisBatchDetail);
          this.focusAnalysisBatchData = analysisBatchDetail;
          // this.extractionDetailArray = this.focusAnalysisBatchData.sampleextractions;
        },
        error => {
          this.errorMessage = <any>error
        }
      );

    return this.focusAnalysisBatchData;


  }

  resetAB() {
    this.selected = [];
    this.abSampleList = [];
    this.abInhibitionCount = 0;
    this.abInhibitions = [];
    this.sampleInhibitions = [];
    this.abSampleIDList = [];
    this.sampleListEditLocked = false;
  }

  reprintWorksheet(selectedAB) {
    this.printSubmitLoading = true;
    this.noExtractionsFlag = false;
    this.oneExtractionFlag = false;
    this.multipleExtractionsFlag = false;
    // get the AB detail from web services
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
        (analysisBatchDetail) => {
          this.selectedAnalysisBatchData = analysisBatchDetail;

          if (analysisBatchDetail.extractionbatches.length === 0) {
            this.noExtractionsFlag = true;
          } else if (analysisBatchDetail.extractionbatches.length === 1) {
            // since only one extractionBatch, can go immediately to populating the rePrintWorksheetData
            this.rePrintWorksheetData = analysisBatchDetail.extractionbatches[0];
            this.oneExtractionFlag = true;
          } else if (analysisBatchDetail.extractionbatches.length > 1) {
            // because more than one extractionBatch, user input is needed to choose the desired one.
            // set the extractionBatch array, which populates the extraction select form for the user to choose
            this.extractionBatchArray = analysisBatchDetail.extractionbatches;
            this.multipleExtractionsFlag = true;
          }

          this.printSubmitLoading = false;
          this.showHidePrintModal = true;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  // called from createWorksheet in success and failure to get samples to ensure worksheet obj gets populated regardless
  private buildReprintWorksheetObj(es: ISampleExtractionSubmission[], tn: any[]) {

    if (this.rePrintWorksheetData.reverse_transcriptions.length === 0) {
      this.rePrintWorksheetData.reverse_transcriptions.push({ reaction_volume: 0, template_volume: 0, rt_date: "N/A" })
      this.rtValuesExist = false;
    }

    let ABWorksheetObj: IABWorksheet;
    ABWorksheetObj = {
      isReprint: true,
      // TOP TABLE:
      analysis_batch: this.selectedAnalysisBatchData.id,
      creation_date: this.selectedAnalysisBatchData.created_date,
      studies: this.selectedAnalysisBatchData.studies,
      description: this.selectedAnalysisBatchData.analysis_batch_description,
      // extraction_no: (this.selectedAnalysisBatchData.extractionbatches.length) + 1,
      extraction_no: this.rePrintWorksheetData.extraction_number,
      extraction_date: this.rePrintWorksheetData.extraction_date,
      extraction_method: this.rePrintWorksheetData.extraction_method,
      extraction_sample_volume: this.rePrintWorksheetData.extraction_volume,
      eluted_extraction_volume: this.rePrintWorksheetData.elution_volume,
      // Left TABLE:
      extraction_submission: es,
      // Right TABLE:
      targetNames: tn,
      // BOTTOM TABLE:
      reverse_extraction_no: this.rePrintWorksheetData.extraction_number,
      rt_reaction_volume: this.rePrintWorksheetData.reverse_transcriptions[0].reaction_volume,
      rt_template_volume: this.rePrintWorksheetData.reverse_transcriptions[0].template_volume,
      rt_date: this.rePrintWorksheetData.reverse_transcriptions[0].rt_date
    };
    this._analysisBatchService.setWorksheetObject(ABWorksheetObj);
    this.showWorksheet = true;
  }

  createWorksheet(isReprint, hasMultipleExtractions) {
    let targetNameArray = [];
    let ABWorksheetObj: IABWorksheet;
    if (isReprint) {
      if (hasMultipleExtractions) {
        // set the rePrintWorksheetData to the user selection from the extract batch select form.
        // Note: rePrintWorksheetData was set in the reprintWorksheet function if AB only had one extractionBatch
        for (let extractionBatch of this.selectedAnalysisBatchData.extractionbatches) {
          if (extractionBatch.id === Number(this.extractionBatchSelectForm.value.extraction_batch)) {
            this.rePrintWorksheetData = extractionBatch;
          }
        };
      }
      for (let item of this.rePrintWorksheetData.targets) {
        for (let target of this.allTargets) {
          if (item.id === target.id) {
            targetNameArray.push(target.name)
          }
        };
      };

      let sampleList = [];
      sampleList = this.selectedAnalysisBatchData.samples.map(ab => ab.id);

      let extractionSubmission: ISampleExtractionSubmission[] = [];
      // TODO: need to look up the first aliquot of every sample in this analysis batch
      this._sampleService.getSampleSelection(sampleList)
        .subscribe((sampleSelection) => {

          // sort the sample selection by sample ID
          sampleSelection.sort(function (a, b) {
            return (a.id - b.id);
          });

          for (let extraction of this.rePrintWorksheetData.sampleextractions) {
            for (let sample of sampleSelection) {
              if (sample.id === extraction.sample) {
                // place the aliquot freezer location data into the extraction_submission
                if (sample.aliquots) {
                  if (sample.aliquots.length > 0) {
                    // create an extractionSubmission from it
                    let extractionSubmit: ISampleExtractionSubmission = {
                      aliquot_string: sample.aliquots[0].aliquot_string,
                      box: sample.aliquots[0].freezer_location.box,
                      rack: sample.aliquots[0].freezer_location.rack,
                      row: sample.aliquots[0].freezer_location.row,
                      sample: sample.aliquots[0].sample,
                      spot: sample.aliquots[0].freezer_location.spot,
                    };

                    extractionSubmission.push(extractionSubmit);
                  }// end if aliquots.length
                }// end if sample.aliquots
              }
            }
          }
          // proceed in opening worksheet modal with the extractionsubmission
          this.buildReprintWorksheetObj(extractionSubmission, targetNameArray);
        },
          error => {
            // proceed in opening worksheet modal without the extractionsubmission
            this.buildReprintWorksheetObj(extractionSubmission, targetNameArray);
            this.errorMessage = <any>error;
          });
    } else if (!isReprint) {
      // use this.extractWizWorksheetData
      for (let replicate of this.extractWizWorksheetData.new_replicates) {
        for (let target of this.allTargets) {
          if (replicate.target === target.id) {
            targetNameArray.push(target.name)
          }
        }
      }

      /// lookup inhibition dilution values, append to this.extractWizWorksheetData.new_sample_extractions
      // this.sampleInhibitions

      // check if extraction.inhibition_dna is a number
      for (let extraction of this.extractWizWorksheetData.new_sample_extractions) {
        for (let inh of this.sampleInhibitions) {

          if (inh.id === extraction.inhibition_dna) {
            if (typeof extraction.inhibition_dna === 'number') {
              extraction.dna_dilution_factor = inh.dilution_factor;
            } else {
              extraction.dna_dilution_factor = null
            }
          }

          if (inh.id === extraction.inhibition_rna) {
            if (typeof extraction.inhibition_rna === 'number') {
              extraction.rna_dilution_factor = inh.dilution_factor;
            } else {
              extraction.rna_dilution_factor = null
            }
          }
        }
      }

      // sort the sample selection by sample ID
      this.extractWizWorksheetData.new_sample_extractions.sort(function (a, b) {
        return (a.sample - b.sample);
      });

      // local var to hold extraction number
      let extractionNumber;
      // add 1 to length of extractionBatches array to get current extraction number
      extractionNumber = (this.selectedAnalysisBatchData.extractionbatches.length) + 1

      // details for AB worksheet:
      ABWorksheetObj = {
        isReprint: false,
        // TOP TABLE:
        analysis_batch: this.extractWizWorksheetData.analysis_batch,
        creation_date: this.selectedAnalysisBatchData.created_date,
        studies: this.selectedAnalysisBatchData.studies,
        description: this.selectedAnalysisBatchData.analysis_batch_description,
        extraction_no: extractionNumber,
        extraction_date: this.extractWizWorksheetData.extraction_date,
        extraction_method: this.allExtractionMethods.filter(em => { return em.id = this.extractWizWorksheetData.extraction_method })[0],
        extraction_sample_volume: this.extractWizWorksheetData.extraction_volume,
        eluted_extraction_volume: this.extractWizWorksheetData.elution_volume,
        // Left TABLE:
        extraction_submission: this.extractWizWorksheetData.new_sample_extractions,
        // Right TABLE:
        targetNames: targetNameArray,
        // BOTTOM TABLE:
        reverse_extraction_no: extractionNumber,
        rt_reaction_volume: this.extractForm.controls.new_rt.value.reaction_volume,
        rt_template_volume: this.extractForm.controls.new_rt.value.template_volume,
        rt_date: this.extractForm.controls.new_rt.value.rt_date
      };

      this._analysisBatchService.setWorksheetObject(ABWorksheetObj);
      this.showWorksheet = true;
    }
  }

  buildAliquotArray(index, sampleID, aliquots) {

    let aliquotsArray = this.formBuilder.array([]);

    for (let aliquot of aliquots) {
      let aliquotFormGroup: FormGroup = this.formBuilder.group({
        aliquot_id: this.formBuilder.control(aliquot.id),
        aliquot_string: this.formBuilder.control(aliquot.aliquot_string),
        rack: this.formBuilder.control(aliquot.freezer_location.rack),
        box: this.formBuilder.control(aliquot.freezer_location.box),
        row: this.formBuilder.control(aliquot.freezer_location.row),
        spot: this.formBuilder.control(aliquot.freezer_location.spot)
      });
      aliquotsArray.push(aliquotFormGroup);
    }
    return aliquotsArray;
  }

  extractAB(selectedAB) {

    this.submitLoading = true;
    this.resetAB();
    this.selectedAnalysisBatchID = selectedAB.id;

    this.extractForm.patchValue({
      analysis_batch: selectedAB.id
    })

    // get the AB detail from web services
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
        (analysisBatchDetail) => {
          console.log("Selected Analysis Batch detail data: ", analysisBatchDetail);

          this.selectedAnalysisBatchData = analysisBatchDetail;

          // get sample id for each sample in the AB, add those to abSampleList array and abSampleIDList
          if (analysisBatchDetail.samples.length > 0) {
            for (let sampleSummary of analysisBatchDetail.samples) {
              for (let sample of this.allSamples) {
                if (sampleSummary.id === sample.id) {
                  this.abSampleList.push(sample);
                  this.abSampleIDList.push(sample.id);
                }
              }
            }

            // reset the extraction form array controls to a blank array
            this.extractionArray.controls = [];

            // for (let sample of this.abSampleList) {

            // NEED TO PASS THE INDEX TO THE buildAliquotArray function

            // populate extractionArray with sample IDs for the selected AB and null inhibition ID value (TBD by user)
            // let extractionFormGroup: FormGroup = this.formBuilder.group({
            //   sample: this.formBuilder.control(sample.id),
            //   inhibition_dna: this.formBuilder.control(null),
            //   inhibition_rna: this.formBuilder.control(null),
            //   aliquots: this.buildAliquotArray(sample.id, sample.aliquots)
            // });
            // this.extractionArray.push(extractionFormGroup);

            // }

            for (let i = 0; i < this.abSampleList.length; i++) {

              let extractionFormGroup: FormGroup = this.formBuilder.group({
                sample: this.formBuilder.control(this.abSampleList[i].id),
                inhibition_dna: this.formBuilder.control(null),
                inhibition_rna: this.formBuilder.control(null),
                aliquot_string: this.formBuilder.control(null),
                rack: this.formBuilder.control(null),
                box: this.formBuilder.control(null),
                row: this.formBuilder.control(null),
                spot: this.formBuilder.control(null),
                aliquots: this.buildAliquotArray(i, this.abSampleList[i].id, this.abSampleList[i].aliquots)
              });

              this.extractionArray.push(extractionFormGroup);

            }
            console.log("extractionArray.controls: ", this.extractionArray.controls)
            // console.log("Aliquots for first extraction: ", (<FormGroup>this.extractionArray.controls[0]).controls['aliquots'])
            // build the abInhbition array: all inhibitions in the current analysis batch
            // used for the batch level apply select dropdowns
            // TEMPORARILY COMMENTED OUT: may not need this because batch level application not in use. Revisit.
            // if (analysisBatchDetail.extractionbatches.length > 0) {
            //   for (let extractionBatch of analysisBatchDetail.extractionbatches) {
            //     if (extractionBatch.inhibitions.length > 0) {
            //       for (let inhibition of extractionBatch.inhibitions) {
            //         this.abInhibitions.push(inhibition)
            //       }

            //     }
            //   }
            // }

            // call to services to retrieve a list of all inhibitions for each sample in this AB
            this._analysisBatchService.getSampleInhibitions(this.abSampleIDList)
              .subscribe(
                (abSampleInhibitions) => {

                  for (let sample of abSampleInhibitions) {

                    this.abSampleInhibitions = abSampleInhibitions;

                    // populate sampleInhibitions var with all the inhibitions associated with any sample in this AB
                    // used for the sample level inhibition apply select dropdowns
                    for (let inhibition of sample.inhibitions) {
                      this.sampleInhibitions.push(inhibition)
                    }

                    // check if any of the samples in the list have inhibitions, for inhibitions exist alert
                    // if so set inhibitionsExists var to true
                    if (sample.inhibitions.length > 0) {
                      this.inhibitionsExist = true;
                    }
                  }

                  this.submitLoading = false;
                  this.extractWizardOpen = true;
                },
                error => {
                  this.errorMessage = <any>error
                }
              )

          } else {
            this.submitLoading = false;
            alert("No samples in this analysis batch. Please add samples before extracting.");
          }

        },
        error => {
          this.errorMessage = <any>error
        }
      );
  }

  populateInhibitions() {

    this.dnaApplyList = [];
    this.rnaApplyList = [];

    let createInhibitionFormValue = this.createInhibitionForm.value;
    let extractFormValue = this.extractForm.value;
    if (createInhibitionFormValue.dna === true) {
      for (let extraction of this.extractForm.value.new_sample_extractions) {
        extraction.inhibition_dna = createInhibitionFormValue.inhibition_date_dna;
      }
    }
    if (createInhibitionFormValue.rna === true) {
      for (let extraction of extractFormValue.new_sample_extractions) {
        extraction.inhibition_rna = createInhibitionFormValue.inhibition_date_rna;
      }
    }
    for (let extraction of extractFormValue.new_sample_extractions) {
      if (this.isNumberPattern.test(extraction.inhibition_dna)) {
        extraction.inhibition_dna = parseInt(extraction.inhibition_dna, 10)
        this.dnaApplyList.push(extraction.sample)
      }
      if (this.isNumberPattern.test(extraction.inhibition_rna)) {
        extraction.inhibition_rna = parseInt(extraction.inhibition_rna, 10)
        this.rnaApplyList.push(extraction.sample);
      }
      if (extraction.inhibition_dna === 'new') {
        extraction.inhibition_dna = createInhibitionFormValue.inhibition_date_dna;
      }
      if (extraction.inhibition_rna === 'new') {
        extraction.inhibition_rna = createInhibitionFormValue.inhibition_date_rna;
      }
    }
    this.wizardExtract.next();
  }

  finishExtractWizard(abID, extractFormValue, createInhibitionFormValue) {
    // end finishExtractWizard func
  }

  submitExtractionBatch() {

    this.loadingFlag = true;
    this.extractionErrorFlag = false;

    // copy the extractForm value to the worksheetdata var before altering the extractForm value schema
    // not working - need to use a deep copy appropriate for a nested object
    let extractFormValue = this.extractForm.value;
    this.extractWizWorksheetData = JSON.parse(JSON.stringify(extractFormValue));

    extractFormValue.elution_volume = Number(extractFormValue.elution_volume)
    extractFormValue.extraction_method = Number(extractFormValue.extraction_method)
    extractFormValue.extraction_volume = Number(extractFormValue.extraction_volume)
    extractFormValue.qpcr_reaction_volume = Number(extractFormValue.qpcr_reaction_volume)
    extractFormValue.qpcr_template_volume = Number(extractFormValue.qpcr_template_volume)

    if (extractFormValue.new_rt) {
      extractFormValue.new_rt.reaction_volume = Number(extractFormValue.new_rt.reaction_volume)
      extractFormValue.new_rt.template_volume = Number(extractFormValue.new_rt.template_volume)
    }

    let extractFormValueCopy = extractFormValue;
    for (let extraction of extractFormValueCopy.new_sample_extractions) {
      delete extraction.aliquot_string;
      delete extraction.rack;
      delete extraction.box;
      delete extraction.row;
      delete extraction.spot;
      delete extraction.aliquots;
    }

    // if no RNA targets were included in this extraction, remove the new_rt object from the submission
    // Note: not needed if using the disable new_rt formGroup approach - the group is already absent in this case.
    // if (this.rnaTargetsSelected === false) {
    //   delete extractFormValueCopy.new_rt;
    // }

    this.extractionBatchSubmission = extractFormValueCopy;

    // TEMPORARY solution to lack of a re_extraction_notes field causing null value which server rejects
    this.extractionBatchSubmission.re_extraction_notes = '';
    if (this.extractionBatchSubmission.new_rt) {
      this.extractionBatchSubmission.new_rt.re_rt_notes = '';
    };

    // submit the extractFormValue to the extraction batch service
    this._extractionBatchService.create(this.extractionBatchSubmission)
      .subscribe(
        (extractionBatch) => {
          console.log(extractionBatch);
          this.loadingFlag = false;
          this.extractionFinished = true;
        },
        error => {
          this.errorMessage = <any>error
          this.loadingFlag = false;
          this.extractionErrorFlag = true;
        }
      )
  }

  onSubmit(formID, formValue) {
    switch (formID) {
      case 'editAB': {
        this.submitLoading = true;
        this._analysisBatchService.update(formValue)
          .subscribe(
            (ab) => {
              // TODO: make this work so all AB table updates
              // this.updateSamplesArray(formValue);
              this.editABForm.reset();
              this.submitLoading = false;
              this.showABEditSuccess = true;
              this.reloadAnalysisBatchesTable();
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showABEditError = true;
            }

          )
      }
    }
  }

  // TODO: adjust this function to update the AB Summary array that populates the AB table
  // private updateABArray(newItem) {
  //   let updateItem = this.allSamples.find(this.findIndexToUpdate, newItem.id);
  //   let index = this.allSamples.indexOf(updateItem);
  //   this.allSamples[index] = newItem;
  // }
  // private findIndexToUpdate(newItem) {
  //   return newItem.id === this;
  // }


  openTargetDetails(abID) {

    this.targetDetailLoading = true;
    this.showHideNoTargetErrorModal = false;
    this.targetDetailArray = [];
    // check if AB ID matches the current focusAnalysisBatchID.
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID === this.focusAnalysisBatchID) {

      if (this.extractionBatchArray.length > 0) {
        // build the target list by looping through the targets array of the first extractionBatch and adding all targets to a local array
        // all extraction batches of the same analysis batch have identical target list so only first one is needed
        for (let target of this.extractionBatchArray[0].targets) {
          this.targetDetailArray.push(target);
        }

        this.showHideTargetDetailModal = true;
        this.targetDetailLoading = false;
      } else {
        this.showHideNoTargetErrorModal = true;
        this.targetDetailLoading = false;
      }

    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this._analysisBatchService.getAnalysisBatchDetail(abID)
        .subscribe(
          (analysisBatchDetail) => {
            if (analysisBatchDetail.extractionbatches.length > 0) {
              this.focusAnalysisBatchData = analysisBatchDetail;
              this.extractionBatchArray = this.focusAnalysisBatchData.extractionbatches;
              // build target list by looping through the targets array of the first extractionBatch and adding all targets to a local array
              // all extraction batches of the same analysis batch have identical target list so only first one is needed
              for (let target of this.extractionBatchArray[0].targets) {
                this.targetDetailArray.push(target);
              }
              // show the target details modal if not showing already
              if (this.showHideTargetDetailModal === false) {
                this.showHideTargetDetailModal = true;
              }
              this.targetDetailLoading = false;
            } else {
              this.targetDetailLoading = false;
              this.showHideNoTargetErrorModal = true;
            }
          },
          error => {
            this.errorMessage = <any>error
            this.targetDetailLoading = false;
          }
        );
    }
  }

  updateABSampleList(editABFormValue, selected) {
    // grab the selected array and patch it in as the samples array for the editABForm
    let samples = [];
    for (let sample of selected) {
      samples.push(sample.id);
    }
    this.editABForm.patchValue({
      new_samples: samples
    });
    this.onSubmit('editAB', this.editABForm.value);
  }

  editAB(selectedAB) {

    this.resetAB();
    if (selectedAB.summary.sample_extraction_count > 0) {
      this.sampleListEditLocked = true;
    }

    // call to retrieve AB detail data
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
        (analysisBatchDetail) => {
          console.log(analysisBatchDetail);
          this.selectedAnalysisBatchData = analysisBatchDetail;

          if (this.selectedAnalysisBatchData.samples.length > 0) {
            // get sample id for each sample in the AB
            // add those to selected array
            for (let sampleSummary of this.selectedAnalysisBatchData.samples) {
              for (let sample of this.allSamples) {
                if (sampleSummary.id === sample.id) {
                  this.abSampleList.push(sample);
                  this.abSampleIDList.push(sample.id);
                }
              }
            }
          } else {

          }
          this.selected = this.abSampleList;

          this.editABForm.setValue({
            id: selectedAB.id,
            name: this.selectedAB.name,
            analysis_batch_description: selectedAB.analysis_batch_description,
            analysis_batch_notes: selectedAB.analysis_batch_notes,
            new_samples: this.abSampleIDList
          });

          // show the edit analysis batch modal if not showing already
          if (this.showHideEdit === false) {
            this.showHideEdit = true;
          }
        },
        error => {
          this.errorMessage = <any>error
        }
      );
  }

  openBatchExtPos(selectedAB) {

    this.batchExtPosLoading = true

    let ext_pos_rna_rt_cq_value;

    // reset the extraction form array controls to a blank array
    this.EB_array.controls = [];
    // call to retrieve AB detail data
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
        (analysisBatchDetail) => {

          for (let extractionBatch of analysisBatchDetail.extractionbatches) {

            if (extractionBatch.reverse_transcriptions.length > 0 ) {
              ext_pos_rna_rt_cq_value = extractionBatch.reverse_transcriptions[0].ext_pos_rna_rt_cq_value;
            } else {
              ext_pos_rna_rt_cq_value = null;
            }
            let ebFormGroup: FormGroup = this.formBuilder.group({
              id: this.formBuilder.control(extractionBatch.id),
              number: this.formBuilder.control(extractionBatch.extraction_number),
              ext_pos_dna_cq_value: this.formBuilder.control(extractionBatch.ext_pos_dna_cq_value),
              ext_pos_rna_rt_cq_value: this.formBuilder.control(ext_pos_rna_rt_cq_value),
            });
            this.EB_array.push(ebFormGroup);
          }


          // show the edit analysis batch modal if not showing already
          if (this.batchExtPosModalActive === false) {
            this.batchExtPosModalActive = true;
          }

          this.batchExtPosLoading = false;
        },
        error => {
          this.errorMessage = <any>error
          this.batchExtPosLoading = false;
        }
      );
  }

  onSubmitBatchExtPos(formValue) {
    this.showBatchExtPosSuccess = false;
    this.showBatchExtPosError = false;
    this.submitLoading = true;

    const ebSubmissionArray = [];

    for (let extraction_batch of formValue.extraction_batches) {
      // remove 'number' field only used for display - not needed for PATCH request
      delete extraction_batch.number;
      ebSubmissionArray.push(extraction_batch);
    }


    this._extractionBatchService.bulkUpdate(ebSubmissionArray)
      .subscribe(
        (extractionBatches) => {
          this.submitLoading = false;
          this.showBatchExtPosSuccess = true;
          this.showBatchExtPosError = false;

        },
        error => {
          this.errorMessage = <any>error
          this.showBatchExtPosError = true;
          this.showBatchExtPosSuccess = false;
          this.submitLoading = false;
        }
      );
  }

  onSubmitABQuery(formValue) {

    this.resetFlags();


    this.submitLoading = true;

    // set functional limit for amount of samples to display in the table at once
    const countLimit = APP_SETTINGS.QUERY_COUNT_LIMIT;

    this._analysisBatchService.queryAnalysisBatchesCount(formValue)
      .subscribe(
        (count) => {

          this.submitLoading = false;
          // if count exceeds limit, show error message
          if (count.count >= countLimit) {
            this.abQuerySizeErrorFlag = true;
          } else if (count.count < countLimit) {

            this.analysisBatchesLoading = true;

            // if AB query count does not exceed functional limit, query for actual results, and set results to the allSamples var
            this._analysisBatchService.queryAnalysisBatches(formValue)
              .subscribe(
                (analysisBatches) => {
                  this.abCount = count.count;
                  this.abQueryComplete = true;
                  this.allAnalysisBatchSummaries = analysisBatches;
                  this.analysisBatchesLoading = false;
                },
                error => {
                  this.errorMessage = error;
                  this.submitLoading = false;
                  this.analysisBatchesLoading = false;
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

};
