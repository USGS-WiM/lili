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

    private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
    }

}
