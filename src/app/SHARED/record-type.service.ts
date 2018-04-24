import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IRecordType } from '../SHARED/record-type';

@Injectable()
export class RecordTypeService {

  constructor(private _http: Http) { }

  getRecordTypes(): Observable<IRecordType[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.RECORD_TYPES_URL, options)
      .map((response: Response) => <IRecordType[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
