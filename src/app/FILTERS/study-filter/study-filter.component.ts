import { Component, EventEmitter, OnInit } from '@angular/core';
import { Filter, DatagridFilter } from "clarity-angular";

import { IStudy } from '../../studies/study'
import { StudyService } from '../../studies/study.service';

@Component({
  selector: 'study-filter',
  templateUrl: './study-filter.component.html',
  styleUrls: ['./study-filter.component.scss']
})
export class StudyFilter implements OnInit, Filter<any> {
  allStudies: IStudy[];
  selectedStudy: number;
  private errorMessage: string;

  changes: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(private _studyService: StudyService) { }

  ngOnInit(): void {
    // on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
    this._studyService.getStudies()
      .subscribe(studies => this.allStudies = studies,
        error => this.errorMessage = <any>error);
  }



  accepts(sample: any) {
    return (this.selectedStudy === sample.study);
  }

  isActive(): boolean {
    return ((this.selectedStudy > -1) ? true : false);
  }

  onSelect(value: any) {
    this.selectedStudy = value;
    this.changes.emit(true);
  }
}
