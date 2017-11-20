import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { ISampleType } from '../SHARED/sample-type';
import { SampleTypeService } from '../SHARED/sample-type.service';

@Injectable()
export class SampleTypeResolve implements Resolve<Array<ISampleType>> {

  constructor(private _filterService: SampleTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<ISampleType>> {
     return this._filterService.getSampleTypes();
  }
}