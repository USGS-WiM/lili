import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";
import { Wizard, WizardPage, BUTTON_GROUP_DIRECTIVES } from "clarity-angular";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchDetail } from './analysis-batch-detail';

import { IStudy } from '../studies/study';
import { ISample } from '../samples/sample';
import { IExtraction } from '../extractions/extraction';
import { IExtractionBatch } from '../extractions/extraction-batch';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from '../extractions/extraction-method';
import { IUnit } from '../units/unit';
import { IAliquot } from '../aliquots/aliquot';
import { IFreezerLocation } from '../aliquots/freezer-location';
import { IExtractionBatchSubmission } from '../extractions/extraction-batch-submission';

import { StudyService } from '../studies/study.service';
import { SampleService } from '../samples/sample.service';
import { AnalysisBatchService } from './analysis-batch.service';
import { TargetService } from '../targets/target.service';
import { InhibitionService } from '../inhibitions/inhibition.service';
import { ExtractionMethodService } from '../extractions/extraction-method.service';
import { ExtractionBatchService } from '../extractions/extraction-batch.service';
import { UnitService } from '../units/unit.service';
import { APP_UTILITIES } from '../app.utilities';
import { AnalysisBatchWorksheetComponent } from '../analysis-batches/analysis-batch-worksheet/analysis-batch-worksheet.component';
import { Router } from '@angular/router';
import { APP_SETTINGS } from '../app.settings';
import { RegExp } from 'core-js/library/web/timers';

