import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { IFilterType } from '../SHARED/filter-type';
import { FilterTypeService } from '../SHARED/filter-type.service';

@Injectable()
export class FilterResolve implements Resolve<Array<IFilterType>> {

  constructor(private _filterService: FilterTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IFilterType>> {
     return this._filterService.getFilterTypes();
  }
}