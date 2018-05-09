import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from "@angular/forms/";

import { ISample } from '../samples/sample';
import { SampleService } from '../samples/sample.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  allSamples: ISample[];
  samplesLoading: boolean = false;
  errorMessage: string;

  constructor(private _sampleService: SampleService) { }

  ngOnInit() {

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(
        (samples) => {
          this.allSamples = samples
          this.samplesLoading = false;
        },
        error => {
          this.errorMessage = <any>error
        }
      );
  }

}
