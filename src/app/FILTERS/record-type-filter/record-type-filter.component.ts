import { Component, EventEmitter, OnInit } from '@angular/core';
import { Filter, DatagridFilter } from "clarity-angular";

import { IRecordType } from '../../SHARED/record-type'
import { RecordTypeService } from '../../SHARED/record-type.service';


@Component({
  selector: 'record-type-filter',
  templateUrl: './record-type-filter.component.html',
  styleUrls: ['./record-type-filter.component.scss']
})
export class RecordTypeFilter implements OnInit, Filter<any> {
  allRecordTypes: IRecordType[];
  selectedRecordType: number;
  errorMessage: string;
  changes: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(private _recordTypeService: RecordTypeService) { }

  ngOnInit(): void {
    this._recordTypeService.getRecordTypes()
      .subscribe(recordTypes => this.allRecordTypes = recordTypes,
        error => this.errorMessage = <any>error);
  }

  accepts(sample: any) {
    return (this.selectedRecordType === sample.record_type);
  }

  isActive(): boolean {
    return ((this.selectedRecordType > -1) ? true : false);
  }

  onSelect(value: any) {
    this.selectedRecordType = value;
    this.changes.emit(true);
  }

}
