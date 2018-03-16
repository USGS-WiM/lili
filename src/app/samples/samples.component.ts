import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';

import { ISample } from './sample';
import { IFreezer } from '../aliquots/freezer';
import { IFinalConcentratedSampleVolume } from '../fcsv/final-concentrated-sample-volume';
import { ISampleType } from '../SHARED/sample-type';
import { IFilterType } from '../SHARED/filter-type';
import { IConcentrationType } from '../concentration-types/concentration-type';
import { IMatrix } from '../SHARED/matrix';
import { IStudy } from '../studies/study';
import { IUnit } from '../units/unit';
import { IUser } from '../SHARED/user';

import { SampleService } from './sample.service';
import { FreezerService } from '../aliquots/freezer.service';
import { FreezerLocationsService } from '../aliquots/freezer-locations.service';
import { AliquotService } from 'app/aliquots/aliquot.service';
import { FinalConcentratedSampleVolumeService } from '../fcsv/final-concentrated-sample-volume.service';
import { SampleTypeService } from '../SHARED/sample-type.service';
import { FilterTypeService } from '../SHARED/filter-type.service'
import { ConcentrationTypeService } from '../concentration-types/concentration-types.service';
import { MatrixService } from '../SHARED/matrix.service';
import { StudyService } from '../studies/study.service';
import { UnitService } from '../units/unit.service';
import { UserService } from '../SHARED/user.service';

import { AnalysisBatchService } from '../analysis-batches/analysis-batch.service';

import { StudyFilter } from '../FILTERS/study-filter/study-filter.component'

import { APP_UTILITIES } from '../app.utilities';
import { APP_SETTINGS } from '../app.settings';



