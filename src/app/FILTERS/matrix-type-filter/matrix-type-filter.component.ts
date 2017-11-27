import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

import {IMatrix} from '../../SHARED/matrix'
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

  constructor(private _matrixService: MatrixService) { }

  ngOnInit(): void {
        // on init, call getStudies function which subscribes to the StudyService, set results to the allMatrixs var
        this._matrixService.getMatrices()
            .subscribe(matrices => this.allMatrices = matrices,
                error => this.errorMessage = < any > error);
    }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sample: any){
<<<<<<< HEAD
    return (this.selectedMatrix === sample.matrix_type.id);
=======
      return (this.selectedMatrix === sample.matrix_type.id);
>>>>>>> 028ae4c5b201a668fb4954c89baaefb10615ec80
  }

  isActive():boolean {
      return ((this.selectedMatrix > -1) ? true : false);
  }

  onSelect(value: any){
    console.log("Matrix type has been selected");
    this.selectedMatrix = value;
    this.changes.emit(true); 
  }
}