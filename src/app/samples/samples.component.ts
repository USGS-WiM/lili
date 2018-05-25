import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms';

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
  addFCSVModalActive: boolean = false;
  editFCSVModalActive: boolean = false;
  freezerLocationAssignModalActive: boolean = false;
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
  showSampleCreateSuccess: boolean = false;

  showSampleEditError: boolean = false;
  showSampleEditSuccess: boolean = false;

  showABCreateError: boolean = false;
  showABCreateSuccess: boolean = false;

  showFCSVCreateError: boolean = false;
  showFCSVCreateSuccess: boolean = false;

  showFCSVEditError: boolean = false;
  showFCSVEditSuccess: boolean = false;

  freezeErrorFlag: boolean = false;
  freezeSuccessFlag: boolean = false;

  selectedStudy;

  sampleVolumeErrorFlag: boolean = false;

  showHideFCSVExistsErrorModal = false;

  addSampleForm: FormGroup;

  createdSampleID;
  createdABID;
  createdFCSVID;

  createFCSVForm: FormGroup;
  fcsvArray: FormArray;
  fcsvValuesMissingFlag: boolean = false;

  lastOccupiedSpot;
  showLastOccupiedSpot;
  showLastOccupiedSpotError: boolean = false;
  lastOccupiedSpotLoading;

  noCurrentBoxFlag: boolean = false;
  noCurrentBoxMessage: string = '';

  aliquotCountErrorFlag: boolean = false;

  freezeForm: FormGroup;
  currentBoxShareMax;

  initialMeterReading = 2;

  currentFreezerDimensions = {
    "racks": null,
    "boxes": null,
    "rows": null,
    "spots": null,
  }

  samplerNames: string[] = [];

  showHideMissingFCSVErrorModal: boolean = false;
  // aliquotLabelTextArray = [{"aliquot_string": "", "collaborator_sample_id": ""}]
  aliquotLabelTextArray = [];

  // edit sample form
  editSampleForm = new FormGroup({
    // the following controls apply to every sample record, regardless of matrix selected
    id: new FormControl(null),
    sample_type: new FormControl(null, Validators.required),
    matrix: new FormControl({ value: null, disabled: false }, Validators.required),
    filter_type: new FormControl(null), // required when not disabled
    study: new FormControl(null, Validators.required),  // study name, maps to study id
    study_site_name: new FormControl(''),
    collaborator_sample_id: new FormControl('', Validators.required),
    sampler_name: new FormControl(''),
    sample_notes: new FormControl(''),
    sample_description: new FormControl(''),
    arrival_date: new FormControl(''),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl(null, Validators.required),

    // the following controls have variable display needs based on the matrix selected
    collection_start_time: new FormControl(null),
    collection_end_date: new FormControl(null),
    collection_end_time: new FormControl(null),

    meter_reading_initial: new FormControl(null),
    meter_reading_final: new FormControl(null),
    meter_reading_unit: new FormControl(null),

    total_volume_sampled_initial: new FormControl(null),
    total_volume_sampled_unit_initial: new FormControl(null),

    total_volume_or_mass_sampled: new FormControl(null),

    sample_volume_initial: new FormControl(null),

    filter_born_on_date: new FormControl(null),
    filter_flag: new FormControl(false), // radio button
    secondary_concentration_flag: new FormControl(false), // radio button
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    dissolution_volume: new FormControl(null), // required when not disabled
    post_dilution_volume: new FormControl(null), // required when not disabled
    peg_neg: new FormControl(null)
  });

  addPegNegForm = new FormGroup({
    // the following controls apply to every sample record, regardless of matrix selected
    sample_type: new FormControl(null),
    matrix: new FormControl(null),
    filter_type: new FormControl(null),
    study: new FormControl(null),
    study_site_name: new FormControl(''),
    collaborator_sample_id: new FormControl(''),
    sampler_name: new FormControl(''),
    sample_notes: new FormControl(''),
    sample_description: new FormControl(''),
    arrival_date: new FormControl(null),
    arrival_notes: new FormControl(''),
    collection_start_date: new FormControl(null, Validators.required),
    meter_reading_initial: new FormControl(null),
    meter_reading_final: new FormControl(null),
    meter_reading_unit: new FormControl(null),
    total_volume_sampled_initial: new FormControl(null),
    total_volume_sampled_unit_initial: new FormControl(null),
    total_volume_or_mass_sampled: new FormControl(null),
    sample_volume_initial: new FormControl(null),
    filter_born_on_date: new FormControl(null),
    filter_flag: new FormControl(false), // radio button
    secondary_concentration_flag: new FormControl(false), // radio button
    elution_notes: new FormControl(''),
    technician_initials: new FormControl(''),
    dissolution_volume: new FormControl(null),
    record_type: new FormControl(2)
  });

  skipLabelForm = new FormGroup({
    count: new FormControl("0")
  })

  createABForm = new FormGroup({
    new_samples: new FormControl([]),
    name: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl('')
  });

  editFCSVForm = new FormGroup({
    id: new FormControl(null),
    sample: new FormControl(null),
    concentration_type: new FormControl(null),
    final_concentrated_sample_volume: new FormControl(null),
    notes: new FormControl('')
  });

  buildFreezeForm() {
    this.freezeForm = this.formBuilder.group({
      freezer: [1, Validators.required],
      frozen: [true, Validators.required],
      aliquots_per_sample: 3,
      total_aliquots: null,
      available_spots_in_box: null,
      aliquot_count_share: [{ value: 0 }, [Validators.required, Validators.min(0)]],
      rack: [{ value: null }, [Validators.required, Validators.min(1)]],
      box: [{ value: null }, [Validators.required, Validators.min(1)]],
      row: [{ value: null }, [Validators.required, Validators.min(1)]],
      spot: [{ value: null }, [Validators.required, Validators.min(1)]],
      next_empty_box: this.formBuilder.group({
        aliquot_count_share: [{ value: 0 }, [Validators.required, Validators.min(0)]],
        available_spots_in_box: null,
        rack: [{ value: null }, [Validators.required, Validators.min(1)]],
        box: [{ value: null }, [Validators.required, Validators.min(1)]],
        row: [{ value: null }, [Validators.required, Validators.min(1)]],
        spot: [{ value: null }, [Validators.required, Validators.min(1)]],
      })
    })
  };

  buildAddSampleForm() {
    this.addSampleForm = this.formBuilder.group({
      // the following controls apply to every sample record, regardless of matrix selected
      matrix: [{ value: null, disabled: false }, Validators.required],
      sample_type: [{ value: null, disabled: true }, Validators.required],
      filter_type: [{ value: null, disabled: true }, Validators.required], // required when not disabled
      study: [{ value: null, disabled: true }, Validators.required],  // study name, maps to study id
      study_site_name: [{ value: '', disabled: true }],
      collaborator_sample_id: [{ value: null, disabled: true }, Validators.required],
      sampler_name: [{ value: '', disabled: true }],
      sample_notes: [{ value: '', disabled: true }],
      sample_description: [{ value: '', disabled: true }],
      arrival_date: [{ value: null, disabled: true }],
      arrival_notes: [{ value: '', disabled: true }],
      collection_start_date: [{ value: null, disabled: true }, Validators.required],

      // the following controls have variable display needs based on the matrix selected
      collection_start_time: [{ value: null, disabled: false }, Validators.pattern('\\d\\d:\\d\\d')],
      collection_end_date: [{ value: null, disabled: true }],
      collection_end_time: [{ value: null, disabled: true }, Validators.pattern('\\d\\d:\\d\\d')],
      meter_reading_initial: [{ value: null, disabled: true }, [Validators.min(0), this.validateInitialMeterReading.bind(this)]],
      meter_reading_final: [{ value: null, disabled: true }, [Validators.min(0), this.validateFinalMeterReading.bind(this)]],
      meter_reading_unit: [{ value: null, disabled: true }],
      total_volume_sampled_initial: [{ value: null, disabled: true }],
      total_volume_sampled_unit_initial: [{ value: null, disabled: true }],
      sample_volume_initial: [{ value: null, disabled: true }],
      filter_born_on_date: [{ value: null, disabled: true }],
      filter_flag: [{ value: false, disabled: true }], // radio button
      secondary_concentration_flag: [{ value: false, disabled: true }], // radio button
      technician_initials: [{ value: '', disabled: true }],
      elution_notes: [{ value: '', disabled: true }],
      dissolution_volume: [{ value: null, disabled: true }],
      post_dilution_volume: [{ value: null, disabled: true }],
      peg_neg: null

    })
  }

  buildCreateFCSVForm() {
    this.createFCSVForm = this.formBuilder.group({
      fcsv_array: this.formBuilder.array([
        this.formBuilder.group({
          sample: null,
          concentration_type: [null, Validators.required],
          final_concentrated_sample_volume: [null, Validators.required],
          fcsv_units: [5, Validators.required],
          notes: ''
        })
      ])
    })
    this.fcsvArray = this.createFCSVForm.get('fcsv_array') as FormArray;
  }

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
    private _analysisBatchService: AnalysisBatchService,
    private formBuilder: FormBuilder
  ) {
    this.buildAddSampleForm();
    this.buildCreateFCSVForm();
    this.buildFreezeForm();
  }

  validateFinalMeterReading = (control: FormControl) => {
    let value = control.value;
    if (this.addSampleForm.get('meter_reading_initial').value === null) { return null };
    if (value <= this.addSampleForm.get('meter_reading_initial').value) {
      return {
        value: {
          value: value
        }
      }
    }
    return null;
  }

  validateInitialMeterReading = (control: FormControl) => {
    let value = control.value;
    if (this.addSampleForm.get('meter_reading_final').value === null) { return null };
    if (value >= this.addSampleForm.get('meter_reading_final').value) {
      return {
        value: {
          value: value
        }
      }
    }
    return null;
  }

  getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

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
            if (!(this.isInArray(sample.sampler_name, this.samplerNames))) {
              this.samplerNames.push(sample.sampler_name)
            }
          }
          // TODO: Remove this line below. TEMPORARY for populating samplerNames array until web service fix.
          //this.samplerNames.push("Aaron Firnstahl", "Joel Stokdyk", "Blake Draper", "Aaaron Stephenson");
          // console.log("Pegnegs array pre-sorted: ", this.pegnegs)
          // sort pegnegs by date order
          this.pegnegs.sort(function (a, b) {
            const c: Date = new Date(a.collection_start_date);
            const d: Date = new Date(b.collection_start_date);
            return (d.getTime()) - (c.getTime());
          });
          // console.log("Pegnegs array post-sorted: ", this.pegnegs)
          console.log("Sampler names: ", this.samplerNames)

        },
        error => {
          this.errorMessage = error
        }
      );

    // on init, call getFreezers function of the FreezerService, set results to the freezers var
    this._freezerService.getFreezers()
      .subscribe(
        (freezers) => {
          this.freezers = freezers;
        },
        error => {
          this.errorMessage = error
        });

    // on init, call getSampleTypes function of the SampleTypeService, set results to the sampleTypes var
    this._sampleTypeService.getSampleTypes()
      .subscribe(sampleTypes => this.sampleTypes = sampleTypes,
        error => this.errorMessage = error);

    // on init, call getFilterTypes function of the SampleTypeService, set results to the sampleTypes var
    this._filterTypeService.getFilterTypes()
      .subscribe(filterTypes => this.filterTypes = filterTypes,
        error => this.errorMessage = error);

    // on init, call getConcentrationTypes function of the ConcentrationTypeService, set results to the sampleTypes var
    this._concentrationTypeService.getConcentrationTypes()
      .subscribe(concentrationTypes => this.concentrationTypes = concentrationTypes,
        error => this.errorMessage = error);

    // on init, call getMatrices function of the MatrixService, set results to the matrices var
    this._matrixService.getMatrices()
      .subscribe(matrices => this.matrices = matrices,
        error => this.errorMessage = error);

    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
        error => this.errorMessage = error);

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
        error => this.errorMessage = error);

    // on init, call getUsers function of the UserService, set results to the units var
    this._userService.getUsers()
      .subscribe(users => this.users = users,
        error => this.errorMessage = error);

    this.freezeForm.get('freezer').valueChanges.subscribe(val => {
      // set the maxes for freezer location inputs
      for (let freezer of this.freezers) {
        if (freezer.id === Number(val)) {
          this.currentFreezerDimensions = {
            "racks": freezer.racks,
            "boxes": freezer.boxes,
            "rows": freezer.rows,
            "spots": freezer.spots
          }
        }
      }
    });

    this.freezeForm.get('aliquots_per_sample').valueChanges.subscribe(val => {
      const sampleCount = this.selected.length;
      const totalAliquots = sampleCount * val;
      this.freezeForm.get('total_aliquots').setValue(totalAliquots);

      // get aliquots per sample and available spots in box; calculate and update currentBoxShareMax
      const aliquotsPerSample = this.freezeForm.get('aliquots_per_sample').value;
      const availableSpotsInBox = this.freezeForm.get('available_spots_in_box').value;
      this.currentBoxShareMax = (Math.trunc(availableSpotsInBox / aliquotsPerSample)) * aliquotsPerSample;

    });

  }

  onUnitChange(unitValue) {
    // sets the var unitValue used for meter reading unit display
    this.unitValue = parseInt(unitValue, 10);
  }

  deselectAll() {
    this.selected = [];
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
      name: '',
      analysis_batch_description: '',
      analysis_batch_notes: ''
    })
    // show the AB modal if not showing already
    if (this.showHideABModal === false) {
      this.showHideABModal = true;
    }
  }

  onFCSVUnitSelectBulk(unitID) {
    for (let control of this.fcsvArray.controls) {
      control.get('fcsv_units').setValue(unitID);
    }

  }

  createFCSV(selectedSamples) {
    // reset the fcsvArray controls to a blank array so it doesnt get populated twice
    this.fcsvArray.controls = [];

    // check if any of the samples selected already have FCSV
    for (let sample of selectedSamples) {
      if (sample.final_concentrated_sample_volume != null) {
        this.showHideFCSVExistsErrorModal = true;
        return;
      }
    }

    for (let sample of selectedSamples) {
      let formGroup: FormGroup = this.formBuilder.group({
        sample: sample.id,
        concentration_type: null,
        final_concentrated_sample_volume: null,
        fcsv_units: 5,
        notes: ''
      })
      this.fcsvArray.push(formGroup);
    }
    // show the add FCSV modal modal if not showing already
    if (this.addFCSVModalActive === false) {
      this.addFCSVModalActive = true;
    }
  }

  editFCSV(selection) {

    const selectedSample = selection[0];

    this.editFCSVForm.setValue({
      id: null,
      sample: selectedSample.id,
      concentration_type: selectedSample.final_concentrated_sample_volume.concentration_type,
      final_concentrated_sample_volume: selectedSample.final_concentrated_sample_volume.final_concentrated_sample_volume,
      notes: selectedSample.final_concentrated_sample_volume.notes
    })

    // show the edit FCSV modal modal if not showing already
    if (this.editFCSVModalActive === false) {
      this.editFCSVModalActive = true;
    }

  }

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

  // lookupFreezerDimensions(freezerID, dimension) {
  //   for (let freezer of this.freezers) {
  //     if (freezer.id === freezerID) {
  //       return freezer[dimension];
  //     }
  //   }
  // }


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


  addSample() {
    if (this.showHideAdd === false) {
      this.showHideAdd = true;
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
      matrix: selectedSample.matrix,
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
      meter_reading_initial: selectedSample.meter_reading_initial,
      meter_reading_final: selectedSample.meter_reading_final,
      meter_reading_unit: selectedSample.meter_reading_unit,
      total_volume_sampled_initial: selectedSample.total_volume_sampled_initial,
      total_volume_sampled_unit_initial: selectedSample.total_volume_sampled_unit_initial,
      total_volume_or_mass_sampled: selectedSample.total_volume_or_mass_sampled,
      post_dilution_volume: selectedSample.post_dilution_volume,
      filter_type: selectedSample.filter_type,
      filter_born_on_date: selectedSample.filter_born_on_date,
      dissolution_volume: selectedSample.dissolution_volume,
      elution_notes: selectedSample.elution_notes,
      technician_initials: selectedSample.technician_initials,
      sample_volume_initial: selectedSample.sample_volume_initial,
      peg_neg: selectedSample.peg_neg
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
            this.addSampleForm.controls[i].reset();
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

  // callback for the freeze samples button
  assignFreezerLocation(selectedSampleArray) {

    this.showHideFreezerChoiceModal = false;
    this.noCurrentBoxFlag = false;
    this.showHideMissingFCSVErrorModal = false;
    // this.lastOccupiedSpotLoading = true;
    // this.showLastOccupiedSpot = false;
    // this.showLastOccupiedSpotError = false;

    // if any sample in the selection lacks an FCSV value AND has a matrix that requires one, show error
    for (let sample of selectedSampleArray) {
      if (sample.final_concentrated_sample_volume === null &&
        (sample.matrix === (this.lookupMatrixTypeID("W"))
          || sample.matrix === (this.lookupMatrixTypeID("WW"))
          || sample.matrix === (this.lookupMatrixTypeID("F")))) {
        this.showHideMissingFCSVErrorModal = true;
        return;
      }
    }

    // set the maxes for freezer location inputs
    for (let freezer of this.freezers) {
      if (freezer.id === this.freezeForm.get('freezer').value) {
        this.currentFreezerDimensions = {
          "racks": freezer.racks,
          "boxes": freezer.boxes,
          "rows": freezer.rows,
          "spots": freezer.spots
        }
      }
    }

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

      // lookup the suggested locations (next available)
      const studyID = selectedSampleArray[0].study;
      this._freezerLocationsService.getNextAvailable(studyID)
        .subscribe(
          (nextAvailable) => {
            //  this.lastOccupiedSpot = lastOccupiedSpot[0];
            // this.lastOccupiedSpotLoading = false;
            // this.showLastOccupiedSpot = true;
            // this.showLastOccupiedSpotError = false;

            // get the sample count
            const sampleCount = selectedSampleArray.length;
            // get aliquots per sample from freezeForm
            const aliquotsPerSample = this.freezeForm.get('aliquots_per_sample').value;
            // calculate a totalAliquots number to patch into freezeForm control
            const totalAliquots = sampleCount * aliquotsPerSample;

            this.currentBoxShareMax = (Math.trunc(nextAvailable.available_spots_in_box / aliquotsPerSample) * aliquotsPerSample);

            this.freezeForm.patchValue({
              total_aliquots: totalAliquots,
              available_spots_in_box: nextAvailable.available_spots_in_box,
              next_empty_box: {
                aliquot_count_share: 0,
                available_spots_in_box: nextAvailable.next_empty_box.available_spots_in_box,
                rack: nextAvailable.next_empty_box.rack,
                box: nextAvailable.next_empty_box.box,
                row: nextAvailable.next_empty_box.row,
                spot: nextAvailable.next_empty_box.spot
              }
            });

            // if there is no current box for the study
            if (nextAvailable.not_found) {
              // show no current box message
              this.noCurrentBoxMessage = nextAvailable.not_found;
              this.noCurrentBoxFlag = true;
            }

            // if there is a box with aliquots for the study ('box' field will exist in this case)
            if (nextAvailable.box) {
              // show both current box loc and next loc box
              this.noCurrentBoxFlag = false;
              this.freezeForm.patchValue({
                aliquot_count_share: 0,
                rack: nextAvailable.rack,
                box: nextAvailable.box,
                row: nextAvailable.row,
                spot: nextAvailable.spot
              });
            }

            // show the freeze modal if not showing already
            if (this.freezerLocationAssignModalActive === false) {
              this.freezerLocationAssignModalActive = true;
            }

          },
          error => {
            // this.lastOccupiedSpotLoading = false;
            // this.showLastOccupiedSpot = false;
            // this.showLastOccupiedSpotError = true;
          }
        )

      // this.freezeSampleForm.patchValue({ sample: this.selected[0].id });
      // request last occupied spot
      // this._freezerLocationsService.getLastOccupiedSpot()
      //   .subscribe(
      //     (lastOccupiedSpot) => {
      //       this.lastOccupiedSpot = lastOccupiedSpot[0];
      //       this.lastOccupiedSpotLoading = false;
      //       this.showLastOccupiedSpot = true;
      //       this.showLastOccupiedSpotError = false;
      //     },
      //     error => {
      //       this.lastOccupiedSpotLoading = false;
      //       this.showLastOccupiedSpot = false;
      //       this.showLastOccupiedSpotError = true;
      //     }
      //   )
    }
    this.selectedStudy = this.selected[0].study;
  }


  onSubmitFreezerLocation(formValue) {

    this.resetFlags();
    this.submitLoading = true;

    let submissionArray = [];

    let currentBoxSampleCount = 0;
    let nextBoxSampleCount = 0;

    this.aliquotCountErrorFlag = false;

    // check if aliquot share count exceeds the total number of aliquots expected
    if (formValue.aliquot_count_share) {
      if ((formValue.aliquot_count_share + formValue.next_empty_box.aliquot_count_share) > formValue.total_aliquots) {
        this.aliquotCountErrorFlag = true;
        this.submitLoading = false;
        return;
      }
    } else {
      if (formValue.next_empty_box.aliquot_count_share > formValue.total_aliquots) {
        this.aliquotCountErrorFlag = true;
        this.submitLoading = false;
        return;
      }
    }

    let sampleIDArray = [];
    for (let sample of this.selected) {
      sampleIDArray.push(sample.id)
    }

    // if the aliquot_count_share is greater than 0, current box is being used
    if (formValue.aliquot_count_share > 0) {
      // calculate the amount of sample-aliquot sets that can go into the current box
      currentBoxSampleCount = (Math.trunc(formValue.available_spots_in_box / formValue.aliquots_per_sample));

      // split sampleIDArray: one array for current box, another array for next box

      // set currentBoxSampleIDArray to the first x of the wholeSampleIDArray, where x = currentBoxSampleCount, using array.slice
      let currentBoxSampleIDArray = sampleIDArray.slice(0, currentBoxSampleCount)

      // create object with sample array, aliquot per sample count, starting location; push to submission array
      let currentBoxObject = {
        samples: currentBoxSampleIDArray,
        aliquot_count: formValue.aliquots_per_sample,
        freezer: formValue.freezer,
        frozen: formValue.frozen,
        rack: formValue.rack,
        box: formValue.box,
        row: formValue.row,
        spot: formValue.spot
      }
      submissionArray.push(currentBoxObject);
    }

    if (formValue.next_empty_box.aliquot_count_share > 0) {

      // determine the length of the nextBoxSampleCount by subtracting currentBoxSampleCount from the  wholeSampleIDArray length.
      nextBoxSampleCount = sampleIDArray.length - currentBoxSampleCount;

      // set nextBoxSampleIDArray to the remaining IDs of the wholeSampleIDArray, using array.slice
      let nextBoxSampleIDArray = sampleIDArray.slice(nextBoxSampleCount * -1)

      // create object with sample array, aliquot per sample count, starting location; push to submission array
      let nextBoxObject = {
        samples: nextBoxSampleIDArray,
        aliquot_count: formValue.aliquots_per_sample,
        freezer: formValue.freezer,
        frozen: formValue.frozen,
        rack: formValue.next_empty_box.rack,
        box: formValue.next_empty_box.box,
        row: formValue.next_empty_box.row,
        spot: formValue.next_empty_box.spot
      }
      submissionArray.push(nextBoxObject);
    }
    console.log("whatever");

    // DEPRECATED
    // formValue.samples = sampleIDArray;
    // formValue.freezer = Number(formValue.freezer);
    // formValue.rack = Number(formValue.rack);
    // formValue.box = Number(formValue.box);
    // formValue.row = Number(formValue.row);
    // formValue.spot = Number(formValue.spot);

    this._aliquotService.create(submissionArray)
      .subscribe(
        (results) => {
          this.submitLoading = false;
          this.freezeSuccessFlag = true;
          this.freezeErrorFlag = false;
        },
        error => {
          this.submitLoading = false;
          this.freezeSuccessFlag = false;
          this.freezeErrorFlag = true;
        }
      )
  }

  onSubmitFCSV(formID, formValue) {

    this.fcsvValuesMissingFlag = false;
    this.showFCSVCreateError = false;
    this.showFCSVEditError = false;
    this.showFCSVCreateSuccess = false;
    this.showFCSVEditSuccess = false;
    this.submitLoading = true;

    switch (formID) {
      case 'edit':

        // get the FCSV ID of the currently selected sample
        const fcsvID = this.selected[0].final_concentrated_sample_volume.id;
        // update the FCSV
        this._finalConcentratedSampleVolumeService.update(fcsvID, formValue)
          .subscribe(
            (sample) => {
              this.editFCSVForm.reset();
              this.submitLoading = false;
              this.showFCSVEditError = false;
              this.showFCSVEditSuccess = true;
              this.reloadSamplesTable();
            },
            error => {
              this.errorMessage = error;
              this.submitLoading = false;
              this.showFCSVEditSuccess = false;
              this.showFCSVEditError = true;
            }
          );
        break;
      case 'add':

        // if any values are missing, prevent submission and show alert
        for (let fcsv of formValue.fcsv_array) {
          if (fcsv.final_concentrated_sample_volume == null || fcsv.concentration_type == null) {
            this.fcsvValuesMissingFlag = true;
            this.submitLoading = false;
            return;
          }
        }

        // if no missing values, proceed with conversion and submission
        if (this.fcsvValuesMissingFlag === false) {

          // set new empty array for submitting fcsv values
          let fcsvArraySubmission = [];
          // loop through each fcsv, convert, and push into the submission array
          for (let fcsv of formValue.fcsv_array) {
            fcsv.final_concentrated_sample_volume = Number(fcsv.final_concentrated_sample_volume);
            fcsv.concentration_type = Number(fcsv.concentration_type);
            fcsv.fcsv_units = Number(fcsv.fcsv_units);

            fcsv.final_concentrated_sample_volume = (fcsv.final_concentrated_sample_volume /
              this.getConversionFactorToMilliliters(fcsv.fcsv_units))

            fcsvArraySubmission.push({
              "sample": fcsv.sample,
              "final_concentrated_sample_volume": fcsv.final_concentrated_sample_volume,
              "concentration_type": fcsv.concentration_type,
              "notes": fcsv.notes
            })
          }

          this._finalConcentratedSampleVolumeService.create(fcsvArraySubmission)
            .subscribe(
              (results) => {
                this.showFCSVCreateError = false;
                this.showFCSVCreateSuccess = true;
                this.submitLoading = false;
                this.reloadSamplesTable();
              },
              error => {
                this.showFCSVCreateError = true;
                this.showFCSVCreateSuccess = false;
                this.submitLoading = false;
              }
            )
        }
        break;
      default:
      // do something defaulty
    }
  }

  onSubmitAB(formValue) {
    this.createdABID = null;
    this.showABCreateError = false;
    this.showABCreateSuccess = false;
    this.submitLoading = true;
    this._analysisBatchService.create(formValue)
      .subscribe(
        (ab) => {
          this.submitLoading = false;
          this.showABCreateSuccess = true;
          this.createdABID = ab.id;
        },
        error => {
          this.errorMessage = error;
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

  trimDecimalPlaces(number, places) {
    let numString = number.toString();
    let decimalPlaces = numString.split(".")[1].length;

    if (decimalPlaces > places) {
      let trimmedNumber = number.toFixed(places);
      return trimmedNumber;
    }

    return number;
  }

  onClosesampleVolumeError() {
    this.sampleVolumeErrorFlag = false;
  }

  resetFlags() {
    this.sampleVolumeErrorFlag = false;
    this.showSampleCreateError = false;
    this.showSampleCreateSuccess = false;
    this.showSampleEditError = false;
    this.showSampleEditSuccess = false;
    this.freezeErrorFlag = false;
    this.freezeSuccessFlag = false;
    this.showFCSVCreateSuccess = false;
    this.showFCSVCreateError = false;
    this.showFCSVEditSuccess = false;
    this.showFCSVEditError = false;
    this.showABCreateSuccess = false;
    this.showABCreateError = false;
    this.errorMessage = '';
  }

  reloadSamplesTable() {

    this.allSamples = [];
    // set sample loading to true to put spinner over table while it updates.
    this.samplesLoading = true;
    this.pegnegs = [];
    // retrieve samples again, reload the table
    // call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(
        (samples) => {
          this.allSamples = samples
          for (let item of samples) {
            if (item.record_type === 2) {
              // push all sample records of type Control into the pegnegs array.
              this.pegnegs.push(item);
            }
          }
          this.samplesLoading = false;
        },
        error => {
          this.errorMessage = error
        }
      );
  }

  resetAddSampleForm() {
    this.addSampleForm.reset({
      sample_type: { value: null, disabled: true },
      matrix: null,
      filter_type: { value: null, disabled: true },
      study: { value: null, disabled: true },
      study_site_name: { value: '', disabled: true },
      collaborator_sample_id: { value: '', disabled: true },
      sampler_name: { value: '', disabled: true },
      sample_notes: { value: '', disabled: true },
      sample_description: { value: '', disabled: true },
      arrival_date: { value: null, disabled: true },
      arrival_notes: { value: '', disabled: true },
      collection_start_date: { value: null, disabled: true },
      collection_start_time: { value: null, disabled: false },
      collection_end_date: { value: null, disabled: true },
      collection_end_time: { value: null, disabled: true },
      meter_reading_initial: { value: null, disabled: true },
      meter_reading_final: { value: null, disabled: true },
      meter_reading_unit: { value: null, disabled: true },
      total_volume_sampled_initial: { value: null, disabled: true },
      total_volume_sampled_unit_initial: { value: null, disabled: true },
      sample_volume_initial: { value: null, disabled: true },
      filter_born_on_date: { value: null, disabled: true },
      filter_flag: { value: false, disabled: true },
      secondary_concentration_flag: { value: false, disabled: true },
      elution_notes: { value: '', disabled: true },
      technician_initials: { value: '', disabled: true },
      dissolution_volume: { value: null, disabled: true },
      post_dilution_volume: { value: null, disabled: true },
      peg_neg: null
    });
  }

  resetAddPegNegForm() {
    this.addPegNegForm.reset({
      sample_type: null,
      matrix: null,
      filter_type: null,
      study: null,
      study_site_name: '',
      collaborator_sample_id: '',
      sampler_name: '',
      sample_notes: '',
      sample_description: '',
      arrival_date: null,
      arrival_notes: '',
      collection_start_date: null,
      meter_reading_initial: null,
      meter_reading_final: null,
      meter_reading_unit: null,
      total_volume_sampled_initial: null,
      total_volume_sampled_unit_initial: null,
      total_volume_or_mass_sampled: null,
      sample_volume_initial: null,
      filter_born_on_date: null,
      filter_flag: false,
      secondary_concentration_flag: false,
      elution_notes: '',
      technician_initials: '',
      dissolution_volume: null,
      record_type: 2
    })

  }

  onSubmitSample(formId, formValue) {
    this.createdSampleID = null;
    this.sampleVolumeErrorFlag = false;
    this.showSampleCreateError = false;
    this.showSampleEditError = false;
    this.showSampleEditSuccess = false;
    this.submitLoading = true;
    this.errorMessage = '';

    let meterVolumesPresent: boolean = false;
    let directTVSPresent: boolean = false;

    formValue.matrix = Number(formValue.matrix);
    formValue.sample_type = Number(formValue.sample_type);
    formValue.sample_volume_initial = Number(formValue.sample_volume_initial);
    formValue.study = Number(formValue.study);
    formValue.dissolution_volume = Number(formValue.dissolution_volume);

    if (formValue.filter_type !== null) {
      formValue.filter_type = Number(formValue.filter_type);
    }

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
              this.reloadSamplesTable();
            },
            error => {
              this.errorMessage = error;
              this.submitLoading = false;
              this.showSampleEditError = true;
            }
          );
        break;
      case 'add':

        // check if meter_reading_XX fields are present by seeing if they are not disabled (false)
        if (this.displayConfig[formValue.matrix].meter_reading_final === false &&
          this.displayConfig[formValue.matrix].meter_reading_initial === false &&
          this.displayConfig[formValue.matrix].meter_reading_unit === false) {

          if (formValue.meter_reading_final === null ||
            formValue.meter_reading_initial === null ||
            formValue.meter_reading_unit === null) {
            meterVolumesPresent = false;
          } else if (formValue.meter_reading_final !== null
            && formValue.meter_reading_initial !== null
            && formValue.meter_reading_unit !== null) {
            meterVolumesPresent = true;
            formValue.meter_reading_final = Number(formValue.meter_reading_final);
            formValue.meter_reading_initial = Number(formValue.meter_reading_initial);
            formValue.meter_reading_unit = Number(formValue.meter_reading_unit);

            // use meter readings, subtraction, and meter_reading_unit to establish total_volume_or_mass_sampled
            formValue.total_volume_or_mass_sampled = ((formValue.meter_reading_final - formValue.meter_reading_initial) /
              this.getConversionFactorToLiters(formValue.meter_reading_unit))

            // send value through trimDecimalPlaces funciton to trim decimal places if they exceed 10
            formValue.total_volume_or_mass_sampled = this.trimDecimalPlaces(formValue.total_volume_or_mass_sampled, 10);
          }
        }

        // check if total_volume_sampled_XX fields are present by seeing if they are not disabled (false)
        if (this.displayConfig[formValue.matrix].total_volume_sampled_initial === false &&
          this.displayConfig[formValue.matrix].total_volume_sampled_unit_initial === false) {

          if (formValue.total_volume_sampled_initial === null || formValue.total_volume_sampled_unit_initial === null) {
            directTVSPresent = false;
          } else if (formValue.total_volume_sampled_initial !== null && formValue.total_volume_sampled_unit_initial !== null) {
            directTVSPresent = true;
            formValue.total_volume_sampled_initial = Number(formValue.total_volume_sampled_initial);
            formValue.total_volume_sampled_unit_initial = Number(formValue.total_volume_sampled_unit_initial);
            // use total_volume_sampled_initial + total_volume_sampled_unit_initial to establish total_volume_or_mass_sampled
            formValue.total_volume_or_mass_sampled = (formValue.total_volume_sampled_initial /
              this.getConversionFactorToLiters(formValue.total_volume_sampled_unit_initial))

            // send value through trimDecimalPlaces funciton to trim decimal places if they exceed 10
            formValue.total_volume_or_mass_sampled = this.trimDecimalPlaces(formValue.total_volume_or_mass_sampled, 10);
          }
        }

        if (meterVolumesPresent === false && directTVSPresent === false) {
          this.submitLoading = false;
          this.sampleVolumeErrorFlag = true;
        } else if (meterVolumesPresent === true || directTVSPresent === true) {
          // add a record
          this._sampleService.create(formValue)
            .subscribe(
              (sample) => {
                this.allSamples.push(formValue);
                this.resetAddSampleForm();
                this.sampleVolumeErrorFlag = false;
                this.submitLoading = false;
                this.showSampleCreateSuccess = true;
                this.createdSampleID = sample.id;
                this.reloadSamplesTable();
              },
              error => {
                this.errorMessage = error;
                this.submitLoading = false;
                this.sampleVolumeErrorFlag = false;
                this.showSampleCreateError = true;
              }
            );
        }
        break;
      case 'addPegNeg':
        // add a record, of type pegneg (control)

        // check if any of the values are missing for the meter reading approach to deriving sample volume
        if (formValue.meter_reading_final === null ||
          formValue.meter_reading_initial === null ||
          formValue.meter_reading_unit === null) {
          // if all are null, set meterVolumesPresent var to false
          meterVolumesPresent = false;
        } else if (formValue.meter_reading_final !== null
          && formValue.meter_reading_initial !== null
          && formValue.meter_reading_unit !== null) {
          // if no needed values are missing for meter reading TVS calculation, proceed with converting values and calculating TVS
          meterVolumesPresent = true;
          formValue.meter_reading_final = Number(formValue.meter_reading_final);
          formValue.meter_reading_initial = Number(formValue.meter_reading_initial);
          formValue.meter_reading_unit = Number(formValue.meter_reading_unit);

          // use meter readings, subtraction, and meter_reading_unit to establish total_volume_or_mass_sampled
          formValue.total_volume_or_mass_sampled = ((formValue.meter_reading_final - formValue.meter_reading_initial) /
            this.getConversionFactorToLiters(formValue.meter_reading_unit))

          // send value through trimDecimalPlaces funciton to trim decimal places if they exceed 10
          formValue.total_volume_or_mass_sampled = this.trimDecimalPlaces(formValue.total_volume_or_mass_sampled, 10);
        }


        // check if values are present for direct TVS input
        if (formValue.total_volume_sampled_initial === null || formValue.total_volume_sampled_unit_initial === null) {
          // if either are absent, set the directTVSPresent var to false.
          directTVSPresent = false;
        } else if (formValue.total_volume_sampled_initial !== null && formValue.total_volume_sampled_unit_initial !== null) {
          // if values are present, proceed with converting values and calculating TVS
          directTVSPresent = true;
          formValue.total_volume_sampled_initial = Number(formValue.total_volume_sampled_initial);
          formValue.total_volume_sampled_unit_initial = Number(formValue.total_volume_sampled_unit_initial);
          // use total_volume_sampled_initial + total_volume_sampled_unit_initial to establish total_volume_or_mass_sampled
          formValue.total_volume_or_mass_sampled = (formValue.total_volume_sampled_initial /
            this.getConversionFactorToLiters(formValue.total_volume_sampled_unit_initial))

          // send value through trimDecimalPlaces funciton to trim decimal places if they exceed 10
          formValue.total_volume_or_mass_sampled = this.trimDecimalPlaces(formValue.total_volume_or_mass_sampled, 10);
        }


        // need to add required field values as they are assumed and not entered by user
        let now = new Date(Date.now());
        let currentDate = now.toISOString().substring(0, 10);
        let currentTime = now.toTimeString().split(" ")[0];

        formValue.matrix = APP_SETTINGS.PEGNEG_FIELD_VALUES.matrix;
        formValue.filter_type = APP_SETTINGS.PEGNEG_FIELD_VALUES.filter_type;
        formValue.sample_type = APP_SETTINGS.PEGNEG_FIELD_VALUES.sample_type;
        formValue.collaborator_sample_id = 'pegneg' + currentDate + '_' + currentTime;
        formValue.study = APP_SETTINGS.PEGNEG_FIELD_VALUES.study;
        // formValue.collection_start_time = APP_SETTINGS.PEGNEG_FIELD_VALUES.collection_start_time;
        // formValue.collection_end_time = APP_SETTINGS.PEGNEG_FIELD_VALUES.collection_end_time;
        formValue.collection_end_date = formValue.collection_start_date;
        formValue.arrival_date = formValue.collection_start_date;

        if (meterVolumesPresent === false && directTVSPresent === false) {
          this.submitLoading = false;
          this.sampleVolumeErrorFlag = true;
        } else if (meterVolumesPresent === true || directTVSPresent === true) {

          this._sampleService.create(formValue)
            .subscribe(
              (sample) => {
                this.allSamples.push(formValue);
                this.resetAddPegNegForm();
                this.submitLoading = false;
                this.showSampleCreateSuccess = true;
                this.createdSampleID = sample.id;
                this.reloadSamplesTable();
              },
              error => {
                this.errorMessage = error;
                this.submitLoading = false;
                this.showSampleCreateError = true;
              }
            );
        }
        break;
      default:
      // do something defaulty
    }
  }
}
