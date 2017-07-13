import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

import {ISampleType} from '../../SHARED/sample-type'
import { SampleTypeService } from '../../SHARED/sample-type.service';

@Component({
  selector: 'sample-type-filter',
  templateUrl: './sample-type-filter.component.html',
  styleUrls: ['./sample-type-filter.component.scss']
})
export class SampleTypeFilter implements OnInit, Filter<any> {
  allSampleTypes: ISampleType[];
  private selectedSampleType: number;
  private errorMessage: string;

  constructor(private _sampleTypeService: SampleTypeService) { }

  ngOnInit(): void {
        //on init, call getStudies function which subscribes to the StudyService, set results to the allSampleTypes var
        this._sampleTypeService.getSampleTypes()
            .subscribe(sampleTypes => this.allSampleTypes = sampleTypes,
                error => this.errorMessage = < any > error);
    }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sample: any){
      return (this.selectedSampleType === sample.sample_type);
  }

  isActive():boolean {
      return ((this.selectedSampleType > -1) ? true : false);
  }

  onSelect(value: any){
    console.log("Sample type has been selected");
    this.selectedSampleType = value;
    this.changes.emit(true); 
  }
}