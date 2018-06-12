import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import { APP_SETTINGS } from '../app.settings';

import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatchDetail } from './analysis-batch-detail';



@Injectable()
export class AnalysisBatchService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  // need for analysis-batches.component to open worksheet in new window
  getNativeWindow() {
    return window;
  }
  // subject, getter,setter for extraction form values
  private _ExtractionWorksheetObj: Subject<any> = new Subject<any>();
  public get WorksheetObject(): Observable<any> { return this._ExtractionWorksheetObj.asObservable(); }
  public setWorksheetObject(worksheetObj: any) {
    this._ExtractionWorksheetObj.next(worksheetObj);
  }
  // get Analysis Batch Detail - for individual AB record retrieval 
  public getAnalysisBatchDetail(abID: number): Observable<IAnalysisBatchDetail> {
    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCH_DETAIL_URL + abID + '/?format=json', options)
      .map((response: Response) => <IAnalysisBatchDetail[]>response.json())
      .catch(this.handleError);

  }

  // get Analysis Batch Summaries - for populating table of ABs
  getAnalysisBatchSummaries(): Observable<IAnalysisBatchSummary[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCH_SUMMARY_URL, options)
      .map((response: Response) => <IAnalysisBatchSummary[]>response.json())
      // .do(data => console.log('Analysis Batch data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public queryAnalysisBatchesCount(queryFormValue): Observable<any> {

    let queryString = '?';

    if (queryFormValue.from_id !== null) {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null) {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '') {
      queryString = queryString + 'study=' + queryFormValue.study.toString();
    }

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCH_SUMMARY_URL + 'get_count/' + queryString, options)
      .map((response: Response) => <IAnalysisBatch[]>response.json())
      .catch(this.handleError);

  }


  public queryAnalysisBatches(queryFormValue): Observable<IAnalysisBatchSummary[]> {

    let queryString = '?';

    if (queryFormValue.from_id !== null) {
      queryString = queryString + '&from_id=' + queryFormValue.from_id.toString();
    }
    if (queryFormValue.to_id !== null) {
      queryString = queryString + '&to_id=' + queryFormValue.to_id.toString();
    }
    if (queryFormValue.study !== null && queryFormValue.study !== '') {
      queryString = queryString + 'study=' + queryFormValue.study.toString();
    }

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCH_SUMMARY_URL + queryString, options)
      .map((response: Response) => <IAnalysisBatch[]>response.json())
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

  public create(formValue: IAnalysisBatch): Observable<IAnalysisBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.ANALYSIS_BATCH_URL, formValue, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError)

  }

  public update(formValue: IAnalysisBatch): Observable<IAnalysisBatch> {

    let options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.ANALYSIS_BATCH_URL + formValue.id + '/', formValue, options)
      .map(this.extractData)
      .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
