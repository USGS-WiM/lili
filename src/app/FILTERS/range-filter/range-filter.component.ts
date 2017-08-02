import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

@Component({
  selector: 'range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.scss']
})
export class RangeFilter implements OnInit, Filter<any> {
  private lower: number= -1;
  private upper: number = -1;

  constructor() { }

  ngOnInit() {
  }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sample: any){
      return ((sample.id >= Number(this.lower)) && (sample.id<= Number(this.upper)));
      //return true
  }

  isActive():boolean {
      return ((this.lower > -1 && this.upper > -1) ? true : false);
      //return true;
  }

  //capture the value from the onchange, set it equal to a variable, compare within the accepts() function
  onLowerChange(value: any){
    if (value == '') {
      this.lower = -1
      console.log("last lower range value was EMPTY ");
      this.changes.emit(true);
    }
    else {
      this.lower = value
      console.log("last lower range value was:" + this.upper)
      this.changes.emit(true);
    }
  }
  onUpperChange(value: any){
    if (value == '') {
      this.upper = -1
      console.log("last upper range value was EMPTY ");
      this.changes.emit(true);
    }
    else {
      this.upper = value
      console.log("last upper range value was:" + this.upper)
      this.changes.emit(true);
    }
 
  }


}