@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {
  allSamples: ISample[];
  pegnegs: ISample[] = [];
  freezers: IFreezer[];
  sampleTypes: ISampleType[];
  filterTypes: IFilterType[];
  recordTypes;
  concentrationTypes: IConcentrationType[];
  matrices: IMatrix[];
  studies: IStudy[];
  units: IUnit[];
  users: IUser[];
  errorMessage: string;
  selectedSample: ISample;
  showHideAdd: boolean = false;
  showHideAddPegNeg: boolean = false;
  showHideEdit: boolean = false;
  showHideABModal: boolean = false;
  showHideFCSVModal: boolean = false;
  showHideFreezerLocationAssignModal: boolean = false;
  showHidePrintModal: boolean = false;
  showHideFreezeWarningModal: boolean = false;
  showHideFreezerChoiceModal: boolean = false;
  showHideFreezerLocationLookupModal: boolean = false;
  showHideMultipleSamplesErrorModal: boolean = false;
  showLabelModal: boolean = false;
  sampleSelected: boolean = false;
  displayConfig: Object = {};
  selectedSampleId;
  // following 3 vars hold the 'value' property for the corresponding html select dropdowns - needed to update dropdown for editSample form
  matrixStoredValue: String;
  sampleTypeStoredValue: number;
  studyStoredValue;
  // var to hold the currently selected matrix; used to determine which inputs to show
  matrixSelected: IMatrix;
  unitValue;

  samplesLoading: boolean = false;

  onlyOneStudySelected: boolean;
  submitLoading: boolean = false;

  selected: ISample[] = [];

  submitted: boolean = false;

  showSampleCreateError: boolean = false;
  showSampleEditError: boolean = false;

  showSampleCreateSuccess: boolean = false;
  showSampleEditSuccess: boolean = false;

  showABCreateError: boolean = false;
  showABCreateSuccess: boolean = false;

  showFCSVCreateError: boolean = false;
  showFCSVCreateSuccess: boolean = false;

  showFreezeError: boolean = false;
  showFreezeSuccess: boolean = false;

  selectedStudy;

  lastOccupiedSpot;
  showLastOccupiedSpot;
  showLastOccupiedSpotError;
  lastOccupiedSpotLoading;

  showHideMissingFCSVErrorModal: boolean = false;
  //aliquotLabelTextArray = [{"aliquot_string": "", "collaborator_sample_id": ""}]
  aliquotLabelTextArray = [];

  // add sample form - declare reactive form with appropriate sample fields
  // all fields except matrix_type are disabled until matrix_type is selected (see onMatrixSelect function)
  addSampleForm = new FormGroup({
    // the following controls apply to every sample record, regardless of matrix selected
    sample_type: new FormControl({ value: '', disabled: true }, Validators.required),
    matrix_type: new FormControl('', Validators.required),
    filter_type: new FormControl({ value: '', disabled: true }), // required when not disabled
    study: new FormControl({ value: '', disabled: true }, Validators.required),  // study name, maps to study id
    study_site_name: new FormControl({ value: '', disabled: true }),
    collaborator_sample_id: new FormControl({ value: '', disabled: true }, Validators.required),
    sampler_name: new FormControl({ value: '', disabled: true }),
    sample_notes: new FormControl({ value: '', disabled: true }),
    sample_description: new FormControl({ value: '', disabled: true }),
    arrival_date: new FormControl({ value: null, disabled: true }),
    arrival_notes: new FormControl({ value: '', disabled: true }),
    collection_start_date: new FormControl({ value: null, disabled: true }, Validators.required),

    // the following controls have variable display needs based on the matrix selected
    collection_start_time: new FormControl({ value: '', disabled: false }, Validators.pattern('\\d\\d:\\d\\d')),
    collection_end_date: new FormControl({ value: null, disabled: true }),
    collection_end_time: new FormControl({ value: '', disabled: true }, Validators.pattern('\\d\\d:\\d\\d')),

    meter_reading_initial: new FormControl({ value: '', disabled: true }),
    meter_reading_final: new FormControl({ value: '', disabled: true }),
    meter_reading_unit: new FormControl({ value: '', disabled: true }),

    total_volume_sampled_initial: new FormControl({ value: '', disabled: true }),
    total_volume_sampled_unit_initial: new FormControl({ value: '', disabled: true }),

    sample_volume_initial: new FormControl({ value: '', disabled: true }),
    sample_volume_filtered: new FormControl({ value: '', disabled: true }),

    filter_born_on_date: new FormControl({ value: null, disabled: true }),
    filter_flag: new FormControl({ value: false, disabled: true }, Validators.required), // radio button
    secondary_concentration_flag: new FormControl({ value: false, disabled: true }, Validators.required), // radio button
    elution_notes: new FormControl({ value: '', disabled: true }),
    technician_initials: new FormControl({ value: '', disabled: true }),
    dissolution_volume: new FormControl({ value: '', disabled: true }),
    post_dilution_volume: new FormControl({ value: '', disabled: true }),
    peg_neg: new FormControl('')
  });

  // edit sample form
  editSampleForm = new FormGroup({
    // the following controls apply to every sample record, regardless of matrix_type selected
    id: new FormControl(''),
    sample_type: new FormControl('', Validators.required),
    matrix_type: new FormControl({ value: '', disabled: false }, Validators.required),
    filter_type: new FormControl(''), // required when not disabled
    study: new FormControl('', Validators.required),  // study name, maps to study id
    study_site_name: new FormControl(''),
    collaborator_sample_id: new FormControl('', Validators.required),
    sampler_name: new FormControl(''),
    sample_notes: new FormControl(''),
    sample_description: new FormControl(''),
    arrival_date: new FormControl(''),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl('', Validators.required),

    // the following controls have variable display needs based on the matrix selected
    collection_start_time: new FormControl(''),
    collection_end_date: new FormControl(''),
    collection_end_time: new FormControl(''),

    meter_reading_initial: new FormControl(''),
    meter_reading_final: new FormControl(''),
    meter_reading_unit: new FormControl(''),

    total_volume_sampled_initial: new FormControl(''),
    total_volume_sampled_unit_initial: new FormControl(''),

    total_volume_or_mass_sampled: new FormControl(''),

    sample_volume_initial: new FormControl(''),
    sample_volume_filtered: new FormControl(''),

    filter_born_on_date: new FormControl(''),
    filter_flag: new FormControl(false, Validators.required), // radio button
    secondary_concentration_flag: new FormControl(false, Validators.required), // radio button
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    dissolution_volume: new FormControl(''), // required when not disabled
    post_dilution_volume: new FormControl(''), // required when not disabled

    // the following controls do not appear in create sample form
    final_concentrated_sample_volume: new FormControl(''),
    final_concentrated_sample_volume_type: new FormControl(''),
    final_concentrated_sample_volume_notes: new FormControl(''),
    peg_neg: new FormControl('')
  });

  addPegNegForm = new FormGroup({
    // the following controls apply to every sample record, regardless of matrix selected
    sample_type: new FormControl(''),
    matrix_type: new FormControl(''),
    filter_type: new FormControl(''),
    study: new FormControl(''),
    study_site_name: new FormControl(''),
    collaborator_sample_id: new FormControl(''),
    sampler_name: new FormControl(''),
    sample_notes: new FormControl(''),
    sample_description: new FormControl(''),
    arrival_date: new FormControl(''),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl('', Validators.required),

    //collection_start_time: new FormControl(''),
    // collection_end_date: new FormControl(''),
    // collection_end_time: new FormControl(''),
    meter_reading_initial: new FormControl(''),
    meter_reading_final: new FormControl(''),
    meter_reading_unit: new FormControl(''),

    total_volume_sampled_initial: new FormControl(''),
    total_volume_sampled_unit_initial: new FormControl(''),

    total_volume_or_mass_sampled: new FormControl(''),

    sample_volume_initial: new FormControl(''),
    sample_volume_filtered: new FormControl(''),

    filter_born_on_date: new FormControl(null),
    filter_flag: new FormControl(false, Validators.required), // radio button
    secondary_concentration_flag: new FormControl(false, Validators.required), // radio button
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    dissolution_volume: new FormControl(''),
    record_type: new FormControl(2)
    // post_dilution_volume: new FormControl('')
  });

  freezeSampleForm = new FormGroup({
    // sample: new FormControl(''),
    freezer: new FormControl(1),
    aliquot_count: new FormControl('', Validators.required),
    rack: new FormControl('', Validators.required),
    box: new FormControl('', Validators.required),
    row: new FormControl('', Validators.required),
    spot: new FormControl('', Validators.required),
    frozen: new FormControl(true, Validators.required)
  });

  skipLabelForm = new FormGroup({
    count: new FormControl("0")
  })

  createABForm = new FormGroup({
    new_samples: new FormControl([]),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl('')
  });

  createFCSVForm = new FormGroup({
    samples: new FormControl([]),
    final_concentrated_sample_volume: new FormControl(null),
    final_concentrated_sample_volume_unit: new FormControl(null),
    final_concentrated_sample_volume_type: new FormControl(null),
    final_concentrated_sample_volume_notes: new FormControl('')
  })


  constructor(private _sampleService: SampleService,
    private _finalConcentratedSampleVolumeService: FinalConcentratedSampleVolumeService,
    private _studyService: StudyService,
    private _sampleTypeService: SampleTypeService,
    private _freezerService: FreezerService,
    private _freezerLocationsService: FreezerLocationsService,
    private _aliquotService: AliquotService,
    private _filterTypeService: FilterTypeService,
    private _concentrationTypeService: ConcentrationTypeService,
    private _matrixService: MatrixService,
    private _unitService: UnitService,
    private _userService: UserService,
    private _analysisBatchService: AnalysisBatchService
  ) { }

  ngOnInit(): void {

    this.samplesLoading = true;

    // on init, get sample form config object from App Utilities and set to local displayConfig var
    this.displayConfig = APP_UTILITIES.SAMPLE_FORM_CONFIG;

    // on init, get sample record types object from App Settings and set to local recordTypes var
    this.recordTypes = APP_SETTINGS.SAMPLE_RECORD_TYPES;

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(
        (samples) => {
          this.allSamples = samples
          this.samplesLoading = false;
          for (let sample of samples) {
            if (sample.record_type === 2) {
              this.pegnegs.push(sample);
            }
          }
        },
        error => {
          this.errorMessage = <any>error
        }
      );

    // on init, call getFreezers function of the FreezerService, set results to the freezers var
    this._freezerService.getFreezers()
      .subscribe(freezers => this.freezers = freezers,
        error => this.errorMessage = <any>error);

    // on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
    this._sampleTypeService.getSampleTypes()
      .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
        error => this.errorMessage = <any>error);

    // on init, call getFilterTypes function of the SampleTypeService, set results to the sampleTypes var
    this._filterTypeService.getFilterTypes()
      .subscribe(filterTypes => this.filterTypes = filterTypes,
        error => this.errorMessage = <any>error);

    // on init, call getConcentrationTypes function of the ConcentrationTypeService, set results to the sampleTypes var
    this._concentrationTypeService.getConcentrationTypes()
      .subscribe(concentrationTypes => this.concentrationTypes = concentrationTypes,
        error => this.errorMessage = <any>error);

    // on init, call getMatrices function of the MatrixService, set results to the matrices var
    this._matrixService.getMatrices()
      .subscribe(matrices => this.matrices = matrices,
        error => this.errorMessage = <any>error);

    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
        error => this.errorMessage = <any>error);

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
        error => this.errorMessage = <any>error);

    // on init, call getUsers function of the UserService, set results to the units var
    this._userService.getUsers()
      .subscribe(users => this.users = users,
        error => this.errorMessage = <any>error);

  }

  onUnitChange(unitValue) {
    // sets the var unitValue used for meter reading unit display
    this.unitValue = parseInt(unitValue, 10);
  }

  // callback for the create analysis batch button
  createAB(selectedSampleArray) {

    // grab just IDs of the selected samples
    let sampleIDs = [];
    for (let sample of selectedSampleArray) {
      sampleIDs.push(sample.id);
    }

    this.createABForm.setValue({
      new_samples: sampleIDs,
      analysis_batch_description: '',
      analysis_batch_notes: ''
    })
    // show the AB modal if not showing already
    if (this.showHideABModal === false) {
      this.showHideABModal = true;
    }

    console.log("Create AB form value: ", this.createABForm.value);

  }

  createFCSV(selectedSamples) {

    let selectedSampleIDs = []
    if (selectedSamples.length > 1) {
      for (let sample of selectedSamples) {
        selectedSampleIDs.push(sample.id)
      }
    } else {
      selectedSampleIDs = [selectedSamples[0].id]
    }

    this.createFCSVForm.setValue({
      samples: selectedSampleIDs,
      final_concentrated_sample_volume: null,
      final_concentrated_sample_volume_unit: null,
      final_concentrated_sample_volume_type: null,
      final_concentrated_sample_volume_notes: ''

    })

    // show the freeze modal if not showing already
    if (this.showHideFCSVModal === false) {
      this.showHideFCSVModal = true;
    }

  }

  // function to show freeze modal, triggered after check for multiple studies selected or user override
  //  showFreezeModal() {
  //     //hide the freeze warning modal if showing
  //     if (this.showHideFreezeWarningModal === true) {
  //         this.showHideFreezeWarningModal = false;
  //     }


  //   }

  openFreezerChoice() {
    this.showHideFreezerChoiceModal = true;
  }

  lookupFreezerLocation() {
    this.showHideFreezerChoiceModal = false;
    this.showHideFreezerLocationLookupModal = true;

  }

  lookupMatrixTypeID(code) {
    for (let matrix of this.matrices) {
      if (code === matrix.code) {
        return matrix.id;
      }
    }
  }

  // callback for the freeze samples button
  assignFreezerLocation(selectedSampleArray) {

    this.showHideFreezerChoiceModal = false;
    this.lastOccupiedSpotLoading = true;
    this.showLastOccupiedSpot = false;
    this.showLastOccupiedSpotError = false;
    // check if more than one sample is selected. if so, alert user they can only freeze one sample at a time
    // if not, proceed with further checks and logic

    // if (this.selected.length > 1) {
    //   this.showHideMultipleSamplesErrorModal = true;
    // } else {

    // NOTE: check logic below not neccesary if only one sample - keeping for now in the event batch sample freezing 
    // assign the onlyOneStudySelected var to the output of an Array.prototype.every() function
    // checks if all the values for study are the same in the selected samples array
    this.onlyOneStudySelected = selectedSampleArray.every(
      function (value, _, array) {
        return array[0].study === value.study;
      });

    // alert user they are attempting to select a set of studies for freezing that belong to more than one study
    // show freeze warning modal if multiple studies, else show the freeze modal
    if (this.onlyOneStudySelected === false) {
      this.showHideFreezeWarningModal = true
    } else if (this.onlyOneStudySelected === true) {

      for (let sample of selectedSampleArray) {
        // if any sample in the selection lacks an FCSV value AND has a matrix that requires one, show error
        if (sample.final_concentrated_sample_volume === null &&
          (sample.matrix_type === (this.lookupMatrixTypeID("W"))
            || sample.matrix_type === (this.lookupMatrixTypeID("WW"))
            || sample.matrix_type === (this.lookupMatrixTypeID("F")))) {
          this.showHideMissingFCSVErrorModal = true;
        } else {
          // show the freeze modal if not showing already
          if (this.showHideFreezerLocationAssignModal === false) {
            this.showHideFreezerLocationAssignModal = true;
          }
          // this.freezeSampleForm.patchValue({ sample: this.selected[0].id });

          // request last occupied spot
          this._freezerLocationsService.getLastOccupiedSpot()
            .subscribe(
              (lastOccupiedSpot) => {
                console.log(lastOccupiedSpot);
                this.lastOccupiedSpot = lastOccupiedSpot[0];
                this.lastOccupiedSpotLoading = false;
                this.showLastOccupiedSpot = true;
                this.showLastOccupiedSpotError = false;
              },
              error => {
                this.lastOccupiedSpotLoading = false;
                this.showLastOccupiedSpot = false;
                this.showLastOccupiedSpotError = true;
              }
            )

        }
      }
    }
    this.selectedStudy = this.selected[0].study;

    //}
  }

  includeExcludeLabel(event) {

    if (event.checked === false) {
      for (let aliquot of this.aliquotLabelTextArray) {
        if (event.value === aliquot.aliquot_string) {
          aliquot.include = false;
        }
      }
    } else if (event.checked === true) {
      for (let aliquot of this.aliquotLabelTextArray) {
        if (event.value === aliquot.aliquot_string) {
          aliquot.include = true;
        }
      }
    }

  }

  createLabelPDF() {
    let spacesToSkip = Number(this.skipLabelForm.value.count);
    let labelParts: Array<any> = [];
    labelParts.push(spacesToSkip);
    labelParts.push(this.aliquotLabelTextArray);
    // first skip down number of spaces from spacesToSkip variable, then loop through this.aliquotLabelTextArray and if include === true,
    // place the aliquot_string value centered on one line, and the collaborator_sample_id below it on the next line. Important to check for include === true. 
    this._sampleService.setLabelParts(labelParts);
    this.showLabelModal = true;

  }

  openPrintLabelModal(selectedSampleArray) {
    this.aliquotLabelTextArray = [];
    for (let sample of selectedSampleArray) {
      for (let aliquot of sample.aliquots) {
        this.aliquotLabelTextArray.push({
          "include": true,
          "aliquot_string": aliquot.aliquot_string,
          "collaborator_sample_id": sample.collaborator_sample_id
        });
      }
    }

    // show the print modal if not showing already
    if (this.showHidePrintModal === false) {
      this.showHidePrintModal = true;
    }

  }

  editSample(selectedSample) {

    // show the edit sample modal if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }

    // sets the var unitValue used for meter reading unit display
    this.unitValue = selectedSample.meter_reading_unit;

    this.editSampleForm.setValue({
      id: selectedSample.id,
      matrix_type: selectedSample.matrix_type,
      study: selectedSample.study,
      sample_type: selectedSample.sample_type,
      collaborator_sample_id: selectedSample.collaborator_sample_id,
      filter_flag: selectedSample.filter_flag,
      secondary_concentration_flag: selectedSample.secondary_concentration_flag,
      study_site_name: selectedSample.study_site_name,
      sample_description: selectedSample.sample_description,
      sampler_name: selectedSample.sampler_name,
      sample_notes: selectedSample.sample_notes,
      arrival_date: selectedSample.arrival_date,
      arrival_notes: selectedSample.arrival_notes,
      collection_start_date: selectedSample.collection_start_date,
      collection_start_time: selectedSample.collection_start_time,
      collection_end_date: selectedSample.collection_end_date,
      collection_end_time: selectedSample.collection_end_time,
      final_concentrated_sample_volume: selectedSample.final_concentrated_sample_volume,
      final_concentrated_sample_volume_type: selectedSample.final_concentrated_sample_volume_type,
      final_concentrated_sample_volume_notes: selectedSample.final_concentrated_sample_volume_notes,
      sample_volume_filtered: selectedSample.sample_volume_filtered,
      meter_reading_initial: selectedSample.meter_reading_initial,
      meter_reading_final: selectedSample.meter_reading_final,
      meter_reading_unit: selectedSample.meter_reading_unit,
      total_volume_sampled_initial: selectedSample.total_volume_sampled_initial,
      total_volume_sampled_unit_initial: selectedSample.total_volume_sampled_unit_initial,
      // total_volume_sampled: selectedSample.total_volume_sampled,
      post_dilution_volume: selectedSample.post_dilution_volume,
      filter_type: selectedSample.filter_type,
      filter_born_on_date: selectedSample.filter_born_on_date,
      dissolution_volume: selectedSample.dissolution_volume,
      elution_notes: selectedSample.elution_notes,
      technician_initials: selectedSample.technician_initials,
      sample_volume_initial: selectedSample.sample_volume_initial
    })

    this.sampleSelected = true;

  }

  onMatrixSelect(selectedMatrixString) {
    console.log("Matrix selected:" + selectedMatrixString);
    let selectedMatrix = Number(selectedMatrixString);
    // loop through displayConfig variables for the selected matrix, from the config JSON file (all boolean)
    for (let i in this.displayConfig[selectedMatrix]) {

      if (this.displayConfig[selectedMatrix].hasOwnProperty(i)) {

        switch (this.displayConfig[selectedMatrix][i]) {
          case (true): {
            // if disabled == true, disable corresponding control
            this.addSampleForm.controls[i].disable();
            break;
          }
          case (false): {
            // if disabled == false, enable corresponding control
            this.addSampleForm.controls[i].enable();
            break;
          }
          default: {
            // default to enabled
            this.addSampleForm.controls[i].enable();
            break;
          }
        }
      }
    }
  }

  private updateSamplesArray(newItem) {
    let updateItem = this.allSamples.find(this.findIndexToUpdate, newItem.id);

    let index = this.allSamples.indexOf(updateItem);

    this.allSamples[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  onSubmitFreezerLocation(formValue) {
    this.submitLoading = true;

    let sampleIDArray = [];
    for (let sample of this.selected) {
      sampleIDArray.push(sample.id)
    }

    formValue.samples = sampleIDArray;
    formValue.freezer = Number(formValue.freezer);
    formValue.rack = Number(formValue.rack);
    formValue.box = Number(formValue.box);
    formValue.row = Number(formValue.row);
    formValue.spot = Number(formValue.spot);

    this._aliquotService.create(formValue)
      .subscribe(
        (results) => {
          this.submitLoading = false;
          this.showFreezeSuccess = true;
          this.showFreezeError = false;
        },
        error => {
          this.submitLoading = false;
          this.showFreezeSuccess = false;
          this.showFreezeError = true;
        }
      )
  }

  onSubmitFCSV(formValue) {
    this.showFCSVCreateError = false;
    this.showFCSVCreateSuccess = false;
    this.submitLoading = true;

    let fcsvArray = [];

    formValue.final_concentrated_sample_volume = Number(formValue.final_concentrated_sample_volume);
    formValue.final_concentrated_sample_volume_type = Number(formValue.final_concentrated_sample_volume_type);
    formValue.final_concentrated_sample_volume_unit = Number(formValue.final_concentrated_sample_volume_unit);

    formValue.final_concentrated_sample_volume = (formValue.final_concentrated_sample_volume /
      this.getConversionFactorToMilliliters(formValue.final_concentrated_sample_volume_unit))

    for (let sample of formValue.samples) {
      fcsvArray.push({
        "sample": sample,
        "final_concentrated_sample_volume": formValue.final_concentrated_sample_volume,
        "concentration_type": formValue.final_concentrated_sample_volume_type,
        "final_concentrated_sample_volume_notes": formValue.final_concentrated_sample_volume_notes
      })
    }

    this._finalConcentratedSampleVolumeService.create(fcsvArray)
      .subscribe(
        (results) => {
          this.showFCSVCreateError = false;
          this.showFCSVCreateSuccess = true;
          this.submitLoading = false;
        },
        error => {
          this.showFCSVCreateError = true;
          this.showFCSVCreateSuccess = false;
          this.submitLoading = false;
        }
      )
  }

  onSubmitAB(formValue) {
    this.showABCreateError = false;
    this.showABCreateSuccess = false;
    this.submitLoading = true;
    this._analysisBatchService.create(formValue)
      .subscribe(
        (ab) => {
          this.submitLoading = false;
          this.showABCreateSuccess = true;
        },
        error => {
          this.errorMessage = <any>error;
          this.submitLoading = false;
          this.showABCreateError = true;

        }
      )

  }

  getConversionFactorToLiters(unitID) {
    switch (unitID) {
      case 1:
        // if unit is gallons
        return 0.26417;
      case 2:
        // if unit is liters
        return 1;
      case 3:
        // if initial unit is grams
        return 1;
      case 4:
        // if  unit is microliters
        return 1000000;
      case 5:
        // if unit is milliliters
        return 1000;
        ;
    }
  }

  getConversionFactorToMilliliters(unitID) {
    switch (unitID) {
      case 1:
        // if unit is gallons
        return 0.00026417;
      case 2:
        // if unit is liters
        return 0.0010000;
      case 3:
        // if initial unit is grams
        return 1;
      case 4:
        // if  unit is microliters
        return 1000;
      case 5:
        // if unit is milliliters
        return 1;
        ;
    }
  }


  onSubmitSample(formId, formValue) {
    this.showSampleCreateError = false;
    this.showSampleEditError = false;
    this.submitLoading = true;

    formValue.filter_type = Number(formValue.filter_type);
    formValue.matrix_type = Number(formValue.matrix_type);
    formValue.sample_type = Number(formValue.sample_type);
    formValue.sample_volume_initial = Number(formValue.sample_volume_initial);
    formValue.sample_volume_filtered = Number(formValue.sample_volume_filtered);
    formValue.sampler_name = Number(formValue.sampler_name);
    formValue.study = Number(formValue.study);
    formValue.dissolution_volume = Number(formValue.dissolution_volume);

    switch (formId) {
      case 'edit':
        // update a record
        this._sampleService.update(formValue)
          .subscribe(
            (sample) => {
              this.updateSamplesArray(formValue);
              this.editSampleForm.reset();
              this.submitLoading = false;
              this.showSampleEditSuccess = true;
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showSampleEditError = true;
            }
          );
        break;
      case 'add':

        // check if meter_reading_XX fields are present by seeing if they are disabled
        if (this.displayConfig[formValue.matrix_type].meter_reading_final === false &&
          this.displayConfig[formValue.matrix_type].meter_reading_initial === false &&
          this.displayConfig[formValue.matrix_type].meter_reading_unit === false) {

          formValue.meter_reading_final = Number(formValue.meter_reading_final);
          formValue.meter_reading_initial = Number(formValue.meter_reading_initial);
          formValue.meter_reading_unit = Number(formValue.meter_reading_unit);

          // use meter readings, subtraction, and meter_reading_unit to establish total_volume_or_mass_sampled
          formValue.total_volume_or_mass_sampled = ((formValue.meter_reading_final - formValue.meter_reading_initial) /
            this.getConversionFactorToLiters(formValue.meter_reading_unit))
        }

        // check if total_volume_sampled_XX fields are present by seeing if they are not disabled (false)
        if (this.displayConfig[formValue.matrix_type].total_volume_sampled_initial === false &&
          this.displayConfig[formValue.matrix_type].total_volume_sampled_unit_initial === false) {

          formValue.total_volume_sampled_initial = Number(formValue.total_volume_sampled_initial);
          formValue.total_volume_sampled_unit_initial = Number(formValue.total_volume_sampled_unit_initial);
          // use total_volume_sampled_initial + total_volume_sampled_unit_initial to establish total_volume_or_mass_sampled
          formValue.total_volume_or_mass_sampled = (formValue.total_volume_sampled_initial /
            this.getConversionFactorToLiters(formValue.total_volume_sampled_unit_initial))
        }

        // add a record
        this._sampleService.create(formValue)
          .subscribe(
            (sample: ISample) => {
              this.allSamples.push(formValue);
              this.addSampleForm.reset();
              this.submitLoading = false;
              this.showSampleCreateSuccess = true;
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showSampleCreateError = true;
            }
          );
        break;
      case 'addPegNeg':
        // add a record, of type pegneg (control)


        formValue.meter_reading_final = Number(formValue.meter_reading_final);
        formValue.meter_reading_initial = Number(formValue.meter_reading_initial);
        formValue.meter_reading_unit = Number(formValue.meter_reading_unit);

        // use meter readings, subtraction, and meter_reading_unit to establish total_volume_or_mass_sampled
        formValue.total_volume_or_mass_sampled = ((formValue.meter_reading_final - formValue.meter_reading_initial) /
          this.getConversionFactorToLiters(formValue.meter_reading_unit));


        formValue.total_volume_sampled_initial = Number(formValue.total_volume_sampled_initial);
        formValue.total_volume_sampled_unit_initial = Number(formValue.total_volume_sampled_unit_initial);
        // use total_volume_sampled_initial + total_volume_sampled_unit_initial to establish total_volume_or_mass_sampled
        formValue.total_volume_or_mass_sampled = (formValue.total_volume_sampled_initial /
          this.getConversionFactorToLiters(formValue.total_volume_sampled_unit_initial));

        // need to add required field values as they are assumed and not entered by user
        let now = new Date(Date.now());
        let currentDate = now.toISOString().substring(0, 10);
        let currentTime = now.toTimeString().split(" ")[0];

        formValue.matrix_type = APP_SETTINGS.PEGNEG_FIELD_VALUES.matrix_type;
        formValue.filter_type = APP_SETTINGS.PEGNEG_FIELD_VALUES.filter_type;
        formValue.sample_type = APP_SETTINGS.PEGNEG_FIELD_VALUES.sample_type;
        formValue.collaborator_sample_id = 'pegneg' + currentDate + '_' + currentTime;
        formValue.study = APP_SETTINGS.PEGNEG_FIELD_VALUES.study;
        //formValue.collection_start_time = APP_SETTINGS.PEGNEG_FIELD_VALUES.collection_start_time;
        //formValue.collection_end_time = APP_SETTINGS.PEGNEG_FIELD_VALUES.collection_end_time;
        formValue.collection_end_date = formValue.collection_start_date;
        formValue.arrival_date = formValue.collection_start_date;

        this._sampleService.create(formValue)
          .subscribe(
            (sample: ISample) => {
              this.allSamples.push(formValue);
              this.addSampleForm.reset();
              this.submitLoading = false;
              this.showSampleCreateSuccess = true;
            },
            error => {
              this.errorMessage = <any>error;
              this.submitLoading = false;
              this.showSampleCreateError = true;
            }
          );
        break;
      default:
      // do something defaulty
    }
  }
}
