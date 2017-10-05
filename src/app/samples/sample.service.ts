import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { ISample } from './sample';

@Injectable()
export class SampleService {
  private _samplesUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/demo-services/samples.json';
  private _sampleFormConfigUrl = 'https://raw.githubusercontent.com/USGS-WiM/lide-lims/master/src/app/samples/sampleFormConfig.json';

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  public getSamples(): Observable<ISample[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL, options)
      // return this._http.get(this._samplesUrl)
      .map((response: Response) => <ISample[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue: ISample): Observable<ISample[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.SAMPLES_URL, formValue, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public update(formValue: ISample): Observable<ISample> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.SAMPLES_URL + formValue.id + '/', formValue, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public read(sampleID: number): Observable<ISample> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + sampleID + '/?format=json', options)
    .map(this.extractData)
    .catch(this.handleError);

  }

  public getSampleFormConfig(): Observable<any[]> {
    return this._http.get(this._sampleFormConfigUrl)
      .map((response: Response) => <any>response.json())
      // .do(data => console.log('Display config data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }




}
