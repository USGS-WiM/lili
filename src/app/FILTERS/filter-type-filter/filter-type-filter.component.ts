import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

import {IFilterType} from '../../SHARED/filter-type'
import { FilterTypeService } from '../../SHARED/filter-type.service';

@Component({
  selector: 'filter-type-filter',
  templateUrl: './filter-type-filter.component.html',
  styleUrls: ['./filter-type-filter.component.scss']
})
export class FilterTypeFilter implements OnInit, Filter<any> {
  allFilterTypes: IFilterType[];
  selectedFilterType: number;
  private errorMessage: string;

  constructor(private _filterTypeService: FilterTypeService) { }

  ngOnInit(): void {
        //on init, call getStudies function which subscribes to the StudyService, set results to the allFilterTypes var
        this._filterTypeService.getFilterTypes()
            .subscribe(filterTypes => this.allFilterTypes = filterTypes,
                error => this.errorMessage = < any > error);
    }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sample: any){
      return (this.selectedFilterType === sample.filter_type);
  }

  isActive():boolean {
      return ((this.selectedFilterType > -1) ? true : false);
  }

  onSelect(value: any){
    console.log("Filter type has been selected");
    this.selectedFilterType = value;
    this.changes.emit(true); 
  }
}