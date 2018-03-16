import { Component, EventEmitter, OnInit } from '@angular/core';
import { Filter, DatagridFilter } from "clarity-angular";

import { IMatrix } from '../../SHARED/matrix'
import { MatrixService } from '../../SHARED/matrix.service';

@Component({
  selector: 'matrix-type-filter',
  templateUrl: './matrix-type-filter.component.html',
  styleUrls: ['./matrix-type-filter.component.scss']
})
export class MatrixTypeFilter implements OnInit, Filter<any> {
  allMatrices: IMatrix[];
  selectedMatrix: number;
  errorMessage: string;
  changes: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(private _matrixService: MatrixService) { }

  ngOnInit(): void {
    // on init, call getMatrices function which subscribes to the MatrixService, set results to the allMatrices var
    this._matrixService.getMatrices()
      .subscribe(matrices => this.allMatrices = matrices,
        error => this.errorMessage = <any>error);
  }

  accepts(sample: any) {
    return (this.selectedMatrix === sample.matrix_type);
  }

  isActive(): boolean {
    return ((this.selectedMatrix > -1) ? true : false);
  }

  onSelect(value: any) {
    console.log("Matrix type has been selected");
    this.selectedMatrix = value;
    this.changes.emit(true);
  }
}