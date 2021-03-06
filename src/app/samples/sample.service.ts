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

  getRecentPegnegs(): Observable<any[]> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.SAMPLES_URL + 'get_recent_pegnegs/', options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);
  }


  public querySamplesCount(queryFormValue): Observable<any> {

    let queryString = '?';

    if (queryFormValue.id !== null && queryFormValue.id !== '' && queryFormValue.id !== undefined) {
      queryString = queryString + '&id=' + queryFormValue.id.toString();
    }
    if (queryFormValue.from_id !== null && queryFormValue.from_id !== '' && queryFormValue.from_id !== undefined) {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null && queryFormValue.to_id !== '' && queryFormValue.to_id !== undefined) {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '' && queryFormValue.study !== undefined) {
      queryString = queryString + '&study=' + queryFormValue.study.toString();
    }
    if (queryFormValue.matrix !== null && queryFormValue.matrix !== '' && queryFormValue.matrix !== undefined) {
      queryString = queryString + '&matrix=' + queryFormValue.matrix.toString();
    }
    if (queryFormValue.sample_type !== null && queryFormValue.sample_type !== '' && queryFormValue.sanple_type !== undefined) {
      queryString = queryString + '&sample_type=' + queryFormValue.sample_type.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.collaborator_sample_id !== null && queryFormValue.collaborator_sample_id !== '' && queryFormValue.collaborator_sample_id !== undefined) {
      queryString = queryString + '&collaborator_sample_id=' + queryFormValue.collaborator_sample_id.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.from_collection_start_date !== null && queryFormValue.from_collection_start_date !== "" && queryFormValue.from_collection_start_date !== undefined) {
      queryString = queryString + '&from_collection_start_date=' + queryFormValue.from_collection_start_date.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.to_collection_start_date !== null && queryFormValue.to_collection_start_date !== "" && queryFormValue.to_collection_start_date !== undefined) {
      queryString = queryString + '&to_collection_start_date=' + queryFormValue.to_collection_start_date.toString();
    }
    if (queryFormValue.record_type !== null && queryFormValue.record_type !== '' && queryFormValue.record_type !== undefined) {
      queryString = queryString + '&record_type=' + queryFormValue.record_type.toString();
    }
    if (queryFormValue.peg_neg !== null && queryFormValue.peg_neg !== '' && queryFormValue.peg_neg !== undefined) {
      queryString = queryString + '&peg_neg=' + queryFormValue.peg_neg.toString();
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

    if (queryFormValue.hasOwnProperty('slim')) {
      queryString = queryString + '&slim'
    }
    if (queryFormValue.id !== null && queryFormValue.id !== '' && queryFormValue.id !== undefined) {
      queryString = queryString + '&id=' + queryFormValue.id.toString();
    }
    if (queryFormValue.from_id !== null && queryFormValue.from_id !== '' && queryFormValue.from_id !== undefined) {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null && queryFormValue.to_id !== '' && queryFormValue.to_id !== undefined) {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '' && queryFormValue.study !== undefined) {
      queryString = queryString + '&study=' + queryFormValue.study.toString();
    }
    if (queryFormValue.matrix !== null && queryFormValue.matrix !== '' && queryFormValue.matrix !== undefined) {
      queryString = queryString + '&matrix=' + queryFormValue.matrix.toString();
    }
    if (queryFormValue.sample_type !== null && queryFormValue.sample_type !== '' && queryFormValue.sanple_type !== undefined) {
      queryString = queryString + '&sample_type=' + queryFormValue.sample_type.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.collaborator_sample_id !== null && queryFormValue.collaborator_sample_id !== '' && queryFormValue.collaborator_sample_id !== undefined) {
      queryString = queryString + '&collaborator_sample_id=' + queryFormValue.collaborator_sample_id.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.from_collection_start_date !== null && queryFormValue.from_collection_start_date !== "" && queryFormValue.from_collection_start_date !== undefined) {
      queryString = queryString + '&from_collection_start_date=' + queryFormValue.from_collection_start_date.toString();
    }
    // tslint:disable-next-line:max-line-length
    if (queryFormValue.to_collection_start_date !== null && queryFormValue.to_collection_start_date !== "" && queryFormValue.to_collection_start_date !== undefined) {
      queryString = queryString + '&to_collection_start_date=' + queryFormValue.to_collection_start_date.toString();
    }
    if (queryFormValue.record_type !== null && queryFormValue.record_type !== '' && queryFormValue.record_type !== undefined) {
      queryString = queryString + '&record_type=' + queryFormValue.record_type.toString();
    }
    if (queryFormValue.peg_neg !== null && queryFormValue.peg_neg !== '' && queryFormValue.peg_neg !== undefined) {
      queryString = queryString + '&peg_neg=' + queryFormValue.peg_neg.toString();
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

  public queryFinalSampleMeanConcentrations(queryObject): Observable<any> {
    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    let queryString = '';
    queryString += '?sample=';
    for (let sample of queryObject.samples) {
      queryString += ((sample.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);
    queryString += '&target=';
    for (let target of queryObject.targets) {
      queryString += ((target.toString()) + ',')
    }
    queryString = queryString.slice(0, -1);

    return this._http.get(APP_SETTINGS.SAMPLES_URL + 'finalsamplemeanconcentrations/' + queryString, options)
      .map((response: Response) => <any[]>response.json())
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

  public delete(id: number): Observable<ISample> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.SAMPLES_URL + id, options)
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
