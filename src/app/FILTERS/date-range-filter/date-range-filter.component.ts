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
      var startDate = Date.parse(sample.collection_start_date);
      var lower = Date.parse(this.lower);
      var upper = Date.parse(this.upper)

      //return ((Date.parse(sample.collection_start_date) >= Date.parse(this.lower)) && (Date.parse(sample.collection_start_date) <= Date.parse(this.upper)));
      return ((startDate >= lower) && (startDate <= upper));
      
      //return true
  }

  isActive():boolean {
      return ((this.lower !== '' && this.upper !== '') ? true : false);
      //return true;
  }

  //https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript

  onFromChange(value: any){
    if (value == ''){
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
      console.log("last 'to' date value was EMPTY")
      this.changes.emit(true);
    } else {
      this.upper = value
      console.log("last to date value was:" + this.upper)
      this.changes.emit(true);
    }
  }

}
