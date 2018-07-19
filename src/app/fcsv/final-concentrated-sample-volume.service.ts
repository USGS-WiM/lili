import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import { APP_SETTINGS } from '../app.settings';

import { IFinalConcentratedSampleVolume } from './final-concentrated-sample-volume';

@Injectable()
export class FinalConcentratedSampleVolumeService {

  constructor(private _http: Http) { }

  public create(fcsvSubmission: IFinalConcentratedSampleVolume[]): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.FCSV_URL, fcsvSubmission, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError)

  }

  public update(fcsvID, formValue): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.FCSV_URL + fcsvID + '/', formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}

