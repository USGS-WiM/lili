import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { ConcentrationTypeService } from './concentration-types.service';
import { IConcentrationType } from './concentration-type';

@Injectable()
export class ConcentrationResolve implements Resolve<Array<IConcentrationType>> {

  constructor(private _concentrationService: ConcentrationTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IConcentrationType>> {
     return this._concentrationService.getConcentrationTypes();
  }
}