@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {
  @ViewChild("wizardExtract") wizardExtract: Wizard;
  public showWorksheet:boolean = false;
  @ViewChild("inhibitionPage") inhibitionPage: WizardPage;

  // testing
  loadingFlag: boolean = false;
  inhibitionErrorFlag: boolean = false;
  extractionErrorFlag: boolean = false;
  checked = false;
  inhibitionFinished = false;
  extractionFinished = false;
  // testing

  public showWarning = false;
  public nativeWindow: any;
  rnaTargetsSelected: boolean = false;
  sampleListEditLocked: boolean = false;

  inhibitionsExist: boolean = false;
  submitLoading: boolean = false;

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
  extractionDetailArray: IExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray;

  selected = [];
  selectedSamples = [];
  selectedAB: IAnalysisBatchSummary;
  errorMessage: string;

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

  isNumberPattern: RegExp = (/^[0-9]*$/);

  // edit AB form
  editABForm = new FormGroup({
    id: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl(''),
    samples: new FormControl('')
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

  buildExtractForm() {
    this.extractForm = this.formBuilder.group({
      analysis_batch: '',
      extraction_volume: ['', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      elution_volume: ['', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      extraction_method: ['', Validators.required],
      extraction_date: ['', Validators.required],
      reextraction: null,
      sample_dilution_factor: ['', Validators.required],
      qpcr_template_volume: ['6', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      qpcr_reaction_volume: ['20', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
      qpcr_date: ['', Validators.required],
      new_rt: this.formBuilder.group({
        template_volume: ['6', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
        reaction_volume: ['20', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+')]],
        rt_date: ['', Validators.required],
        re_rt: null,
        re_rt_note: ''
      }),
      new_replicates: this.formBuilder.array([
        this.formBuilder.group({
          target: '',
          count: '2'
        })
      ]),
      new_extractions: this.formBuilder.array([
        this.formBuilder.group({
          sample: ['', Validators.required],
          inhibition_dna: [null, Validators.required],
          inhibition_rna: [null, Validators.required],
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
    this.extractionArray = this.extractForm.get('new_extractions') as FormArray;
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
    //private _router: Router
    private _extractionBatchService: ExtractionBatchService,
    private _unitService: UnitService
  ) {
    this.buildExtractForm();
  }

  ngOnInit() {

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
      error => this.errorMessage = <any>error);

    // grab temporary hard-coded inhibitionsPerSample object (until web service endpoint is up-to-date)
    // this.inhibitionsPerSample = APP_UTILITIES.INHIBITIONS_PER_SAMPLE_ENDPOINT;

    // on init, call getAnalysisBatchSummaries function of the AnalysisBatchService, set results to the allAnalysisBatches var
    this._analysisBatchService.getAnalysisBatchSummaries()
      .subscribe(analysisBatches => this.allAnalysisBatchSummaries = analysisBatches,
      error => this.errorMessage = <any>error);

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
      error => this.errorMessage = <any>error);


    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
      error => this.errorMessage = <any>error);

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
    if ("custom-next-targetPage" === buttonType) {

      if (this.selected.length < 1) {
        alert("Please select at least one target to continue.")

      } else {

        // add the 'count' property to the selected (targets) object
        // set the default count to 2
        this.selected.map((target) => {
          target.count = 2;
          return target;
        });
        // check for RNA targets, set rnaTargetsSelected var to true
        for (let target of this.selected) {
          if (target.nucleic_acid_type === 2) {
            this.rnaTargetsSelected = true;
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
      if ((this.createInhibitionForm.value.dna === false && this.createInhibitionForm.value.rna === false) ||
        this.inhibitionFinished === true) {
        if (this.createInhibitionForm.value.dna === false) {
          for (let extraction of this.extractForm.value.new_extractions) {
            if (extraction.inhibition_dna === null) {
              alert("Please select a DNA inhibition to apply for each sample, or click to create new.")
              return;
            }
          }
        }
        if (this.createInhibitionForm.value.rna === false) {
          for (let extraction of this.extractForm.value.new_extractions) {
            if (extraction.inhibition_rna === null) {
              alert("Please select a RNA inhibition to apply for each sample, or click to create new.")
              return;
            }
          }
        }
      } else if ((this.createInhibitionForm.value.dna === true || this.createInhibitionForm.value.rna === true) &&
        this.inhibitionFinished === false) {

        if (this.createInhibitionForm.value.dna === false) {
          for (let extraction of this.extractForm.value.new_extractions) {
            if (extraction.inhibition_dna === null) {
              alert("Please select a DNA inhibition for all samples.")
              return;
            }
          }
        }
        if (this.createInhibitionForm.value.rna === false) {
          for (let extraction of this.extractForm.value.new_extractions) {
            if (extraction.inhibition_rna === null) {
              alert("Please select a RNA inhibition for all samples.")
              return;
            }
          }
        }
        if (this.createInhibitionForm.value.dna === true && this.createInhibitionForm.value.inhibition_date_dna === '') {
          alert("Please select a date for DNA inhibitions");
          return;
        }
        if (this.createInhibitionForm.value.rna === true && this.createInhibitionForm.value.inhibition_date_rna === '') {
          alert("Please select a date for RNA inhibitions");
          return;
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

  retrieveABData(abID) {
    // return this._analysisBatchService.getAnalysisBatchData(abID);

    this._analysisBatchService.getAnalysisBatchDetail(abID)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        this.focusAnalysisBatchData = analysisBatchDetail;
        // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
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
    // get the AB detail from web services
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
      (analysisBatchDetail) => {
        this.selectedAnalysisBatchData = analysisBatchDetail;

        this.printSubmitLoading = false;
        this.showHidePrintModal = true;

        if (analysisBatchDetail.extractionbatches.length === 0) {
          this.noExtractionsFlag = true;
        } else if (analysisBatchDetail.extractionbatches.length === 1) {
          this.rePrintWorksheetData = analysisBatchDetail.extractionbatches[0];
          this.oneExtractionFlag = true;
        } else if (analysisBatchDetail.extractionbatches.length > 1) {
          this.extractionBatchArray = analysisBatchDetail.extractionbatches;
          this.multipleExtractionsFlag = true;
        }
      },
      error => {
        this.errorMessage = <any>error
      }
      );

  }

  createWorksheet(isReprint) {
    let targetNameArray = [];
    // if the function has been called from the re-print modal, look up the
    // extractionBatch within the selected AB data that matches the id selected from the dropdown.
    // set the worksheetData var equal to that
    if (isReprint) {
      for (let extractionBatch of this.selectedAnalysisBatchData.extractionbatches) {
        if (extractionBatch.id === Number(this.extractionBatchSelectForm.value.extraction_batch)) {
          this.rePrintWorksheetData = extractionBatch;
        }
      }
      // console.log(this.rePrintWorksheetData);
      for (let item of this.rePrintWorksheetData.targets) {
        for (let target of this.allTargets) {
          if (item.id === target.id) {
            targetNameArray.push(target.name)
          }
        }
      }
      let ABWorksheetObj = {
        analysis_batch: this.selectedAnalysisBatchData.id,
        creation_date: this.selectedAnalysisBatchData.created_date,
        studies: this.selectedAnalysisBatchData.studies,
        description: this.selectedAnalysisBatchData.analysis_batch_description,
        extraction_no: (this.selectedAnalysisBatchData.extractionbatches.length) + 1,
        extraction_date: this.rePrintWorksheetData.extraction_date,
        extraction_method: this.rePrintWorksheetData.extraction_method,// (pipe for display)
        extraction_sample_volume: this.rePrintWorksheetData.extraction_volume,
        eluted_extraction_volume: this.rePrintWorksheetData.elution_volume
      };

      this._analysisBatchService.setWorksheetObject(ABWorksheetObj);
      this.showWorksheet = true;

      // use this.rePrintWorksheetData, populated by the logic above
      // details for AB worksheet:
      // analysis batch: this.selectedAnalysisBatchData.id
      // creation_date: this.selectedAnalysisBatchData.created_date
      // studies: this.selectedAnalysisBatchData.studies
      // description: this.selectedAnalysisBatchData.description

      // extraction no: extractionNumber
      // extraction date: this.rePrintWorksheetData.extraction_date
      // extraction method: this.rePrintWorksheetData.extraction_method (pipe for display)
      // extraction sample volume: this.rePrintWorksheetData.extraction_volume
      // eluted extraction volume: this.rePrintWorksheetData.elution_volume
      // Left TABLE:
      // each row is an extraction from this.rePrintWorksheetData.new_extractions
      // sample column: this.rePrintWorksheetData.new_extractions.aliquot_string
      // and so on for rack, box, row, spot.
      // DNA Inhibition Dilution Factor and RNA Inhibition Dilution Factor leave blank (for now)
      // Right TABLE:
      // each row is a target from targetNameArray, the rest of the columns are blank
      // Ext Neg: blank
      // Ext Pos: blank
      // Reverse transcription No.: extractionNumber
      // RT reaction volume: extractForm.new_rt.reaction_volume
      // RT date: extractForm.new_rt.rt_date
      // NOTES: userID (not ready for this yet), blank space for writing
    } else if (!isReprint) {

      // use this.extractWizWorksheetData, which was populated by submitExtractions()
      for (let replicate of this.extractWizWorksheetData.new_replicates) {
        for (let target of this.allTargets) {
          if (replicate.target === target.id) {
            targetNameArray.push(target.name)
          }
        }
      }
      // local var to hold extraction number
      let extractionNumber;
      // add 1 to length of extractionBatches array to get current extraction number
      extractionNumber = (this.selectedAnalysisBatchData.extractionbatches.length) + 1

      // details for AB worksheet:
      // analysis batch: this.extractWizWorksheetData.analysisBatch
      // creation_date: this.selectedAnalysisBatchData.created_date
      // studies: this.selectedAnalysisBatchData.studies
      // description: this.selectedAnalysisBatchData.description

      // extraction no: extractionNumber
      // extraction date: this.extractWizWorksheetData.extraction_date
      // extraction method: this.extractWizWorksheetData.extraction_method (pipe for display)
      // extraction sample volume: this.extractWizWorksheetData.extraction_volume
      // eluted extraction volume: this.extractWizWorksheetData.elution_volume
      // Left TABLE:
      // each row is an extraction from this.extractWizWorksheetData.new_extractions
      // sample column: this.extractWizWorksheetData.new_extractions.aliquot_string
      // and so on for rack, box, row, spot.
      // DNA Inhibition Dilution Factor and RNA Inhibition Dilution Factor leave blank (for now)
      // Right TABLE:
      // each row is a target from targetNameArray, the rest of the columns are blank
      // Ext Neg: blank
      // Ext Pos: blank
      // Reverse transcription No.: extractionNumber
      // RT reaction volume: extractForm.new_rt.reaction_volume
      // RT date: extractForm.new_rt.rt_date
      // NOTES: userID (not ready for this yet), blank space for writing
      let ABWorksheetObj = {
      // description: 
        analysis_batch: this.extractWizWorksheetData.analysis_batch,
        creation_date: this.selectedAnalysisBatchData.created_date,
        studies: this.selectedAnalysisBatchData.studies,
        description: this.selectedAnalysisBatchData.analysis_batch_description,
        extraction_no: extractionNumber,
        extraction_date: this.extractWizWorksheetData.extraction_date,
        extraction_method: this.allExtractionMethods.filter(em=> {return em.id == this.extractWizWorksheetData.extraction_method})[0],// (pipe for display)
        extraction_sample_volume: this.extractWizWorksheetData.extraction_volume,
        eluted_extraction_volume: this.extractWizWorksheetData.elution_volume
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
          console.log("Aliquots for first extraction: ", (<FormGroup>this.extractionArray.controls[0]).controls['aliquots'])
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

                // populate sampleInhibitions var with all the inhibitions associated with any sample in this AB
                // used for the sample level apply select dropdowns
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
      for (let extraction of this.extractForm.value.new_extractions) {
        extraction.inhibition_dna = createInhibitionFormValue.inhibition_date_dna;
      }
    }
    if (createInhibitionFormValue.rna === true) {
      for (let extraction of extractFormValue.new_extractions) {
        extraction.inhibition_rna = createInhibitionFormValue.inhibition_date_rna;
      }
    }
    for (let extraction of extractFormValue.new_extractions) {
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

    extractFormValue.elution_volume = parseInt(extractFormValue.elution_volume, 10)
    extractFormValue.extraction_method = parseInt(extractFormValue.extraction_method, 10)
    extractFormValue.extraction_volume = parseInt(extractFormValue.extraction_volume, 10)
    extractFormValue.qpcr_reaction_volume = parseInt(extractFormValue.qpcr_reaction_volume, 10)
    extractFormValue.qpcr_template_volume = parseInt(extractFormValue.qpcr_template_volume, 10)
    extractFormValue.new_rt.reaction_volume = parseInt(extractFormValue.new_rt.reaction_volume, 10)
    extractFormValue.new_rt.template_volume = parseInt(extractFormValue.new_rt.template_volume, 10)

    let extractFormValueCopy = extractFormValue;
    for (let extraction of extractFormValueCopy.new_extractions) {
      delete extraction.aliquot_string;
      delete extraction.rack;
      delete extraction.box;
      delete extraction.row;
      delete extraction.spot;
      delete extraction.aliquots;
    }

    this.extractionBatchSubmission = extractFormValueCopy;

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

    this.targetDetailArray = [];
    // check if AB ID matches the current focusAnalysisBatchID.
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID === this.focusAnalysisBatchID) {
      // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionBatchArray = this.focusAnalysisBatchData.extractionbatches;
    }

    // build the target list by looping through the AB extraction batch array and adding all targets to a local array
    for (let extractionbatch of this.extractionBatchArray) {
      for (let target of extractionbatch.targets) {
        this.targetDetailArray.push(target);
      }
    }
    // show the inhibition details modal if not showing already
    if (this.showHideTargetDetailModal === false) {
      this.showHideTargetDetailModal = true;
    }
  }

  updateABSampleList(editABFormValue, selected) {
    // grab the selected array and patch it in as the samples array for the editABForm
    let samples = [];
    for (let sample of selected) {
      samples.push(sample.id);
    }
    this.editABForm.patchValue({
      samples: samples
    });
    this.onSubmit('editAB', this.editABForm.value);
  }

  editAB(selectedAB) {

    this.resetAB();
    if (selectedAB.extraction_count > 0) {
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
          analysis_batch_description: selectedAB.analysis_batch_description,
          analysis_batch_notes: selectedAB.analysis_batch_notes,
          samples: this.abSampleIDList
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

  /*createWorksheet(){
    this._analysisBatchService.setExtractionFormValues(this.extractForm.value);
    this.showWorksheet = true;
    //need to do this in the component so that other things can happen too, like storing the form values in the services so that
    // the worksheet can access them.
    //this causes a loss of connection to the services and getting the form values 
    //this.nativeWindow = this._analysisBatchService.getNativeWindow();    
    //let newWindow = this.nativeWindow.open('/analysisbatchworksheet/'+ this.selectedAnalysisBatchID);
    
    //this._router.navigate(['/analysisbatchworksheet'], {queryParams: {formVals: this.extractionForm}, skipLocationChange: true });
  }*/
}
