import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { ITarget } from '../targets/target';
import { IInhResults } from './inh-results';
import { IInhResult } from './inh-result';
import { ITargetResults } from './target-results';
import { ITargetResult } from './target-result';

import { TargetService } from '../targets/target.service';
import { InhibitionService } from '../inhibitions/inhibition.service';
import { PcrReplicateBatchService } from '../pcr-replicates/pcr-replicate-batch.service';
import { PcrReplicateService } from '../pcr-replicates/pcr-replicate.service';

import { RegExp } from 'core-js/library/web/timers';

import { NgClass } from '@angular/common';

import { APP_SETTINGS } from '../app.settings';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  allTargets: ITarget[] = [];
  nucleicAcidTypes;

  selected = [];

  inhFileNameErrorFlag: boolean = false;
  parsedRawInhResults;
  parsedRawTargetResults;
  pcrResultsValidationObject;
  parsedRawTargetResults_pcrBatchID;
  // showResultsDisplay: boolean = false;
  rawResultsParsed: boolean = false;
  resultsSubmissionReady: boolean = false;
  validationResponseReady: boolean = false;
  rawInhResultsParsed: boolean = false;

  textFileNameTargetCode;
  inhTextFileNameNAType;

  inhLoadingFlag: boolean = false;
  inhRawErrorMessage: string = '';
  inhRawErrorFlag: boolean = false;
  dilutionFactorsCalculated: boolean = false;
  inhibitionValidationObject;

  targetFileNameErrorFlag: boolean = false;
  pcrReplicateBatchIDErrorFlag: boolean = false;

  resultsSubmissionErrorFlag: boolean = false;
  resultsSubmissionSuccessFlag: boolean = false;

  showHideOverrideValidityModal: boolean = false;

  errorMessage: string;

  replicateUpdateSuccessFlag: boolean = false;
  replicateUpdateErrorFlag: boolean = false;
  inhibitionUpdateSuccessFlag: boolean = false;
  inhibitionUpdateErrorFlag: boolean = false;
  submitLoading: boolean = false;

  dilutionsForm: FormGroup;
  inhibitionsArray: FormArray;

  buildDilutionsForm() {
    this.dilutionsForm = this.formBuilder.group({
      inhibitions: this.formBuilder.array([
        this.formBuilder.group({
          id: null,
          sample: null,
          dilution_factor: null
        })
      ])
    })
    this.inhibitionsArray = this.dilutionsForm.get('inhibitions') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private _inhibitionService: InhibitionService,
    private _targetService: TargetService,
    private _pcrReplicateBatchService: PcrReplicateBatchService,
    private _pcrReplicateService: PcrReplicateService
  ) {
    this.buildDilutionsForm();
  }

  ngOnInit() {

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
        error => this.errorMessage = <any>error);

    this.nucleicAcidTypes = APP_SETTINGS.NUCLEIC_ACID_TYPES;

  }

  tsvJSON(tsv) {

    let lines = tsv.split("\n");

    // discard first line of text file (specific to LIDE text files)
    lines.splice(0, 1);

    let result = [];

    let headers = lines[0].split("\t");

    for (let i = 1; i < lines.length; i++) {

      let obj = {};
      let currentline = lines[i].split("\t");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    // return result as JavaScript object
    return result;
  }

  lookupTargetID(targetCode) {
    for (let target of this.allTargets) {
      if (targetCode === target.code) {
        return target.id;
      }
    }
  }

  clearFileInput(ctrl) {
    try {
      ctrl.value = null;
    } catch (ex) { }
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }

  loadInhFile(fileInput: any) {
    this.inhFileNameErrorFlag = false;
    let self = this;
    let input = fileInput.target
    let fileName = fileInput.target.files[0].name;

    // let fileNamePattern: RegExp = (/\d+-\d-I[DR]\.txt/);
    let fileNamePattern: RegExp = (/\d+-\d+-I[DR]\.txt/);

    if (!fileNamePattern.test(fileName)) {
      this.inhFileNameErrorFlag = true;
      return;
    }

    let tsv: string;
    let json = [];
    let fileReader = new FileReader();
    fileReader.onload = function (e) {

      // capture TSV string from file
      tsv = fileReader.result;
      // convert tsv to JSON
      json = self.tsvJSON(tsv);

      // delete superfluous fields from raw data
      for (let item of json) {
        delete item.Color;
        delete item.Include;
        delete item.Status;
        delete item.Pos;
        delete item.Standard;
      }
      self.parseInhJSON(fileName, json)
    }
    fileReader.readAsText(input.files[0]);
  }

  loadTargetFile(fileInput: any) {
    this.targetFileNameErrorFlag = false;
    let self = this;
    let input = fileInput.target
    let fileName = fileInput.target.files[0].name;

    // let fileNamePattern: RegExp = (/\d\d\d\d\d-\d-[A-z]+-\d/);
    let fileNamePattern: RegExp = (/\d+-\d+-[a-zA-Z0-9]+-\d+.txt/);

    if (!fileNamePattern.test(fileName)) {
      this.targetFileNameErrorFlag = true;
      return;
    }

    let tsv: string;
    let json = [];
    let fileReader = new FileReader();
    fileReader.onload = function (e) {

      // capture TSV string from file
      tsv = fileReader.result;
      // convert tsv to JSON
      json = self.tsvJSON(tsv);

      // delete superfluous fields from raw data
      for (let item of json) {
        delete item.Color;
        delete item.Include;
        delete item.Status;
        delete item.Pos;
        delete item.Standard;
      }

      self.parseTargetJSON(fileName, json)
    }
    fileReader.readAsText(input.files[0]);
  }

  parseTargetJSON(fileName, rawResults) {
    let rawTargetResults: ITargetResults = {
      target: null,
      analysis_batch: null,
      extraction_number: null,
      replicate_number: null,

      ext_neg_cq_value: null,
      ext_neg_gc_reaction: null,
      rt_neg_cq_value: null,
      rt_neg_gc_reaction: null,
      pcr_neg_cq_value: null,
      pcr_neg_gc_reaction: null,
      pcr_pos_cq_value: null,
      pcr_pos_gc_reaction: null,
      re_pcr: null,
      notes: '',
      updated_pcrreplicates: []
    }
    let fileNameSansExtension = fileName.replace(".txt", "")
    let fileMetadata = fileNameSansExtension.split("-");

    let numbersOnlyPattern: RegExp = (/^[0-9]*$/);

    rawTargetResults.analysis_batch = Number(fileMetadata[0]);
    rawTargetResults.extraction_number = Number(fileMetadata[1]);
    rawTargetResults.target = this.lookupTargetID(fileMetadata[2]);
    rawTargetResults.replicate_number = Number(fileMetadata[3])

    // strictly for display on confirmation div
    this.textFileNameTargetCode = fileMetadata[2]

    for (let rep of rawResults) {
      if (rep.Name === "EXT NEG") {
        rawTargetResults.ext_neg_cq_value = Number(rep.Cp);
        rawTargetResults.ext_neg_gc_reaction = Number(rep.Concentration);
      }
      if (rep.Name === "PCR NEG") {
        rawTargetResults.pcr_neg_cq_value = Number(rep.Cp);
        rawTargetResults.pcr_neg_gc_reaction = Number(rep.Concentration);
      }
      if (rep.Name === "POS") {
        rawTargetResults.pcr_pos_cq_value = Number(rep.Cp);
        rawTargetResults.pcr_pos_gc_reaction = Number(rep.Concentration);
      }
      if (rep.Name === "RT NEG") {
        rawTargetResults.rt_neg_cq_value = Number(rep.Cp);
        rawTargetResults.rt_neg_gc_reaction = Number(rep.Concentration);
      }

      if (numbersOnlyPattern.test(rep.Name)) {
        rawTargetResults.updated_pcrreplicates.push({
          "sample": Number(rep.Name),
          "cq_value": Number(rep.Cp),
          "gc_reaction": Number(rep.Concentration)
        });
      }
    }
    this.parsedRawTargetResults = rawTargetResults;
    this.rawResultsParsed = true;

    // retrieve the PCR replicate batch ID based on text file name metadata
    this._pcrReplicateBatchService.getID(rawTargetResults.analysis_batch,
      rawTargetResults.extraction_number, rawTargetResults.target, rawTargetResults.replicate_number)
      .subscribe(
        (pcrReplicateBatch) => {
          this.parsedRawTargetResults_pcrBatchID = pcrReplicateBatch[0].id;
          this.pcrReplicateBatchIDErrorFlag = false;
          this.resultsSubmissionReady = true;
        },
        error => {
          this.pcrReplicateBatchIDErrorFlag = true;
          this.resultsSubmissionReady = false;
        }
      )
  }

  parseInhJSON(fileName, rawInhResults) {
    let inhResults: IInhResults = {
      analysis_batch: null,
      extraction_number: null,
      nucleic_acid_type: null,
      inh_pos_cq_value: null,
      inhibitions: []
    }
    let fileNameSansExtension = fileName.replace(".txt", "")
    let fileMetadata = fileNameSansExtension.split("-");
    let type = fileMetadata[2];

    // strictly for display on confirmation div
    this.inhTextFileNameNAType = fileMetadata[2];

    inhResults.analysis_batch = Number(fileMetadata[0]);
    inhResults.extraction_number = Number(fileMetadata[1]);
    if (type === "ID") { inhResults.nucleic_acid_type = 1 } else if (type === "IR") { inhResults.nucleic_acid_type = 2 }

    for (let sample of rawInhResults) {
      if (sample.Name === "INH CONT") {
        inhResults.inh_pos_cq_value = Number(sample.Cp);
      } else if (sample.Name !== "INH CONT") {
        inhResults.inhibitions.push({ "sample": Number(sample.Name), "cq_value": Number(sample.Cp) })
      }
    }
    this.parsedRawInhResults = inhResults;
    this.rawInhResultsParsed = true;
  }

  submitRawInhibitionResults() {

    this._inhibitionService.submitRawInhibitionResults(this.parsedRawInhResults)
      .subscribe(
        (calculatedDilutions) => {
          this.inhibitionValidationObject = calculatedDilutions;
          this.inhibitionsArray.controls = [];
          // populate the dilutions form inhibitions array from the calculatedDilutions response
          for (let inh of calculatedDilutions) {
            let formGroup: FormGroup = this.formBuilder.group({
              id: this.formBuilder.control(inh.id),
              sample: this.formBuilder.control(inh.sample),
              dilution_factor: this.formBuilder.control(inh.suggested_dilution_factor)
            })
            this.inhibitionsArray.push(formGroup);
          }
          this.inhLoadingFlag = false;
          this.dilutionFactorsCalculated = true;
        },
        error => {
          this.inhLoadingFlag = false;
          this.inhRawErrorMessage = <any>error
          this.inhRawErrorFlag = true;
        }
      )
  }

  submitRawTargetResults() {

    this._pcrReplicateBatchService.update(this.parsedRawTargetResults_pcrBatchID, this.parsedRawTargetResults)
      .subscribe(
        (results) => {
          console.log(results);
          this.pcrResultsValidationObject = results;
          this.resultsSubmissionErrorFlag = false;
          this.resultsSubmissionSuccessFlag = true;
          this.validationResponseReady = true;
        },
        error => {
          this.resultsSubmissionErrorFlag = true;
          this.resultsSubmissionSuccessFlag = false;
        }
      )
  }

  onUpdatePCRReplicates(selectedReps) {
    this.replicateUpdateSuccessFlag = false;
    this.replicateUpdateErrorFlag = false;
    this.submitLoading = true;

    let repArray = [];

    for (let rep of selectedReps) {
      repArray.push({
        "id": rep.id,
        "invalid": !rep.invalid
      })
    }

    this._pcrReplicateService.update(repArray)
      .subscribe(
        (results) => {
          this.replicateUpdateSuccessFlag = true;
          this.replicateUpdateErrorFlag = false;
          this.submitLoading = false;
        },
        error => {
          this.replicateUpdateSuccessFlag = false;
          this.replicateUpdateErrorFlag = true;
          this.submitLoading = false;
        }
      )
  }

  finishValidation() {
    this.rawResultsParsed = false;
    this.resultsSubmissionReady = false;
    this.validationResponseReady = false;
    this.clearFileInput(document.getElementById("targetFileInput"));
  }

  submitInhibitions(dilutionsFormValue) {
    this.submitLoading = true;
    this.inhibitionUpdateSuccessFlag = false;
    this.inhibitionUpdateErrorFlag = false;

    let inhibitionsSubmission = [];
    for (let inh of dilutionsFormValue.inhibitions) {
      inhibitionsSubmission.push(inh);
    }

    this._inhibitionService.update(inhibitionsSubmission)
      .subscribe(
        (results) => {
          this.inhibitionUpdateSuccessFlag = true;
          this.inhibitionUpdateErrorFlag = false;
          this.submitLoading = false;
        },
        error => {
          this.inhibitionUpdateSuccessFlag = false;
          this.inhibitionUpdateErrorFlag = true;
          this.submitLoading = false;
        }
      )
  }

  finishInhibitions() {
    this.rawInhResultsParsed = false;
    this.dilutionFactorsCalculated = false;
    this.clearFileInput(document.getElementById("inhibitionFileInput"));
  }

}
