import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

@Component({
  selector: 'range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.scss']
})
export class RangeFilter implements OnInit, Filter<any> {
  private lower;
  private upper;

  constructor() { }

  ngOnInit() {
  }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sampleID: any){
      return (this.lower < sampleID < this.upper );
  }

  isActive():boolean {
      //return ((this.selectedMatrix > -1) ? true : false);
      return true;
  }

  //capture the value from the onchange, set it equal to a varable, compare within the accepts() function
  onChange(value: any){
    alert("a range value has changed!")
  }


}
