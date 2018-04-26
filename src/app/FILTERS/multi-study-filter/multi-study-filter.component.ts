import { Component, EventEmitter, OnInit } from '@angular/core';
import { Filter, DatagridFilter } from "clarity-angular";

import { IStudy } from '../../studies/study'
import { StudyService } from '../../studies/study.service';

@Component({
  selector: 'multi-study-filter',
  templateUrl: './multi-study-filter.component.html',
  styleUrls: ['./multi-study-filter.component.scss']
})
export class MultiStudyFilterComponent implements OnInit, Filter<any> {
  allStudies: IStudy[];
  selectedStudy: number;
  selectedStudies;
  private errorMessage: string;

  changes: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(private _studyService: StudyService) { }

  ngOnInit() {
    // on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
    this._studyService.getStudies()
      .subscribe(studies => this.allStudies = studies,
        error => this.errorMessage = <any>error);
  }

  accepts(sample: any) {

    for (let study of sample.studies) {
      if (study.id === this.selectedStudy) {
        return true;
      }
    }
    //return (this.selectedStudy === sample.studies);
  }

  isActive(): boolean {
    return ((this.selectedStudy > -1) ? true : false);
  }

  onSelect(value: any) {
    console.log("Study has been selected");
    this.selectedStudy = value;
    this.changes.emit(true);
  }

}
