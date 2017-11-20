import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { ITarget } from '../targets/target';
import { TargetService } from '../targets/target.service';

@Injectable()
export class TargetResolve implements Resolve<Array<ITarget>> {

  constructor(private _targetService: TargetService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<ITarget>> {
     return this._targetService.getTargets();
  }
}