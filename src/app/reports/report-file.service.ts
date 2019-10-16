import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

@Injectable()
export class ReportFileService {

  constructor(private _http: Http) { }

  public getReportFiles(): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.REPORT_FILES_URL, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }

  public retrieveReport(fileURL): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(fileURL, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }


}
