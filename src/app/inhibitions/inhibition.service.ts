import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { IInhibition } from './inhibition';



@Injectable()
export class InhibitionService {

  constructor(private _http: Http) { }

  public submitRawInhibitionResults(rawInhResults): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.INHIBITIONS_RAW_RESULTS_URL, rawInhResults, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);

  }

  public create(formValue): Observable<IInhibition[]> {


    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.INHIBITIONS_URL, formValue, options)
      .map((response: Response) => <IInhibition[]>response.json())
      .catch(this.handleError);

  }

  public update(inhibitionArray): Observable<any> {
    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.INHIBITIONS_URL, inhibitionArray, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
