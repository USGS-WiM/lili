import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

@Injectable()
export class ControlResultsReportService {

  constructor(private _http: Http) { }

  public getControlResultsReport(queryObject): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.CONTROL_RESULTS_REPORT_URL, queryObject, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
