import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { IUnit } from '../units/unit';
import { UnitService } from '../units/unit.service';

@Injectable()
export class UnitResolve implements Resolve<Array<IUnit>> {

  constructor(private _unitService: UnitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IUnit>> {
     return this._unitService.getUnits();
  }
}