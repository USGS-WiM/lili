import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import { APP_SETTINGS } from '../app.settings';

import { IFreezer } from './freezer';

@Injectable()
export class FreezerService {

  constructor(private _http: Http) { }

  public getFreezers(): Observable<IFreezer[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.FREEZERS_URL, options)
      .map((response: Response) => <IFreezer[]>response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
