import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { IMatrix } from 'app/SHARED/matrix';
import { MatrixService } from 'app/SHARED/matrix.service';

@Injectable()
export class MatrixResolve implements Resolve<Array<IMatrix>> {

  constructor(private _matrixService: MatrixService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IMatrix>> {
     return this._matrixService.getMatrices();
  }
}