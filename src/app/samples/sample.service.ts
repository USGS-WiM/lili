import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';

import { ISample } from './sample';
import { IInhibition } from '../inhibitions/inhibition';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SampleService {
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
      .map((response: Response) => <ISample[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getSampleSelection(sampleList: number[]): Observable<ISample[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + '?id=' + sampleList, options)
      .map((response: Response) => <ISample[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  // public getInhibitions(): Observable<IInhibition[]> {

  // }

  public create(formValue: ISample): Observable<ISample> {

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

  // subject, getter,setter for label parts needed by modal
  private _LabelParts: Subject<Array<any>> = new Subject<Array<any>>();
  public get LabelParts(): Observable<any> { return this._LabelParts.asObservable(); }
  public setLabelParts(labelArr: any) {
    this._LabelParts.next(labelArr);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }




}
