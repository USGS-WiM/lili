import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { IControlType } from '../control-types/control-type';
import { ControlTypeService } from '../control-types/control-types.service';

@Injectable()
export class ControlResolve implements Resolve<Array<IControlType>> {

  constructor(private _concentrationService: ControlTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IControlType>> {
     return this._concentrationService.getControlTypes();
  }
}