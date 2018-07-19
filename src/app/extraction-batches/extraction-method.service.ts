import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { IExtractionMethod } from './extraction-method';


@Injectable()
export class ExtractionMethodService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  getExtractionMethods(): Observable<IExtractionMethod[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.EXTRACTION_METHODS_URL, options)
      .map((response: Response) => <IExtractionMethod[]>response.json())
      // .do(data => console.log('Sample types data: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  public create(formValue: IExtractionMethod): Observable<IExtractionMethod> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.post(APP_SETTINGS.EXTRACTION_METHODS_URL, formValue, options)
      .map((response: Response) => <IExtractionMethod>response.json())
      .catch(this.handleError);
  }

  public update(formValue: IExtractionMethod): Observable<IExtractionMethod> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.put(APP_SETTINGS.EXTRACTION_METHODS_URL + formValue.id + '/', formValue, options)
    .map((response: Response) => <IExtractionMethod>response.json())
    .catch(this.handleError);
  }

  public delete(id: number): Observable<IExtractionMethod> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.EXTRACTION_METHODS_URL + id, options)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }


}
