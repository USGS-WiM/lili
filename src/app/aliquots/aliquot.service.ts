import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import { APP_SETTINGS } from '../app.settings';

import { IAliquot } from './aliquot';

@Injectable()
export class AliquotService {

  constructor(private _http: Http) { }

  public create(formValue): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    // JSON object submission (formValue) need to be within an array
    return this._http.post(APP_SETTINGS.ALIQUOTS_URL, [formValue], options)
    .map((response: Response) => <any[]>response.json())
      .catch(this.handleError)

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
