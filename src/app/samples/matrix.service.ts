import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IMatrix } from './matrix'

@Injectable()
export class MatrixService {
  private _matricesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/matrix.json'

  constructor(private _http: Http) { }

   getMatrices(): Observable<IMatrix[]> {
    return this._http.get(this._matricesUrl)
                .map((response: Response) => <IMatrix[]>response.json())
                .do(data => console.log('Matricies data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
