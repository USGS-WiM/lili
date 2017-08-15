import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

@Component({
  selector: 'date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilter implements OnInit, Filter<any> {
  private lower: string = "";
  private upper: string = "";

  constructor() { }

  ngOnInit() {
  }

   changes: EventEmitter<any> = new EventEmitter<any>(false);

   accepts(sample: any){
      //return ((sample.collection_start_date >= Date.parse(this.lower)) && (sample.collection_start_date<= Date.parse(this.upper)));
      return true
  }

  isActive():boolean {
      return true;
  }

  onFromChange(value: any){
    if (value == ''){
      console.log("last 'from' date value was EMPTY")
      this.changes.emit(true);
    } else {
      this.lower = value
    }
    alert("from date updated")
  }

  onToChange(value: any){
    if (value == '') {
      console.log("last 'to' date value was EMPTY")
      this.changes.emit(true);
    } else {
      this.lower = value
    }
    alert("to date updated")
  }

}
