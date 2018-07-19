import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IFilterType } from './filter-type'

@Injectable()
export class FilterTypeService {

  constructor(private _http: Http) { }

  getFilterTypes(): Observable<IFilterType[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.FILTER_TYPES_URL, options)
      .map((response: Response) => <IFilterType[]>response.json())
      //.do(data => console.log('Sample types data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
    
  public create(formValue: IFilterType): Observable<IFilterType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.post(APP_SETTINGS.FILTER_TYPES_URL, formValue, options)
      .map((response: Response) => <IFilterType>response.json())
      .catch(this.handleError);
  }

  public update(formValue: IFilterType): Observable<IFilterType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.put(APP_SETTINGS.FILTER_TYPES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <IFilterType>response.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<IFilterType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS});

    return this._http.delete(APP_SETTINGS.FILTER_TYPES_URL + id, options)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
    }

}
