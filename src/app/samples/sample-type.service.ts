import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { ISampleType } from './sample-type';

@Injectable()
export class SampleTypeService {
  //private _sampleTypeUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/sample-type.json';

  constructor(private _http: Http) { }

   getSampleTypes(): Observable<ISampleType[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.SAMP_TYPES_URL, options)
                .map((response: Response) => <ISampleType[]>response.json())
                //.do(data => console.log('Sample types data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
