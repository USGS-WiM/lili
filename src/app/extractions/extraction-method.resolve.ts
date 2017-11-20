import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { IExtractionMethod } from '../extractions/extraction-method';
import { ExtractionMethodService } from '../extractions/extraction-method.service';

@Injectable()
export class ExtractionResolve implements Resolve<Array<IExtractionMethod>> {

  constructor(private _extractionService: ExtractionMethodService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IExtractionMethod>> {
     return this._extractionService.getExtractionMethods();
  }
}