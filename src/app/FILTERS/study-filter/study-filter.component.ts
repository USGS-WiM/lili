import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";
//import { Subject } from "rxjs/Subject";

import {IStudy} from '../../studies/study'

import {ISample} from '../../samples/sample'
import { StudyService } from '../../studies/study.service';

@Component({
  selector: 'app-study-filter',
  templateUrl: './study-filter.component.html',
  styleUrls: ['./study-filter.component.scss']
})
export class StudyFilterComponent implements OnInit, Filter<ISample> {
  allStudies: IStudy[];
  selectedStudies: {[study: string]: boolean} = {};
  //nbStudies = 0;

  private value;
  private errorMessage: string;

  constructor(private filterContainer: DatagridFilter, private _studyService: StudyService) { 
    filterContainer.setFilter(this);
  }

  ngOnInit(): void {
        //on init, call getStudies function which subscribes to the StudyService, set results to the allStudies var
        this._studyService.getStudies()
            .subscribe(studies => this.allStudies = studies,
                error => this.errorMessage = < any > error);
    }


  changes: EventEmitter<any> = new EventEmitter<any>();


    isActive():boolean {
        return this.value ? true : false;
    }
    accepts(item: any){
        // return (this.trueSelected && item['customer'] && item['customer']['openid']) || (this.falseSelected && (!item['customer'] || !item['customer']['openid']))
        return true;
    }

    onSelect(event){


    }

//   listSelected(): string[] {
//         let list: string[] = [];
//         for (let study in this.selectedStudies) {
//             if (this.selectedStudies[study]) {
//                 list.push(study);
//             }
//         }
//         return list;
//     }

//     toggleStudy(study: string) {
//         this.selectedStudies[study] = !this.selectedStudies[study];
//         this.selectedStudies[study] ? this.nbStudies++ : this.nbStudies--;
//         this.changes.emit(true);
//     }

//     isActive(): boolean { return this.nbStudies > 0 }
//     accepts(sample: ISample) { return this.nbStudies === 0 || this.selectedStudies[sample.study]; }


}
