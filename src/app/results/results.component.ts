import { Component, OnInit } from '@angular/core';

import { IInhResults } from './inh-results';
import { IInhResult } from './inh-result';

import { RegExp } from 'core-js/library/web/timers';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  inhFileNameErrorFlag: boolean = false;

  constructor() { }

  ngOnInit() { }

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

  loadFile(fileInput: any) {
    this.inhFileNameErrorFlag = false;
    let self = this;
    let input = fileInput.target
    let fileName = fileInput.target.files[0].name;

    let fileNamePattern: RegExp = (/\d\d\d\d\d-\d-I[DR]\.txt/);

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
      self.parseJSON(fileName, json)
    }
    fileReader.readAsText(input.files[0]);
  }

  parseJSON(fileName, rawInhResults) {
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

    inhResults.analysis_batch = Number(fileMetadata[0]);
    inhResults.extraction_number = Number(fileMetadata[1]);
    if (type === "ID") { inhResults.nucleic_acid_type = 1 } else if (type === "IR") { inhResults.nucleic_acid_type = 2 }

    for (let sample of rawInhResults) {
      if (sample.Name === "INH CONT") {
        inhResults.inh_pos_cq_value = Number(sample.Cp);
      } else if (sample.Name !== "INH CONT") {
        inhResults.inhibitions.push({ "sample": sample.Name, "cq_value": sample.Cp })
      }
    }
    console.log(inhResults);
  }

}
