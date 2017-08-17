import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

@Component({
  selector: 'filter-born-on-date-filter',
  templateUrl: './filter-born-on-date-filter.component.html',
  styleUrls: ['./filter-born-on-date-filter.component.scss']
})
export class FilterBornOnDateFilter implements OnInit, Filter<any> {
  @Input() dateField: string;
  private lower: string = "";
  private upper: string = "";

  constructor() { }

  ngOnInit() {
  }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
     accepts(sample: any){
        return ((Date.parse(sample[this.dateField]) >= Date.parse(this.lower)) && (Date.parse(sample[this.dateField]) <= Date.parse(this.upper)));
        //return true
    }
  
    isActive():boolean {
        return ((this.lower !== '' && this.upper !== '') ? true : false);
        //return true;
    }
  
    onFromChange(value: any){
      if (value == ''){
        this.lower = value
        console.log("last 'from' date value was EMPTY")
        this.changes.emit(true);
      } else {
        this.lower = value
        console.log("last from date value was:" + this.lower)
        this.changes.emit(true);
      }
    }
  
    onToChange(value: any){
      if (value == '') {
        this.lower = value
        console.log("last 'to' date value was EMPTY")
        this.changes.emit(true);
      } else {
        this.upper = value
        console.log("last to date value was:" + this.upper)
        this.changes.emit(true);
      }
    }

}
