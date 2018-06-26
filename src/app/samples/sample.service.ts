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
  // subject for label parts needed by modal
  private _LabelParts: Subject<Array<any>> = new Subject<Array<any>>();

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

  public getSamplerNames(): Observable<any> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + 'get_sampler_names/', options)
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log('Samples data: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  // get sample-inhibition objects, i.e. inhibitions per sample
  getSampleInhibitions(sampleList: number[]): Observable<any[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLE_INHIBITIONS_URL + '?id=' + sampleList, options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  public querySamplesCount(queryFormValue): Observable<any> {

    let queryString = '?';

    if (queryFormValue.from_id !== null && queryFormValue.from_id !== '') {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null && queryFormValue.to_id !== '') {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '') {
      queryString = queryString + 'study=' + queryFormValue.study.toString();
    }
    if (queryFormValue.matrix !== null && queryFormValue.matrix !== '') {
      queryString = queryString + '&matrix=' + queryFormValue.matrix.toString();
    }
    if (queryFormValue.sample_type !== null && queryFormValue.sample_type !== '') {
      queryString = queryString + '&sample_type=' + queryFormValue.sample_type.toString();
    }
    if (queryFormValue.collaborator_sample_id !== null && queryFormValue.collaborator_sample_id !== '') {
      queryString = queryString + '&collaborator_sample_id =' + queryFormValue.collaborator_sample_id.toString();
    }
    if (queryFormValue.from_collection_start_date !== null && queryFormValue.from_collection_start_date !== "") {
      queryString = queryString + '&from_collection_start_date =' + queryFormValue.from_collection_start_date.toString();
    }
    if (queryFormValue.to_collection_start_date !== null && queryFormValue.to_collection_start_date !== "") {
      queryString = queryString + '&to_collection_start_date =' + queryFormValue.to_collection_start_date.toString();
    }

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + 'get_count/' + queryString, options)
      .map((response: Response) => <ISample[]>response.json())
      .catch(this.handleError);
  }

  public querySamples(queryFormValue): Observable<ISample[]> {

    let queryString = '?';

    if (queryFormValue.from_id !== null && queryFormValue.from_id !== '') {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null && queryFormValue.to_id !== '') {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '') {
      queryString = queryString + 'study=' + queryFormValue.study.toString();
    }
    if (queryFormValue.matrix !== null && queryFormValue.matrix !== '') {
      queryString = queryString + '&matrix=' + queryFormValue.matrix.toString();
    }
    if (queryFormValue.sample_type !== null && queryFormValue.sample_type !== '') {
      queryString = queryString + '&sample_type=' + queryFormValue.sample_type.toString();
    }
    if (queryFormValue.collaborator_sample_id !== null && queryFormValue.collaborator_sample_id !== '') {
      queryString = queryString + '&collaborator_sample_id =' + queryFormValue.collaborator_sample_id.toString();
    }
    if (queryFormValue.from_collection_start_date !== null && queryFormValue.from_collection_start_date !== "") {
      queryString = queryString + '&from_collection_start_date =' + queryFormValue.from_collection_start_date.toString();
    }
    if (queryFormValue.to_collection_start_date !== null && queryFormValue.to_collection_start_date !== "") {
      queryString = queryString + '&to_collection_start_date =' + queryFormValue.to_collection_start_date.toString();
    }

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });


    return this._http.get(APP_SETTINGS.SAMPLES_URL + queryString, options)
      .map((response: Response) => <ISample[]>response.json())
      .catch(this.handleError);

  }

  public getSampleSelection(sampleList: number[]): Observable<ISample[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + '?id=' + sampleList, options)
      .map((response: Response) => <ISample[]>response.json())
      .catch(this.handleError);

  }

  public create(formValue: ISample): Observable<ISample> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.SAMPLES_URL, formValue, options)
      .map((response: Response) => <ISample[]>response.json())
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

  // getter,setter for label parts needed by modal
  public get LabelParts(): Observable<any> { return this._LabelParts.asObservable(); }
  public setLabelParts(labelArr: any) {
    this._LabelParts.next(labelArr);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }
}
